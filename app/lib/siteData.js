export const siteUrl = "https://tiresearchengine.com";

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
];

export const shoppingCategories = [
  {
    title: "Best all-season tires",
    description:
      "Popular with daily drivers looking for year-round grip, low road noise, and long mileage.",
    href: "/search?size=205/55R16",
  },
  {
    title: "SUV and crossover tires",
    description:
      "Ideal for family vehicles where comfort, wet traction, and confidence matter most.",
    href: "/search?size=225/65R17",
  },
  {
    title: "Truck and all-terrain tires",
    description:
      "Compare highway-friendly truck tires and rugged all-terrain options in one place.",
    href: "/search?size=245/75R16",
  },
  {
    title: "Premium 20-inch tires",
    description:
      "Shop high-demand premium SUV and truck tires from leading brands and suppliers.",
    href: "/search?size=275/55R20",
  },
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
      "Start with your tire size, then compare prices, brands, and suppliers in one place. TireSearchEngine is built to help shoppers move from search to checkout faster.",
  },
  {
    question: "Which tire brands are most popular?",
    answer:
      "Top brands shoppers commonly compare include Michelin, Goodyear, Bridgestone, Continental, Pirelli, BFGoodrich, Cooper, and Firestone depending on size, vehicle, and driving style.",
  },
  {
    question: "Where do the buy links go?",
    answer:
      "Each result links directly to a retailer or supplier where you can review the product and complete your purchase.",
  },
];

export const seoPillars = [
  {
    title: "Shop top tire sizes",
    description:
      "Browse some of the most searched tire sizes for sedans, SUVs, and trucks with direct paths to live supplier pricing.",
  },
  {
    title: "Compare trusted brands",
    description:
      "Quickly compare popular brands like Michelin, Goodyear, BFGoodrich, and Pirelli across common fitments and price points.",
  },
  {
    title: "Buy from leading suppliers",
    description:
      "Find the tire you want, click through to the supplier, and finish your purchase with the retailer that has the best fit and price.",
  },
];

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
