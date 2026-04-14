import { getBrandSizePageData } from "./programmaticSeo";
import { getFeaturedSizeBySlug } from "./siteData";
import { getCategorySizeCombos, getTireCategoryBySlug } from "./tireCategories";
import { getCommercialTruckSizeBySlug, getTireUniversitySectionBySlug, getStateLawBySlug } from "./tireUniversityData";
import { getApprovedTruckBrandPage, getTruckApplicationBySlug, getTruckHubBySlug, getTruckPositionBySlug, getTruckSizeBySlug } from "./truckData";
import { getVehiclePageData } from "./vehicleSeo";

function makeResult(indexable, reason, details = {}) {
  return {
    indexable,
    reason,
    ...details,
  };
}

export function getSizePageEligibility(sizeSlug) {
  const size = getFeaturedSizeBySlug(sizeSlug);

  if (!size) {
    return makeResult(false, "missing_size");
  }

  if (!size.summary || !size.vehicleFit) {
    return makeResult(false, "missing_size_context");
  }

  return makeResult(true, "eligible", {
    entity: size,
  });
}

export function getBrandSizePageEligibility(brandSlug, sizeSlug) {
  const page = getBrandSizePageData(brandSlug, sizeSlug);

  if (!page) {
    return makeResult(false, "missing_brand_or_size");
  }

  if ((page.highlights || []).length < 3 || (page.faq || []).length < 3) {
    return makeResult(false, "insufficient_unique_modules", {
      entity: page,
    });
  }

  return makeResult(true, "eligible", {
    entity: page,
  });
}

export function getCategorySizePageEligibility(categorySlug, sizeSlug) {
  const category = getTireCategoryBySlug(categorySlug);
  const size = getFeaturedSizeBySlug(sizeSlug);
  const comboExists = getCategorySizeCombos().some(
    (item) => item.categorySlug === categorySlug && item.sizeSlug === sizeSlug
  );

  if (!category || !size || !comboExists) {
    return makeResult(false, "missing_category_size_combo");
  }

  if ((category.brands || []).length < 2 || (category.guides || []).length < 1) {
    return makeResult(false, "insufficient_category_support", {
      entity: { category, size },
    });
  }

  return makeResult(true, "eligible", {
    entity: { category, size },
  });
}

export function getVehiclePageEligibility(make, model, year) {
  const vehicle = getVehiclePageData(make, model, year);

  if (!vehicle) {
    return makeResult(false, "missing_vehicle");
  }

  if ((vehicle.sizes || []).length < 1 || (vehicle.brands || []).length < 1) {
    return makeResult(false, "insufficient_vehicle_data", {
      entity: vehicle,
    });
  }

  return makeResult(true, "eligible", {
    entity: vehicle,
  });
}

export function getCommercialTruckPageEligibility(sizeSlug) {
  const size = getCommercialTruckSizeBySlug(sizeSlug);

  if (!size) {
    return makeResult(false, "missing_commercial_truck_size");
  }

  if (!size.summary) {
    return makeResult(false, "missing_commercial_summary", {
      entity: size,
    });
  }

  return makeResult(true, "eligible", {
    entity: size,
  });
}

export function getTruckHubPageEligibility(slug) {
  const hub = getTruckHubBySlug(slug);

  if (!hub) {
    return makeResult(false, "missing_truck_hub");
  }

  if (!hub.summary || (hub.childLinks || []).length < 3) {
    return makeResult(false, "insufficient_truck_hub_depth", {
      entity: hub,
    });
  }

  return makeResult(true, "eligible", {
    entity: hub,
  });
}

export function getTruckApplicationPageEligibility(slug) {
  const application = getTruckApplicationBySlug(slug);

  if (!application) {
    return makeResult(false, "missing_truck_application");
  }

  return makeResult(true, "eligible", {
    entity: application,
  });
}

export function getTruckPositionPageEligibility(slug) {
  const position = getTruckPositionBySlug(slug);

  if (!position) {
    return makeResult(false, "missing_truck_position");
  }

  return makeResult(true, "eligible", {
    entity: position,
  });
}

export function getTruckSizePageEligibility(slug) {
  const size = getTruckSizeBySlug(slug);

  if (!size) {
    return makeResult(false, "missing_truck_size");
  }

  return makeResult(true, "eligible", {
    entity: size,
  });
}

export function getTruckIntersectionEligibility(sizeSlug, applicationSlug) {
  const size = getTruckSizeBySlug(sizeSlug);
  const application = getTruckApplicationBySlug(applicationSlug);

  if (!size || !application) {
    return makeResult(false, "missing_truck_intersection");
  }

  if (!(size.applications || []).includes(applicationSlug)) {
    return makeResult(false, "unapproved_truck_intersection", {
      entity: { size, application },
    });
  }

  return makeResult(true, "eligible", {
    entity: { size, application },
  });
}

export function getTruckBrandPageEligibility(brandSlug) {
  const page = getApprovedTruckBrandPage(brandSlug);

  if (!page) {
    return makeResult(false, "missing_truck_brand_page");
  }

  return makeResult(true, "eligible", {
    entity: page,
  });
}

export function getTireUniversitySectionEligibility(slug) {
  const section = getTireUniversitySectionBySlug(slug);

  if (!section) {
    return makeResult(false, "missing_tire_university_section");
  }

  if ((section.highlights || []).length < 2 || (section.relatedLinks || []).length < 2) {
    return makeResult(false, "insufficient_education_support", {
      entity: section,
    });
  }

  return makeResult(true, "eligible", {
    entity: section,
  });
}

export function getStateLawPageEligibility(slug) {
  const state = getStateLawBySlug(slug);

  if (!state) {
    return makeResult(false, "missing_state_law");
  }

  if ((state.keyTopics || []).length < 2) {
    return makeResult(false, "insufficient_state_law_depth", {
      entity: state,
    });
  }

  return makeResult(true, "eligible", {
    entity: state,
  });
}
