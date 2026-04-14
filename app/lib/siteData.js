import { publicEnv } from "./env";

export const siteUrl = publicEnv.siteUrl;

export const featuredSizes = [
  {
    size: "205/55R16",
    title: "205/55R16 tires",
    vehicleFit: "Common on compact sedans, hatchbacks, and commuter cars.",
    summary:
      "One of the most searched replacement tire sizes for everyday drivers who want dependable all-season performance at the best price.",
  },
  {
    size: "225/65R17",
    title: "225/65R17 tires",
    vehicleFit: "Popular on crossovers and family SUVs.",
    summary:
      "A top crossover and SUV tire size where shoppers often compare comfort, tread life, wet traction, and value.",
  },
  {
    size: "245/75R16",
    title: "245/75R16 tires",
    vehicleFit: "Frequently used on trucks, body-on-frame SUVs, and light off-road builds.",
    summary:
      "A popular truck and SUV size for shoppers looking at rugged all-terrain options, highway comfort, and long mileage.",
  },
  {
    size: "275/55R20",
    title: "275/55R20 tires",
    vehicleFit: "Found on premium SUVs and full-size trucks.",
    summary:
      "A high-demand size for premium SUVs and trucks where buyers usually compare top brands, ride quality, and price.",
  },
  {
    size: "275/70R18",
    title: "275/70R18 tires",
    vehicleFit: "Common on trucks, larger SUVs, and off-road-oriented replacement setups.",
    summary:
      "A truck and SUV size where shoppers often compare all-terrain traction, towing confidence, and rugged everyday value.",
  },
  {
    size: "215/60R16",
    title: "215/60R16 tires",
    vehicleFit: "Common on midsize sedans, compact crossovers, and practical daily drivers.",
    summary:
      "A strong commuter-focused tire size where shoppers often compare all-season value, road noise, and tread life.",
  },
  {
    size: "235/65R17",
    title: "235/65R17 tires",
    vehicleFit: "Popular on larger crossovers and midsize SUVs.",
    summary:
      "A high-volume SUV fitment where buyers compare comfort, wet traction, and family-friendly touring performance.",
  },
  {
    size: "265/70R17",
    title: "265/70R17 tires",
    vehicleFit: "Frequently used on trucks, off-road SUVs, and body-on-frame platforms.",
    summary:
      "A popular truck and SUV size for all-terrain, highway, and towing-focused tire comparisons.",
  },
  {
    size: "235/45R18",
    title: "235/45R18 tires",
    vehicleFit: "Common on sport sedans, premium cars, and performance-oriented fitments.",
    summary:
      "A high-intent size for drivers balancing handling, ride comfort, and premium-brand choices.",
  },
];

export const topBrands = [
  {
    name: "Michelin",
    pitch: "Premium touring and all-season tires known for ride comfort and long tread life.",
  },
  {
    name: "Goodyear",
    pitch: "Popular across commuter, SUV, and truck categories with strong all-season coverage.",
  },
  {
    name: "Bridgestone",
    pitch: "A trusted choice for balanced wet traction, comfort, and year-round performance.",
  },
  {
    name: "Continental",
    pitch: "Often favored by drivers shopping for quiet highway manners and confident handling.",
  },
  {
    name: "Pirelli",
    pitch: "Well known for premium SUV, luxury, and performance-focused tire lines.",
  },
  {
    name: "BFGoodrich",
    pitch: "A frequent pick for truck, SUV, and all-terrain shoppers chasing durability and traction.",
  },
  {
    name: "Cooper",
    pitch: "A value-conscious brand often compared by truck, SUV, and everyday all-season shoppers.",
  },
  {
    name: "Firestone",
    pitch: "Well known for practical replacement tires across sedans, crossovers, and work-oriented vehicles.",
  },
];

export const featuredBrandPages = [
  {
    slug: "michelin",
    name: "Michelin",
    headline: "Michelin tires for drivers who want premium comfort and long tread life.",
    description:
      "Michelin is one of the most searched tire brands for commuters, families, and premium vehicle owners comparing quiet ride quality, wet traction, and mileage.",
    bestFor: ["All-season comfort", "Long tread life", "Premium sedans and SUVs"],
    searchHref: "/search?size=205/55R16",
  },
  {
    slug: "goodyear",
    name: "Goodyear",
    headline: "Goodyear tires for everyday drivers, SUVs, and truck owners.",
    description:
      "Goodyear is a high-volume tire brand across commuter, crossover, SUV, and truck segments, making it a strong comparison target for value and broad availability.",
    bestFor: ["Everyday all-season driving", "SUV fitments", "Broad retailer availability"],
    searchHref: "/search?size=225/65R17",
  },
  {
    slug: "bfgoodrich",
    name: "BFGoodrich",
    headline: "BFGoodrich tires for truck, SUV, and all-terrain shoppers.",
    description:
      "BFGoodrich is a go-to brand for drivers comparing all-terrain grip, durability, and off-road credibility without giving up daily usability.",
    bestFor: ["All-terrain builds", "Truck traction", "SUV adventure setups"],
    searchHref: "/search?size=245/75R16",
  },
  {
    slug: "pirelli",
    name: "Pirelli",
    headline: "Pirelli tires for premium SUVs, luxury vehicles, and performance-minded drivers.",
    description:
      "Pirelli often shows up in searches from shoppers comparing premium ride feel, handling, and name-brand prestige in larger tire sizes.",
    bestFor: ["Luxury SUVs", "Performance feel", "Premium fitments"],
    searchHref: "/search?size=275/55R20",
  },
  {
    slug: "bridgestone",
    name: "Bridgestone",
    headline: "Bridgestone tires for drivers comparing dependable all-season traction and comfort.",
    description:
      "Bridgestone is one of the most researched mainstream tire brands for drivers comparing wet traction, comfort, and broad fitment support.",
    bestFor: ["Balanced all-season performance", "Wet traction", "Daily commuting"],
    searchHref: "/search?size=215/60R16",
  },
  {
    slug: "continental",
    name: "Continental",
    headline: "Continental tires for drivers who want quiet comfort and confident road manners.",
    description:
      "Continental is frequently searched by shoppers looking for refined highway behavior, premium feel, and strong all-season confidence.",
    bestFor: ["Quiet highway ride", "Comfort-focused touring", "Premium commuter vehicles"],
    searchHref: "/search?size=235/45R18",
  },
  {
    slug: "cooper",
    name: "Cooper",
    headline: "Cooper tires for value-focused drivers shopping trucks, SUVs, and everyday replacements.",
    description:
      "Cooper is a common comparison brand for shoppers looking for practical pricing, wide availability, and capable truck or SUV tire options.",
    bestFor: ["Value pricing", "Truck and SUV options", "Daily-use replacements"],
    searchHref: "/search?size=265/70R17",
  },
  {
    slug: "firestone",
    name: "Firestone",
    headline: "Firestone tires for everyday drivers shopping dependable replacement options.",
    description:
      "Firestone remains a recognizable consumer tire brand for shoppers comparing practical all-season replacements across cars, SUVs, and light trucks.",
    bestFor: ["Everyday replacement tires", "Mainstream sedans", "Practical all-season use"],
    searchHref: "/search?size=215/60R16",
  },
];

export const seoGuides = [
  {
    slug: "best-all-season-tires",
    title: "Best All-Season Tires",
    heroTitle: "Best all-season tires for everyday driving, comfort, and year-round confidence.",
    intro:
      "All-season tires remain one of the highest-intent tire categories because shoppers want strong tread life, wet traction, comfort, and value in one package.",
    sections: [
      "Look for strong treadwear, low road noise, and wet-road confidence if your vehicle spends most of its time commuting or highway cruising.",
      "Top all-season comparisons often start with Michelin, Goodyear, Continental, and Bridgestone because those brands consistently rank high in consumer searches.",
      "Start your comparison with common commuter sizes like 205/55R16, then click through to the retailer offering the best mix of price and brand trust.",
    ],
    ctaHref: "/search?size=205/55R16",
    ctaLabel: "Compare all-season tire deals",
  },
  {
    slug: "best-suv-tires",
    title: "Best SUV Tires",
    heroTitle: "Best SUV tires for crossovers, family haulers, and everyday utility.",
    intro:
      "SUV tire shoppers often care most about ride comfort, wet traction, highway stability, and getting the right value for larger replacement sizes.",
    sections: [
      "Popular SUV comparisons usually center around all-season touring tires that balance quiet highway manners with stable year-round handling.",
      "225/65R17 is a strong starting point because it appears on many high-volume crossovers and family SUVs.",
      "Compare major brands side by side, then use the offer links to buy from the retailer offering the best deal.",
    ],
    ctaHref: "/search?size=225/65R17",
    ctaLabel: "Shop SUV tire deals",
  },
  {
    slug: "cheap-truck-tires",
    title: "Cheap Truck Tires",
    heroTitle: "Cheap truck tires that still deliver traction, mileage, and real value.",
    intro:
      "Truck shoppers often search for affordable replacements without sacrificing the durability and traction needed for daily driving or light work use.",
    sections: [
      "Value-focused truck tire pages should compare all-terrain and highway options across multiple retailers, not just one store.",
      "245/75R16 is a strong size to merchandize because it serves trucks, older SUVs, and budget-conscious buyers looking for rugged options.",
      "The best way to save is to compare brand, tread style, and delivered price before clicking out to buy.",
    ],
    ctaHref: "/search?size=245/75R16",
    ctaLabel: "Compare truck tire prices",
  },
  {
    slug: "premium-20-inch-tires",
    title: "Premium 20-Inch Tires",
    heroTitle: "Premium 20-inch tires for luxury SUVs, trucks, and larger wheel fitments.",
    intro:
      "Drivers shopping larger premium sizes usually compare top-tier brands, road comfort, handling, and how much price varies between retailers.",
    sections: [
      "275/55R20 is a high-intent size for premium SUV and truck buyers who often search by brand as much as by price.",
      "Pages in this category should highlight premium brands like Michelin and Pirelli while still surfacing the best current deal.",
      "When the right fit appears, direct offer links help move the shopper straight to checkout.",
    ],
    ctaHref: "/search?size=275/55R20",
    ctaLabel: "View 20-inch tire offers",
  },
];

export const shoppingCategories = [
  {
    title: "Passenger tires",
    description:
      "Compare everyday replacement tires for sedans and commuter vehicles through a broad marketplace path.",
    href: "/tires/car",
  },
  {
    title: "SUV tires",
    description:
      "Browse crossover and SUV tire paths built around comfort, wet traction, and family-use confidence.",
    href: "/tires/suv-4x4",
  },
  {
    title: "Pickup truck tires",
    description:
      "Compare highway, towing, and all-terrain pickup truck options inside the larger marketplace.",
    href: "/tires/truck",
  },
  {
    title: "Off-road tires",
    description:
      "Explore all-terrain and off-road tire paths for drivers who need traction beyond everyday pavement.",
    href: "/tires/all-terrain",
  },
  {
    title: "Winter tires",
    description:
      "Shop seasonal tire paths for winter traction, cold-weather control, and region-specific readiness.",
    href: "/tires/winter",
  },
  {
    title: "Truck & commercial",
    description:
      "Move from broad truck demand into approved commercial truck and fleet-focused buying pages.",
    href: "/truck-tires",
  },
];

export const featuredVehicleLinks = [
  { make: "toyota", model: "camry", year: "2024", label: "2024 Toyota Camry tires" },
  { make: "toyota", model: "rav4", year: "2024", label: "2024 Toyota RAV4 tires" },
  { make: "ford", model: "f-150", year: "2024", label: "2024 Ford F-150 tires" },
  { make: "honda", model: "civic", year: "2024", label: "2024 Honda Civic tires" },
  { make: "honda", model: "cr-v", year: "2024", label: "2024 Honda CR-V tires" },
  { make: "toyota", model: "corolla", year: "2024", label: "2024 Toyota Corolla tires" },
  { make: "nissan", model: "rogue", year: "2024", label: "2024 Nissan Rogue tires" },
  { make: "chevrolet", model: "silverado-1500", year: "2024", label: "2024 Chevrolet Silverado 1500 tires" },
];

export const partnerSuppliers = [
  "Priority Tire",
  "SimpleTire",
  "Amazon",
  "Walmart",
  "Tire Agent",
  "TireBuyer",
];

export const homeFaqs = [
  {
    question: "How do I find the right tires for my vehicle?",
    answer:
      "Start with your tire size, then compare prices, brands, and live offers in one place. TireSearchEngine is built to help shoppers move from search to checkout faster.",
  },
  {
    question: "Which tire brands are most popular?",
    answer:
      "Top brands shoppers commonly compare include Michelin, Goodyear, Bridgestone, Continental, Pirelli, BFGoodrich, Cooper, and Firestone depending on size, vehicle, and driving style.",
  },
  {
    question: "Where do the buy links go?",
    answer:
      "Each result links directly to a retailer where you can review the product and complete your purchase.",
  },
];

export const seoPillars = [
  {
    title: "Shop top tire sizes",
    description:
      "Browse some of the most searched tire sizes for sedans, SUVs, and trucks with direct paths to live pricing and current offers.",
  },
  {
    title: "Compare trusted brands",
    description:
      "Quickly compare popular brands like Michelin, Goodyear, BFGoodrich, and Pirelli across common fitments and price points.",
  },
  {
    title: "Buy from leading retailers",
    description:
      "Find the tire you want, compare checkout paths, and finish your purchase with the retailer that has the best fit and price.",
  },
];

export const homepageTrustPoints = [
  "Trusted tire brands",
  "Supplier comparison",
  "Fast search paths",
  "Easy click-through",
];

export const homepageHowItWorks = [
  {
    title: "Enter your tire size or vehicle",
    description: "Start with the exact size on your sidewall or move into a vehicle-fitment path.",
    href: "/search?size=205/55R16",
  },
  {
    title: "Compare brands and pricing paths",
    description: "Review the most relevant size, brand, and comparison pages before leaving the site.",
    href: "/brands",
  },
  {
    title: "Continue to the best-fit retailer",
    description: "Use the strongest pricing or deal route once you have the right tire narrowed down.",
    href: "/deals/amazon-tires",
  },
];

export const homepageComparisonSpotlights = [
  {
    title: "Michelin vs Goodyear",
    description: "Start with a mainstream brand comparison built around comfort, tread life, and everyday value.",
    href: "/compare",
    bestFor: "Daily driving",
    priceCue: "Strong for all-season shoppers",
  },
  {
    title: "Best budget all-season tires",
    description: "Move into one of the most commercial consumer buying paths without getting buried in retailer clutter.",
    href: "/guides/best-all-season-tires",
    bestFor: "Budget pick",
    priceCue: "High-intent commuter traffic",
  },
  {
    title: "Truck tires by size",
    description: "Jump into truck and commercial size pages when the shopper already knows the replacement fitment.",
    href: "/truck-tires",
    bestFor: "Truck & SUV",
    priceCue: "Fleet and quote-ready paths",
  },
];

export const amazonAffiliatePlacements = {
  home: [
    {
      asin: "",
      title: "Amazon all-season tire placement",
      description:
        "Replace this placeholder with an approved Amazon Special Link for a high-intent all-season tire offer.",
      specialLink: "",
      badge: "Amazon pick",
    },
  ],
  sizes: {
    "205/55R16": [
      {
        asin: "",
        title: "Amazon 205/55R16 placement",
        description:
          "Populate with an approved Amazon Special Link for this commuter-friendly tire size.",
        specialLink: "",
        badge: "Amazon deal",
      },
    ],
    "225/65R17": [],
    "245/75R16": [],
    "275/55R20": [],
  },
  brands: {
    michelin: [],
    goodyear: [],
    bfgoodrich: [],
    pirelli: [],
    bridgestone: [],
    continental: [],
    cooper: [],
    firestone: [],
  },
  guides: {
    "best-all-season-tires": [],
    "best-suv-tires": [],
    "cheap-truck-tires": [],
    "premium-20-inch-tires": [],
  },
};

export function sizeToSlug(size) {
  return String(size || "").toLowerCase().replaceAll("/", "-");
}

export function slugToSize(slug) {
  return String(slug || "").toUpperCase().replaceAll("-", "/");
}

export function getFeaturedSizeBySlug(slug) {
  const normalized = slugToSize(slug);

  return featuredSizes.find((item) => item.size === normalized);
}

export function getSeoGuideBySlug(slug) {
  return seoGuides.find((guide) => guide.slug === slug);
}

export function getBrandPageBySlug(slug) {
  return featuredBrandPages.find((brand) => brand.slug === slug);
}
