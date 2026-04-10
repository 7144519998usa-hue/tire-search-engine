import {
  featuredBrandPages,
  featuredSizes,
  siteUrl,
  sizeToSlug,
} from "./siteData";

const allowedBrandSizeMap = {
  michelin: ["205/55R16", "215/60R16", "225/65R17", "235/45R18", "275/55R20"],
  goodyear: ["205/55R16", "215/60R16", "225/65R17", "235/65R17", "265/70R17"],
  bfgoodrich: ["245/75R16", "265/70R17", "275/55R20"],
  pirelli: ["225/65R17", "235/45R18", "275/55R20"],
  bridgestone: ["205/55R16", "215/60R16", "225/65R17", "235/65R17"],
  continental: ["215/60R16", "225/65R17", "235/45R18", "235/65R17"],
  cooper: ["245/75R16", "265/70R17", "235/65R17"],
  firestone: ["205/55R16", "215/60R16", "265/70R17"],
};

export function getProgrammaticBrandSizeCombos() {
  return featuredBrandPages.flatMap((brand) =>
    featuredSizes
      .filter((size) => (allowedBrandSizeMap[brand.slug] || []).includes(size.size))
      .map((size) => ({
        brandSlug: brand.slug,
        sizeSlug: sizeToSlug(size.size),
      }))
  );
}

export function getBrandSizePageData(brandSlug, sizeSlug) {
  const brand = featuredBrandPages.find((item) => item.slug === brandSlug);
  const size = featuredSizes.find((item) => sizeToSlug(item.size) === sizeSlug);

  if (!brand || !size) {
    return null;
  }

  return {
    brand,
    size,
    title: `${brand.name} ${size.size} Tires`,
    headline: `${brand.name} ${size.size} tires for shoppers comparing brand trust, fitment, and price.`,
    description: `${brand.name} ${size.size} tires are a strong comparison target for drivers researching quality, supplier pricing, and whether this brand-size combination matches their vehicle and budget.`,
    intro: `This landing page gives TireSearchEngine a scalable template for high-intent searches around ${brand.name} ${size.size} tires. It helps shoppers compare known brands with a specific size in mind, then move into supplier offers and purchase links.`,
    highlights: [
      `${brand.name} is commonly searched by drivers who care about ${brand.bestFor[0].toLowerCase()}.`,
      `${size.size} is a high-interest fitment because it appears on vehicles where buyers compare comfort, traction, and price carefully.`,
      `A brand-plus-size page captures more specific buying intent than a generic category or size page alone.`,
    ],
    faq: [
      {
        question: `Are ${brand.name} ${size.size} tires a good fit for many vehicles?`,
        answer: `${size.vehicleFit} Shoppers usually confirm the exact size on the tire sidewall or driver-door placard before buying.`,
      },
      {
        question: `Why compare ${brand.name} ${size.size} tire prices across suppliers?`,
        answer: "Supplier pricing can vary meaningfully for the same tire category, so comparison pages help shoppers identify the best buying path faster.",
      },
      {
        question: `What should shoppers compare beyond price?`,
        answer: "Brand reputation, tread life, seasonal use, road comfort, traction, and the intended driving style all matter alongside the current deal.",
      },
    ],
    canonicalPath: `/compare/${brand.slug}/${sizeToSlug(size.size)}`,
    searchHref: `/search?size=${encodeURIComponent(size.size)}`,
  };
}

export function getBrandSizePageUrl(brandSlug, sizeSlug) {
  return `${siteUrl}/compare/${brandSlug}/${sizeSlug}`;
}
