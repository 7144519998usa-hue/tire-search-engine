import { articles } from "./educationData.js";
import { getRelatedSizeCards, sizeToSlug, vehicleFitments } from "./tireData.js";
import { vehicleDisplayName } from "./vehicleNames.js";

function uniqueLinks(links = []) {
  const seen = new Set();
  return links.filter((link) => {
    if (!link?.href || seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function getInternalLinks({ size = "", make = "", model = "", commercial = false, brand = "" } = {}) {
  const relatedSizes = size
    ? getRelatedSizeCards(size, { type: commercial ? "commercial" : "passenger", limit: 5 }).map((item) => ({
      href: item.href,
      label: `${item.size} tires`
    }))
    : [];

  const vehicleLinks = vehicleFitments
    .filter((fitment) => {
      if (size) return fitment.size === size;
      if (make && model) return fitment.make === make && fitment.model === model;
      if (make) return fitment.make === make;
      return true;
    })
    .slice(0, 6)
    .map((fitment) => ({
      href: `/vehicles/${fitment.make}/${fitment.model}/${fitment.year}`,
      label: `${fitment.year} ${vehicleDisplayName(fitment.make)} ${vehicleDisplayName(fitment.model)} tires`
    }));

  const guideLinks = articles
    .filter((article) => commercial ? article.group.includes("Commercial") : true)
    .slice(0, 5)
    .map((article) => ({
      href: `/tire-university/${article.slug}`,
      label: article.title
    }));

  const hubLinks = [
    { href: "/tires", label: "Popular tire sizes" },
    { href: "/vehicles", label: "Find tires by vehicle" },
    { href: "/brands", label: "Tire brand guide" },
    { href: "/commercial-truck-tires", label: "Commercial truck tires" },
    { href: "/compare", label: "Tire comparisons" },
    { href: "/shop-tires", label: "Retailer paths" }
  ];

  const brandLinks = brand
    ? [
      { href: `/brands/${brand}`, label: `${brand} tire guide` },
      { href: "/brands", label: "Compare tire brands" }
    ]
    : [{ href: "/brands/michelin", label: "Michelin tires" }, { href: "/brands/bridgestone", label: "Bridgestone tires" }, { href: "/brands/goodyear", label: "Goodyear tires" }];

  const searchConsoleLinkMap = {
    "195/65R15": [
      { href: "/tires/195-65-r15/all-season", label: "195/65R15 all-season tires" },
      { href: "/best-winter-tires", label: "Best winter tires" }
    ],
    "205/55R16": [
      { href: "/tires/205-55-r16/price", label: "205/55R16 tire prices" },
      { href: "/tires/205-55-r16/budget", label: "Budget 205/55R16 tires" }
    ],
    "215/55R17": [
      { href: "/tires/215-55-r17/all-season", label: "215/55R17 all-season tires" },
      { href: "/tires/215-55-r17/budget", label: "Budget 215/55R17 tires" }
    ],
    "225/45R17": [
      { href: "/tires/225-45-r17/price", label: "225/45R17 tire prices" },
      { href: "/tires/225-45-r17/all-season", label: "225/45R17 all-season tires" },
      { href: "/best-summer-tires", label: "Best summer tires" }
    ],
    "225/65R17": [
      { href: "/tires/225-65-r17/price", label: "225/65R17 tire prices" },
      { href: "/best-all-season-tires-for-trucks", label: "Best all-season tires for trucks" }
    ],
    "235/45R18": [
      { href: "/tires/235-45-r18/best", label: "Best 235/45R18 tires" },
      { href: "/tires/235-45-r18/winter", label: "235/45R18 winter tires" },
      { href: "/tesla-model-3-tires", label: "Tesla Model 3 tires" }
    ],
    "295/75R22.5": [
      { href: "/tires/295-75-r22-5/comparison", label: "295/75R22.5 tire comparison" },
      { href: "/tires/295-75-r22-5/drive", label: "295/75R22.5 drive tires" },
      { href: "/best-steer-tires-for-highway", label: "Best steer tires for highway" }
    ],
    "315/80R22.5": [
      { href: "/tires/315-80-r22-5/price", label: "315/80R22.5 tire prices" },
      { href: "/best-steer-tires-for-highway", label: "Best steer tires for highway" }
    ],
    "385/65R22.5": [
      { href: "/tires/385-65-r22-5/best", label: "Best 385/65R22.5 tires" },
      { href: "/best-trailer-tires", label: "Best trailer tires" }
    ]
  };

  const searchConsoleLinks = size ? searchConsoleLinkMap[size] || [] : [];

  const moneyLinks = size
    ? [
      { href: `/tires/${sizeToSlug(size)}/price`, label: `${size} tire prices` },
      { href: `/tires/${sizeToSlug(size)}/best`, label: `Best ${size} tires` },
      { href: `/tires/${sizeToSlug(size)}/budget`, label: `Budget ${size} tires` },
      { href: commercial ? `/commercial-truck-tires/${sizeToSlug(size)}/drive` : `/tires/${sizeToSlug(size)}/all-season`, label: commercial ? `${size} drive tires` : `${size} all-season tires` },
      { href: commercial ? `/commercial-truck-tires/${sizeToSlug(size)}/steer` : `/tires/${sizeToSlug(size)}/all-weather`, label: commercial ? `${size} steer tires` : `${size} all-weather tires` },
      ...(commercial
        ? [
          { href: "/best-steer-tires-for-highway", label: "Best steer tires for highway" },
          { href: "/semi-truck-tire-replacement-cost", label: "Semi truck tire replacement cost" },
          { href: "/semi-truck-tires", label: "Semi truck tires" }
        ]
        : [
          { href: "/best-winter-tires", label: "Best winter tires" },
          { href: "/best-snow-tires", label: "Best snow tires" },
          { href: "/best-ev-tires", label: "Best EV tires" },
          { href: "/best-truck-tires", label: "Best truck tires" },
          { href: "/best-summer-tires", label: "Best summer tires" }
        ]),
      ...searchConsoleLinks
    ]
    : [
      { href: "/best-truck-tires", label: "Best truck tires" },
      { href: "/best-winter-tires", label: "Best winter tires" },
      { href: "/best-snow-tires", label: "Best snow tires" },
      { href: "/best-summer-tires", label: "Best summer tires" },
      { href: "/best-all-season-tires-for-trucks", label: "Best all-season tires for trucks" },
      { href: "/best-steer-tires-for-highway", label: "Best steer tires for highway" },
      { href: "/semi-truck-tires", label: "Semi truck tires" },
      { href: "/best-ev-tires", label: "Best EV tires" },
      { href: "/tesla-model-3-tires", label: "Tesla Model 3 tires" },
      { href: "/tacoma-tires", label: "Tacoma tires" }
    ];

  return {
    moneyPages: uniqueLinks(moneyLinks),
    relatedSizes: uniqueLinks(relatedSizes),
    relatedVehicles: uniqueLinks(vehicleLinks),
    relatedGuides: uniqueLinks(guideLinks),
    relatedBrands: uniqueLinks(brandLinks),
    hubs: uniqueLinks(hubLinks)
  };
}
