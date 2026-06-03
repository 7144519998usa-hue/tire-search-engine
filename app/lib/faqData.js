import { brandsAvailableForSize, tireCategoryLinksForSize, vehiclesUsingSize } from "./entityCoverage.js";
import { sizeToSlug } from "./tireData.js";
import { vehicleDisplayName } from "./vehicleNames.js";

export function tireSizeFaqs(size = "", relatedSizes = []) {
  const vehicles = vehiclesUsingSize(size, 4).map((item) => item.label.replace(/^\d{4}\s+/, ""));
  const brands = brandsAvailableForSize(size, 4).map((item) => item.label.replace(" tires", ""));
  const categories = tireCategoryLinksForSize(size, 4).map((item) => item.label.replace(` ${size} tires`, ""));
  const related = relatedSizes[0]?.size || relatedSizes[0]?.label?.replace(" tires", "");

  return [
    {
      question: `What vehicles commonly use ${size} tires?`,
      answer: vehicles.length ? `${size} is commonly researched for vehicles such as ${[...new Set(vehicles)].join(", ")}. Always confirm the door placard because trim and wheel packages can change tire size.` : `${size} can appear on multiple trims and vehicle types. Confirm the driver-side door placard or retailer fitment tool before buying.`
    },
    {
      question: `What brands make ${size} tires?`,
      answer: brands.length ? `Common ${size} brand paths include ${brands.join(", ")}. Availability changes by retailer, model, load rating, and speed rating.` : `Brand availability depends on retailer inventory, model family, load rating, and speed rating. Start with exact-size results before comparing brands.`
    },
    {
      question: `What tire categories are available in ${size}?`,
      answer: categories.length ? `${size} tire searches commonly include ${categories.join(", ")} categories. Match the category to climate, vehicle use, mileage needs, and ride preference.` : `Common categories include all-season, all-weather, touring, winter, highway, and all-terrain depending on the tire size and vehicle use.`
    },
    {
      question: related ? `Can I replace ${size} with ${related}?` : `Can I use a different size instead of ${size}?`,
      answer: "Only use a different size if a qualified installer or retailer fitment tool confirms it. Diameter, load rating, speed rating, clearance, and vehicle systems can all be affected."
    },
    {
      question: `Are ${size} tires expensive?`,
      answer: `${size} tire pricing depends on brand, category, warranty, speed rating, load rating, installation, shipping, and current retailer availability. Compare retailer checkout pages before deciding.`
    },
    {
      question: `What should I check before buying ${size} tires?`,
      answer: "Confirm exact size, load rating, speed rating, tire category, installation availability, shipping, return policy, and whether the retailer fitment tool matches your vehicle."
    }
  ];
}

export function vehicleFaqs(fitment) {
  const label = `${fitment.year ? `${fitment.year} ` : ""}${vehicleDisplayName(fitment.make)} ${vehicleDisplayName(fitment.model)}`.trim();
  return [
    {
      question: `What tire size does a ${label} use?`,
      answer: `${fitment.size} is a common listed size for this page, but trim, wheel diameter, and packages can vary. Confirm the vehicle placard before ordering.`
    },
    {
      question: `Where should I start when replacing ${label} tires?`,
      answer: `Start with the exact-size page at /tires/${sizeToSlug(fitment.size)}, then compare tire category, load rating, speed rating, installation, and retailer availability.`
    },
    {
      question: `Can ${vehicleDisplayName(fitment.model)} tire size vary by trim?`,
      answer: "Yes. Sport, touring, hybrid, off-road, towing, and upgraded wheel packages can use different tire sizes."
    },
    {
      question: `What tire category works for a ${vehicleDisplayName(fitment.model)}?`,
      answer: "Most shoppers compare all-season, all-weather, touring, highway, winter, or all-terrain tires depending on climate, ride comfort, and vehicle use."
    },
    {
      question: "What should I confirm before checkout?",
      answer: "Confirm size, load rating, speed rating, wheel package, installation availability, shipping, road-hazard terms, and current retailer price."
    }
  ];
}

export function brandFaqs(name = "") {
  return [
    {
      question: `How should I compare ${name} tires?`,
      answer: `Start with exact tire size, then compare ${name} models by category, load rating, speed rating, installation options, retailer availability, and current price.`
    },
    {
      question: `Can I buy ${name} tires by brand alone?`,
      answer: "No. Brand is only one part of the decision. Confirm size, vehicle fitment, load rating, speed rating, and retailer inventory before purchase."
    },
    {
      question: `Are ${name} tires available in every size?`,
      answer: `${name} availability varies by tire line, size, category, and retailer. Use exact-size pages before relying on brand preference.`
    },
    {
      question: `Where can I compare ${name} tire prices?`,
      answer: "Use retailer paths on the exact-size page, then confirm installation, shipping, rebates, and fitment at checkout."
    },
    {
      question: `What matters besides the ${name} brand name?`,
      answer: "Category, tread pattern, load rating, speed rating, warranty terms, road noise, wet traction, snow rating, and installation access all matter."
    }
  ];
}
