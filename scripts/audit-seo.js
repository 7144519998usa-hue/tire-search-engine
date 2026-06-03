const fs = require("fs");
const path = require("path");

const root = process.cwd();
const requiredFiles = [
  "app/page.js",
  "app/sitemap.xml/route.js",
  "app/sitemaps/[section]/route.js",
  "app/lib/sitemapData.js",
  "app/lib/pageQuality.js",
  "app/lib/humanizeCopy.js",
  "app/lib/entityCoverage.js",
  "app/lib/faqData.js",
  "app/lib/comparisonData.js",
  "app/lib/commercialMarkets.js",
  "app/robots.js",
  "app/commercial-truck-tires/page.js",
  "app/commercial-truck-tires/positions/[position]/page.js",
  "app/tires/[size]/page.js",
  "app/tires/[size]/[intent]/page.js",
  "app/shop-tires/page.js",
  "app/deals/page.js",
  "app/vehicles/[make]/[model]/[year]/page.js",
  "app/compare/page.js",
  "app/compare/[slug]/page.js",
  "app/commercial-truck-tires/states/[state]/page.js",
  "app/go/[merchant]/route.js"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error("Missing required clean-site files:");
  missing.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

const sitemapSource = [
  fs.readFileSync(path.join(root, "app/sitemap.xml/route.js"), "utf8"),
  fs.readFileSync(path.join(root, "app/sitemaps/[section]/route.js"), "utf8"),
  fs.readFileSync(path.join(root, "app/lib/sitemapData.js"), "utf8")
].join("\n");
const pageSource = fs.readFileSync(path.join(root, "app/page.js"), "utf8");
const tireDataSource = fs.readFileSync(path.join(root, "app/lib/tireData.js"), "utf8");
const siteSource = fs.readFileSync(path.join(root, "app/lib/site.js"), "utf8");
const legacySource = fs.readFileSync(path.join(root, "app/lib/legacyPages.js"), "utf8");
const seoSource = fs.readFileSync(path.join(root, "app/lib/seo.js"), "utf8");
const qualitySource = fs.readFileSync(path.join(root, "app/lib/pageQuality.js"), "utf8");
const humanizeSource = fs.readFileSync(path.join(root, "app/lib/humanizeCopy.js"), "utf8");
const entitySource = fs.readFileSync(path.join(root, "app/lib/entityCoverage.js"), "utf8");
const faqSource = fs.readFileSync(path.join(root, "app/lib/faqData.js"), "utf8");
const comparisonSource = fs.readFileSync(path.join(root, "app/lib/comparisonData.js"), "utf8");
const commercialMarketsSource = fs.readFileSync(path.join(root, "app/lib/commercialMarkets.js"), "utf8");
const educationSource = fs.readFileSync(path.join(root, "app/lib/educationData.js"), "utf8");
const layoutSource = fs.readFileSync(path.join(root, "app/layout.js"), "utf8");
const middlewareSource = fs.existsSync(path.join(root, "middleware.js"))
  ? fs.readFileSync(path.join(root, "middleware.js"), "utf8")
  : "";

const assertions = [
  ["sitemap includes commercial truck tire priority", sitemapSource.includes("commercial-truck-tires")],
  ["sitemap includes all generated tire intent pages", seoSource.includes("all-terrain") && seoSource.includes("trailer") && seoSource.includes("performance")],
  ["sitemap index and sub-sitemaps are supported", sitemapSource.includes("sitemapindex") && sitemapSource.includes("sitemapPathsForSection")],
  ["canonical sitemap section aliases are supported", sitemapSource.includes('"vehicles"') && sitemapSource.includes("sitemapSectionAliases")],
  ["page quality gate is present", qualitySource.includes("scorePageQuality") && qualitySource.includes("isSitemapEligible")],
  ["AI-language humanizer is present", humanizeSource.includes("blockedAiPhrases") && humanizeSource.includes("humanizeCopy")],
  ["entity coverage engine is present", entitySource.includes("vehiclesUsingSize") && entitySource.includes("brandsAvailableForSize") && entitySource.includes("tireCategoryLinksForSize")],
  ["expanded FAQ engine is present", faqSource.includes("tireSizeFaqs") && faqSource.includes("vehicleFaqs") && faqSource.includes("brandFaqs")],
  ["comparison pages are supported", comparisonSource.includes("michelin-vs-goodyear") && sitemapSource.includes("comparisons")],
  ["state-level commercial markets are supported", commercialMarketsSource.includes("texas") && sitemapSource.includes("commercialStates")],
  ["Tire University backend expansion is present", educationSource.includes("generatedArticleGroups") && educationSource.includes("indexableArticles")],
  ["Website SearchAction schema is emitted", layoutSource.includes("webSiteSchema")],
  [
    "homepage links to Tire Rack/Mavis/Amazon product flow",
    pageSource.includes("Tire Rack") &&
      pageSource.includes("Mavis") &&
      pageSource.includes("Amazon") &&
      pageSource.includes("/commercial-truck-tires") &&
      pageSource.includes("/tires/265-60-r18")
  ],
  ["Tire Rack env is supported", tireDataSource.includes("TSE_TIRE_RACK_CJ_TEXT_LINK")],
  ["Mavis CJ fallback is supported", tireDataSource.includes("TSE_MAVIS_CJ_TEXT_LINK")],
  ["Amazon backup is supported", tireDataSource.includes("TSE_AMAZON_ASSOCIATE_TAG")],
  ["Preview indexing flag is supported", siteSource.includes("NEXT_PUBLIC_INDEXABLE")],
  ["canonical host redirect is supported", middlewareSource.includes("www.tiresearchengine.com") && middlewareSource.includes("NextResponse.redirect")],
  ["legacy landing pages preserve high-value URLs", legacySource.includes("best-truck-tires") && legacySource.includes("semi-truck-tires") && legacySource.includes("best-winter-tires")]
];

const failed = assertions.filter(([, passed]) => !passed);

if (failed.length) {
  console.error("SEO audit failed:");
  failed.forEach(([label]) => console.error(`- ${label}`));
  process.exit(1);
}

console.log("Clean tire site SEO audit passed.");
