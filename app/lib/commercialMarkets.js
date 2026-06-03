export const commercialStates = [
  { slug: "texas", name: "Texas", hubs: ["Houston", "Dallas", "San Antonio"], corridors: ["I-10", "I-35", "I-45"] },
  { slug: "california", name: "California", hubs: ["Los Angeles", "Ontario", "Fresno"], corridors: ["I-5", "I-10", "SR-99"] },
  { slug: "florida", name: "Florida", hubs: ["Jacksonville", "Tampa", "Miami"], corridors: ["I-75", "I-95", "I-4"] },
  { slug: "georgia", name: "Georgia", hubs: ["Atlanta", "Savannah", "Macon"], corridors: ["I-75", "I-85", "I-20"] },
  { slug: "ohio", name: "Ohio", hubs: ["Columbus", "Cleveland", "Cincinnati"], corridors: ["I-70", "I-71", "I-75"] },
  { slug: "illinois", name: "Illinois", hubs: ["Chicago", "Joliet", "Springfield"], corridors: ["I-80", "I-55", "I-90"] },
  { slug: "pennsylvania", name: "Pennsylvania", hubs: ["Philadelphia", "Pittsburgh", "Harrisburg"], corridors: ["I-76", "I-80", "I-81"] }
];

export function getCommercialState(slug = "") {
  return commercialStates.find((state) => state.slug === slug);
}
