const fs = require("fs");
const path = require("path");

const root = process.cwd();
const requiredFiles = [
  "app/page.js",
  "app/sitemap.xml/route.js",
  "app/sitemaps/[section]/route.js",
  "app/lib/sitemapData.js",
  "app/robots.js",
  "app/commercial-truck-tires/page.js",
  "app/commercial-truck-tires/positions/[position]/page.js",
  "app/tires/[size]/page.js",
  "app/tires/[size]/[intent]/page.js",
  "app/shop-tires/page.js",
  "app/deals/page.js",
  "app/vehicles/[make]/[model]/[year]/page.js",
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
const middlewareSource = fs.existsSync(path.join(root, "middleware.js"))
  ? fs.readFileSync(path.join(root, "middleware.js"), "utf8")
  : "";

const assertions = [
  ["sitemap includes commercial truck tire priority", sitemapSource.includes("commercial-truck-tires")],
  ["sitemap includes all generated tire intent pages", sitemapSource.includes("all-terrain") && sitemapSource.includes("trailer")],
  ["sitemap index and sub-sitemaps are supported", sitemapSource.includes("sitemapindex") && sitemapSource.includes("sitemapPathsForSection")],
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
