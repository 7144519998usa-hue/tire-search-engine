import { featuredSizes, sizeToSlug } from "./siteData";
import { featuredVehicles } from "./vehicleSeo";
import { approvedTruckSizes } from "./truckData";
import { buildPageRegistry, getPageRegistrySummary } from "./pageRegistry";
import { getCanonicalEntitySnapshot, getCanonicalSizeEntities } from "./canonicalEntities";
import { getFutureOpportunityRegister } from "./futureOpportunities";
import { buildRegenerationQueue } from "./regenerationQueue";

function uniq(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function buildKnownPageKeySet(pageRegistry) {
  return new Set(pageRegistry.map((entry) => `${entry.pageType}:${entry.slug}`));
}

function scoreSizeOpportunity(sizeEntity) {
  return Math.min(
    100,
    sizeEntity.popularityScore +
      sizeEntity.vehicleCount * 8 +
      sizeEntity.productCount * 10 +
      (sizeEntity.supportedApplications.includes("ev") ? 12 : 0) +
      (sizeEntity.supportedApplications.includes("commercial_truck") ? 10 : 0)
  );
}

function detectMissingSizePages(pageRegistry) {
  const existingSizeKeys = new Set(featuredSizes.map((item) => sizeToSlug(item.size)));
  const registryKeys = buildKnownPageKeySet(pageRegistry);

  return getCanonicalSizeEntities()
    .filter((size) => !existingSizeKeys.has(size.slug))
    .filter((size) => !registryKeys.has(`size_page:${size.slug}`))
    .map((size) => ({
      opportunityType: "missing_size_page",
      canonicalKey: size.canonicalKey,
      routeFamily: "size_pages",
      proposedPath: `/tires/${size.slug}`,
      score: scoreSizeOpportunity(size),
      reasons: uniq([
        size.vehicleCount > 0 ? "vehicle_fitment_present" : "",
        size.productCount > 0 ? "product_support_present" : "",
        size.supportedApplications.includes("ev") ? "ev_growth_support" : "",
        size.supportedApplications.includes("commercial_truck") ? "commercial_support" : "",
      ]),
      entity: size,
      publishRecommendation:
        size.productCount >= 1 && size.vehicleCount >= 1 ? "generated_unpublished" : "draft",
    }))
    .sort((left, right) => right.score - left.score);
}

function detectMissingVehiclePages(pageRegistry) {
  const existingVehicleKeys = new Set(
    pageRegistry
      .filter((entry) => entry.pageType === "vehicle_page")
      .map((entry) => `${entry.entityKeys.year}-${entry.entityKeys.make}-${entry.entityKeys.model}`)
  );

  return featuredVehicles
    .filter((vehicle) => !existingVehicleKeys.has(`${vehicle.year}-${vehicle.make}-${vehicle.model}`))
    .map((vehicle) => ({
      opportunityType: "missing_vehicle_page",
      routeFamily: "vehicle_pages",
      proposedPath: `/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}`,
      score: 76 + (vehicle.tireSizes || []).length * 6 + (vehicle.brandSlugs || []).length * 4,
      reasons: ["fitment_seed_exists", "inventory_seed_exists"],
      entity: vehicle,
      publishRecommendation: "generated_unpublished",
    }));
}

function detectMissingTruckSizeBridges(pageRegistry) {
  const existingTruckSizePaths = new Set(
    pageRegistry
      .filter((entry) => entry.pageType === "truck_size_page")
      .map((entry) => entry.entityKeys.size)
  );

  return approvedTruckSizes
    .filter((size) => !existingTruckSizePaths.has(size.slug))
    .map((size) => ({
      opportunityType: "missing_truck_size_page",
      routeFamily: "truck_size_pages",
      proposedPath: `/truck-tires/${size.slug}`,
      score: 82,
      reasons: ["approved_truck_size_exists", "commercial_priority_cluster"],
      entity: size,
      publishRecommendation: "generated_unpublished",
    }));
}

export function getAutoExpansionReport() {
  const pageRegistry = buildPageRegistry();
  const opportunities = [
    ...detectMissingSizePages(pageRegistry),
    ...detectMissingVehiclePages(pageRegistry),
    ...detectMissingTruckSizeBridges(pageRegistry),
  ].sort((left, right) => right.score - left.score);

  return {
    generatedAt: new Date().toISOString(),
    entitySnapshot: getCanonicalEntitySnapshot(),
    pageRegistrySummary: getPageRegistrySummary(),
    opportunitySummary: {
      total: opportunities.length,
      byType: opportunities.reduce((accumulator, item) => {
        accumulator[item.opportunityType] = (accumulator[item.opportunityType] || 0) + 1;
        return accumulator;
      }, {}),
    },
    futureOpportunityRegister: getFutureOpportunityRegister(),
    opportunities,
    regenerationQueue: buildRegenerationQueue(pageRegistry).slice(0, 50),
  };
}
