import crypto from "node:crypto";
import fs from "node:fs/promises";
import { amazonStorefrontSections } from "../app/lib/amazonStorefront.js";

const accessKey = process.env.AMAZON_PAAPI_ACCESS_KEY || "";
const secretKey = process.env.AMAZON_PAAPI_SECRET_KEY || "";
const partnerTag = process.env.AMAZON_PAAPI_PARTNER_TAG || process.env.TSE_AMAZON_ASSOCIATE_TAG || "tiresearch-20";
const host = process.env.AMAZON_PAAPI_HOST || "webservices.amazon.com";
const region = process.env.AMAZON_PAAPI_REGION || "us-east-1";
const marketplace = process.env.AMAZON_PAAPI_MARKETPLACE || "www.amazon.com";
const outputPath = process.env.AMAZON_PRODUCT_CATALOG_OUTPUT || "app/lib/amazonProductCatalog.js";
const maxQueries = Number(process.env.AMAZON_PAAPI_MAX_QUERIES || 24);
const itemCount = Number(process.env.AMAZON_PAAPI_ITEM_COUNT || 4);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function sha256(value) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

function hmac(key, value, encoding) {
  return crypto.createHmac("sha256", key).update(value, "utf8").digest(encoding);
}

function isoAmzDate(date = new Date()) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function signingKey(dateStamp) {
  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, "ProductAdvertisingAPI");
  return hmac(kService, "aws4_request");
}

function signedHeaders({ payload, amzDate, dateStamp }) {
  const method = "POST";
  const path = "/paapi5/searchitems";
  const service = "ProductAdvertisingAPI";
  const target = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems";
  const contentType = "application/json; charset=UTF-8";
  const canonicalHeaders = [
    `content-encoding:amz-1.0`,
    `content-type:${contentType}`,
    `host:${host}`,
    `x-amz-date:${amzDate}`,
    `x-amz-target:${target}`
  ].join("\n") + "\n";
  const signedHeaderNames = "content-encoding;content-type;host;x-amz-date;x-amz-target";
  const canonicalRequest = [
    method,
    path,
    "",
    canonicalHeaders,
    signedHeaderNames,
    sha256(payload)
  ].join("\n");
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256(canonicalRequest)
  ].join("\n");
  const signature = hmac(signingKey(dateStamp), stringToSign, "hex");

  return {
    "content-encoding": "amz-1.0",
    "content-type": contentType,
    host,
    "x-amz-date": amzDate,
    "x-amz-target": target,
    authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaderNames}, Signature=${signature}`
  };
}

async function searchItems(item) {
  const now = new Date();
  const amzDate = isoAmzDate(now);
  const dateStamp = amzDate.slice(0, 8);
  const payload = JSON.stringify({
    Keywords: item.query,
    Marketplace: marketplace,
    PartnerTag: partnerTag,
    PartnerType: "Associates",
    ItemCount: itemCount,
    Resources: [
      "Images.Primary.Medium",
      "Images.Primary.Large",
      "ItemInfo.Title",
      "Offers.Listings.Price"
    ],
    SearchIndex: "Automotive"
  });

  const response = await fetch(`https://${host}/paapi5/searchitems`, {
    method: "POST",
    headers: signedHeaders({ payload, amzDate, dateStamp }),
    body: payload
  });
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Amazon PA-API ${response.status} for "${item.query}": ${body.slice(0, 700)}`);
  }

  return JSON.parse(body);
}

function normalizeProduct(raw, item, section) {
  const image = raw.Images?.Primary?.Large?.URL || raw.Images?.Primary?.Medium?.URL || "";
  const price = raw.Offers?.Listings?.[0]?.Price;
  return {
    asin: raw.ASIN,
    title: raw.ItemInfo?.Title?.DisplayValue || item.label,
    image,
    price: typeof price?.Amount === "number" ? price.Amount : null,
    currency: price?.Currency || "USD",
    displayPrice: price?.DisplayAmount || "",
    detailPageUrl: raw.DetailPageURL || "",
    query: item.query,
    label: item.label,
    size: item.size || "",
    intent: item.intent || "",
    sectionId: section.id,
    sectionTitle: section.title
  };
}

function storefrontItems() {
  return amazonStorefrontSections.flatMap((section) =>
    section.items.map((item) => ({ item, section }))
  ).slice(0, maxQueries);
}

async function main() {
  if (!accessKey || !secretKey || !partnerTag) {
    fail("Missing Amazon PA-API credentials. Required: AMAZON_PAAPI_ACCESS_KEY, AMAZON_PAAPI_SECRET_KEY, AMAZON_PAAPI_PARTNER_TAG.");
    return;
  }

  const products = [];
  for (const { item, section } of storefrontItems()) {
    try {
      console.log(`Fetching Amazon products for: ${item.query}`);
      const data = await searchItems(item);
      const items = data.SearchResult?.Items || [];
      for (const raw of items) {
        const product = normalizeProduct(raw, item, section);
        if (product.asin && product.title && product.detailPageUrl) products.push(product);
      }
    } catch (error) {
      console.warn(error.message);
    }
  }

  const unique = [...new Map(products.map((product) => [product.asin, product])).values()];
  const source = `const amazonProductCatalog = ${JSON.stringify(unique, null, 2)};\n\nexport default amazonProductCatalog;\n`;
  await fs.writeFile(outputPath, source, "utf8");
  console.log(`Wrote ${unique.length} Amazon API products to ${outputPath}`);
}

await main();
