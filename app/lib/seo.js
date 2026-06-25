import { isCommercialTireSize } from "./getRelatedSizes.js";
import { humanizeCopy } from "./humanizeCopy.js";
import { robotsFromQuality, scorePageQuality } from "./pageQuality.js";
import { sizeToSlug, slugToSize } from "./tireData.js";
import { vehicleDisplayName } from "./vehicleNames.js";

export const tireIntentLabels = {
  "best": "Best",
  "cheap": "Cheap",
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
    ? `${size} Commercial Truck Tires | Steer, Drive & Fleet Prices`
    : `${size} Tires | Compare Prices, Brands & Tire Rack Options`);
}

export function descriptionForTireSize(size = "") {
  const commercial = isCommercialTireSize(size);
  return humanizeCopy(commercial
    ? `Compare ${size} commercial truck tire paths for steer, drive, trailer, fleet replacement, quotes, and retailer availability before buying.`
    : `Compare ${size} tire prices, Tire Rack options, installed paths, common vehicles, brands, and fitment notes before checkout.`);
}

export function labelForIntent(intent = "") {
  return tireIntentLabels[intent] || String(intent || "").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function titleForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent);
  if (isCommercialTireSize(size) || ["steer", "drive", "trailer"].includes(intent)) {
    return humanizeCopy(`${label} ${size} Truck Tires | Prices, Quotes & Fleet Options`);
  }
  return humanizeCopy(`${label} ${size} Tires | Compare Prices, Deals & Retailers`);
}

export function descriptionForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent).toLowerCase();
  if (intent === "price") {
    return humanizeCopy(`Compare ${size} tire prices, Tire Rack links, installed options, online retailers, and fitment checks before buying.`);
  }
  if (intent === "comparison") {
    return humanizeCopy(`Compare ${size} tire categories, common brands, retailer paths, and fitment notes without mixing unrelated tire sizes.`);
  }
  if (isCommercialTireSize(size) || ["steer", "drive", "trailer"].includes(intent)) {
    return humanizeCopy(`Compare ${label} ${size} commercial truck tires by axle position, load range, haul type, quote path, and supplier availability.`);
  }
  return humanizeCopy(`Compare ${label} ${size} tire prices, brands, Tire Rack paths, installed options, and fitment notes before buying.`);
}

export function introForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent).toLowerCase();
  if (isCommercialTireSize(size) || ["steer", "drive", "trailer", "regional-haul", "long-haul", "mixed-service"].includes(intent)) {
    return humanizeCopy(`Compare ${size} ${label} truck tire paths by axle position, haul type, load range, casing value, quote options, and retailer availability without mixing passenger tire results.`);
  }
  return humanizeCopy(`Compare exact-size ${size} ${label} tire matches first, then review Tire Rack prices, installed options, related sizes, and fitment checks before checkout.`);
}

export function faqsForTireIntent(size = "", intent = "") {
  const label = labelForIntent(intent).toLowerCase();
  const commercial = isCommercialTireSize(size) || ["steer", "drive", "trailer", "regional-haul", "long-haul", "mixed-service"].includes(intent);
  const baseFaqs = [
    {
      question: `What makes a ${label} ${size} tire page useful?`,
      answer: "The page should keep exact-size results separate, show retailer paths, explain the use case, and remind shoppers to confirm fitment before buying."
    },
    {
      question: `Are related sizes a direct replacement for ${size}?`,
      answer: "No. Related sizes are research links only. Confirm the exact tire size, load range, speed rating, and fitment with the placard, sidewall, retailer, or installer."
    }
  ];

  if (commercial) {
    return [
      {
        question: `What should I compare on ${size} ${label} tire options?`,
        answer: "Compare axle position, load range, application, casing value, expected mileage, retread policy, roadside availability, and current supplier pricing before ordering."
      },
      {
        question: `Can ${size} steer, drive, and trailer tires be mixed?`,
        answer: "Do not treat axle positions as interchangeable. Steer, drive, and trailer tires are built for different wear, traction, and handling needs, so confirm the correct position before purchase."
      },
      {
        question: `Are ${size} commercial tire prices final on this page?`,
        answer: "No. Commercial tire pricing can change by region, casing credit, installation, freight, tax, and fleet terms. Use the retailer or quote path to confirm the current total."
      },
      {
        question: `What matters most for highway steer tires?`,
        answer: "Highway steer tire shoppers should prioritize stability, even shoulder wear, casing quality, load rating, speed rating, and the correct commercial application for the route."
      },
      ...baseFaqs
    ];
  }

  if (intent === "winter" || intent === "all-weather") {
    return [
      {
        question: `What should I compare on ${size} ${label} tires?`,
        answer: "Compare cold-weather traction, wet braking, road noise, tread life, speed rating, load rating, and whether the tire is a true winter tire, all-weather tire, or all-season tire."
      },
      {
        question: `Are ${label} tires the same as all-season tires?`,
        answer: "No. Winter tires focus on snow, ice, and cold temperatures. All-weather tires may carry severe-snow ratings while remaining usable year-round. All-season tires are usually less focused on deep winter traction."
      },
      {
        question: `Should I buy four ${size} winter tires?`,
        answer: "Most vehicles should use a matched set of four winter tires for balanced braking, steering, and stability. Confirm the recommendation for your vehicle and local conditions."
      },
      ...baseFaqs
    ];
  }

  if (intent === "summer" || intent === "performance") {
    return [
      {
        question: `What should I compare on ${size} ${label} tires?`,
        answer: "Compare warm-weather grip, wet-road braking, steering response, ride comfort, treadwear, speed rating, and whether the tire fits your exact wheel and vehicle package."
      },
      {
        question: `Can ${label} tires be used in winter?`,
        answer: "Summer and many performance tires are not intended for snow, ice, or freezing temperatures. Use a winter or all-weather tire when cold-weather traction is the priority."
      },
      ...baseFaqs
    ];
  }

  if (intent === "ev") {
    return [
      {
        question: `What should I compare on ${size} EV tires?`,
        answer: "Compare load rating, road noise, range impact, rolling resistance, tread life, rim protection, and whether the retailer confirms fitment for the exact EV trim."
      },
      {
        question: `Do EVs need special ${size} tires?`,
        answer: "Many EVs benefit from tires built for extra vehicle weight, quiet ride, and low rolling resistance, but the exact requirement depends on trim, wheel package, and manufacturer fitment."
      },
      ...baseFaqs
    ];
  }

  return baseFaqs;
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
