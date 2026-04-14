import { getSizePageEligibility } from "../../lib/pageEligibility";
import { featuredSizes, siteUrl, sizeToSlug } from "../../lib/siteData";
import { appEnv } from "../../lib/env";

export default function sitemap() {
  if (appEnv.isNonProduction) {
    return [];
  }

  return featuredSizes
    .filter((item) => getSizePageEligibility(sizeToSlug(item.size)).indexable)
    .map((item) => ({
      url: `${siteUrl}/tires/${sizeToSlug(item.size)}`,
      changeFrequency: "weekly",
      priority: 0.84,
    }));
}
