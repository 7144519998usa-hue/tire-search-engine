const replacements = [
  [/\bexplore\b/gi, "compare"],
  [/\bdiscover\b/gi, "review"],
  [/\bunlock\b/gi, "use"],
  [/\boptimi[sz]e\b/gi, "improve"],
  [/\bpremium solution\b/gi, "practical option"],
  [/\bcurated\b/gi, "selected"],
  [/\btailored\b/gi, "matched"],
  [/\belevate\b/gi, "improve"],
  [/\bseamless\b/gi, "straightforward"],
  [/\bsmart tire\b/gi, "tire"],
  [/\btransform\b/gi, "change"]
];

export const blockedAiPhrases = [
  "unlock",
  "premium solution",
  "curated",
  "tailored",
  "elevate",
  "discover top",
  "optimize your",
  "seamless experience"
];

export function humanizeCopy(value = "") {
  return replacements.reduce((copy, [pattern, replacement]) => copy.replace(pattern, replacement), String(value || ""))
    .replace(/\s+/g, " ")
    .trim();
}

export function hasAiLanguage(value = "") {
  const copy = String(value || "").toLowerCase();
  return blockedAiPhrases.some((phrase) => copy.includes(phrase));
}
