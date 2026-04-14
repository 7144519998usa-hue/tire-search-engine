import {
  featuredBrandPages,
  featuredSizes,
  seoGuides,
  siteUrl,
  sizeToSlug,
} from "./siteData";
import { getProgrammaticBrandSizeCombos } from "./programmaticSeo";
import { featuredVehicles } from "./vehicleSeo";
import { getCategorySizeCombos, tireCategories } from "./tireCategories";
import {
  commercialTruckSizes,
  tireUniversitySections,
  tireUniversityStateLaws,
} from "./tireUniversityData";
import { tireModels } from "./tireModels";
import { evBrands, evIntents, evModels, getEvPageIndexState } from "./evData";
import {
  approvedTruckBrandPages,
  approvedTruckSizes,
  getApprovedTruckIntersections,
  truckApplications,
  truckCoreHubs,
  truckPositions,
} from "./truckData";
import {
  getBrandSizePageEligibility,
  getCategorySizePageEligibility,
  getCommercialTruckPageEligibility,
  getSizePageEligibility,
  getStateLawPageEligibility,
  getTireUniversitySectionEligibility,
  getTruckApplicationPageEligibility,
  getTruckBrandPageEligibility,
  getTruckHubPageEligibility,
  getTruckIntersectionEligibility,
  getTruckPositionPageEligibility,
  getTruckSizePageEligibility,
  getVehiclePageEligibility,
} from "./pageEligibility";

function makeEntry({
  pageType,
  routeFamily,
  slug,
  canonicalPath,
  entityKeys = {},
  title,
  qualityScore,
  pageDemandScore,
  publicationState,
  indexabilityState,
  internalLinkTier = "core",
  orphanStatus = "linked",
  sitemapAssignment,
  changeFrequency = "weekly",
  priority = 0.75,
}) {
  return {
    pageType,
    routeFamily,
    slug,
    canonicalPath,
    canonicalUrl: `${siteUrl}${canonicalPath}`,
    entityKeys,
    title,
    publicationState,
    indexabilityState,
    qualityScore,
    contentQualityScore: qualityScore,
    pageDemandScore,
    regenerationPriority: Math.round((qualityScore + pageDemandScore) / 2),
    orphanStatus,
    internalLinkTier,
    sitemapAssignment,
    changeFrequency,
    priority,
    lastGeneratedAt: null,
    lastDataRefreshAt: null,
  };
}

function stateFromEligibility(eligibility, fallbackQuality, fallbackDemand) {
  const indexable = Boolean(eligibility?.indexable);

  return {
    publicationState: indexable ? "published_indexable" : "published_noindex",
    indexabilityState: indexable ? "indexable" : "hold_noindex",
    qualityScore: indexable ? fallbackQuality : Math.max(48, fallbackQuality - 22),
    pageDemandScore: fallbackDemand,
  };
}

function buildCoreEntries() {
  return [
    makeEntry({
      pageType: "home",
      routeFamily: "home",
      slug: "home",
      canonicalPath: "/",
      title: "TireSearchEngine",
      qualityScore: 94,
      pageDemandScore: 96,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "core",
      changeFrequency: "weekly",
      priority: 1,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "tires_hub",
      slug: "tires",
      canonicalPath: "/tires",
      title: "Tires",
      qualityScore: 91,
      pageDemandScore: 94,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "core",
      changeFrequency: "weekly",
      priority: 0.92,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "size_hub",
      slug: "tires-sizes",
      canonicalPath: "/tires/sizes",
      title: "Tire Sizes",
      qualityScore: 86,
      pageDemandScore: 88,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "core",
      changeFrequency: "weekly",
      priority: 0.88,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "brands_hub",
      slug: "brands",
      canonicalPath: "/brands",
      title: "Brands",
      qualityScore: 88,
      pageDemandScore: 90,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "core",
      changeFrequency: "weekly",
      priority: 0.88,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "models_hub",
      slug: "models",
      canonicalPath: "/models",
      title: "Models",
      qualityScore: 84,
      pageDemandScore: 78,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "core",
      changeFrequency: "weekly",
      priority: 0.84,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "guides_hub",
      slug: "guides",
      canonicalPath: "/guides",
      title: "Guides",
      qualityScore: 88,
      pageDemandScore: 83,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "education",
      changeFrequency: "weekly",
      priority: 0.88,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "vehicles_hub",
      slug: "vehicles",
      canonicalPath: "/vehicles",
      title: "Vehicles",
      qualityScore: 88,
      pageDemandScore: 88,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "vehicles",
      changeFrequency: "weekly",
      priority: 0.88,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "ev_hub",
      slug: "ev-tires",
      canonicalPath: "/ev-tires",
      title: "EV Tires",
      qualityScore: 91,
      pageDemandScore: 92,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "ev",
      changeFrequency: "weekly",
      priority: 0.9,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "tesla_hub",
      slug: "tesla-tires",
      canonicalPath: "/tesla-tires",
      title: "Tesla Tires",
      qualityScore: 86,
      pageDemandScore: 90,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "ev",
      changeFrequency: "weekly",
      priority: 0.86,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "commercial_truck_hub",
      slug: "commercial-truck-tires",
      canonicalPath: "/commercial-truck-tires",
      title: "Commercial Truck Tires",
      qualityScore: 92,
      pageDemandScore: 94,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "truck",
      changeFrequency: "weekly",
      priority: 0.9,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "truck_hub",
      slug: "truck-tires",
      canonicalPath: "/truck-tires",
      title: "Truck Tires",
      qualityScore: 89,
      pageDemandScore: 93,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "truck",
      changeFrequency: "weekly",
      priority: 0.88,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "education_hub",
      slug: "tire-university",
      canonicalPath: "/tire-university",
      title: "Tire University",
      qualityScore: 89,
      pageDemandScore: 86,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "education",
      changeFrequency: "weekly",
      priority: 0.9,
    }),
    makeEntry({
      pageType: "hub",
      routeFamily: "compare_hub",
      slug: "compare",
      canonicalPath: "/compare",
      title: "Compare",
      qualityScore: 82,
      pageDemandScore: 84,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "commercial",
      changeFrequency: "weekly",
      priority: 0.84,
    }),
    makeEntry({
      pageType: "deals",
      routeFamily: "amazon_deals",
      slug: "amazon-tires",
      canonicalPath: "/deals/amazon-tires",
      title: "Amazon Tire Deals",
      qualityScore: 80,
      pageDemandScore: 84,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "commercial",
      changeFrequency: "daily",
      priority: 0.84,
    }),
  ];
}

function buildSizeEntries() {
  return featuredSizes.map((item) => {
    const eligibility = getSizePageEligibility(sizeToSlug(item.size));
    const state = stateFromEligibility(eligibility, 82, 87);

    return makeEntry({
      pageType: "size_page",
      routeFamily: "size_pages",
      slug: sizeToSlug(item.size),
      canonicalPath: `/tires/${sizeToSlug(item.size)}`,
      entityKeys: { size: item.size },
      title: item.title,
      sitemapAssignment: "sizes",
      priority: 0.84,
      ...state,
    });
  });
}

function buildCategoryEntries() {
  const hubs = tireCategories.map((category) =>
    makeEntry({
      pageType: "category_page",
      routeFamily: "category_pages",
      slug: category.slug,
      canonicalPath: `/tires/${category.slug}`,
      entityKeys: { category: category.slug },
      title: category.title,
      qualityScore: 84,
      pageDemandScore: 82,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "commercial",
      priority: 0.86,
    })
  );

  const intersections = getCategorySizeCombos().map((item) => {
    const state = stateFromEligibility(
      getCategorySizePageEligibility(item.categorySlug, item.sizeSlug),
      76,
      78
    );

    return makeEntry({
      pageType: "category_size_page",
      routeFamily: "category_size_pages",
      slug: `${item.categorySlug}__${item.sizeSlug}`,
      canonicalPath: `/tires/${item.categorySlug}/${item.sizeSlug}`,
      entityKeys: { category: item.categorySlug, size: item.sizeSlug },
      title: `${item.categorySlug} ${item.sizeSlug}`,
      sitemapAssignment: "commercial",
      priority: 0.78,
      ...state,
    });
  });

  return [...hubs, ...intersections];
}

function buildBrandEntries() {
  const brandPages = featuredBrandPages.map((brand) =>
    makeEntry({
      pageType: "brand_page",
      routeFamily: "brand_pages",
      slug: brand.slug,
      canonicalPath: `/brands/${brand.slug}`,
      entityKeys: { brand: brand.slug },
      title: `${brand.name} Tires`,
      qualityScore: 81,
      pageDemandScore: 82,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "brands",
      priority: 0.76,
    })
  );

  const brandSizePages = getProgrammaticBrandSizeCombos().map((item) => {
    const state = stateFromEligibility(
      getBrandSizePageEligibility(item.brandSlug, item.sizeSlug),
      78,
      80
    );

    return makeEntry({
      pageType: "brand_size_page",
      routeFamily: "brand_size_pages",
      slug: `${item.brandSlug}__${item.sizeSlug}`,
      canonicalPath: `/brands/${item.brandSlug}/${item.sizeSlug}`,
      entityKeys: { brand: item.brandSlug, size: item.sizeSlug },
      title: `${item.brandSlug} ${item.sizeSlug}`,
      sitemapAssignment: "brands",
      priority: 0.8,
      ...state,
    });
  });

  const truckBrandPages = approvedTruckBrandPages.map((item) => {
    const state = stateFromEligibility(getTruckBrandPageEligibility(item.brandSlug), 79, 84);

    return makeEntry({
      pageType: "truck_brand_page",
      routeFamily: "truck_brand_pages",
      slug: item.brandSlug,
      canonicalPath: `/brands/${item.brandSlug}/truck-tires`,
      entityKeys: { brand: item.brandSlug },
      title: item.title,
      sitemapAssignment: "truck",
      priority: 0.76,
      ...state,
    });
  });

  return [...brandPages, ...brandSizePages, ...truckBrandPages];
}

function buildModelEntries() {
  return tireModels.map((model) =>
    makeEntry({
      pageType: "model_page",
      routeFamily: "model_pages",
      slug: model.slug,
      canonicalPath: `/models/${model.slug}`,
      entityKeys: { model: model.slug, brand: model.brandSlug },
      title: model.title,
      qualityScore: 78,
      pageDemandScore: 74,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "models",
      priority: 0.78,
    })
  );
}

function buildGuideEntries() {
  return seoGuides.map((guide) =>
    makeEntry({
      pageType: "guide_page",
      routeFamily: "guide_pages",
      slug: guide.slug,
      canonicalPath: `/guides/${guide.slug}`,
      entityKeys: { guide: guide.slug },
      title: guide.title,
      qualityScore: 80,
      pageDemandScore: 78,
      publicationState: "published_indexable",
      indexabilityState: "indexable",
      sitemapAssignment: "education",
      priority: 0.78,
    })
  );
}

function buildVehicleEntries() {
  return featuredVehicles.map((vehicle) => {
    const state = stateFromEligibility(
      getVehiclePageEligibility(vehicle.make, vehicle.model, vehicle.year),
      82,
      85
    );

    return makeEntry({
      pageType: "vehicle_page",
      routeFamily: "vehicle_pages",
      slug: `${vehicle.make}-${vehicle.model}-${vehicle.year}`,
      canonicalPath: `/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}`,
      entityKeys: { make: vehicle.make, model: vehicle.model, year: vehicle.year },
      title: vehicle.displayName,
      sitemapAssignment: "vehicles",
      priority: 0.8,
      ...state,
    });
  });
}

function buildEducationEntries() {
  const sectionEntries = tireUniversitySections.map((section) => {
    const state = stateFromEligibility(getTireUniversitySectionEligibility(section.slug), 80, 73);

    return makeEntry({
      pageType: "education_section",
      routeFamily: "education_pages",
      slug: section.slug,
      canonicalPath: `/tire-university/${section.slug}`,
      entityKeys: { section: section.slug },
      title: section.title,
      sitemapAssignment: "education",
      priority: 0.82,
      ...state,
    });
  });

  const stateLawEntries = tireUniversityStateLaws.map((stateLaw) => {
    const state = stateFromEligibility(getStateLawPageEligibility(stateLaw.slug), 78, 69);

    return makeEntry({
      pageType: "state_law_page",
      routeFamily: "state_law_pages",
      slug: stateLaw.slug,
      canonicalPath: `/tire-university/state-laws/${stateLaw.slug}`,
      entityKeys: { state: stateLaw.slug },
      title: stateLaw.title,
      sitemapAssignment: "education",
      priority: 0.78,
      ...state,
    });
  });

  return [...sectionEntries, ...stateLawEntries];
}

function buildCommercialTruckEntries() {
  const sizeEntries = commercialTruckSizes.map((size) => {
    const state = stateFromEligibility(getCommercialTruckPageEligibility(size.slug), 84, 91);

    return makeEntry({
      pageType: "commercial_truck_size_page",
      routeFamily: "commercial_truck_pages",
      slug: size.slug,
      canonicalPath: `/commercial-truck-tires/${size.slug}`,
      entityKeys: { size: size.slug },
      title: size.title,
      sitemapAssignment: "truck",
      priority: 0.82,
      ...state,
    });
  });

  const hubEntries = truckCoreHubs.map((hub) => {
    const state = stateFromEligibility(getTruckHubPageEligibility(hub.slug), 84, 88);
    const canonicalPath =
      hub.slug === "commercial-truck-tires" ? "/commercial-truck-tires" : `/${hub.slug}`;

    return makeEntry({
      pageType: "truck_hub_page",
      routeFamily: "truck_hub_pages",
      slug: hub.slug,
      canonicalPath,
      entityKeys: { hub: hub.slug },
      title: hub.title,
      sitemapAssignment: "truck",
      priority: hub.slug === "truck-tires" ? 0.88 : 0.82,
      ...state,
    });
  });

  const applicationEntries = truckApplications.map((application) => {
    const state = stateFromEligibility(getTruckApplicationPageEligibility(application.slug), 78, 84);

    return makeEntry({
      pageType: "truck_application_page",
      routeFamily: "truck_application_pages",
      slug: application.slug,
      canonicalPath: `/truck-tires/${application.slug}`,
      entityKeys: { application: application.slug },
      title: application.title,
      sitemapAssignment: "truck",
      priority: 0.8,
      ...state,
    });
  });

  const positionEntries = truckPositions.map((position) => {
    const state = stateFromEligibility(getTruckPositionPageEligibility(position.slug), 78, 82);

    return makeEntry({
      pageType: "truck_position_page",
      routeFamily: "truck_position_pages",
      slug: position.slug,
      canonicalPath: `/truck-tires/${position.slug}`,
      entityKeys: { position: position.slug },
      title: position.title,
      sitemapAssignment: "truck",
      priority: 0.8,
      ...state,
    });
  });

  const truckSizeEntries = approvedTruckSizes.map((size) => {
    const state = stateFromEligibility(getTruckSizePageEligibility(size.slug), 82, 89);

    return makeEntry({
      pageType: "truck_size_page",
      routeFamily: "truck_size_pages",
      slug: size.slug,
      canonicalPath: `/truck-tires/${size.slug}`,
      entityKeys: { size: size.slug },
      title: size.title,
      sitemapAssignment: "truck",
      priority: 0.82,
      ...state,
    });
  });

  const truckIntersectionEntries = getApprovedTruckIntersections().map((item) => {
    const state = stateFromEligibility(
      getTruckIntersectionEligibility(item.sizeSlug, item.applicationSlug),
      76,
      84
    );

    return makeEntry({
      pageType: "truck_intersection_page",
      routeFamily: "truck_intersection_pages",
      slug: `${item.sizeSlug}__${item.applicationSlug}`,
      canonicalPath: `/truck-tires/${item.sizeSlug}/${item.applicationSlug}`,
      entityKeys: { size: item.sizeSlug, application: item.applicationSlug },
      title: `${item.sizeSlug} ${item.applicationSlug}`,
      sitemapAssignment: "truck",
      priority: 0.78,
      ...state,
    });
  });

  return [
    ...sizeEntries,
    ...hubEntries,
    ...applicationEntries,
    ...positionEntries,
    ...truckSizeEntries,
    ...truckIntersectionEntries,
  ];
}

function buildEvEntries() {
  const modelEntries = evModels.map((model) => {
    const state = getEvPageIndexState("model", model.slug);

    return makeEntry({
      pageType: "ev_model_page",
      routeFamily: "ev_model_pages",
      slug: model.slug,
      canonicalPath: `/ev-tires/${model.slug}`,
      entityKeys: { model: model.slug },
      title: model.displayName,
      qualityScore: state.indexable ? 86 : 62,
      pageDemandScore: 90,
      publicationState: state.indexable ? "published_indexable" : "published_noindex",
      indexabilityState: state.indexable ? "indexable" : "hold_noindex",
      sitemapAssignment: "ev",
      priority: 0.88,
    });
  });

  const brandEntries = evBrands.map((brand) => {
    const state = getEvPageIndexState("brand", brand.slug);

    return makeEntry({
      pageType: "ev_brand_page",
      routeFamily: "ev_brand_pages",
      slug: brand.slug,
      canonicalPath: `/ev-tires/${brand.slug}`,
      entityKeys: { brand: brand.slug },
      title: `${brand.name} EV Tires`,
      qualityScore: state.indexable ? 80 : 60,
      pageDemandScore: 82,
      publicationState: state.indexable ? "published_indexable" : "published_noindex",
      indexabilityState: state.indexable ? "indexable" : "hold_noindex",
      sitemapAssignment: "ev",
      priority: 0.8,
    });
  });

  const intentEntries = evIntents.map((intent) => {
    const state = getEvPageIndexState("intent", intent.slug);

    return makeEntry({
      pageType: "ev_intent_page",
      routeFamily: "ev_intent_pages",
      slug: intent.slug,
      canonicalPath: `/ev-tires/${intent.slug}`,
      entityKeys: { intent: intent.slug },
      title: intent.title,
      qualityScore: state.indexable ? 82 : 60,
      pageDemandScore: 84,
      publicationState: state.indexable ? "published_indexable" : "published_noindex",
      indexabilityState: state.indexable ? "indexable" : "hold_noindex",
      sitemapAssignment: "ev",
      priority: 0.82,
    });
  });

  return [...modelEntries, ...brandEntries, ...intentEntries];
}

export function buildPageRegistry() {
  return [
    ...buildCoreEntries(),
    ...buildSizeEntries(),
    ...buildCategoryEntries(),
    ...buildBrandEntries(),
    ...buildModelEntries(),
    ...buildGuideEntries(),
    ...buildVehicleEntries(),
    ...buildEducationEntries(),
    ...buildCommercialTruckEntries(),
    ...buildEvEntries(),
  ];
}

export function getIndexablePageRegistryEntries() {
  return buildPageRegistry().filter((entry) => entry.indexabilityState === "indexable");
}

export function getPageRegistrySummary() {
  const entries = buildPageRegistry();
  const byPublicationState = entries.reduce((accumulator, entry) => {
    accumulator[entry.publicationState] = (accumulator[entry.publicationState] || 0) + 1;
    return accumulator;
  }, {});
  const byRouteFamily = entries.reduce((accumulator, entry) => {
    accumulator[entry.routeFamily] = (accumulator[entry.routeFamily] || 0) + 1;
    return accumulator;
  }, {});

  return {
    generatedAt: new Date().toISOString(),
    totalPages: entries.length,
    indexablePages: entries.filter((entry) => entry.indexabilityState === "indexable").length,
    noindexPages: entries.filter((entry) => entry.indexabilityState !== "indexable").length,
    byPublicationState,
    byRouteFamily,
  };
}
