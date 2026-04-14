import {
  approvedTruckBrandPages,
  approvedTruckSizes,
  getApprovedTruckIntersections,
  truckApplications,
  truckCoreHubs,
  truckPositions,
} from "../../lib/truckData";
import {
  getTruckApplicationPageEligibility,
  getTruckBrandPageEligibility,
  getTruckHubPageEligibility,
  getTruckIntersectionEligibility,
  getTruckPositionPageEligibility,
  getTruckSizePageEligibility,
} from "../../lib/pageEligibility";
import { siteUrl } from "../../lib/siteData";
import { appEnv } from "../../lib/env";

export default function sitemap() {
  if (appEnv.isNonProduction) {
    return [];
  }

  return [
    ...truckCoreHubs
      .filter((hub) => getTruckHubPageEligibility(hub.slug).indexable)
      .map((hub) => ({
        url:
          hub.slug === "commercial-truck-tires"
            ? `${siteUrl}/commercial-truck-tires`
            : `${siteUrl}/${hub.slug}`,
        changeFrequency: "weekly",
        priority: hub.slug === "truck-tires" ? 0.88 : 0.82,
      })),
    ...truckApplications
      .filter((application) => getTruckApplicationPageEligibility(application.slug).indexable)
      .map((application) => ({
        url: `${siteUrl}/truck-tires/${application.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      })),
    ...truckPositions
      .filter((position) => getTruckPositionPageEligibility(position.slug).indexable)
      .map((position) => ({
        url: `${siteUrl}/truck-tires/${position.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      })),
    ...approvedTruckSizes
      .filter((size) => getTruckSizePageEligibility(size.slug).indexable)
      .map((size) => ({
        url: `${siteUrl}/truck-tires/${size.slug}`,
        changeFrequency: "weekly",
        priority: 0.82,
      })),
    ...getApprovedTruckIntersections()
      .filter((item) => getTruckIntersectionEligibility(item.sizeSlug, item.applicationSlug).indexable)
      .map((item) => ({
        url: `${siteUrl}/truck-tires/${item.sizeSlug}/${item.applicationSlug}`,
        changeFrequency: "weekly",
        priority: 0.78,
      })),
    ...approvedTruckBrandPages
      .filter((item) => getTruckBrandPageEligibility(item.brandSlug).indexable)
      .map((item) => ({
        url: `${siteUrl}/brands/${item.brandSlug}/truck-tires`,
        changeFrequency: "weekly",
        priority: 0.76,
      })),
  ];
}
