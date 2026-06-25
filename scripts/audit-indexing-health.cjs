const fs = require("node:fs");
const path = require("node:path");

const appDir = path.join(process.cwd(), ".next", "server", "app");
const sitemapDir = path.join(appDir, "sitemaps");

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function urlsFromXml(xml) {
  return [...xml.matchAll(/<loc>https:\/\/www\.tiresearchengine\.com([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function htmlFileFor(route) {
  if (route === "/") return path.join(appDir, "index.html");
  return path.join(appDir, `${route.replace(/^\//, "")}.html`);
}

function isKnownDynamicRoute(route) {
  return (
    /^\/vehicles\/[a-z0-9-]+$/.test(route) ||
    /^\/commercial-truck-tires\/[a-z0-9-]+(?:\/(?:steer|drive|trailer))?$/.test(route)
  );
}

if (!fs.existsSync(sitemapDir)) {
  console.error("Build output not found. Run npm run build before audit:indexing.");
  process.exit(1);
}

let sitemapPaths = [];
for (const file of fs.readdirSync(sitemapDir).filter((name) => name.endsWith(".xml.body"))) {
  sitemapPaths.push(...urlsFromXml(read(path.join(sitemapDir, file))));
}

sitemapPaths = [...new Set(sitemapPaths)].sort();

const issues = {
  missingHtml: [],
  noindexInSitemap: [],
  missingCanonical: [],
  canonicalMismatch: [],
  productStructuredDataIssues: []
};

for (const route of sitemapPaths) {
  const htmlPath = htmlFileFor(route);
  if (!fs.existsSync(htmlPath)) {
    if (!isKnownDynamicRoute(route)) issues.missingHtml.push(route);
    continue;
  }

  const html = read(htmlPath);
  if (/name="robots" content="[^"]*noindex/i.test(html)) {
    issues.noindexInSitemap.push(route);
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] || "";
  const expectedCanonical = `https://www.tiresearchengine.com${route}`;
  if (!canonical) {
    issues.missingCanonical.push(route);
  } else if (canonical !== expectedCanonical) {
    issues.canonicalMismatch.push(`${route} -> ${canonical}`);
  }

  if (html.includes('"@type":"Product"') && (!html.includes("aggregateRating") || !html.includes('"review"'))) {
    issues.productStructuredDataIssues.push(route);
  }
}

const issueCount = Object.values(issues).reduce((count, values) => count + values.length, 0);
const summary = {
  sitemapUrls: sitemapPaths.length,
  missingHtml: issues.missingHtml.length,
  noindexInSitemap: issues.noindexInSitemap.length,
  missingCanonical: issues.missingCanonical.length,
  canonicalMismatch: issues.canonicalMismatch.length,
  productStructuredDataIssues: issues.productStructuredDataIssues.length
};

console.log(JSON.stringify(summary, null, 2));

if (issueCount) {
  console.error("Indexing health audit failed:");
  for (const [key, values] of Object.entries(issues)) {
    for (const value of values.slice(0, 25)) {
      console.error(`- ${key}: ${value}`);
    }
    if (values.length > 25) console.error(`- ${key}: ...and ${values.length - 25} more`);
  }
  process.exit(1);
}

console.log("Indexing health audit passed.");
