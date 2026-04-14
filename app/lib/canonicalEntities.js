import { featuredBrandPages, featuredSizes, sizeToSlug } from "./siteData";
import { tireModels } from "./tireModels";
import { featuredVehicles } from "./vehicleSeo";
import { commercialTruckSizes } from "./tireUniversityData";
import { approvedTruckSizes } from "./truckData";
import { evModels } from "./evData";

function uniq(values = []) {
  return [...new Set(values.filter(Boolean))];
}

export function parseTireSize(rawSize) {
  const raw = String(rawSize || "").trim().toUpperCase();

  if (!raw) {
    return { rawSize, valid: false, reason: "missing_size" };
  }

  const passengerMatch = raw.match(/^(\d{3})\/(\d{2})R(\d{2})$/);

  if (passengerMatch) {
    const [, width, aspectRatio, rimDiameter] = passengerMatch;
    const canonicalSize = `${width}/${aspectRatio}R${rimDiameter}`;

    return {
      rawSize,
      canonicalSize,
      slug: sizeToSlug(canonicalSize),
      width: Number(width),
      aspectRatio: Number(aspectRatio),
      rimDiameter: Number(rimDiameter),
      construction: "R",
      sizeType: "passenger_metric",
      valid: true,
    };
  }

  const truckMatch = raw.match(/^(\d{2})(R)(\d{2}\.\d)$/);

  if (truckMatch) {
    const [, width, construction, rimDiameter] = truckMatch;
    const canonicalSize = `${width}${construction}${rimDiameter}`;

    return {
      rawSize,
      canonicalSize,
      slug: canonicalSize.toLowerCase().replace(".", "-"),
      width: Number(width),
      aspectRatio: null,
      rimDiameter: Number(rimDiameter),
      construction,
      sizeType: "commercial_numeric",
      valid: true,
    };
  }

  return {
    rawSize,
    valid: false,
    reason: "invalid_size_format",
  };
}

function collectKnownSizes() {
  const sources = [
    ...featuredSizes.map((item) => ({ rawSize: item.size, sourceType: "featured_size" })),
    ...tireModels.flatMap((model) =>
      (model.supportedSizes || []).map((size) => ({
        rawSize: size,
        sourceType: "tire_model",
        modelSlug: model.slug,
        brandSlug: model.brandSlug,
      }))
    ),
    ...featuredVehicles.flatMap((vehicle) =>
      (vehicle.tireSizes || []).map((size) => ({
        rawSize: size,
        sourceType: "vehicle_fitment",
        vehicleKey: `${vehicle.year}-${vehicle.make}-${vehicle.model}`,
      }))
    ),
    ...commercialTruckSizes.map((size) => ({
      rawSize: size.size,
      sourceType: "commercial_truck_size",
      sizeSlug: size.slug,
    })),
    ...approvedTruckSizes.map((size) => ({
      rawSize: size.size,
      sourceType: "truck_size",
      sizeSlug: size.slug,
    })),
    ...evModels.flatMap((model) =>
      (model.fitments || []).map((fitment) => ({
        rawSize: fitment.size,
        sourceType: "ev_fitment",
        modelSlug: model.slug,
      }))
    ),
  ];

  const sizeMap = new Map();

  sources.forEach((source) => {
    const parsed = parseTireSize(source.rawSize);

    if (!parsed.valid) {
      return;
    }

    const existing = sizeMap.get(parsed.canonicalSize) || {
      ...parsed,
      sourceTypes: [],
      sourceKeys: [],
      productCount: 0,
      vehicleCount: 0,
      merchantCount: 0,
    };

    existing.sourceTypes = uniq([...existing.sourceTypes, source.sourceType]);
    existing.sourceKeys = uniq([
      ...existing.sourceKeys,
      source.modelSlug,
      source.brandSlug,
      source.vehicleKey,
      source.sizeSlug,
    ]);

    if (source.sourceType === "tire_model") {
      existing.productCount += 1;
    }

    if (source.sourceType === "vehicle_fitment" || source.sourceType === "ev_fitment") {
      existing.vehicleCount += 1;
    }

    sizeMap.set(parsed.canonicalSize, existing);
  });

  return [...sizeMap.values()].sort((left, right) => left.canonicalSize.localeCompare(right.canonicalSize));
}

export function getCanonicalSizeEntities() {
  return collectKnownSizes().map((size) => ({
    entityType: "tire_size",
    canonicalKey: size.canonicalSize,
    canonicalSize: size.canonicalSize,
    slug: size.slug,
    width: size.width,
    aspectRatio: size.aspectRatio,
    rimDiameter: size.rimDiameter,
    construction: size.construction,
    sizeType: size.sizeType,
    validityStatus: size.valid ? "valid" : "invalid",
    supportedApplications: uniq(
      [
        size.sourceTypes.includes("commercial_truck_size") ? "commercial_truck" : "",
        size.sourceTypes.includes("truck_size") ? "truck" : "",
        size.sourceTypes.includes("ev_fitment") ? "ev" : "",
        size.sourceTypes.includes("vehicle_fitment") ? "consumer_vehicle" : "",
      ].filter(Boolean)
    ),
    popularityScore: size.vehicleCount * 12 + size.productCount * 8 + size.sourceTypes.length * 5,
    vehicleCount: size.vehicleCount,
    productCount: size.productCount,
    merchantCount: size.merchantCount,
    sourceTypes: size.sourceTypes,
    sourceKeys: size.sourceKeys,
  }));
}

export function getCanonicalBrandEntities() {
  return featuredBrandPages.map((brand) => ({
    entityType: "brand",
    canonicalKey: brand.slug,
    canonicalName: brand.name,
    aliases: [brand.name.toLowerCase()],
    slug: brand.slug,
    authorityStatus: "active",
    active: true,
    summary: brand.description,
  }));
}

export function getCanonicalTireModelEntities() {
  return tireModels.map((model) => ({
    entityType: "tire_model",
    canonicalKey: model.slug,
    brandSlug: model.brandSlug,
    canonicalName: model.name,
    slug: model.slug,
    supportedSizes: model.supportedSizes || [],
    summary: model.summary,
    strengths: model.strengths || [],
    active: true,
  }));
}

export function getCanonicalVehicleFitmentEntities() {
  return featuredVehicles.map((vehicle) => ({
    entityType: "vehicle_fitment",
    canonicalKey: `${vehicle.year}-${vehicle.make}-${vehicle.model}`,
    year: vehicle.year,
    make: vehicle.make,
    model: vehicle.model,
    oeSizes: vehicle.tireSizes || [],
    sourceProvenance: "featured_vehicle_seed",
    confidenceScore: 0.88,
  }));
}

export function getCanonicalEntitySnapshot() {
  return {
    generatedAt: new Date().toISOString(),
    sizes: getCanonicalSizeEntities(),
    brands: getCanonicalBrandEntities(),
    models: getCanonicalTireModelEntities(),
    vehicleFitments: getCanonicalVehicleFitmentEntities(),
  };
}
