import { isCommercialTireSize } from "./getRelatedSizes.js";
import { sizeToSlug, slugToSize } from "./tireData.js";
import { vehicleDisplayName } from "./vehicleNames.js";

export const tireIntentLabels = {
  "best": "Best",
  "budget": "Budget",
  "price": "Price",
  "comparison": "Comparison",
  "all-season": "All-Season",
  "all-weather": "All-Weather",
  "all-terrain": "All-Terrain",
  "truck": "Truck",
  "drive": "Drive",
  "steer": "Steer",
  "trailer": "Trailer",
  "quiet": "Quiet",
  "winter": "Winter",
  "summer": "Summer",
  "wet-road": "Wet-Road",
  "mud-terrain": "Mud-Terrain",
  "touring": "Touring",
  "highway": "Highway"
};

export const sitemapIntents = Object.keys(tireIntentLabels);

export function titleForTireSize(size = "") {
  const commercial = isCommercialTireSize(size);
  return commercial
    ? `${size} Truck Tires: Steer, Drive & Fleet Tire Options`
    : `${size} Tires: Compare Brands, Prices & Retailer Options`;
}

export function descriptionForTireSize(size = "") {
  const commercial = isCommercialTireSize(size);
  return commercial
    ? `Compare ${size} commercial truck tire options by steer, drive, trailer, haul type, retailer availability, and fitment notes before buying.`
    : `Compare ${size} tire options, retailer availability, common vehicle applications, and fitment notes before buying.`;
}

export function labelForIntent(intent = "") {
  return tireIntentLabels[intent] || String(intent || "").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function titleForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent);
  if (isCommercialTireSize(size) || ["steer", "drive", "trailer"].includes(intent)) {
    return `${label} ${size} Truck Tires: Compare Commercial Tire Options`;
  }
  return `${label} ${size} Tires: Compare Brands, Prices & Retailer Options`;
}

export function descriptionForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent).toLowerCase();
  if (intent === "price") {
    return `Compare ${size} tire price paths, retailer availability, installation options, and fitment notes before buying.`;
  }
  if (intent === "comparison") {
    return `Compare ${size} tire categories, common brands, retailer paths, and fitment notes without mixing unrelated tire sizes.`;
  }
  if (isCommercialTireSize(size) || ["steer", "drive", "trailer"].includes(intent)) {
    return `Compare ${label} ${size} commercial truck tire options by axle position, load range, haul type, and supplier availability.`;
  }
  return `Compare ${label} ${size} tire options, common applications, retailer availability, and fitment notes before buying.`;
}

export function titleForVehicleModel(make = "", model = "") {
  return `${vehicleDisplayName(make)} ${vehicleDisplayName(model)} Tires: Common Sizes, Years & Retailer Options`;
}

export function descriptionForVehicleModel(make = "", model = "") {
  return `Compare ${vehicleDisplayName(make)} ${vehicleDisplayName(model)} tire sizes by year, exact-size tire pages, retailer paths, and fitment notes before buying.`;
}

export function titleForVehicleYear(fitment) {
  return `${fitment.year} ${vehicleDisplayName(fitment.make)} ${vehicleDisplayName(fitment.model)} Tires: OEM Sizes, Fitment & Replacement Options`;
}

export function descriptionForVehicleYear(fitment) {
  return `Compare ${fitment.year} ${vehicleDisplayName(fitment.make)} ${vehicleDisplayName(fitment.model)} tire size information, exact-size tire pages, retailer paths, and trim fitment notes.`;
}

export function titleForBrand(name = "") {
  return `${name} Tires: Popular Models, Sizes & Buying Guide`;
}

export function descriptionForBrand(name = "") {
  return `Compare ${name} tire models, common sizes, use cases, retailer paths, and fitment notes before buying.`;
}

export function titleForGuide(title = "") {
  return `${title}: Practical Tire Guide`;
}

export function descriptionForGuide(title = "") {
  return `Read a practical guide to ${String(title).toLowerCase()}, including tire size checks, fitment warnings, comparison steps, and next pages to review.`;
}

export function robotsForPage({ products = [], hasInternalLinks = true, allowWithoutProducts = false } = {}) {
  const index = Boolean((allowWithoutProducts || products.length) && hasInternalLinks);
  return index ? { index: true, follow: true } : { index: false, follow: true };
}

export function canonicalTirePath(size = "", intent = "") {
  const slug = sizeToSlug(size);
  return intent ? `/tires/${slug}/${intent}` : `/tires/${slug}`;
}

export function readableSizeFromSlug(slug = "") {
  return slugToSize(slug);
}
