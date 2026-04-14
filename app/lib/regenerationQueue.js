function scoreRefreshUrgency(entry) {
  const freshnessWeight = entry.changeFrequency === "daily" ? 18 : entry.changeFrequency === "weekly" ? 12 : 8;
  const commercialWeight =
    entry.routeFamily.includes("truck") || entry.routeFamily.includes("ev") || entry.routeFamily.includes("brand")
      ? 10
      : 0;

  return Math.min(100, entry.pageDemandScore + freshnessWeight + commercialWeight);
}

export function buildRegenerationQueue(pageRegistry = []) {
  return pageRegistry
    .filter((entry) => entry.publicationState !== "suppressed")
    .map((entry) => ({
      pageId: `${entry.routeFamily}:${entry.slug}`,
      canonicalPath: entry.canonicalPath,
      triggerType:
        entry.changeFrequency === "daily"
          ? "offer_refresh"
          : entry.routeFamily.includes("vehicle")
            ? "fitment_refresh"
            : "taxonomy_refresh",
      urgency: scoreRefreshUrgency(entry),
      batchGroup: entry.sitemapAssignment,
      lastProcessedTime: null,
      failCount: 0,
      status: "pending",
      dependencyNotes: [`internal_link_refresh:${entry.routeFamily}`, `schema_refresh:${entry.routeFamily}`],
    }))
    .sort((left, right) => right.urgency - left.urgency);
}
