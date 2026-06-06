import { parseTireSize } from "./tireSizeParser.js";

const knownRetailers = ["Tire Rack", "Mavis", "SimpleTire", "Priority Tire", "Amazon"];

function clean(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function slug(value = "") {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function firstValue(record = {}, keys = []) {
  for (const key of keys) {
    const value = record[key] ?? record[key.toLowerCase()] ?? record[key.toUpperCase()];
    if (value !== undefined && value !== null && clean(value)) {
      return value;
    }
  }
  return "";
}

function parsePrice(value) {
  const cleaned = clean(value).replace(/[^0-9.]/g, "");
  if (!cleaned) return undefined;
  const price = Number(cleaned);
  return Number.isFinite(price) ? price : undefined;
}

function sizeFromRecord(record = {}) {
  const explicit = firstValue(record, ["size", "tireSize", "tire_size", "variant", "dimension"]);
  const parsedExplicit = parseTireSize(explicit);
  if (parsedExplicit?.display) return parsedExplicit.display;

  const haystack = [
    explicit,
    firstValue(record, ["name", "title", "productName", "description", "sku", "cjsku"])
  ].join(" ");
  const match = haystack.match(/\b(?:LT|P)?(\d{3})[\/\s-]?(\d{2})\s?R\s?(\d{2}(?:\.5)?)\b/i)
    || haystack.match(/\b(\d{1,2})R(\d{2}(?:\.5)?)\b/i);
  const parsed = parseTireSize(match?.[0] || "");
  return parsed?.display || "";
}

function inferBrand(title = "", advertiser = "") {
  const brandCandidates = [
    "Michelin", "Goodyear", "Bridgestone", "Continental", "Firestone", "Pirelli",
    "Yokohama", "BFGoodrich", "BFG", "Cooper", "Falken", "Nitto", "Toyo",
    "General", "Mickey Thompson", "Kumho", "Sumitomo", "Hankook", "Dunlop"
  ];
  const source = `${title} ${advertiser}`.toLowerCase();
  const found = brandCandidates.find((brand) => source.includes(brand.toLowerCase()));
  if (found === "BFG") return "BFGoodrich";
  if (found) return found;
  if (knownRetailers.some((retailer) => clean(advertiser).toLowerCase().includes(retailer.toLowerCase()))) {
    return clean(advertiser);
  }
  return clean(title).split(" ").slice(0, 2).join(" ") || "Tire Retailer";
}

function inferModel(title = "", brand = "") {
  const cleaned = clean(title)
    .replace(new RegExp(`^${brand}\\s+`, "i"), "")
    .replace(/\b(?:LT|P)?\d{3}[\/\s-]?\d{2}\s?R\s?\d{2}(?:\.5)?\b/gi, "")
    .replace(/\b\d{1,2}R\d{2}(?:\.5)?\b/gi, "")
    .replace(/\b(tire|tyre|radial|xl|sl|load range [a-z]|[0-9]{2,3}[a-z])\b/gi, "")
    .trim();
  return cleaned.split(/\s+/).slice(0, 6).join(" ") || "Retailer Product";
}

function categoryFor({ title = "", size = "", advertiser = "" } = {}) {
  const source = `${title} ${advertiser}`.toLowerCase();
  const commercial = /\b(22\.5|24\.5|19\.5|17\.5|semi|commercial|steer|drive|trailer)\b/.test(`${size} ${source}`);
  if (commercial) return "CJ product feed commercial truck tires";
  if (source.includes("winter") || source.includes("blizzak") || source.includes("snow")) return "CJ product feed winter tires";
  if (source.includes("all terrain") || source.includes("all-terrain") || source.includes("a/t")) return "CJ product feed all-terrain tires";
  if (source.includes("performance") || source.includes("sport")) return "CJ product feed performance tires";
  return "CJ product feed passenger and SUV tires";
}

function positionFor(category = "", title = "") {
  const source = `${category} ${title}`.toLowerCase();
  if (source.includes("steer")) return "steer";
  if (source.includes("trailer")) return "trailer";
  if (source.includes("commercial")) return "drive";
  if (source.includes("winter")) return "winter";
  if (source.includes("all-terrain")) return "all-terrain";
  if (source.includes("performance")) return "performance";
  return "all-season";
}

export function normalizeCjProduct(record = {}) {
  const title = clean(firstValue(record, ["title", "name", "productName", "linkName"]));
  const advertiser = clean(firstValue(record, ["advertiserName", "advertiser_name", "advertiser", "merchant", "programName"]));
  const size = sizeFromRecord(record);
  if (!title || !size) return null;

  const brand = clean(firstValue(record, ["brand", "manufacturer"])) || inferBrand(title, advertiser);
  const model = clean(firstValue(record, ["model", "productModel"])) || inferModel(title, brand);
  const category = clean(firstValue(record, ["category", "productType"])) || categoryFor({ title, size, advertiser });
  const price = parsePrice(firstValue(record, ["price", "salePrice", "retailPrice", "amount"]));
  const clickUrl = clean(firstValue(record, ["clickUrl", "clickURL", "buyUrl", "buy_url", "link", "url", "destination"]));
  const image = clean(firstValue(record, ["imageUrl", "imageURL", "image", "thumbnail", "imageLink"]));
  const sku = clean(firstValue(record, ["sku", "cjsku", "catalogId", "id", "productId"]));

  return {
    id: `cj-${slug(advertiser || "retailer")}-${slug(sku || title)}-${slug(size)}`.slice(0, 140),
    brand,
    model,
    size,
    category,
    position: positionFor(category, title),
    bestFor: `${size} shoppers comparing ${brand} ${model} through ${advertiser || "CJ"} product feed availability.`,
    ...(price !== undefined ? { price, priceCurrency: clean(firstValue(record, ["currency", "priceCurrency"])) || "USD" } : {}),
    priceSnapshot: price !== undefined ? `$${price.toFixed(2)} from CJ feed` : "Confirm current retailer price",
    ...(sku ? { sku, cjsku: sku } : {}),
    ...(clickUrl ? { tireRackUrl: advertiser.toLowerCase().includes("tire rack") ? clickUrl : undefined, merchantUrl: clickUrl } : {}),
    ...(image ? { image } : {}),
    advertiser,
    cjProduct: true,
    isVerified: true
  };
}

export function normalizeCjProducts(records = []) {
  const seen = new Set();
  return records
    .map(normalizeCjProduct)
    .filter(Boolean)
    .filter((product) => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    });
}
