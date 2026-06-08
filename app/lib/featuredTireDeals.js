import { buildGoUrl } from "./redirects";
import { buildAmazonUrl, buildTireRackUrl, productCatalog } from "./tireData";

export const featuredDealSizes = ["225/65R17", "205/55R16", "215/55R17", "225/60R18", "195/65R15"];

function tireRackSearchUrl(size = "") {
  const match = String(size).match(/^(\d{3})\/(\d{2})R(\d{2})$/i);
  if (!match) return "https://www.tirerack.com/tires/TireSearchResults.jsp";
  const [, width, ratio, diameter] = match;
  const params = new URLSearchParams({
    width: `${width}/`,
    ratio,
    diameter,
    performance: "ALL",
    skipOver: "true"
  });
  return `https://www.tirerack.com/tires/TireSearchResults.jsp?${params.toString()}`;
}

function amazonSearchUrl(query = "") {
  return buildAmazonUrl({ query });
}

function sizeSlug(size = "") {
  return String(size).toLowerCase().replace("/", "-").replace("r", "-r");
}

function bestPricedProductForSize(size = "") {
  return productCatalog
    .filter((product) => (
      product.size === size &&
      product.image &&
      typeof product.price === "number"
    ))
    .sort((a, b) => a.price - b.price)[0];
}

function fallbackProductForSize(size = "") {
  return productCatalog.find((product) => product.size === size && product.image) ||
    productCatalog.find((product) => product.size === size) ||
    productCatalog[0];
}

const baseFeaturedTireDeals = [
  {
    size: "225/65R17",
    headline: "225/65R17 SUV deal watch",
    badge: "Popular SUV size",
    context: "High-demand replacement size for RAV4, CR-V, Rogue, and similar crossover shoppers."
  },
  {
    size: "205/55R16",
    headline: "205/55R16 commuter tire deals",
    badge: "High-volume sedan size",
    context: "Common Civic, Corolla, Jetta, Focus, and commuter-car replacement size."
  },
  {
    size: "215/55R17",
    headline: "215/55R17 midsize sedan deals",
    badge: "Sedan value lane",
    context: "Useful size for Accord, Camry Hybrid, Cruze, and similar midsize sedan shoppers."
  },
  {
    size: "225/60R18",
    headline: "225/60R18 crossover deal watch",
    badge: "Crossover replacement",
    context: "Often searched by Outback, Equinox, RAV4, and crossover/SUV replacement shoppers."
  },
  {
    size: "195/65R15",
    headline: "195/65R15 budget tire deals",
    badge: "Budget commuter size",
    context: "Common compact-car and hybrid replacement size for cost-conscious shoppers."
  }
];

export const featuredTireDeals = baseFeaturedTireDeals.map((deal) => {
  const product = bestPricedProductForSize(deal.size) || fallbackProductForSize(deal.size);
  const price = typeof product?.price === "number" ? `$${product.price.toFixed(2)}` : "";
  const productName = [product?.brand, product?.model].filter(Boolean).join(" ");

  return {
    ...deal,
    product,
    slug: sizeSlug(deal.size),
    internalHref: `/tires/${sizeSlug(deal.size)}`,
    displayPrice: price || "Check current price",
    dealSignal: price
      ? `${price} Tire Rack feed price found for ${productName}.`
      : "Tire Rack and Amazon marketplace price-check paths are available for this size.",
    sourceNote: price
      ? "Feed prices can change. Confirm final price, stock, shipping, installation, and fitment on the retailer page."
      : "Confirm current pricing directly with the retailer before buying.",
    primaryMerchant: "Tire Rack",
    primaryUrl: product?.tireRackUrl || buildTireRackUrl({ query: `${deal.size} tires`, size: deal.size }) || tireRackSearchUrl(deal.size),
    primaryCta: price ? `Check Tire Rack ${price}` : "Compare Tire Rack deals",
    secondaryMerchant: "Amazon",
    secondaryUrl: amazonSearchUrl(`${deal.size} tire`),
    secondaryCta: "Search Amazon prices"
  };
});

export function getFeaturedTireDeals(limit = featuredTireDeals.length) {
  return featuredTireDeals.slice(0, limit);
}

export function getFeaturedTireDealsForSize(size = "") {
  const normalized = String(size || "").toUpperCase().replace(/\s+/g, "");
  return featuredTireDeals.filter((deal) => deal.size.toUpperCase() === normalized);
}

export function trackedDealHref({ deal, merchant, href, placement }) {
  return buildGoUrl({
    merchant,
    href,
    placement,
    tireSize: deal.size
  });
}
