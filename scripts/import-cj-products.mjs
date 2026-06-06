import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { normalizeCjProducts } from "../app/lib/cjProductAdapter.js";

const outputPath = resolve("app/lib/cjProductCatalog.js");

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

async function fetchApiProducts() {
  const token = process.env.CJ_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    throw new Error("CJ_PERSONAL_ACCESS_TOKEN is required for API import.");
  }

  const endpoint = process.env.CJ_PRODUCT_SEARCH_ENDPOINT || "https://product-search.api.cj.com/query";
  const queryFile = process.env.CJ_PRODUCT_SEARCH_QUERY_FILE;
  const query = queryFile
    ? readFileSync(resolve(queryFile), "utf8")
    : `
query TireSearchEngineProducts($keywords: String, $advertiserIds: [ID!], $limit: Int) {
  products: shoppingProducts(keywords: $keywords, advertiserIds: $advertiserIds, limit: $limit) {
    resultList {
      title
      advertiserName
      brand
      price
      currency
      imageUrl
      clickUrl
      sku
      description
    }
  }
}`;

  const advertiserIds = (process.env.CJ_ADVERTISER_IDS || [process.env.CJ_TIRE_RACK_ADVERTISER_ID, process.env.CJ_MAVIS_ADVERTISER_ID].filter(Boolean).join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const keywords = process.env.CJ_PRODUCT_KEYWORDS || "tires";
  const limit = Number(process.env.CJ_PRODUCT_LIMIT || 1000);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables: { keywords, advertiserIds, limit }
    })
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`CJ API returned ${response.status}: ${text.slice(0, 500)}`);
  }

  const payload = JSON.parse(text);
  if (payload.errors?.length) {
    throw new Error(`CJ API errors: ${JSON.stringify(payload.errors).slice(0, 1000)}`);
  }

  const arrays = extractArrays(payload.data);
  return arrays.sort((a, b) => b.length - a.length)[0] || [];
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
  writeFileSync(outputPath, `const cjProductCatalog = ${JSON.stringify(normalized, null, 2)};\n\nexport default cjProductCatalog;\n`);
  console.log(`Imported ${normalized.length} CJ tire products to ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
