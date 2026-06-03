export const articleGroups = [
  {
    title: "Tire Basics",
    articles: [
      ["How to Read Tire Size", "how-to-read-tire-size"],
      ["Tire Load Index Explained", "tire-load-index-explained"],
      ["Speed Rating Explained", "speed-rating-explained"],
      ["Tire Date Code Explained", "tire-date-code-explained"],
      ["How Long Do Tires Last?", "how-long-do-tires-last"],
      ["When to Replace Tires", "when-to-replace-tires"]
    ]
  },
  {
    title: "Buying Guides",
    articles: [
      ["Best Time to Buy Tires", "best-time-to-buy-tires"],
      ["How to Compare Tire Prices", "how-to-compare-tire-prices"],
      ["Tire Rack vs SimpleTire vs Discount Tire", "tire-rack-vs-simpletire-vs-discount-tire"],
      ["Online Tires vs Local Tire Shops", "online-tires-vs-local-tire-shops"],
      ["Installed Tires vs Shipped Tires", "installed-tires-vs-shipped-tires"]
    ]
  },
  {
    title: "Commercial Truck Tire Guides",
    articles: [
      ["Steer vs Drive vs Trailer Tires", "steer-vs-drive-vs-trailer-tires"],
      ["11R22.5 Tire Guide", "11r22-5-tire-guide"],
      ["295/75R22.5 Tire Guide", "295-75-r22-5-tire-guide"],
      ["Retread vs New Truck Tires", "retread-vs-new-truck-tires"],
      ["Commercial Truck Tire Cost Guide", "commercial-truck-tire-cost-guide"],
      ["Fleet Tire Replacement Planning", "fleet-tire-replacement-planning"]
    ]
  },
  {
    title: "EV Tire Guides",
    articles: [
      ["Why EVs Need Different Tires", "why-evs-need-different-tires"],
      ["Tesla Model 3 Tire Guide", "tesla-model-3-tire-guide"],
      ["Tesla Model Y Tire Guide", "tesla-model-y-tire-guide"],
      ["EV Tire Wear Explained", "ev-tire-wear-explained"]
    ]
  }
];

const generatedArticleGroups = [
  {
    title: "Vehicle Tire Guides",
    templates: [
      ["Toyota RAV4 Tire Guide", "toyota-rav4-tire-guide"],
      ["Toyota Camry Tire Guide", "toyota-camry-tire-guide"],
      ["Toyota Corolla Tire Guide", "toyota-corolla-tire-guide"],
      ["Honda Civic Tire Guide", "honda-civic-tire-guide"],
      ["Honda CR-V Tire Guide", "honda-cr-v-tire-guide"],
      ["Ford F-150 Tire Guide", "ford-f150-tire-guide"],
      ["Nissan Rogue Tire Guide", "nissan-rogue-tire-guide"],
      ["Jeep Wrangler Tire Guide", "jeep-wrangler-tire-guide"],
      ["Chevrolet Silverado Tire Guide", "chevrolet-silverado-tire-guide"],
      ["Subaru Outback Tire Guide", "subaru-outback-tire-guide"]
    ]
  },
  {
    title: "Tire Category Guides",
    templates: [
      ["All-Season vs All-Weather Tires", "all-season-vs-all-weather-tires"],
      ["Touring vs Performance Tires", "touring-vs-performance-tires"],
      ["Highway vs All-Terrain Tires", "highway-vs-all-terrain-tires"],
      ["Winter Tires vs Snow-Rated All-Weather Tires", "winter-vs-snow-rated-all-weather-tires"],
      ["Mud-Terrain vs All-Terrain Tires", "mud-terrain-vs-all-terrain-tires"],
      ["Quiet Tires for Highway Driving", "quiet-tires-for-highway-driving"],
      ["Best Tire Types for Wet Roads", "best-tire-types-for-wet-roads"],
      ["Summer Tires vs All-Season Tires", "summer-vs-all-season-tires"],
      ["Truck Tires for Towing", "truck-tires-for-towing"],
      ["Fuel-Efficient Truck Tires", "fuel-efficient-truck-tires"]
    ]
  },
  {
    title: "Fleet Guides",
    templates: [
      ["Fleet Tire Cost Guide", "fleet-tire-cost-guide"],
      ["Cost Per Mile for Truck Tires", "cost-per-mile-truck-tires-guide"],
      ["Fleet Tire Maintenance Checklist", "fleet-tire-maintenance-checklist"],
      ["Pre-Trip Tire Inspection Guide", "pre-trip-tire-inspection-guide"],
      ["DOT Tire Regulation Basics", "dot-tire-regulation-basics"],
      ["Commercial Tire Retread Planning", "commercial-tire-retread-planning"],
      ["Long-Haul Tire Replacement Planning", "long-haul-tire-replacement-planning"],
      ["Regional Haul Tire Planning", "regional-haul-tire-planning"],
      ["Mixed-Service Truck Tire Guide", "mixed-service-truck-tire-guide"],
      ["Commercial Trailer Tire Buying Guide", "commercial-trailer-tire-buying-guide"]
    ]
  }
];

const seedArticles = articleGroups.flatMap((group) =>
  group.articles.map(([title, slug]) => ({ title, slug, group: group.title, indexable: true, depth: "full" }))
);

const generatedArticles = generatedArticleGroups.flatMap((group) =>
  group.templates.map(([title, slug]) => ({ title, slug, group: group.title, indexable: false, depth: "brief" }))
);

export const articles = [...seedArticles, ...generatedArticles];

export const indexableArticles = articles.filter((article) => article.indexable);

export function getArticle(slug = "") {
  return articles.find((article) => article.slug === slug);
}
