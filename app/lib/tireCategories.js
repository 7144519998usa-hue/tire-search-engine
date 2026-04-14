import {
  featuredBrandPages,
  featuredSizes,
  seoGuides,
  sizeToSlug,
} from "./siteData";
import { featuredVehicles } from "./vehicleSeo";

export const tireCategories = [
  {
    slug: "car",
    shortLabel: "Car",
    title: "Car Tires",
    heroTitle: "Car tires for commuters, sedans, hatchbacks, and daily drivers.",
    description:
      "Browse car tires by exact size, brand, and tire type for everyday commuting, ride comfort, and long tread life.",
    intro:
      "This hub targets US car-tire shoppers who usually start with exact size, then compare mainstream and premium replacement options.",
    sizeValues: ["205/55R16", "215/60R16", "235/45R18"],
    brandSlugs: ["michelin", "goodyear", "bridgestone", "continental", "firestone"],
    guideSlugs: ["best-all-season-tires"],
    vehicleKeys: ["toyota/camry/2024", "honda/civic/2024", "toyota/corolla/2024", "tesla/model-3/2024"],
  },
  {
    slug: "suv-4x4",
    shortLabel: "SUV / 4x4",
    title: "SUV & 4x4 Tires",
    heroTitle: "SUV and 4x4 tires for crossovers, family SUVs, and larger utility vehicles.",
    description:
      "Compare SUV and 4x4 tires across the sizes, brands, and categories US drivers search most for daily use and long-distance comfort.",
    intro:
      "This category sits between broad SUV shopping intent and exact-size comparison pages for high-volume crossover and 4x4 replacement demand.",
    sizeValues: ["225/65R17", "235/65R17", "275/55R20"],
    brandSlugs: ["michelin", "goodyear", "bridgestone", "continental", "pirelli"],
    guideSlugs: ["best-suv-tires", "premium-20-inch-tires"],
    vehicleKeys: ["toyota/rav4/2024", "honda/cr-v/2024", "nissan/rogue/2024", "subaru/outback/2024", "bmw/x5/2024"],
  },
  {
    slug: "truck",
    shortLabel: "Truck",
    title: "Truck Tires",
    heroTitle: "Truck tires for pickups, towing, highway use, and all-terrain driving.",
    description:
      "Explore truck tires by exact fitment, category, and brand for pickups, work trucks, and off-road builds in the US market.",
    intro:
      "Truck tire demand often splits between all-terrain, highway, and premium larger-wheel fitments, which makes this a high-value hub for internal linking.",
    sizeValues: ["245/75R16", "265/70R17", "275/55R20", "275/70R18"],
    brandSlugs: ["bfgoodrich", "goodyear", "michelin", "cooper", "firestone"],
    guideSlugs: ["cheap-truck-tires", "premium-20-inch-tires"],
    vehicleKeys: ["ford/f-150/2024", "chevrolet/silverado-1500/2024", "ram/1500/2024", "toyota/tacoma/2024", "jeep/wrangler/2024"],
  },
  {
    slug: "van",
    shortLabel: "Van",
    title: "Van Tires",
    heroTitle: "Van tires for cargo vans, work vans, and heavy-duty daily use.",
    description:
      "Compare van-tire shopping paths with an emphasis on durability, load support, and reliable all-season replacement options.",
    intro:
      "This hub gives TireSearchEngine a dedicated path for van-intent traffic even before a larger van fitment dataset is added.",
    sizeValues: ["215/60R16", "235/65R17"],
    brandSlugs: ["goodyear", "firestone", "bridgestone"],
    guideSlugs: ["best-all-season-tires"],
    vehicleKeys: [],
  },
  {
    slug: "winter",
    shortLabel: "Winter",
    title: "Winter Tires",
    heroTitle: "Winter tires for cold-weather grip, snow traction, and seasonal safety.",
    description:
      "Shop winter tire paths by size and category to support seasonal replacement demand and future cold-weather pSEO expansion.",
    intro:
      "Winter tire hubs should stay crawlable and structured now so they can scale as seasonal inventory and merchant coverage improve.",
    sizeValues: ["205/55R16", "225/65R17", "235/45R18"],
    brandSlugs: ["michelin", "goodyear", "bridgestone", "continental"],
    guideSlugs: ["best-all-season-tires", "best-suv-tires"],
    vehicleKeys: ["toyota/rav4/2024", "subaru/outback/2024", "honda/civic/2024"],
  },
  {
    slug: "summer",
    shortLabel: "Summer",
    title: "Summer Tires",
    heroTitle: "Summer tires for warm-weather grip, handling, and dry-road confidence.",
    description:
      "Browse summer tire hubs for performance-minded US drivers comparing exact sizes, brands, and premium fitments.",
    intro:
      "Summer tire demand maps especially well to premium sedan and SUV fitments where handling and dry-road performance matter most.",
    sizeValues: ["235/45R18", "275/55R20"],
    brandSlugs: ["michelin", "pirelli", "continental"],
    guideSlugs: ["premium-20-inch-tires"],
    vehicleKeys: ["tesla/model-3/2024", "bmw/x5/2024"],
  },
  {
    slug: "all-season",
    shortLabel: "All-Season",
    title: "All-Season Tires",
    heroTitle: "All-season tires for year-round comfort, value, and everyday US driving.",
    description:
      "Browse all-season tires across top sizes, trusted brands, and vehicle fitments to find the right replacement path faster.",
    intro:
      "All-season is one of the strongest commercial tire categories in the US and should sit near the top of the site architecture.",
    sizeValues: ["205/55R16", "215/60R16", "225/65R17", "235/65R17"],
    brandSlugs: ["michelin", "goodyear", "bridgestone", "continental", "firestone"],
    guideSlugs: ["best-all-season-tires", "best-suv-tires"],
    vehicleKeys: ["toyota/camry/2024", "honda/civic/2024", "toyota/rav4/2024", "nissan/rogue/2024"],
  },
  {
    slug: "all-terrain",
    shortLabel: "All-Terrain",
    title: "All-Terrain Tires",
    heroTitle: "All-terrain tires for trucks, SUVs, off-road builds, and mixed-use driving.",
    description:
      "Compare all-terrain tire pages built around trucks, SUVs, and utility vehicles where traction and durability lead the buying decision.",
    intro:
      "All-terrain pages are a major truck and SUV opportunity for both affiliate clicks and deeper size-plus-category search coverage.",
    sizeValues: ["245/75R16", "265/70R17", "275/70R18"],
    brandSlugs: ["bfgoodrich", "goodyear", "cooper"],
    guideSlugs: ["cheap-truck-tires"],
    vehicleKeys: ["ford/f-150/2024", "toyota/tacoma/2024", "jeep/wrangler/2024", "ram/1500/2024"],
  },
  {
    slug: "highway-terrain",
    shortLabel: "Highway-Terrain",
    title: "Highway-Terrain Tires",
    heroTitle: "Highway-terrain tires for trucks and SUVs focused on road comfort and mileage.",
    description:
      "Shop highway-terrain truck and SUV tires for smoother road manners, towing stability, and everyday durability.",
    intro:
      "Highway-terrain pages support truck and SUV shoppers who want practical road comfort instead of aggressive off-road tread.",
    sizeValues: ["265/70R17", "275/55R20", "275/70R18"],
    brandSlugs: ["michelin", "goodyear", "firestone"],
    guideSlugs: ["cheap-truck-tires", "premium-20-inch-tires"],
    vehicleKeys: ["ford/f-150/2024", "chevrolet/silverado-1500/2024", "ram/1500/2024"],
  },
  {
    slug: "mud-terrain",
    shortLabel: "Mud-Terrain",
    title: "Mud-Terrain Tires",
    heroTitle: "Mud-terrain tires for aggressive off-road traction and dedicated trail use.",
    description:
      "Browse mud-terrain tire paths for US off-road shoppers looking at aggressive tread, durability, and truck/SUV fitments.",
    intro:
      "Mud-terrain pages should stay in the public taxonomy so the site can scale later as more off-road inventory is added.",
    sizeValues: ["245/75R16", "265/70R17", "275/70R18"],
    brandSlugs: ["bfgoodrich", "cooper"],
    guideSlugs: ["cheap-truck-tires"],
    vehicleKeys: ["jeep/wrangler/2024", "toyota/tacoma/2024"],
  },
  {
    slug: "run-flat",
    shortLabel: "Run-Flat",
    title: "Run-Flat Tires",
    heroTitle: "Run-flat tires for drivers who need added mobility after a puncture.",
    description:
      "Explore run-flat tire shopping paths for performance, premium, and safety-focused replacement searches.",
    intro:
      "Run-flat pages give the site a strong premium-intent branch for future expansion into more specialized tire product pages.",
    sizeValues: ["235/45R18", "275/55R20"],
    brandSlugs: ["michelin", "pirelli", "continental"],
    guideSlugs: ["premium-20-inch-tires"],
    vehicleKeys: ["bmw/x5/2024", "tesla/model-3/2024"],
  },
];

export function getTireCategoryBySlug(slug) {
  const category = tireCategories.find((item) => item.slug === slug);

  if (!category) {
    return null;
  }

  return {
    ...category,
    sizes: featuredSizes.filter((size) => category.sizeValues.includes(size.size)),
    brands: featuredBrandPages.filter((brand) => category.brandSlugs.includes(brand.slug)),
    guides: seoGuides.filter((guide) => category.guideSlugs.includes(guide.slug)),
    vehicles: featuredVehicles.filter((vehicle) =>
      category.vehicleKeys.includes(`${vehicle.make}/${vehicle.model}/${vehicle.year}`)
    ),
  };
}

export function isTireCategorySlug(slug) {
  return tireCategories.some((item) => item.slug === slug);
}

export function getCategorySizeCombos() {
  return tireCategories.flatMap((category) =>
    category.sizeValues.map((size) => ({
      categorySlug: category.slug,
      sizeSlug: sizeToSlug(size),
    }))
  );
}
