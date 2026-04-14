import { getCommercialTruckPageEligibility } from "../../lib/pageEligibility";
import { siteUrl } from "../../lib/siteData";
import { commercialTruckSizes } from "../../lib/tireUniversityData";
import { appEnv } from "../../lib/env";

export default function sitemap() {
  if (appEnv.isNonProduction) {
    return [];
  }

  const sizePages = commercialTruckSizes
    .filter((size) => getCommercialTruckPageEligibility(size.slug).indexable)
    .map((size) => ({
      url: `${siteUrl}/commercial-truck-tires/${size.slug}`,
      changeFrequency: "weekly",
      priority: 0.82,
    }));

  return [
    {
      url: `${siteUrl}/commercial-truck-tires`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...sizePages,
  ];
}
