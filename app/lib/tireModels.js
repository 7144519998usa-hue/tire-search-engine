export const tireModels = [
  {
    slug: "michelin-defender-2",
    brandSlug: "michelin",
    brandName: "Michelin",
    name: "Defender 2",
    title: "Michelin Defender 2",
    summary:
      "A high-intent all-season touring tire model page built for shoppers comparing tread life, commuter comfort, and premium daily-driving value.",
    supportedSizes: ["205/55R16", "225/65R17", "235/45R18"],
    strengths: [
      "Long tread life and comfort-focused daily driving.",
      "Popular with commuters, family vehicles, and premium sedans.",
      "Strong fit for all-season replacement searches.",
    ],
  },
  {
    slug: "goodyear-assurance-all-season",
    brandSlug: "goodyear",
    brandName: "Goodyear",
    name: "Assurance All-Season",
    title: "Goodyear Assurance All-Season",
    summary:
      "A mainstream all-season model page for shoppers comparing value, broad fitment support, and everyday replacement options.",
    supportedSizes: ["205/55R16", "225/65R17"],
    strengths: [
      "Broad all-season appeal for commuter and SUV shoppers.",
      "Strong fit for budget-conscious replacement decisions.",
      "Useful bridge between brand, size, and category pages.",
    ],
  },
];

export function getTireModelBySlug(slug) {
  return tireModels.find((model) => model.slug === slug);
}
