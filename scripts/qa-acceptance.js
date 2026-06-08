import { getTireResults } from "../app/lib/getTireResults.js";
import { articles, indexableArticles } from "../app/lib/educationData.js";
import { comparisons } from "../app/lib/comparisonData.js";
import { commercialStates } from "../app/lib/commercialMarkets.js";
import { entityCoverageForSize } from "../app/lib/entityCoverage.js";
import { tireSizeFaqs } from "../app/lib/faqData.js";
import { hasAiLanguage, humanizeCopy } from "../app/lib/humanizeCopy.js";
import { scorePageQuality } from "../app/lib/pageQuality.js";
import { classifyTireSize } from "../app/lib/classifyTireSize.js";
import { isFakeModel } from "../app/lib/rankTireResults.js";
import { parseMalformedNearSlug, parseTireSize, canonicalizeSizeUrl } from "../app/lib/tireSizeParser.js";
import { getRelatedSizeCards, getStrictProducts, productCatalog, sizeToSlug } from "../app/lib/tireData.js";
import { sitemapPathsForSection } from "../app/lib/sitemapData.js";
import { legacyLandingPages } from "../app/lib/legacyPages.js";
import { itemListSchema } from "../app/lib/schema.js";
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

const unratedPricedProducts = productCatalog.filter((product) => typeof product.price === "number" && !product.review && !product.aggregateRating);
const unratedSchema = itemListSchema({ title: "Unrated priced products", products: unratedPricedProducts, path: "/qa" });
assert(
  unratedSchema.itemListElement.every((item) => item.item["@type"] !== "Product"),
  "Unrated products should not emit Product snippet schema"
);

const exact = getTireResults({ size: "275/60R20", intent: "all-terrain" }).exactProducts;
for (const product of exact) {
  assert(sizeToSlug(product.size) === "275-60-r20", `Wrong size leaked into 275/60R20: ${product.size}`);
  assert([product.category, product.position, product.bestFor].join(" ").toLowerCase().includes("all-terrain"), `Wrong intent leaked into all-terrain: ${product.brand} ${product.model}`);
}

const allTerrain27555 = getStrictProducts({ size: "275/55R20", intent: "all-terrain" });
assert(allTerrain27555.length >= 2, "275/55R20 all-terrain product coverage is too thin");
assert(allTerrain27555.some((product) => product.brand === "Nitto" && product.model.includes("Terra Grappler G3")), "Nitto Terra Grappler G3 missing from 275/55R20 all-terrain coverage");

const winter23545 = getStrictProducts({ size: "235/45R18", intent: "winter" });
assert(winter23545.length >= 2, "235/45R18 winter product coverage is too thin");
assert(winter23545.some((product) => product.model.includes("Pilot Alpin 5")), "Michelin Pilot Alpin 5 missing from winter coverage");

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
assert(sitemapPathsForSection("vehicles").some((path) => path.includes("/vehicles/toyota/rav4/2025")), "Programmatic vehicle expansion missing from vehicles sitemap");
assert(sitemapPathsForSection("vehicle-pages").some((path) => path.includes("/vehicles/toyota/rav4/2025")), "Legacy vehicle sitemap alias failed");
assert(sitemapPathsForSection("university").every((path) => !path.includes("toyota-rav4-tire-guide")), "Brief generated article entered indexable sitemap");
assert(sitemapPathsForSection("comparisons").includes("/compare/michelin-vs-goodyear"), "Comparison page missing from sitemap");
assert(sitemapPathsForSection("commercial").includes("/commercial-truck-tires/states/texas"), "Commercial state page missing from sitemap");
assert(sitemapPathsForSection("deals-pages").includes("/winter-tires-on-sale"), "Winter sale landing page missing from deals sitemap");
assert(sitemapPathsForSection("deals-pages").includes("/275-55r20-all-terrain-tires"), "275/55R20 all-terrain landing page missing from deals sitemap");
assert(legacyLandingPages["best-all-season-truck-tires"], "Best all-season truck tires landing page missing");
assert(legacyLandingPages["honda-cr-v-tires"], "Honda CR-V spelling variant landing page missing");
assert(articles.length > indexableArticles.length, "Tire University backend expansion is not separated from indexable articles");
assert(comparisons.length >= 8, "High-value comparison coverage is too small");
assert(commercialStates.length >= 7, "Commercial state coverage is too small");

const quality = scorePageQuality({
  intro: "This canonical page compares exact tire information, retailer availability, fitment checks, FAQ coverage, and related tire research before purchase.",
  faqs: [{}, {}],
  schemaTypes: ["BreadcrumbList", "FAQPage"],
  internalLinks: { hubs: [{ href: "/tires" }, { href: "/vehicles" }, { href: "/brands" }, { href: "/tire-university" }] },
  products: drive,
  canonical: "/tires/11r22-5/drive",
  images: [{}]
});
assert(quality.indexable, "Useful commercial drive page failed page-quality gate");
assert(!scorePageQuality({ intro: "Thin page.", products: [], canonical: "/thin" }).indexable, "Thin page passed page-quality gate");
assert(humanizeCopy("Unlock a premium solution").includes("practical option"), "Humanizer did not replace AI phrasing");
assert(!hasAiLanguage(humanizeCopy("Unlock a premium solution")), "Humanizer left blocked AI phrasing");

const passengerRelated = getRelatedSizeCards("275/55R20", { type: "passenger", limit: 8 });
const passengerRelatedSizes = passengerRelated.map((item) => item.size);
assert(passengerRelatedSizes.includes("275/60R20"), "275/60R20 missing from 275/55R20 passenger related sizes");
assert(!passengerRelatedSizes.includes("11R22.5"), "11R22.5 leaked into passenger related sizes");
assert(!passengerRelatedSizes.includes("295/75R22.5"), "295/75R22.5 leaked into passenger related sizes");
assert(passengerRelated.every((item) => item.badge === "Related Size"), "Passenger related cards use wrong badge");

const sizeEntities = entityCoverageForSize({ size: "225/65R17", relatedSizeCards: passengerRelated });
assert(sizeEntities.vehicles.some((item) => item.href.includes("/vehicles/toyota/rav4")), "225/65R17 vehicle entity coverage missing RAV4");
assert(sizeEntities.brands.some((item) => item.href.includes("/brands/michelin")), "225/65R17 brand entity coverage missing Michelin");
assert(sizeEntities.categories.some((item) => item.href.includes("/all-season")), "225/65R17 category entity coverage missing all-season");
assert(tireSizeFaqs("225/65R17", passengerRelated).length >= 5, "Tire size FAQ expansion is too small");

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
