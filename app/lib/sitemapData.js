import { priorityBrands, brandSlug } from "./brandData.js";
import { indexableArticles } from "./educationData.js";
import { legacyLandingPaths } from "./legacyPages.js";
import { isSitemapEligible } from "./pageQuality.js";
import { siteUrl } from "./site.js";
import { sitemapIntents } from "./seo.js";
import { commercialPositions, getStrictProducts, sizeToSlug, tireSizes, vehicleFitments } from "./tireData.js";

export const sitemapSections = [
  "tire-sizes",
  "vehicles",
  "brands",
  "commercial",
  "university",
  "deals-pages"
];

export const sitemapSectionAliases = {
  "vehicle-pages": "vehicles",
  "brand-pages": "brands",
  "commercial-pages": "commercial",
  "tire-university": "university"
};

function unique(paths = []) {
  return [...new Set(paths)].sort();
}

function hasProductsForSize(size, intent = "") {
  return getStrictProducts({ size, intent, limit: 1 }).length > 0;
}

function productQualityContext({ products = [], path = "", allowWithoutProducts = false } = {}) {
  return {
    intro: `This canonical page compares exact tire information, retailer availability, fitment checks, FAQ coverage, and related tire research for ${path}.`,
    faqs: [{}, {}],
    schemaTypes: ["BreadcrumbList", "FAQPage"],
    internalLinks: {
      hubs: [{ href: "/tires" }, { href: "/vehicles" }, { href: "/brands" }, { href: "/tire-university" }]
    },
    products,
    canonical: path,
    images: products.length ? [{}] : [],
    allowWithoutProducts
  };
}

function commercialSizes() {
  return tireSizes.filter((size) => /r(17\.5|19\.5|22\.5|24\.5)$/i.test(size) || /^[0-9]{1,2}r/i.test(size));
}

export function sitemapPathsForSection(section) {
  const canonicalSection = sitemapSectionAliases[section] || section;

  if (canonicalSection === "tire-sizes") {
    return unique(tireSizes.flatMap((size) => {
      const baseProducts = getStrictProducts({ size, limit: 1 });
      const basePath = `/tires/${sizeToSlug(size)}`;
      const base = isSitemapEligible(productQualityContext({ products: baseProducts, path: basePath })) ? [basePath] : [];
      const intents = sitemapIntents
        .filter((intent) => {
          const products = getStrictProducts({ size, intent, limit: 1 });
          return isSitemapEligible(productQualityContext({ products, path: `/tires/${sizeToSlug(size)}/${intent}` }));
        })
        .map((intent) => `/tires/${sizeToSlug(size)}/${intent}`);
      return [...base, ...intents];
    }));
  }

  if (canonicalSection === "vehicles") {
    return unique([
      "/vehicles",
      ...vehicleFitments.map((fitment) => `/vehicles/${fitment.make}`),
      ...vehicleFitments.map((fitment) => `/vehicles/${fitment.make}/${fitment.model}`),
      ...vehicleFitments
        .filter((fitment) => {
          const path = `/vehicles/${fitment.make}/${fitment.model}/${fitment.year}`;
          const products = getStrictProducts({ size: fitment.size, intent: fitment.intent, limit: 1 });
          return isSitemapEligible(productQualityContext({ products, path }));
        })
        .map((fitment) => `/vehicles/${fitment.make}/${fitment.model}/${fitment.year}`)
    ]);
  }

  if (canonicalSection === "brands") {
    return unique([
      "/brands",
      ...priorityBrands.map((brand) => `/brands/${brandSlug(brand)}`)
    ]);
  }

  if (canonicalSection === "commercial") {
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

  if (canonicalSection === "university") {
    return unique([
      "/tire-university",
      ...indexableArticles.map((article) => `/tire-university/${article.slug}`),
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

  if (canonicalSection === "deals-pages") {
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
