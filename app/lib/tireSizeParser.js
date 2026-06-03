const LOCATION_MARKERS = ["near", "in", "at"];

function cleanInput(input = "") {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/^p(?=\d)/, "")
    .replace(/%2f/gi, "/")
    .replace(/%20/gi, " ");
}

function titleCaseLocation(value = "") {
  const parts = String(value || "").split("-").filter(Boolean);
  const state = parts.length > 1 ? parts.at(-1).toUpperCase() : "";
  const city = (state ? parts.slice(0, -1) : parts)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return state ? `${city}, ${state}` : city;
}

export function parseTireSize(input = "") {
  const raw = cleanInput(input);
  if (!raw || LOCATION_MARKERS.some((marker) => raw.includes(`-${marker}-`) || raw.includes(` ${marker} `))) {
    return null;
  }

  const commercialSimple = raw.match(/^(\d{1,2})\s*r\s*[-.]?\s*(\d{2})[.-](\d)$/);
  if (commercialSimple) {
    const [, width, rimMajor, rimMinor] = commercialSimple;
    return {
      slug: `${width}r${rimMajor}-${rimMinor}`,
      display: `${width.toUpperCase()}R${rimMajor}.${rimMinor}`,
      width,
      aspectRatio: "",
      rimDiameter: `${rimMajor}.${rimMinor}`,
      commercial: true
    };
  }

  const passenger = raw.match(/^(\d{3})\s*[\/\-\s]?\s*(\d{2})\s*[\/\-\s]?\s*r?\s*(\d{2})(?:[.-](\d))?$/);
  if (passenger) {
    const [, width, aspectRatio, rimMajor, rimMinor] = passenger;
    const commercial = Boolean(rimMinor);
    return {
      slug: rimMinor ? `${width}-${aspectRatio}-r${rimMajor}-${rimMinor}` : `${width}-${aspectRatio}-r${rimMajor}`,
      display: rimMinor ? `${width}/${aspectRatio}R${rimMajor}.${rimMinor}` : `${width}/${aspectRatio}R${rimMajor}`,
      width,
      aspectRatio,
      rimDiameter: rimMinor ? `${rimMajor}.${rimMinor}` : rimMajor,
      commercial
    };
  }

  return null;
}

export function normalizeTireSize(input = "") {
  return parseTireSize(input)?.slug || "";
}

export function formatTireSize(input = "") {
  const parsed = parseTireSize(input);
  return parsed?.display || String(input || "").toUpperCase().replace(/-/g, "/");
}

export function isValidTireSize(input = "") {
  return Boolean(parseTireSize(input));
}

export function detectCommercialSize(input = "") {
  return Boolean(parseTireSize(input)?.commercial);
}

export function canonicalizeSizeUrl(input = "") {
  const parsed = parseTireSize(input);
  return parsed ? `/tires/${parsed.slug}` : "";
}

export function extractSizeFromSlug(slug = "") {
  const parts = String(slug || "").toLowerCase().split("-near-");
  return parseTireSize(parts[0]);
}

export function parseMalformedNearSlug(slug = "") {
  const match = String(slug || "").toLowerCase().match(/^(.+)-near-([a-z][a-z-]+-[a-z]{2})$/);
  if (!match) return null;
  const size = parseTireSize(match[1]);
  if (!size) return null;
  return {
    size,
    cityStateSlug: match[2],
    cityStateDisplay: titleCaseLocation(match[2])
  };
}

export function formatCityState(slug = "") {
  return titleCaseLocation(String(slug || "").toLowerCase().replace(/[^a-z0-9-]/g, "-"));
}
