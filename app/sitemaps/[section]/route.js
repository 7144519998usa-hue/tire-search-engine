import { notFound } from "next/navigation";
import { absoluteSitemapUrl, pagePriority, sitemapPathsForSection, sitemapSectionAliases, sitemapSections } from "../../lib/sitemapData.js";

function xmlEscape(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function generateStaticParams() {
  return sitemapSections.map((section) => ({ section: `${section}.xml` }));
}

export function GET(_request, { params }) {
  const section = String(params.section || "").replace(/\.xml$/i, "");
  const canonicalSection = sitemapSectionAliases[section] || section;
  if (!sitemapSections.includes(canonicalSection)) {
    notFound();
  }

  const lastmod = new Date().toISOString();
  const paths = sitemapPathsForSection(canonicalSection);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url>
    <loc>${xmlEscape(absoluteSitemapUrl(path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${pagePriority(path)}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
