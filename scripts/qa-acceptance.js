import { getTireResults } from "../app/lib/getTireResults.js";
import { classifyTireSize } from "../app/lib/classifyTireSize.js";
import { isFakeModel } from "../app/lib/rankTireResults.js";
import { parseMalformedNearSlug, parseTireSize, canonicalizeSizeUrl } from "../app/lib/tireSizeParser.js";
import { getRelatedSizeCards, getStrictProducts, productCatalog, sizeToSlug } from "../app/lib/tireData.js";
import { sitemapPathsForSection } from "../app/lib/sitemapData.js";
import { readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const parserCases = [
  ["225/65R17", "225-65-r17", "225/65R17"],
  ["22565R17", "225-65-r17", "225/65R17"],
  ["11R22.5", "11r22-5", "11R22.5"],
  ["295/75R22.5", "295-75-r22-5", "295/75R22.5"]
];

for (const [input, slug, display] of parserCases) {
  const parsed = parseTireSize(input);
  assert(parsed?.slug === slug, `Parser slug failed for ${input}`);
  assert(parsed?.display === display, `Parser display failed for ${input}`);
}

assert(canonicalizeSizeUrl("255/45R20") === "/tires/255-45-r20", "canonicalizeSizeUrl failed");
assert(!parseTireSize("9r22-5-near-houston-tx"), "Location phrase parsed as tire size");
assert(parseMalformedNearSlug("9r22-5-near-houston-tx")?.cityStateDisplay === "Houston, TX", "Malformed near slug failed");
assert(classifyTireSize("275-55-r20") !== "commercial_truck", "275/55R20 misclassified as commercial");
assert(classifyTireSize("11r22-5") === "commercial_truck", "11R22.5 not classified as commercial");

for (const product of productCatalog) {
  assert(!isFakeModel(product), `Fake/generated model found: ${product.brand} ${product.model}`);
}

const exact = getTireResults({ size: "275/60R20", intent: "all-terrain" }).exactProducts;
for (const product of exact) {
  assert(sizeToSlug(product.size) === "275-60-r20", `Wrong size leaked into 275/60R20: ${product.size}`);
  assert([product.category, product.position, product.bestFor].join(" ").toLowerCase().includes("all-terrain"), `Wrong intent leaked into all-terrain: ${product.brand} ${product.model}`);
}

const drive = getTireResults({ size: "11R22.5", intent: "drive" }).exactProducts;
for (const product of drive) {
  assert(sizeToSlug(product.size) === "11r22-5", `Wrong size leaked into 11R22.5 drive: ${product.size}`);
  assert(product.position === "drive", `Wrong position leaked into 11R22.5 drive: ${product.position}`);
}

assert(getStrictProducts({ size: "225/65R17", intent: "drive", limit: 1 }).length === 0, "Passenger size leaked into commercial drive results");
assert(getStrictProducts({ size: "11R22.5", intent: "drive", limit: 1 }).length > 0, "Commercial drive products missing for 11R22.5");

const tireSitemapPaths = sitemapPathsForSection("tire-sizes");
assert(!tireSitemapPaths.includes("/tires/225-65-r17/drive"), "Passenger drive URL leaked into tire sitemap");
assert(!tireSitemapPaths.includes("/tires/235-45-r18/drive"), "Passenger drive URL leaked into tire sitemap");

const passengerRelated = getRelatedSizeCards("275/55R20", { type: "passenger", limit: 8 });
const passengerRelatedSizes = passengerRelated.map((item) => item.size);
assert(passengerRelatedSizes.includes("275/60R20"), "275/60R20 missing from 275/55R20 passenger related sizes");
assert(!passengerRelatedSizes.includes("11R22.5"), "11R22.5 leaked into passenger related sizes");
assert(!passengerRelatedSizes.includes("295/75R22.5"), "295/75R22.5 leaked into passenger related sizes");
assert(passengerRelated.every((item) => item.badge === "Related Size"), "Passenger related cards use wrong badge");

const commercialRelated = getRelatedSizeCards("11R22.5", { type: "commercial", limit: 8 });
assert(commercialRelated.some((item) => item.size === "295/75R22.5"), "Commercial related sizes missing 295/75R22.5");
assert(commercialRelated.every((item) => item.badge === "Related Commercial Size"), "Commercial related cards use wrong badge");

const homepageSource = readFileSync(new URL("../app/page.js", import.meta.url), "utf8");
assert(homepageSource.indexOf("Popular passenger, SUV, and pickup sizes") < homepageSource.indexOf("Popular commercial truck sizes"), "Homepage commercial sizes appear before passenger sizes");
assert(homepageSource.includes("getProducts({ commercialOnly: true, limit: 3 })"), "Homepage commercial products are not capped at 3");
assert(homepageSource.indexOf("Vehicle tire finder") < homepageSource.indexOf("Commercial truck tire searches"), "Homepage commercial product section appears before vehicle finder");

const layoutSource = readFileSync(new URL("../app/layout.js", import.meta.url), "utf8");
assert(!layoutSource.includes("Truck, EV, and passenger tire deals"), "Old header tagline still appears");
assert(layoutSource.includes("Find the right tire, faster."), "Clean header tagline missing");

console.log("Acceptance QA passed.");
