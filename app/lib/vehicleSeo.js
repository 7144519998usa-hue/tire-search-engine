import { featuredBrandPages, featuredSizes, seoGuides, sizeToSlug } from "./siteData";

export const featuredVehicles = [
  {
    make: "toyota",
    model: "camry",
    year: "2024",
    displayName: "2024 Toyota Camry",
    summary:
      "A high-volume sedan fitment page for all-season tire shoppers comparing comfort, quiet ride quality, and daily-driver value.",
    tireSizes: ["205/55R16"],
    brandSlugs: ["michelin", "goodyear"],
    guideSlugs: ["best-all-season-tires"],
  },
  {
    make: "honda",
    model: "civic",
    year: "2024",
    displayName: "2024 Honda Civic",
    summary:
      "One of the strongest consumer-intent compact car pages for shoppers looking at popular all-season replacements.",
    tireSizes: ["205/55R16"],
    brandSlugs: ["michelin", "goodyear"],
    guideSlugs: ["best-all-season-tires"],
  },
  {
    make: "toyota",
    model: "rav4",
    year: "2024",
    displayName: "2024 Toyota RAV4",
    summary:
      "A strong SUV fitment page built around family crossover drivers comparing comfort, wet traction, and value.",
    tireSizes: ["225/65R17"],
    brandSlugs: ["michelin", "goodyear", "pirelli"],
    guideSlugs: ["best-suv-tires"],
  },
  {
    make: "honda",
    model: "cr-v",
    year: "2024",
    displayName: "2024 Honda CR-V",
    summary:
      "A useful crossover landing page for drivers comparing popular SUV tire brands and commuter-friendly all-season choices.",
    tireSizes: ["225/65R17"],
    brandSlugs: ["michelin", "goodyear"],
    guideSlugs: ["best-suv-tires"],
  },
  {
    make: "ford",
    model: "f-150",
    year: "2024",
    displayName: "2024 Ford F-150",
    summary:
      "A high-intent truck page for buyers comparing all-terrain, highway, and budget-friendly replacement tires.",
    tireSizes: ["275/55R20", "245/75R16"],
    brandSlugs: ["bfgoodrich", "goodyear", "michelin"],
    guideSlugs: ["cheap-truck-tires", "premium-20-inch-tires"],
  },
  {
    make: "chevrolet",
    model: "silverado-1500",
    year: "2024",
    displayName: "2024 Chevrolet Silverado 1500",
    summary:
      "A truck-focused fitment page with strong commercial intent around towing, highway comfort, and all-terrain options.",
    tireSizes: ["275/55R20", "245/75R16"],
    brandSlugs: ["bfgoodrich", "goodyear"],
    guideSlugs: ["cheap-truck-tires", "premium-20-inch-tires"],
  },
  {
    make: "jeep",
    model: "wrangler",
    year: "2024",
    displayName: "2024 Jeep Wrangler",
    summary:
      "A durable, off-road-oriented vehicle page for shoppers comparing all-terrain and adventure-ready tire setups.",
    tireSizes: ["245/75R16"],
    brandSlugs: ["bfgoodrich"],
    guideSlugs: ["cheap-truck-tires"],
  },
  {
    make: "bmw",
    model: "x5",
    year: "2024",
    displayName: "2024 BMW X5",
    summary:
      "A premium SUV fitment page for buyers comparing larger premium-brand tire options and supplier price gaps.",
    tireSizes: ["275/55R20"],
    brandSlugs: ["pirelli", "michelin"],
    guideSlugs: ["premium-20-inch-tires", "best-suv-tires"],
  },
  {
    make: "toyota",
    model: "corolla",
    year: "2024",
    displayName: "2024 Toyota Corolla",
    summary:
      "A high-volume compact-car fitment page aimed at drivers comparing affordable all-season replacements and trusted commuter brands.",
    tireSizes: ["205/55R16", "215/60R16"],
    brandSlugs: ["michelin", "goodyear", "bridgestone", "firestone"],
    guideSlugs: ["best-all-season-tires"],
  },
  {
    make: "nissan",
    model: "rogue",
    year: "2024",
    displayName: "2024 Nissan Rogue",
    summary:
      "A popular crossover fitment page for family-oriented shoppers comparing comfort, tread life, and mainstream SUV tire brands.",
    tireSizes: ["225/65R17", "235/65R17"],
    brandSlugs: ["michelin", "goodyear", "bridgestone", "continental"],
    guideSlugs: ["best-suv-tires"],
  },
  {
    make: "subaru",
    model: "outback",
    year: "2024",
    displayName: "2024 Subaru Outback",
    summary:
      "A crossover and adventure-vehicle page for shoppers balancing highway comfort with all-weather and light trail capability.",
    tireSizes: ["225/65R17", "235/65R17"],
    brandSlugs: ["goodyear", "bridgestone", "continental", "cooper"],
    guideSlugs: ["best-suv-tires"],
  },
  {
    make: "ram",
    model: "1500",
    year: "2024",
    displayName: "2024 Ram 1500",
    summary:
      "A high-intent truck page for buyers comparing highway truck tires, towing-ready options, and value-oriented all-terrain choices.",
    tireSizes: ["275/55R20", "265/70R17"],
    brandSlugs: ["bfgoodrich", "goodyear", "cooper", "firestone"],
    guideSlugs: ["cheap-truck-tires", "premium-20-inch-tires"],
  },
  {
    make: "toyota",
    model: "tacoma",
    year: "2024",
    displayName: "2024 Toyota Tacoma",
    summary:
      "A truck fitment page targeting buyers comparing dependable all-terrain and highway-friendly options for midsize pickups.",
    tireSizes: ["265/70R17", "245/75R16"],
    brandSlugs: ["bfgoodrich", "cooper", "goodyear"],
    guideSlugs: ["cheap-truck-tires"],
  },
  {
    make: "tesla",
    model: "model-3",
    year: "2024",
    displayName: "2024 Tesla Model 3",
    summary:
      "A premium commuter page focused on low-noise, efficient, and comfort-oriented tire comparisons for EV-minded shoppers.",
    tireSizes: ["235/45R18"],
    brandSlugs: ["michelin", "continental", "pirelli"],
    guideSlugs: ["best-all-season-tires", "premium-20-inch-tires"],
  },
];

export function getVehiclePageData(make, model, year) {
  const vehicle = featuredVehicles.find(
    (item) => item.make === make && item.model === model && item.year === year
  );

  if (!vehicle) {
    return null;
  }

  return {
    ...vehicle,
    sizes: featuredSizes.filter((size) => vehicle.tireSizes.includes(size.size)),
    brands: featuredBrandPages.filter((brand) => vehicle.brandSlugs.includes(brand.slug)),
    guides: seoGuides.filter((guide) => vehicle.guideSlugs.includes(guide.slug)),
  };
}

export function getVehicleCompareLinks(vehicle) {
  return vehicle.brands.flatMap((brand) =>
    vehicle.sizes.map((size) => ({
      href: `/compare/${brand.slug}/${sizeToSlug(size.size)}`,
      label: `${brand.name} ${size.size} tires`,
    }))
  );
}
