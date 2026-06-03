import { isCommercialTireSize } from "./getRelatedSizes.js";
import { humanizeCopy } from "./humanizeCopy.js";
import { robotsFromQuality, scorePageQuality } from "./pageQuality.js";
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
  "highway": "Highway",
  "performance": "Performance",
  "regional-haul": "Regional Haul",
  "long-haul": "Long Haul",
  "mixed-service": "Mixed Service"
};

export const sitemapIntents = Object.keys(tireIntentLabels);

export function titleForTireSize(size = "") {
  const commercial = isCommercialTireSize(size);
  return humanizeCopy(commercial
    ? `${size} Truck Tires: Steer, Drive & Fleet Tire Options`
    : `${size} Tires: Compare Brands, Prices & Retailer Options`);
}

export function descriptionForTireSize(size = "") {
  const commercial = isCommercialTireSize(size);
  return humanizeCopy(commercial
    ? `Compare ${size} commercial truck tire options by steer, drive, trailer, haul type, retailer availability, and fitment notes before buying.`
    : `Compare ${size} tire options, retailer availability, common vehicle applications, and fitment notes before buying.`);
}

export function labelForIntent(intent = "") {
  return tireIntentLabels[intent] || String(intent || "").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function titleForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent);
  if (isCommercialTireSize(size) || ["steer", "drive", "trailer"].includes(intent)) {
    return humanizeCopy(`${label} ${size} Truck Tires: Compare Commercial Tire Options`);
  }
  return humanizeCopy(`${label} ${size} Tires: Compare Brands, Prices & Retailer Options`);
}

export function descriptionForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent).toLowerCase();
  if (intent === "price") {
    return humanizeCopy(`Compare ${size} tire price paths, retailer availability, installation options, and fitment notes before buying.`);
  }
  if (intent === "comparison") {
    return humanizeCopy(`Compare ${size} tire categories, common brands, retailer paths, and fitment notes without mixing unrelated tire sizes.`);
  }
  if (isCommercialTireSize(size) || ["steer", "drive", "trailer"].includes(intent)) {
    return humanizeCopy(`Compare ${label} ${size} commercial truck tire options by axle position, load range, haul type, and supplier availability.`);
  }
  return humanizeCopy(`Compare ${label} ${size} tire options, common applications, retailer availability, and fitment notes before buying.`);
}

export function introForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent).toLowerCase();
  if (isCommercialTireSize(size) || ["steer", "drive", "trailer", "regional-haul", "long-haul", "mixed-service"].includes(intent)) {
    return humanizeCopy(`${size} ${label} truck tire pages should separate axle position, haul type, load range, casing value, and retailer availability so fleets can compare options without mixing passenger tire results.`);
  }
  return humanizeCopy(`${size} ${label} tire pages should keep exact-size matches first, identify common vehicle use, separate related sizes, and send shoppers to retailer pages where fitment, load rating, speed rating, and current price can be confirmed.`);
}

export function faqsForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent).toLowerCase();
  return [
    {
      question: `What makes a ${label} ${size} tire page useful?`,
      answer: "The page should keep exact-size results separate, show retailer paths, explain the use case, and remind shoppers to confirm fitment before buying."
    },
    {
      question: `Are related sizes a direct replacement for ${size}?`,
      answer: "No. Related sizes are research links only. Confirm the exact tire size, load range, speed rating, and fitment with the placard, sidewall, retailer, or installer."
    }
  ];
}

export function titleForVehicleModel(make = "", model = "") {
  return humanizeCopy(`${vehicleDisplayName(make)} ${vehicleDisplayName(model)} Tires: Common Sizes, Years & Retailer Options`);
}

export function descriptionForVehicleModel(make = "", model = "") {
  return humanizeCopy(`Compare ${vehicleDisplayName(make)} ${vehicleDisplayName(model)} tire sizes by year, exact-size tire pages, retailer paths, and fitment notes before buying.`);
}

export function titleForVehicleYear(fitment) {
  return humanizeCopy(`${fitment.year} ${vehicleDisplayName(fitment.make)} ${vehicleDisplayName(fitment.model)} Tires: OEM Sizes, Fitment & Replacement Options`);
}

export function descriptionForVehicleYear(fitment) {
  return humanizeCopy(`Compare ${fitment.year} ${vehicleDisplayName(fitment.make)} ${vehicleDisplayName(fitment.model)} tire size information, exact-size tire pages, retailer paths, and trim fitment notes.`);
}

export function titleForBrand(name = "") {
  return humanizeCopy(`${name} Tires: Popular Models, Sizes & Buying Guide`);
}

export function descriptionForBrand(name = "") {
  return humanizeCopy(`Compare ${name} tire models, common sizes, use cases, retailer paths, and fitment notes before buying.`);
}

export function titleForGuide(title = "") {
  return humanizeCopy(`${title}: Practical Tire Guide`);
}

export function descriptionForGuide(title = "") {
  return humanizeCopy(`Read a practical guide to ${String(title).toLowerCase()}, including tire size checks, fitment warnings, comparison steps, and next pages to review.`);
}

export function robotsForPage({ products = [], hasInternalLinks = true, allowWithoutProducts = false } = {}) {
  return robotsFromQuality(scorePageQuality({
    intro: "Compare exact tire size, retailer paths, fitment checks, FAQ, schema, and internal links before buying.",
    faqs: [{}, {}],
    schemaTypes: ["BreadcrumbList"],
    internalLinks: hasInternalLinks ? { default: [{ href: "/tires" }, { href: "/vehicles" }, { href: "/brands" }, { href: "/tire-university" }] } : {},
    products,
    canonical: "/",
    images: products.length ? [{}] : [],
    allowWithoutProducts
  }));
}

export function canonicalTirePath(size = "", intent = "") {
  const slug = sizeToSlug(size);
  return intent ? `/tires/${slug}/${intent}` : `/tires/${slug}`;
}

export function readableSizeFromSlug(slug = "") {
  return slugToSize(slug);
}
