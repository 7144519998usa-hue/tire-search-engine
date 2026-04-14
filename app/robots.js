import { appEnv } from "./lib/env";
import { siteUrl } from "./lib/siteData";

export default function robots() {
  if (appEnv.isNonProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*?*sort=",
          "/*?*page=",
          "/*?*utm_",
          "/ev-tires/*?*",
          "/search*",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
