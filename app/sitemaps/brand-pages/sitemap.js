import { getBrandSizePageEligibility } from "../../lib/pageEligibility";
import { getProgrammaticBrandSizeCombos } from "../../lib/programmaticSeo";
import { featuredBrandPages, siteUrl } from "../../lib/siteData";
import { appEnv } from "../../lib/env";

export default function sitemap() {
  if (appEnv.isNonProduction) {
    return [];
  }

  const brandPages = featuredBrandPages.map((brand) => ({
    url: `${siteUrl}/brands/${brand.slug}`,
    changeFrequency: "weekly",
    priority: 0.76,
  }));

  const brandSizePages = getProgrammaticBrandSizeCombos()
    .filter((item) => getBrandSizePageEligibility(item.brandSlug, item.sizeSlug).indexable)
    .map((item) => ({
      url: `${siteUrl}/brands/${item.brandSlug}/${item.sizeSlug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...brandPages, ...brandSizePages];
}
