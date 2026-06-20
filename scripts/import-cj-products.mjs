import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { normalizeCjProducts } from "../app/lib/cjProductAdapter.js";

const outputPath = resolve("app/lib/cjProductCatalog.js");

function loadEnvFile(fileName) {
  const filePath = resolve(fileName);
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [rawKey, ...rawValue] = trimmed.split("=");
    const key = rawKey.trim();
    const value = rawValue.join("=").trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : "";
}

function parseCsvLine(line = "") {
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function parseCsv(csv = "") {
  const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  const headers = parseCsvLine(lines.shift() || "").map((header) => header.trim());
  return lines.map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });
}

function extractArrays(value, arrays = []) {
  if (Array.isArray(value)) {
    if (value.some((item) => item && typeof item === "object")) arrays.push(value);
    value.forEach((item) => extractArrays(item, arrays));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => extractArrays(item, arrays));
  }
  return arrays;
}

function keywordList() {
  const raw = process.env.CJ_PRODUCT_BATCH_KEYWORDS || process.env.CJ_PRODUCT_KEYWORDS || [
    "tires",
    "truck tires",
    "semi truck tires",
    "commercial truck tires",
    "steer tires",
    "drive tires",
    "trailer tires",
    "winter tires",
    "all season tires",
    "all terrain tires",
    "EV tires",
    "205/55R16",
    "225/65R17",
    "235/45R18",
    "235/60R18",
    "245/60R18",
    "265/60R18",
    "275/55R20",
    "275/60R20",
    "11R22.5",
    "295/75R22.5",
    "445/50R22.5"
  ].join(",");

  return raw.split(",").map((keyword) => keyword.trim()).filter(Boolean);
}

async function fetchApiProductsForKeyword(keyword) {
  const token = process.env.CJ_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    throw new Error("CJ_PERSONAL_ACCESS_TOKEN is required for API import.");
  }

  const endpointCandidates = (process.env.CJ_PRODUCT_SEARCH_ENDPOINTS || process.env.CJ_PRODUCT_SEARCH_ENDPOINT || [
    "https://ads.api.cj.com/query",
    "https://product-search.api.cj.com/query",
    "https://product.api.cj.com/query"
  ].join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const queryFile = process.env.CJ_PRODUCT_SEARCH_QUERY_FILE;
  const query = queryFile
    ? readFileSync(resolve(queryFile), "utf8")
    : `
query TireSearchEngineProducts($companyId: ID!, $websiteId: ID!, $keywords: [String!], $partnerIds: [ID!], $limit: Int) {
  products: shoppingProducts(companyId: $companyId, keywords: $keywords, partnerIds: $partnerIds, limit: $limit) {
    resultList {
      title
      advertiserName
      brand
      price {
        amount
        currency
      }
      salePrice {
        amount
        currency
      }
      imageLink
      link
      linkCode(pid: $websiteId) {
        clickUrl
        imageUrl
      }
      id
      catalogId
      mpn
      description
      productType
      size
    }
  }
}`;

  const advertiserIds = (process.env.CJ_ADVERTISER_IDS || [process.env.CJ_TIRE_RACK_ADVERTISER_ID, process.env.CJ_MAVIS_ADVERTISER_ID].filter(Boolean).join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const companyId = process.env.CJ_COMPANY_ID;
  if (!companyId) {
    throw new Error("CJ_COMPANY_ID is required for CJ Product Search imports.");
  }
  const websiteId = process.env.CJ_WEBSITE_ID;
  if (!websiteId) {
    throw new Error("CJ_WEBSITE_ID is required for CJ Product Search linkCode imports.");
  }

  const limit = Number(process.env.CJ_PRODUCT_LIMIT || 1000);
  const errors = [];
  for (const endpoint of endpointCandidates) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query,
          variables: { keywords: [keyword], advertiserIds, partnerIds: advertiserIds, companyId, websiteId, limit }
        })
      });

      const text = await response.text();
      if (!response.ok) {
        errors.push(`${endpoint} returned ${response.status}: ${text.slice(0, 300)}`);
        continue;
      }

      const payload = JSON.parse(text);
      if (payload.errors?.length) {
        errors.push(`${endpoint} errors: ${JSON.stringify(payload.errors).slice(0, 700)}`);
        continue;
      }

      const arrays = extractArrays(payload.data);
      return arrays.sort((a, b) => b.length - a.length)[0] || [];
    } catch (error) {
      errors.push(`${endpoint} failed: ${error.cause?.code || error.message}`);
    }
  }

  throw new Error(`CJ API request failed for "${keyword}". ${errors.join(" | ").slice(0, 1400)}`);
}

async function fetchApiProducts() {
  const products = [];
  for (const keyword of keywordList()) {
    console.log(`Fetching CJ products for "${keyword}"...`);
    products.push(...await fetchApiProductsForKeyword(keyword));
  }
  return products;
}

async function main() {
  const csvPath = argValue("--csv");
  const jsonPath = argValue("--json");
  const records = csvPath
    ? parseCsv(readFileSync(resolve(csvPath), "utf8"))
    : jsonPath
      ? JSON.parse(readFileSync(resolve(jsonPath), "utf8"))
      : await fetchApiProducts();

  const normalized = normalizeCjProducts(records);
  const minImportCount = Number(process.env.CJ_PRODUCT_MIN_IMPORT_COUNT || 100);
  if (normalized.length < minImportCount) {
    throw new Error(`CJ import returned only ${normalized.length} usable tire products. Refusing to overwrite ${outputPath}. Set CJ_PRODUCT_MIN_IMPORT_COUNT to a lower value only for intentional small imports.`);
  }

  writeFileSync(outputPath, `const cjProductCatalog = ${JSON.stringify(normalized, null, 2)};\n\nexport default cjProductCatalog;\n`);
  console.log(`Imported ${normalized.length} CJ tire products to ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
