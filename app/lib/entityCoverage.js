import { priorityBrands, brandSlug } from "./brandData.js";
import { isCommercialTireSize } from "./getRelatedSizes.js";
import { labelForIntent, sitemapIntents } from "./seo.js";
import { getStrictProducts, sizeToSlug, vehicleFitments } from "./tireData.js";
import { vehicleDisplayName } from "./vehicleNames.js";

const preferredPassengerIntents = ["best", "price", "all-season", "all-weather", "winter", "touring", "highway", "performance", "all-terrain"];
const preferredCommercialIntents = ["best", "price", "steer", "drive", "trailer", "regional-haul", "long-haul", "mixed-service"];

function uniqueByHref(links = []) {
  const seen = new Set();
  return links.filter((link) => {
    if (!link?.href || seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

const vehiclePriority = ["rav4", "cr-v", "rogue", "outback", "model-3", "model-y", "f-150", "silverado", "civic", "camry"];

function vehicleEntityScore(fitment) {
  const index = vehiclePriority.indexOf(fitment.model);
  return index === -1 ? 100 : index;
}

export function vehiclesUsingSize(size = "", limit = 8) {
  return uniqueByHref(vehicleFitments
    .filter((fitment) => fitment.size === size)
    .sort((a, b) => vehicleEntityScore(a) - vehicleEntityScore(b) || String(b.year).localeCompare(String(a.year)))
    .map((fitment) => ({
      href: `/vehicles/${fitment.make}/${fitment.model}/${fitment.year}`,
      label: `${fitment.year} ${vehicleDisplayName(fitment.make)} ${vehicleDisplayName(fitment.model)}`
    }))).slice(0, limit);
}

export function brandsAvailableForSize(size = "", limit = 8) {
  const brands = getStrictProducts({ size, limit: 100 })
    .map((product) => product.brand)
    .filter(Boolean);

  return uniqueByHref([...brands, ...priorityBrands]
    .map((brand) => ({
      href: `/brands/${brandSlug(brand)}`,
      label: `${brand} tires`
    }))).slice(0, limit);
}

export function tireCategoryLinksForSize(size = "", limit = 9) {
  const commercial = isCommercialTireSize(size);
  const intents = commercial ? preferredCommercialIntents : preferredPassengerIntents;
  const slug = sizeToSlug(size);

  return intents
    .filter((intent) => sitemapIntents.includes(intent))
    .map((intent) => ({
      href: `/tires/${slug}/${intent}`,
      label: `${labelForIntent(intent)} ${size} tires`
    }))
    .slice(0, limit);
}

export function alternativesForSize(size = "", relatedSizes = []) {
  return relatedSizes.map((item) => ({
    href: item.href || `/tires/${sizeToSlug(item.size || item.label || "")}`,
    label: item.size ? `${item.size} tires` : item.label,
    note: item.note || "Research only. Confirm exact fitment before replacing a listed tire size."
  }));
}

export function entityCoverageForSize({ size = "", relatedSizeCards = [] } = {}) {
  return {
    vehicles: vehiclesUsingSize(size),
    brands: brandsAvailableForSize(size),
    categories: tireCategoryLinksForSize(size),
    alternatives: alternativesForSize(size, relatedSizeCards).slice(0, 6)
  };
}
