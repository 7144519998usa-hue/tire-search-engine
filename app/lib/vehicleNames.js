const vehicleNameOverrides = {
  "bmw": "BMW",
  "cr-v": "CR-V",
  "f-150": "F-150",
  "gmc": "GMC",
  "rav4": "RAV4",
  "santa-fe": "Santa Fe",
  "mercedes-benz": "Mercedes-Benz"
};

export function vehicleDisplayName(value = "") {
  const normalized = String(value).toLowerCase();
  if (vehicleNameOverrides[normalized]) {
    return vehicleNameOverrides[normalized];
  }

  return normalized
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
