import {
  getStateLawPageEligibility,
  getTireUniversitySectionEligibility,
} from "../../lib/pageEligibility";
import { siteUrl } from "../../lib/siteData";
import { tireUniversitySections, tireUniversityStateLaws } from "../../lib/tireUniversityData";
import { appEnv } from "../../lib/env";

export default function sitemap() {
  if (appEnv.isNonProduction) {
    return [];
  }

  const sectionPages = tireUniversitySections
    .filter((section) => getTireUniversitySectionEligibility(section.slug).indexable)
    .map((section) => ({
      url: `${siteUrl}/tire-university/${section.slug}`,
      changeFrequency: "weekly",
      priority: 0.82,
    }));

  const statePages = tireUniversityStateLaws
    .filter((state) => getStateLawPageEligibility(state.slug).indexable)
    .map((state) => ({
      url: `${siteUrl}/tire-university/state-laws/${state.slug}`,
      changeFrequency: "weekly",
      priority: 0.78,
    }));

  return [
    {
      url: `${siteUrl}/tire-university`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...sectionPages,
    ...statePages,
  ];
}
