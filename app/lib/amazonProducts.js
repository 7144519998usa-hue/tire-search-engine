import amazonProductCatalog from "./amazonProductCatalog.js";
import { amazonStorefrontSections, amazonStorefrontHref } from "./amazonStorefront.js";
import { buildGoUrl } from "./redirects.js";

export function getAmazonProductsForQuery(query = "", limit = 4) {
  const normalized = String(query || "").trim().toLowerCase();
  if (!normalized) return [];

  return amazonProductCatalog
    .filter((product) => String(product.query || "").trim().toLowerCase() === normalized)
    .slice(0, limit);
}

export function getAmazonProductsForSection(sectionId = "", limit = 8) {
  return amazonProductCatalog
    .filter((product) => product.sectionId === sectionId)
    .slice(0, limit);
}

export function getFeaturedAmazonProducts(limit = 8) {
  const preferredQueries = amazonStorefrontSections
    .flatMap((section) => section.items.slice(0, 2).map((item) => item.query.toLowerCase()));

  const products = [];
  for (const query of preferredQueries) {
    const match = amazonProductCatalog.find((product) => String(product.query || "").toLowerCase() === query);
    if (match && !products.some((product) => product.asin === match.asin)) {
      products.push(match);
    }
    if (products.length >= limit) break;
  }

  return products;
}

export function amazonProductHref(product, placement = "amazon-product") {
  if (product?.detailPageUrl) {
    return buildGoUrl({
      merchant: "Amazon",
      href: product.detailPageUrl,
      placement,
      tireSize: product.size || product.query || product.title || "Amazon"
    });
  }

  return amazonStorefrontHref(
    {
      label: product.title || product.query || "Amazon tire product",
      query: product.query || product.title || "tires",
      size: product.size || ""
    },
    placement
  );
}

export function hasAmazonApiProducts() {
  return amazonProductCatalog.length > 0;
}
