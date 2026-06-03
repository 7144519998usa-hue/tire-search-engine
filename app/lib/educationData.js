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

export const articles = articleGroups.flatMap((group) =>
  group.articles.map(([title, slug]) => ({ title, slug, group: group.title }))
);

export function getArticle(slug = "") {
  return articles.find((article) => article.slug === slug);
}
