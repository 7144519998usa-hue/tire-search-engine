export function getFutureOpportunityRegister() {
  return [
    {
      vertical: "rv",
      label: "RV Tires",
      searchScalability: 82,
      commercialValue: 80,
      affiliatePotential: 76,
      operationalComplexity: 58,
      structuralFit: 84,
      recommendedPriority: 1,
      routeFamilies: ["/rv-tires", "/rv-tires/size/{size}"],
      reusableServices: ["canonical_resolver", "page_registry", "sitemap_engine", "page_generator"],
      requiredExtensions: ["load_range_rules", "trailer_rv_fitment_logic", "rv_use_case_taxonomy"],
      notes:
        "Closest structural neighbor to the current truck and trailer logic, with strong fit for size-driven pages and commercial intent.",
    },
    {
      vertical: "golf_cart",
      label: "Golf Cart Tires",
      searchScalability: 69,
      commercialValue: 67,
      affiliatePotential: 70,
      operationalComplexity: 42,
      structuralFit: 72,
      recommendedPriority: 2,
      routeFamilies: ["/golf-cart-tires", "/golf-cart-tires/size/{size}"],
      reusableServices: ["size_parser", "page_registry", "internal_link_engine"],
      requiredExtensions: ["wheel_diameter_rules", "golf_cart_taxonomy", "terrain_specific_copy_rules"],
      notes:
        "Lower complexity than motorcycle or bicycle, and likely the easiest adjacent category to layer in with size-plus-use-case pages.",
    },
    {
      vertical: "motorcycle",
      label: "Motorcycle Tires",
      searchScalability: 78,
      commercialValue: 74,
      affiliatePotential: 72,
      operationalComplexity: 83,
      structuralFit: 56,
      recommendedPriority: 3,
      routeFamilies: ["/motorcycle-tires", "/motorcycle-tires/{brand}", "/motorcycle-tires/{category}"],
      reusableServices: ["page_registry", "opportunity_engine", "indexation_governor"],
      requiredExtensions: ["front_rear_fitment_logic", "bike_segment_taxonomy", "motorcycle_size_parser"],
      notes:
        "Attractive demand, but fitment and front/rear pairing make it meaningfully more complex than core automotive expansion.",
    },
    {
      vertical: "bicycle",
      label: "Bicycle Tires",
      searchScalability: 73,
      commercialValue: 52,
      affiliatePotential: 48,
      operationalComplexity: 76,
      structuralFit: 44,
      recommendedPriority: 4,
      routeFamilies: ["/bicycle-tires", "/bicycle-tires/{category}", "/bicycle-tires/{wheel-size}"],
      reusableServices: ["page_registry", "sitemap_engine"],
      requiredExtensions: ["etrto_size_logic", "wheel_standard_mapping", "bike_discipline_taxonomy"],
      notes:
        "Possible long-term authority play, but lower monetization fit and higher taxonomy friction make it a later-stage expansion candidate.",
    },
  ];
}
