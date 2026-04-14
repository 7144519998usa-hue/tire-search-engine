import { siteUrl } from "./lib/siteData";
import { getIndexablePageRegistryEntries } from "./lib/pageRegistry";
import { appEnv } from "./lib/env";

export default function sitemap() {
  if (appEnv.isNonProduction) {
    return [];
  }

  return getIndexablePageRegistryEntries().map((entry) => ({
    url: entry.canonicalUrl || `${siteUrl}${entry.canonicalPath}`,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
