export const amazonDisclosureText =
  "As an Amazon Associate I earn from qualifying purchases.";

export const amazonComplianceNotes = [
  "Use Amazon Special Links with your Associate tag instead of plain outbound links when promoting Amazon products.",
  "Keep the Amazon Associate disclosure visible anywhere Amazon affiliate links appear.",
  "Do not use Amazon customer reviews or star ratings unless sourced and used under the applicable Amazon API/license terms.",
  "Do not imply Amazon endorses, sponsors, or is formally affiliated with TireSearchEngine beyond the Associates relationship.",
  "For programmatic product data, prefer Amazon Creators API or the current approved Amazon product data source rather than manual scraping.",
];

export function normalizeAmazonOffer(offer) {
  if (!offer || !offer.specialLink) {
    return null;
  }

  return {
    merchant: "Amazon",
    badge: offer.badge || "Amazon pick",
    title: offer.title,
    description: offer.description,
    specialLink: offer.specialLink,
    asin: offer.asin || "",
    imageUrl: offer.imageUrl || "",
    priority: offer.priority || 0,
    score: offer.score || 0,
  };
}

export function hasAmazonOffers(items = []) {
  return items.some((item) => Boolean(item?.specialLink));
}
