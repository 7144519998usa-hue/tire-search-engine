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
    { href: "/shop-tires", label: "Retailer paths" }
  ];

  const brandLinks = brand
    ? [
      { href: `/brands/${brand}`, label: `${brand} tire guide` },
      { href: "/brands", label: "Compare tire brands" }
    ]
    : [{ href: "/brands/michelin", label: "Michelin tires" }, { href: "/brands/bridgestone", label: "Bridgestone tires" }, { href: "/brands/goodyear", label: "Goodyear tires" }];

  return {
    relatedSizes: uniqueLinks(relatedSizes),
    relatedVehicles: uniqueLinks(vehicleLinks),
    relatedGuides: uniqueLinks(guideLinks),
    relatedBrands: uniqueLinks(brandLinks),
    hubs: uniqueLinks(hubLinks)
  };
}
