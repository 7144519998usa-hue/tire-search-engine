import { evBrands, evIntents, evModels, getEvPageIndexState } from "../../lib/evData";
import { siteUrl } from "../../lib/siteData";
import { appEnv } from "../../lib/env";

export default function sitemap() {
  if (appEnv.isNonProduction) {
    return [];
  }

  return [
    {
      url: `${siteUrl}/ev-tires`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tesla-tires`,
      changeFrequency: "weekly",
      priority: 0.86,
    },
    ...evModels
      .filter((model) => getEvPageIndexState("model", model.slug).indexable)
      .map((model) => ({
        url: `${siteUrl}/ev-tires/${model.slug}`,
        changeFrequency: "weekly",
        priority: 0.88,
      })),
    ...evBrands
      .filter((brand) => getEvPageIndexState("brand", brand.slug).indexable)
      .map((brand) => ({
        url: `${siteUrl}/ev-tires/${brand.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      })),
    ...evIntents
      .filter((intent) => getEvPageIndexState("intent", intent.slug).indexable)
      .map((intent) => ({
        url: `${siteUrl}/ev-tires/${intent.slug}`,
        changeFrequency: "weekly",
        priority: 0.82,
      })),
  ];
}
