import { getVehiclePageEligibility } from "../../lib/pageEligibility";
import { siteUrl } from "../../lib/siteData";
import { featuredVehicles } from "../../lib/vehicleSeo";
import { appEnv } from "../../lib/env";

export default function sitemap() {
  if (appEnv.isNonProduction) {
    return [];
  }

  return featuredVehicles
    .filter((vehicle) => getVehiclePageEligibility(vehicle.make, vehicle.model, vehicle.year).indexable)
    .map((vehicle) => ({
      url: `${siteUrl}/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
}
