export const comparisons = [
  {
    slug: "michelin-vs-goodyear",
    title: "Michelin vs Goodyear Tires",
    summary: "Compare Michelin and Goodyear by common tire categories, size availability, retailer paths, and fitment checks.",
    rows: [["Best for", "Touring, all-weather, premium replacement searches", "All-season, truck, commercial, and broad retailer availability"], ["Check first", "Exact size, speed rating, load rating", "Exact size, tire line, installation path"]],
    links: ["/brands/michelin", "/brands/goodyear", "/tires/225-65-r17"]
  },
  {
    slug: "michelin-defender-vs-crossclimate2",
    title: "Michelin Defender vs CrossClimate2",
    summary: "Compare Michelin Defender-style touring searches with CrossClimate2 all-weather searches before choosing a replacement tire.",
    rows: [["Best for", "Long-wear touring and daily driving", "All-weather traction and year-round confidence"], ["Buyer check", "Warranty, comfort, size availability", "Snow rating, price, road noise"]],
    links: ["/brands/michelin", "/tires/225-65-r17/all-weather", "/tire-university/all-season-vs-all-weather-tires"]
  },
  {
    slug: "bridgestone-weatherpeak-vs-crossclimate2",
    title: "Bridgestone WeatherPeak vs Michelin CrossClimate2",
    summary: "Compare two common all-weather tire searches by size availability, retailer paths, and fitment notes.",
    rows: [["Best for", "All-weather passenger and SUV replacement searches", "All-weather passenger and SUV replacement searches"], ["Buyer check", "Current retailer availability and size match", "Current retailer availability and size match"]],
    links: ["/brands/bridgestone", "/brands/michelin", "/tires/245-60-r18/all-weather"]
  },
  {
    slug: "tire-rack-vs-simpletire",
    title: "Tire Rack vs SimpleTire",
    summary: "Compare two online tire retailer paths by fitment workflow, tire search, installation options, and checkout confirmation.",
    rows: [["Best for", "Tire-focused research and Tire Rack affiliate paths", "Online tire comparison and shipped tire paths"], ["Buyer check", "Fitment, installation, shipping, rebates", "Fitment, installation, shipping, returns"]],
    links: ["/shop-tires", "/deals", "/about/how-we-rank-offers"]
  },
  {
    slug: "all-season-vs-all-weather",
    title: "All-Season vs All-Weather Tires",
    summary: "Compare all-season and all-weather tires by climate, snow rating, ride comfort, and replacement priorities.",
    rows: [["Best for", "Mild climates and daily driving", "Drivers who want year-round tires with stronger winter capability"], ["Buyer check", "Wet grip, tread life, comfort", "3PMSF rating, snow traction, price"]],
    links: ["/tire-university/all-season-vs-all-weather-tires", "/tires/225-65-r17/all-season", "/tires/225-65-r17/all-weather"]
  },
  {
    slug: "winter-vs-all-season",
    title: "Winter vs All-Season Tires",
    summary: "Compare winter tires and all-season tires by cold-weather traction, cost, storage, and seasonal use.",
    rows: [["Best for", "Snow, ice, and sustained cold temperatures", "Moderate climates and year-round convenience"], ["Buyer check", "Storage, installation, speed rating", "Snow limitations, wet grip, tread life"]],
    links: ["/tires/235-45-r18/winter", "/tires/235-45-r18/all-season", "/tire-university/winter-vs-snow-rated-all-weather-tires"]
  },
  {
    slug: "steer-vs-drive-tires",
    title: "Steer vs Drive Tires",
    summary: "Compare commercial steer and drive tire roles by axle position, traction, casing value, and fleet replacement planning.",
    rows: [["Best for", "Front axle stability and wear control", "Traction, pulling power, and regional or long-haul duty"], ["Buyer check", "Load range, casing, steer position", "Tread depth, traction, retread plan"]],
    links: ["/commercial-truck-tires/positions/steer", "/tires/11r22-5/drive", "/tire-university/steer-vs-drive-vs-trailer-tires"]
  },
  {
    slug: "retread-vs-new-truck-tires",
    title: "Retread vs New Truck Tires",
    summary: "Compare retread and new commercial truck tire decisions by casing value, application, cost per mile, and fleet policy.",
    rows: [["Best for", "Cost control when casing quality is strong", "New casing needs, steer positions, or strict replacement policies"], ["Buyer check", "Casing inspection and application", "Price, warranty, casing value"]],
    links: ["/tire-university/retread-vs-new-truck-tires", "/commercial-truck-tires", "/tire-university/fleet-tire-cost-guide"]
  }
];

export function getComparison(slug = "") {
  return comparisons.find((comparison) => comparison.slug === slug);
}
