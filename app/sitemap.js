import { featuredSizes, siteUrl } from "./lib/siteData";

export default function sitemap() {
  const sizePages = featuredSizes.map((item) => ({
    url: `${siteUrl}/tire-size/${item.size.toLowerCase()}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/search`,
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...sizePages,
  ];
}
