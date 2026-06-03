import { priorityBrands, brandSlug } from "./brandData.js";
import { articles } from "./educationData.js";
import { legacyLandingPaths } from "./legacyPages.js";
import { siteUrl } from "./site.js";
import { sitemapIntents } from "./seo.js";
import { commercialPositions, getStrictProducts, sizeToSlug, tireSizes, vehicleFitments } from "./tireData.js";

export const sitemapSections = [
  "tire-sizes",
  "vehicle-pages",
  "brand-pages",
  "commercial-pages",
  "tire-university",
  "deals-pages"
];

function unique(paths = []) {
  return [...new Set(paths)].sort();
}

function hasProductsForSize(size, intent = "") {
  return getStrictProducts({ size, intent, limit: 1 }).length > 0;
}

function commercialSizes() {
  return tireSizes.filter((size) => /r(17\.5|19\.5|22\.5|24\.5)$/i.test(size) || /^[0-9]{1,2}r/i.test(size));
}

export function sitemapPathsForSection(section) {
  if (section === "tire-sizes") {
    return unique(tireSizes.flatMap((size) => {
      const base = hasProductsForSize(size) ? [`/tires/${sizeToSlug(size)}`] : [];
      const intents = sitemapIntents
        .filter((intent) => hasProductsForSize(size, intent))
        .map((intent) => `/tires/${sizeToSlug(size)}/${intent}`);
      return [...base, ...intents];
    }));
  }

  if (section === "vehicle-pages") {
    return unique([
      "/vehicles",
      ...vehicleFitments.map((fitment) => `/vehicles/${fitment.make}`),
      ...vehicleFitments.map((fitment) => `/vehicles/${fitment.make}/${fitment.model}`),
      ...vehicleFitments
        .filter((fitment) => hasProductsForSize(fitment.size, fitment.intent))
        .map((fitment) => `/vehicles/${fitment.make}/${fitment.model}/${fitment.year}`)
    ]);
  }

  if (section === "brand-pages") {
    return unique([
      "/brands",
      ...priorityBrands.map((brand) => `/brands/${brandSlug(brand)}`)
    ]);
  }

  if (section === "commercial-pages") {
    const sizes = commercialSizes();
    return unique([
      "/commercial-truck-tires",
      ...Object.keys(commercialPositions).map((position) => `/commercial-truck-tires/positions/${position}`),
      ...sizes.flatMap((size) => [
        `/commercial-truck-tires/${sizeToSlug(size)}`,
        `/commercial-truck-tires/${sizeToSlug(size)}/steer`,
        `/commercial-truck-tires/${sizeToSlug(size)}/drive`,
        `/commercial-truck-tires/${sizeToSlug(size)}/trailer`
      ]).filter((path) => !path.includes("undefined"))
    ]);
  }

  if (section === "tire-university") {
    return unique([
      "/tire-university",
      ...articles.map((article) => `/tire-university/${article.slug}`),
      "/about",
      "/about/advertiser-disclosure",
      "/about/how-we-make-money",
      "/about/editorial-policy",
      "/about/how-we-rank-offers",
      "/about/sources-methodology",
      "/about/commercial-tire-data-policy",
      "/about/vehicle-fitment-disclaimer"
    ]);
  }

  if (section === "deals-pages") {
    return unique([
      "/",
      "/shop-tires",
      "/deals",
      "/ev-tires",
      "/models",
      "/contact",
      ...legacyLandingPaths.slice(0, 30)
    ]);
  }

  return [];
}

export function absoluteSitemapUrl(path = "") {
  return `${siteUrl}${path}`;
}

export function pagePriority(path) {
  if (path === "/") return "1.0";
  if (path.includes("commercial-truck-tires") || path.includes("295-75-r22-5") || path.includes("445-50-r22-5")) return "0.9";
  if (path.includes("/drive") || path.includes("/steer") || path.includes("/trailer") || path.includes("/all-terrain")) return "0.85";
  if (path.includes("/price") || path.includes("/comparison") || path.includes("/budget") || path.includes("/best")) return "0.8";
  return "0.7";
}
