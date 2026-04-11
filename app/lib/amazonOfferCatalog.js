import fs from "fs";
import path from "path";
import { amazonAffiliatePlacements, sizeToSlug, slugToSize } from "./siteData";

const AMAZON_ASSOCIATE_ID = "tiresearch-20";
const AMAZON_OFFER_CSV_PATH = path.join(process.cwd(), "data", "amazon-offers.csv");

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function parsePipeList(value) {
  return String(value || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function addAssociateTag(url) {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);

    if (!parsed.hostname.includes("amazon.")) {
      return url;
    }

    parsed.searchParams.set("tag", AMAZON_ASSOCIATE_ID);
    return parsed.toString();
  } catch {
    return url;
  }
}

function normalizeCsvOffer(record) {
  const specialLink = record.specialLink || addAssociateTag(record.productUrl);
  const priority = Number.parseInt(record.priority || "50", 10);
  const score = Number.parseInt(record.score || "50", 10);

  if (!specialLink || !record.title) {
    return null;
  }

  return {
    asin: record.asin || "",
    title: record.title,
    description: record.description || "",
    brand: String(record.brand || "").toLowerCase(),
    size: String(record.size || "").toUpperCase(),
    badge: record.badge || "Amazon pick",
    imageUrl: record.imageUrl || "",
    specialLink,
    priority: Number.isNaN(priority) ? 50 : priority,
    score: Number.isNaN(score) ? 50 : score,
    pageTypes: parsePipeList(record.pageTypes),
    guideSlugs: parsePipeList(record.guideSlugs),
    vehicleKeys: parsePipeList(record.vehicleKeys),
    compareKeys: parsePipeList(record.compareKeys),
    homepage: String(record.homepage || "").toLowerCase() === "true",
    tags: parsePipeList(record.tags),
  };
}

function parseAmazonOfferCsv() {
  if (!fs.existsSync(AMAZON_OFFER_CSV_PATH)) {
    return [];
  }

  const raw = fs.readFileSync(AMAZON_OFFER_CSV_PATH, "utf8").trim();

  if (!raw) {
    return [];
  }

  const lines = raw.split(/\r?\n/).filter(Boolean);
  const [headerLine, ...rows] = lines;
  const headers = parseCsvLine(headerLine);

  return rows
    .map((line) => {
      const values = parseCsvLine(line);
      const record = headers.reduce((accumulator, header, index) => {
        accumulator[header] = values[index] || "";
        return accumulator;
      }, {});

      return normalizeCsvOffer(record);
    })
    .filter(Boolean);
}

function flattenLegacyPlacements() {
  const offers = [];

  Object.values(amazonAffiliatePlacements.sizes || {}).forEach((items) => {
    items.forEach((item) => {
      if (item?.specialLink) {
        offers.push(item);
      }
    });
  });

  Object.values(amazonAffiliatePlacements.brands || {}).forEach((items) => {
    items.forEach((item) => {
      if (item?.specialLink) {
        offers.push(item);
      }
    });
  });

  Object.values(amazonAffiliatePlacements.guides || {}).forEach((items) => {
    items.forEach((item) => {
      if (item?.specialLink) {
        offers.push(item);
      }
    });
  });

  (amazonAffiliatePlacements.home || []).forEach((item) => {
    if (item?.specialLink) {
      offers.push(item);
    }
  });

  return offers.map((item) =>
    normalizeCsvOffer({
      ...item,
      homepage: true,
      brand: item.brand || "",
      size: item.size || "",
      guideSlugs: "",
      vehicleKeys: "",
      compareKeys: "",
      tags: "",
    })
  );
}

function uniqueOffers(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = item.asin || item.specialLink || item.title;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function sortOffers(items) {
  return [...items].sort((left, right) => {
    if (left.priority !== right.priority) {
      return right.priority - left.priority;
    }

    if (left.score !== right.score) {
      return right.score - left.score;
    }

    return left.title.localeCompare(right.title);
  });
}

export function getAmazonOfferCatalog() {
  const csvOffers = parseAmazonOfferCsv();

  if (csvOffers.length > 0) {
    return sortOffers(uniqueOffers(csvOffers));
  }

  return sortOffers(uniqueOffers(flattenLegacyPlacements().filter(Boolean)));
}

export function getAmazonOffersForHome(limit = 6) {
  return sortOffers(
    getAmazonOfferCatalog()
    .filter((offer) => offer.homepage)
  ).slice(0, limit);
}

export function getAmazonOffersForSize(size, limit = 6) {
  return sortOffers(
    getAmazonOfferCatalog()
    .filter((offer) => offer.size === String(size || "").toUpperCase())
  ).slice(0, limit);
}

export function getAmazonOffersForBrand(brandSlug, limit = 6) {
  return sortOffers(
    getAmazonOfferCatalog()
    .filter((offer) => offer.brand === String(brandSlug || "").toLowerCase())
  ).slice(0, limit);
}

export function getAmazonOffersForGuide(guideSlug, limit = 6) {
  return sortOffers(
    getAmazonOfferCatalog()
    .filter((offer) => offer.guideSlugs.includes(guideSlug))
  ).slice(0, limit);
}

export function getAmazonOffersForVehicle(make, model, year, limit = 6) {
  const vehicleKey = `${make}/${model}/${year}`;

  return sortOffers(
    getAmazonOfferCatalog()
    .filter((offer) => offer.vehicleKeys.includes(vehicleKey))
  ).slice(0, limit);
}

export function getAmazonOffersForBrandSize(brandSlug, sizeSlug, limit = 6) {
  const normalizedSize = slugToSize(sizeSlug);
  const compareKey = `${String(brandSlug || "").toLowerCase()}/${sizeSlug}`;

  return sortOffers(
    getAmazonOfferCatalog()
    .filter(
      (offer) =>
        offer.compareKeys.includes(compareKey) ||
        (offer.brand === String(brandSlug || "").toLowerCase() &&
          offer.size === normalizedSize)
    )
  ).slice(0, limit);
}

export function getTopAmazonOffers(limit = 12) {
  return sortOffers(
    getAmazonOfferCatalog().filter(
      (offer) => offer.homepage || offer.priority >= 90 || offer.score >= 90
    )
  ).slice(0, limit);
}

export function getAmazonOfferImportTemplate() {
  return [
    "asin,title,description,brand,size,badge,productUrl,specialLink,imageUrl,priority,score,pageTypes,guideSlugs,vehicleKeys,compareKeys,homepage,tags",
    `B000000001,Michelin Defender 2 205/55R16,High-intent commuter tire offer,michelin,205/55R16,Amazon pick,https://www.amazon.com/dp/B000000001,,,95,92,home|size|brand|guide|vehicle|compare,best-all-season-tires,toyota/camry/2024|honda/civic/2024,michelin/${sizeToSlug("205/55R16")},true,all-season|commuter`,
  ].join("\n");
}

export { AMAZON_ASSOCIATE_ID, AMAZON_OFFER_CSV_PATH };
