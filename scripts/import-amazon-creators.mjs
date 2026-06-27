import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { amazonStorefrontSections } from "../app/lib/amazonStorefront.js";

const credentialId = process.env.AMAZON_CREATORS_API_CLIENT_ID || process.env.AMAZON_CREATORS_CREDENTIAL_ID || "";
const credentialSecret = process.env.AMAZON_CREATORS_API_CLIENT_SECRET || process.env.AMAZON_CREATORS_CREDENTIAL_SECRET || "";
const version = process.env.AMAZON_CREATORS_API_VERSION || "3.1";
const partnerTag = process.env.AMAZON_CREATORS_PARTNER_TAG || process.env.TSE_AMAZON_ASSOCIATE_TAG || "tiresearch-20";
const marketplace = process.env.AMAZON_CREATORS_MARKETPLACE || "www.amazon.com";
const sdkDir = process.env.AMAZON_CREATORS_SDK_DIR || process.env.CREATORSAPI_NODEJS_SDK_DIR || "vendor/creatorsapi-nodejs-sdk";
const outputPath = process.env.AMAZON_PRODUCT_CATALOG_OUTPUT || "app/lib/amazonProductCatalog.js";
const maxQueries = Number(process.env.AMAZON_CREATORS_MAX_QUERIES || 24);
const itemCount = Number(process.env.AMAZON_CREATORS_ITEM_COUNT || 4);
const searchIndex = process.env.AMAZON_CREATORS_SEARCH_INDEX || "Automotive";

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function get(obj, paths = []) {
  for (const pathParts of paths) {
    let current = obj;
    for (const part of pathParts) {
      if (current == null) break;
      current = current[part];
    }
    if (current !== undefined && current !== null && current !== "") return current;
  }
  return undefined;
}

function moneyDisplay(price = {}) {
  const display = get(price, [["displayAmount"], ["display_amount"], ["DisplayAmount"]]);
  if (display) return display;
  const amount = get(price, [["money", "amount"], ["Money", "Amount"], ["amount"], ["Amount"]]);
  const currency = get(price, [["money", "currencyCode"], ["Money", "CurrencyCode"], ["currency"], ["Currency"]]) || "USD";
  if (typeof amount === "number") return `${currency === "USD" ? "$" : `${currency} `}${amount.toFixed(2)}`;
  return "";
}

function moneyAmount(price = {}) {
  const amount = get(price, [["money", "amount"], ["Money", "Amount"], ["amount"], ["Amount"]]);
  return typeof amount === "number" ? amount : null;
}

function normalizeProduct(raw, item, section) {
  const listing = get(raw, [["offersV2", "listings", 0], ["OffersV2", "Listings", 0], ["offers", "listings", 0], ["Offers", "Listings", 0]]) || {};
  const price = get(listing, [["price"], ["Price"]]) || {};
  const title = get(raw, [
    ["itemInfo", "title", "displayValue"],
    ["ItemInfo", "Title", "DisplayValue"],
    ["title"],
    ["Title"]
  ]);
  const image = get(raw, [
    ["images", "primary", "large", "url"],
    ["images", "primary", "medium", "url"],
    ["Images", "Primary", "Large", "URL"],
    ["Images", "Primary", "Medium", "URL"]
  ]);
  const detailPageUrl = get(raw, [["detailPageURL"], ["detailPageUrl"], ["DetailPageURL"], ["url"], ["URL"]]);

  return {
    asin: get(raw, [["asin"], ["ASIN"]]),
    title: title || item.label,
    image: image || "",
    price: moneyAmount(price),
    currency: get(price, [["money", "currencyCode"], ["Money", "CurrencyCode"], ["currency"], ["Currency"]]) || "USD",
    displayPrice: moneyDisplay(price),
    detailPageUrl: detailPageUrl || "",
    query: item.query,
    label: item.label,
    size: item.size || "",
    intent: item.intent || "",
    sectionId: section.id,
    sectionTitle: section.title,
    source: "amazon-creators-api"
  };
}

function storefrontItems() {
  return amazonStorefrontSections.flatMap((section) =>
    section.items.map((item) => ({ item, section }))
  ).slice(0, maxQueries);
}

async function loadSdk() {
  const resolvedSdkDir = path.resolve(sdkDir);
  const distPath = path.join(resolvedSdkDir, "dist", "index.js");
  try {
    await fs.access(distPath);
  } catch {
    throw new Error([
      `Amazon Creators API SDK build not found at ${distPath}.`,
      "Download/extract creatorsapi-nodejs-sdk, run npm install && npm run build inside it,",
      "then set AMAZON_CREATORS_SDK_DIR to that extracted SDK directory."
    ].join(" "));
  }

  const require = createRequire(import.meta.url);
  return require(distPath);
}

async function main() {
  if (!credentialId || !credentialSecret || !version || !partnerTag) {
    fail("Missing Amazon Creators API credentials. Required: AMAZON_CREATORS_API_CLIENT_ID, AMAZON_CREATORS_API_CLIENT_SECRET, AMAZON_CREATORS_API_VERSION, and AMAZON_CREATORS_PARTNER_TAG or TSE_AMAZON_ASSOCIATE_TAG.");
    return;
  }

  const { ApiClient, DefaultApi, SearchItemsRequestContent } = await loadSdk();
  const apiClient = new ApiClient();
  apiClient.credentialId = credentialId;
  apiClient.credentialSecret = credentialSecret;
  apiClient.version = version;
  const api = new DefaultApi(apiClient);
  const products = [];

  for (const { item, section } of storefrontItems()) {
    const request = new SearchItemsRequestContent();
    request.partnerTag = partnerTag;
    request.keywords = item.query;
    request.searchIndex = searchIndex;
    request.itemCount = itemCount;
    request.resources = [
      "images.primary.medium",
      "images.primary.large",
      "itemInfo.title",
      "itemInfo.features",
      "offersV2.listings.availability",
      "offersV2.listings.condition",
      "offersV2.listings.merchantInfo",
      "offersV2.listings.price"
    ];

    try {
      console.log(`Fetching Amazon Creators API products for: ${item.query}`);
      const response = await api.searchItems(marketplace, { searchItemsRequestContent: request });
      const items = get(response, [["searchResult", "items"], ["SearchResult", "Items"], ["items"], ["Items"]]) || [];
      for (const raw of items) {
        const product = normalizeProduct(raw, item, section);
        if (product.asin && product.title && product.detailPageUrl) products.push(product);
      }
    } catch (error) {
      console.warn(`Creators API error for "${item.query}": ${JSON.stringify(error, null, 2).slice(0, 900)}`);
    }
  }

  const unique = [...new Map(products.map((product) => [product.asin, product])).values()];
  const source = `const amazonProductCatalog = ${JSON.stringify(unique, null, 2)};\n\nexport default amazonProductCatalog;\n`;
  await fs.writeFile(outputPath, source, "utf8");
  console.log(`Wrote ${unique.length} Amazon Creators API products to ${outputPath}`);
}

await main();
