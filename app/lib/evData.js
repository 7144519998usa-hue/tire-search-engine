import { featuredBrandPages, siteUrl } from "./siteData";
import { getVehiclePageData } from "./vehicleSeo";

const MODEL_GATES = { offers: 12, merchants: 2, freshPct: 80, content: 4 };
const BRAND_GATES = { offers: 30, merchants: 2, models: 3 };
const INTENT_GATES = { offers: 18, merchants: 2 };

export const evIntents = [
  ["winter", "EV Winter Tires", "Winter-ready EV replacement paths."],
  ["all-season", "EV All-Season Tires", "Daily-driver EV tire comparisons."],
  ["summer", "EV Summer Tires", "Warm-weather grip for EV fitments."],
  ["all-weather", "EV All-Weather Tires", "Four-season EV replacement paths."],
  ["best-range", "Best Range EV Tires", "Low-rolling-resistance and efficiency-minded paths."],
  ["quiet", "Quiet EV Tires", "Noise-focused EV tire paths with acoustic tech filters."],
  ["performance", "Performance EV Tires", "Sharper response and premium EV handling paths."],
  ["long-lasting", "Long-Lasting EV Tires", "Mileage-oriented EV replacements."],
  ["budget", "Budget EV Tires", "Value-driven EV shopping paths."],
  ["heavy-load", "Heavy-Load EV Tires", "HL and XL-focused EV replacement paths."],
].map(([slug, title, intro]) => ({ slug, title, intro }));

export const evBrands = featuredBrandPages
  .filter((brand) => ["michelin", "continental", "pirelli", "bridgestone", "goodyear"].includes(brand.slug))
  .map((brand) => ({
    ...brand,
    evSummary: `${brand.name} is a strong EV comparison brand for shoppers balancing quiet ride quality, range, and load-aware fitment choices.`,
  }));

export const evModels = [
  {
    slug: "tesla-model-3",
    make: "tesla",
    model: "model-3",
    displayName: "Tesla Model 3",
    segment: "sedan",
    summary:
      "Tesla Model 3 tire shoppers often compare quiet ride quality, range-minded replacements, and Tesla-spec markings before clicking out to buy.",
    fitments: [
      { label: "18-inch commuting fitment", size: "235/45R18", loadDesignation: "XL", speedRating: "W" },
      { label: "19-inch larger-wheel fitment", size: "235/40R19", loadDesignation: "XL", speedRating: "Y" },
    ],
    oemFocus: ["Tesla T-mark guidance", "Acoustic foam awareness", "Range-minded replacements"],
    faq: [
      {
        question: "Do Tesla Model 3 tires need Tesla T-mark fitment?",
        answer:
          "Tesla documents T-mark fitment guidance and the T0, T1, and T2 progression for certain approved tires. A useful Model 3 page should explain that context clearly instead of assuming every same-size replacement serves the same buyer equally well.",
      },
      {
        question: "Why do quiet tires matter more on a Tesla Model 3?",
        answer:
          "Electric vehicles have less powertrain noise than gas vehicles, so road noise stands out more inside the cabin. That is why Model 3 shoppers often care about acoustic-foam and low-noise touring options before they care about raw price alone.",
      },
      {
        question: "Should Model 3 drivers care about range when buying tires?",
        answer:
          "Yes. Range-sensitive shoppers often care about rolling resistance, tread pattern, and overall replacement efficiency. A strong EV page should separate performance-focused choices from best-range and quiet-commuter options so users can understand the tradeoff clearly.",
      },
      {
        question: "Do Model 3 shoppers need HL tires?",
        answer:
          "Not every Tesla Model 3 replacement requires HL tires. The page should explain the difference between HL and XL guidance clearly, help users match the fitment listed for their wheel setup, and avoid pushing higher-load products unless the fitment actually calls for them.",
      },
    ],
    relatedIntentSlugs: ["quiet", "best-range", "all-season", "heavy-load"],
    citations: ["Tesla T-mark guidance", "Tesla acoustic foam guidance", "Michelin HL guidance"],
  },
  {
    slug: "tesla-model-y",
    make: "tesla",
    model: "model-y",
    displayName: "Tesla Model Y",
    segment: "crossover",
    summary:
      "Tesla Model Y shoppers usually balance crossover load needs, cabin quietness, and efficient all-season replacements.",
    fitments: [
      { label: "19-inch touring fitment", size: "255/45R19", loadDesignation: "XL", speedRating: "V" },
      { label: "20-inch larger-wheel fitment", size: "255/40R20", loadDesignation: "XL", speedRating: "Y" },
    ],
    oemFocus: ["Tesla T-mark guidance", "Quiet crossover ride", "Efficient all-season replacements"],
    faq: [
      {
        question: "What matters most on a Tesla Model Y tire page?",
        answer:
          "Model Y shoppers usually care about cabin quietness, crossover-ready load support, and maintaining efficient all-season drivability. Pages that explain those tradeoffs directly are more useful than a generic same-size product list.",
      },
      {
        question: "Does the Model Y need EV-specific filters?",
        answer:
          "Yes. Quiet, best-range, and heavy-load filters are helpful because they match the most common reasons EV crossover owners narrow down replacement tires. Without those filters, users have to infer EV suitability from generic product names alone.",
      },
      {
        question: "Can Model Y drivers shop by brand first?",
        answer:
          "Brand paths still matter, but EV pages work best when the shopper can move from fitment into a filtered offer set. That makes it easier to compare premium brands without losing the exact wheel and load context of the vehicle.",
      },
      {
        question: "Why should a Model Y page link to seasonal EV hubs?",
        answer:
          "Seasonal links make the page more useful for real replacement intent. A shopper deciding between winter, all-season, or all-weather replacements may not know which way to search first, so the page should expose those decision paths explicitly.",
      },
    ],
    relatedIntentSlugs: ["quiet", "all-season", "all-weather", "heavy-load"],
    citations: ["Tesla T-mark guidance", "Michelin HL guidance"],
  },
  {
    slug: "ford-mustang-mach-e",
    make: "ford",
    model: "mustang-mach-e",
    displayName: "Ford Mustang Mach-E",
    segment: "crossover",
    summary:
      "Ford Mustang Mach-E tire comparisons usually focus on crossover comfort, confident wet traction, and balancing range with stronger grip.",
    fitments: [
      { label: "19-inch all-season fitment", size: "225/55R19", loadDesignation: "XL", speedRating: "H" },
      { label: "20-inch premium fitment", size: "245/45R20", loadDesignation: "XL", speedRating: "Y" },
    ],
    oemFocus: ["Quiet crossover ride", "Range vs grip tradeoff", "XL load support"],
    faq: [
      {
        question: "Why is the Mach-E page useful beyond a standard vehicle page?",
        answer:
          "Mach-E shoppers often want EV-specific guidance around cabin quietness, heavier crossover loads, and efficient replacement choices. Those questions are different from a standard gas-crossover tire page and deserve dedicated modules.",
      },
      {
        question: "Should Mach-E pages surface price-first or EPC-first merchants?",
        answer:
          "Both matter, which is why the implementation uses merchant-aware ranking and offer-coverage gating together. That gives the shopper a cleaner compare-first experience while still protecting marketplace economics and crawl quality.",
      },
      {
        question: "Can Mach-E owners use standard all-season filters?",
        answer:
          "They can, but EV-specific pages should still provide quiet, best-range, and heavy-load toggles. Those are the filters most likely to change the short list for an electric crossover driver.",
      },
      {
        question: "When should a Mach-E page stay noindex?",
        answer:
          "If offer coverage drops or freshness falls below threshold, it should stay live but noindex. That protects crawl quality and avoids scaling weak pages just because the route exists.",
      },
    ],
    relatedIntentSlugs: ["quiet", "best-range", "performance", "all-season"],
    citations: ["Michelin HL guidance", "Continental EV efficiency guidance"],
  },
];

const skuCatalog = [
  ["michelin|primacy-tour-a-s|235-45r18|98w", "michelin", "Michelin", "Primacy Tour A/S", "235/45R18", "all-season", "XL", "acoustic", "T0", 0.82, ["quiet", "best-range", "long-lasting"], ["tesla-model-3"]],
  ["pirelli|p-zero-all-season-plus-elect|235-45r18|98w", "pirelli", "Pirelli", "P Zero All Season Plus Elect", "235/45R18", "all-season", "XL", "pncs", "T1", 0.8, ["quiet", "performance", "best-range"], ["tesla-model-3"]],
  ["continental|procontact-rx|235-45r18|98w", "continental", "Continental", "ProContact RX", "235/45R18", "all-season", "XL", "contisilent", "", 0.78, ["quiet", "best-range"], ["tesla-model-3", "ford-mustang-mach-e"]],
  ["bridgestone|turanza-ev|255-45r19|104v", "bridgestone", "Bridgestone", "Turanza EV", "255/45R19", "all-season", "XL", "acoustic", "", 0.79, ["quiet", "best-range", "long-lasting"], ["tesla-model-y"]],
  ["goodyear|electricdrive-2|255-45r19|104v", "goodyear", "Goodyear", "ElectricDrive 2", "255/45R19", "all-season", "XL", "foam", "", 0.77, ["quiet", "budget", "best-range"], ["tesla-model-y"]],
  ["michelin|pilot-sport-ev|245-45r20|103y", "michelin", "Michelin", "Pilot Sport EV", "245/45R20", "summer", "XL", "acoustic", "", 0.7, ["performance"], ["ford-mustang-mach-e"]],
  ["hankook|ion-evo-as-suv|235-55r19|105v", "hankook", "Hankook", "iON evo AS SUV", "235/55R19", "all-season", "XL", "acoustic", "", 0.81, ["quiet", "best-range"], ["tesla-model-y", "ford-mustang-mach-e"]],
  ["nokian|hakkapeliitta-r5-ev|235-55r19|105r", "nokian", "Nokian", "Hakkapeliitta R5 EV", "235/55R19", "winter", "XL", "acoustic", "", 0.68, ["quiet", "heavy-load"], ["tesla-model-y", "ford-mustang-mach-e"]],
].map(([skuKey, brandSlug, brand, modelName, size, season, loadDesignation, noiseTech, teslaMark, rollingResistanceScore, evBadges, modelSlugs]) => ({
  skuKey,
  brandSlug,
  brand,
  modelName,
  size,
  season,
  loadDesignation,
  hlFlag: loadDesignation === "HL",
  noiseTech,
  oemMarkings: teslaMark ? { tesla: teslaMark } : {},
  rollingResistanceScore,
  rollingResistanceSource: "manufacturer_claim",
  evBadges,
  modelSlugs,
}));

export const evMerchantConfig = {
  "Tire Rack": { rate: 0.06, epc: 9 },
  "Priority Tire": { rate: 0.07, epc: 10 },
  SimpleTire: { rate: 0.05, epc: 8 },
};

const offerBase = { "Tire Rack": 0, "Priority Tire": -8, SimpleTire: -2 };
const offerFreshness = { "Tire Rack": 10, "Priority Tire": 18, SimpleTire: 28 };
const offerPrices = {
  "235/45R18": 228.99,
  "255/45R19": 246.99,
  "245/45R20": 279.99,
  "235/55R19": 244.99,
};

const offers = skuCatalog.flatMap((sku) =>
  Object.keys(evMerchantConfig).map((merchantName) => ({
    offerId: `${sku.skuKey}|${merchantName.toLowerCase().replaceAll(" ", "-")}`,
    skuKey: sku.skuKey,
    merchantName,
    merchantId: merchantName.toLowerCase().replaceAll(" ", "-"),
    price: Number((offerPrices[sku.size] + offerBase[merchantName]).toFixed(2)),
    shipping: merchantName === "Tire Rack" ? 0 : 24.99,
    currency: "USD",
    inStock: true,
    lastSeenAt: new Date(Date.now() - offerFreshness[merchantName] * 60 * 60 * 1000).toISOString(),
    outboundUrl: `${siteUrl}/search?size=${encodeURIComponent(sku.size)}`,
  }))
);

function uniq(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function getIntentFilters(slug = "") {
  if (slug === "winter") return { season: ["winter"] };
  if (slug === "all-season") return { season: ["all-season", "all-weather"] };
  if (slug === "summer") return { season: ["summer"] };
  if (slug === "all-weather") return { season: ["all-weather"] };
  if (slug === "best-range") return { evBadges: ["best-range"] };
  if (slug === "quiet") return { evBadges: ["quiet"] };
  if (slug === "performance") return { evBadges: ["performance"] };
  if (slug === "long-lasting") return { evBadges: ["long-lasting"] };
  if (slug === "budget") return { evBadges: ["budget"] };
  if (slug === "heavy-load") return { evBadges: ["heavy-load"], loadDesignation: ["HL", "XL"] };
  return {};
}

function matchesFilters(sku, filters = {}) {
  if (filters.size && sku.size !== filters.size) return false;
  if (filters.brandSlug && sku.brandSlug !== filters.brandSlug) return false;
  if (filters.season?.length && !filters.season.includes(sku.season)) return false;
  if (filters.loadDesignation?.length && !filters.loadDesignation.includes(sku.loadDesignation)) return false;
  if (filters.evBadges?.length && !filters.evBadges.every((badge) => sku.evBadges.includes(badge))) return false;
  if (filters.teslaMarks?.length && !filters.teslaMarks.includes(sku.oemMarkings?.tesla || "")) return false;
  return true;
}

function uniqueContentScore(model) {
  const faqScore = (model.faq || []).filter((item) => item.answer.length >= 200).length >= 4 ? 2 : 0;
  const citeScore = (model.citations || []).length >= 2 ? 1 : 0;
  return faqScore + citeScore + 1;
}

function freshPct(pageOffers = []) {
  if (!pageOffers.length) return 0;
  const fresh = pageOffers.filter((offer) => (Date.now() - new Date(offer.lastSeenAt).getTime()) / 3600000 <= 72).length;
  return Math.round((fresh / pageOffers.length) * 100);
}

function sortOffers(list = [], mode = "best_value") {
  return [...list].sort((a, b) => {
    if (mode === "price_first") return a.price - b.price;
    if (mode === "merchant_epc") return evMerchantConfig[b.merchantName].epc - evMerchantConfig[a.merchantName].epc;
    if (mode === "range_first") {
      const left = getEvSkuByKey(a.skuKey)?.rollingResistanceScore || 0;
      const right = getEvSkuByKey(b.skuKey)?.rollingResistanceScore || 0;
      return right - left || a.price - b.price;
    }
    return evMerchantConfig[b.merchantName].epc * 5 - b.price / 20 - (evMerchantConfig[a.merchantName].epc * 5 - a.price / 20);
  });
}

export function getEvSkuByKey(skuKey = "") {
  return skuCatalog.find((sku) => sku.skuKey === skuKey) || null;
}

export function getEvModelBySlug(slug = "") {
  return evModels.find((model) => model.slug === slug) || null;
}

export function getEvBrandBySlug(slug = "") {
  return evBrands.find((brand) => brand.slug === slug) || null;
}

export function getEvIntentBySlug(slug = "") {
  return evIntents.find((intent) => intent.slug === slug) || null;
}

export function resolveEvSlug(slug = "") {
  if (getEvIntentBySlug(slug)) return { type: "intent", entity: getEvIntentBySlug(slug) };
  if (getEvModelBySlug(slug)) return { type: "model", entity: getEvModelBySlug(slug) };
  if (getEvBrandBySlug(slug)) return { type: "brand", entity: getEvBrandBySlug(slug) };
  return null;
}

export function searchEvOffers({ modelSlug, intentSlug, brandSlug, fitmentSize, filters = {}, sortMode = "best_value" } = {}) {
  const merged = { ...getIntentFilters(intentSlug), ...filters };
  if (brandSlug) merged.brandSlug = brandSlug;
  if (fitmentSize) merged.size = fitmentSize;

  const skus = skuCatalog.filter((sku) => {
    if (modelSlug && !sku.modelSlugs.includes(modelSlug)) return false;
    return matchesFilters(sku, merged);
  });

  const formatted = skus.map((sku) => ({
    skuKey: sku.skuKey,
    brand: sku.brand,
    brandSlug: sku.brandSlug,
    modelName: sku.modelName,
    size: sku.size,
    season: sku.season,
    ev: {
      hlFlag: sku.hlFlag,
      loadDesignation: sku.loadDesignation,
      noiseTech: sku.noiseTech,
      oemMarkings: sku.oemMarkings,
      rollingResistanceScore: sku.rollingResistanceScore,
      rollingResistanceSource: sku.rollingResistanceSource,
      evBadges: Object.fromEntries(sku.evBadges.map((badge) => [badge.replaceAll("-", "_"), true])),
    },
    offers: sortOffers(offers.filter((offer) => offer.skuKey === sku.skuKey), sortMode),
  }));

  const allOffers = formatted.flatMap((sku) => sku.offers);
  return {
    skus: formatted,
    meta: {
      offersTotal: allOffers.length,
      merchants: uniq(allOffers.map((offer) => offer.merchantName)).length,
      generatedAt: new Date().toISOString(),
    },
  };
}

export function getEvModelPageData(slug = "") {
  const model = getEvModelBySlug(slug);
  if (!model) return null;
  const result = searchEvOffers({ modelSlug: slug });
  return {
    ...model,
    skus: result.skus,
    offers: result.skus.flatMap((sku) => sku.offers),
    merchants: uniq(result.skus.flatMap((sku) => sku.offers.map((offer) => offer.merchantName))),
    freshOfferPct: freshPct(result.skus.flatMap((sku) => sku.offers)),
    uniqueContentScore: uniqueContentScore(model),
    existingVehicleHref: getVehiclePageData(model.make, model.model, "2024")
      ? `/vehicles/${model.make}/${model.model}/2024`
      : "",
  };
}

export function getEvBrandPageData(slug = "") {
  const brand = getEvBrandBySlug(slug);
  if (!brand) return null;
  const result = searchEvOffers({ brandSlug: slug });
  const linkedModels = uniq(result.skus.flatMap((sku) => getEvSkuByKey(sku.skuKey)?.modelSlugs || []))
    .map((modelSlug) => getEvModelBySlug(modelSlug))
    .filter(Boolean);
  return { ...brand, ...result, linkedModels, freshOfferPct: freshPct(result.skus.flatMap((sku) => sku.offers)) };
}

export function getEvIntentPageData(slug = "") {
  const intent = getEvIntentBySlug(slug);
  if (!intent) return null;
  const result = searchEvOffers({ intentSlug: slug });
  const linkedModels = uniq(result.skus.flatMap((sku) => getEvSkuByKey(sku.skuKey)?.modelSlugs || []))
    .map((modelSlug) => getEvModelBySlug(modelSlug))
    .filter(Boolean);
  return { ...intent, ...result, linkedModels, freshOfferPct: freshPct(result.skus.flatMap((sku) => sku.offers)) };
}

export function getEvPageIndexState(type, slug) {
  if (type === "model") {
    const page = getEvModelPageData(slug);
    if (!page) return { indexable: false, reason: "missing_model" };
    if (page.offers.length < MODEL_GATES.offers) return { indexable: false, reason: "insufficient_offers", ...page };
    if (page.merchants.length < MODEL_GATES.merchants) return { indexable: false, reason: "insufficient_merchants", ...page };
    if (page.freshOfferPct < MODEL_GATES.freshPct) return { indexable: false, reason: "stale_offers", ...page };
    if (page.uniqueContentScore < MODEL_GATES.content) return { indexable: false, reason: "thin_unique_content", ...page };
    return { indexable: true, reason: "eligible", ...page };
  }

  if (type === "brand") {
    const page = getEvBrandPageData(slug);
    if (!page) return { indexable: false, reason: "missing_brand" };
    const merchants = uniq(page.skus.flatMap((sku) => sku.offers.map((offer) => offer.merchantName))).length;
    const brandEligible = (page.meta.offersTotal >= BRAND_GATES.offers || page.linkedModels.length >= BRAND_GATES.models) && merchants >= BRAND_GATES.merchants;
    return { indexable: brandEligible, reason: brandEligible ? "eligible" : "insufficient_brand_depth", ...page };
  }

  if (type === "intent") {
    const page = getEvIntentPageData(slug);
    if (!page) return { indexable: false, reason: "missing_intent" };
    const merchants = uniq(page.skus.flatMap((sku) => sku.offers.map((offer) => offer.merchantName))).length;
    const ok = page.meta.offersTotal >= INTENT_GATES.offers && merchants >= INTENT_GATES.merchants;
    return { indexable: ok, reason: ok ? "eligible" : "insufficient_intent_depth", ...page };
  }

  return { indexable: false, reason: "unsupported_page_type" };
}

export function getEvHubData() {
  const topModels = evModels.map((model) => getEvPageIndexState("model", model.slug));
  const topIntents = evIntents.map((intent) => getEvPageIndexState("intent", intent.slug));
  const topBrands = evBrands.map((brand) => getEvPageIndexState("brand", brand.slug));
  return {
    topModels,
    topIntents,
    topBrands,
    stats: {
      offersTotal: offers.length,
      merchants: Object.keys(evMerchantConfig).length,
      indexableModels: topModels.filter((item) => item.indexable).length,
      indexableIntents: topIntents.filter((item) => item.indexable).length,
    },
  };
}

export function searchInstallers(zip = "", radius = 25) {
  const prefix = String(zip || "").trim().slice(0, 2);
  const installers = [
    { id: "bay-area-ev-tire-center", name: "Bay Area EV Tire Center", prefixes: ["94"], bookingUrl: `${siteUrl}/ev-tires#installer-leads` },
    { id: "southwest-ev-install-network", name: "Southwest EV Install Network", prefixes: ["85", "89", "90"], bookingUrl: `${siteUrl}/ev-tires#installer-leads` },
    { id: "east-coast-quiet-ride-installers", name: "East Coast Quiet Ride Installers", prefixes: ["10", "11", "19", "20", "21", "22"], bookingUrl: `${siteUrl}/ev-tires#installer-leads` },
  ];
  return installers.filter((installer) => prefix && installer.prefixes.includes(prefix) && Number(radius) >= 25);
}
