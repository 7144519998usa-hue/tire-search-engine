import {
  featuredBrandPages,
  featuredSizes,
  seoGuides,
  siteUrl,
  sizeToSlug,
} from "./lib/siteData";
import { getProgrammaticBrandSizeCombos } from "./lib/programmaticSeo";
import { featuredVehicles } from "./lib/vehicleSeo";

export default function sitemap() {
  const sizePages = featuredSizes.map((item) => ({
    url: `${siteUrl}/tire-size/${sizeToSlug(item.size)}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const guidePages = seoGuides.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    changeFrequency: "weekly",
    priority: 0.78,
  }));

  const brandPages = featuredBrandPages.map((brand) => ({
    url: `${siteUrl}/brands/${brand.slug}`,
    changeFrequency: "weekly",
    priority: 0.76,
  }));

  const comparePages = getProgrammaticBrandSizeCombos().map((item) => ({
    url: `${siteUrl}/compare/${item.brandSlug}/${item.sizeSlug}`,
    changeFrequency: "weekly",
    priority: 0.72,
  }));

  const vehiclePages = featuredVehicles.map((vehicle) => ({
    url: `${siteUrl}/vehicle/${vehicle.make}/${vehicle.model}/${vehicle.year}`,
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
      url: `${siteUrl}/tire-sizes`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/brands`,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/guides`,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/vehicles`,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/deals/amazon-tires`,
      changeFrequency: "daily",
      priority: 0.84,
    },
    ...sizePages,
    ...guidePages,
    ...brandPages,
    ...comparePages,
    ...vehiclePages,
  ];
}
