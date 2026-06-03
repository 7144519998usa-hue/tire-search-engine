import { isIndexable, siteUrl } from "./lib/site";

export default function robots() {
  return {
    rules: isIndexable
      ? [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/go/", "/search"]
          }
        ]
      : [
          {
            userAgent: "*",
            disallow: "/"
          }
        ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
