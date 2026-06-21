const fs = require("node:fs");
const path = require("node:path");

const root = path.join(process.cwd(), ".next", "server", "app");
const htmlFiles = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
}

function parseUrl(value, base) {
  try {
    return base ? new URL(value, base) : new URL(value);
  } catch {
    return null;
  }
}

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function merchantFromHost(host = "") {
  const normalized = host.toLowerCase();
  if (normalized.includes("anrdoezrs.net") || normalized.includes("tirerack.com")) return "tire-rack";
  if (normalized.includes("dpbolvw.net") || normalized.includes("mavis.com")) return "mavis";
  if (normalized.includes("amazon.com")) return "amazon";
  if (normalized.includes("simpletire.com")) return "simpletire";
  if (normalized.includes("prioritytire.com")) return "priority-tire";
  return "";
}

function validateTarget(target, file, href) {
  const parsed = parseUrl(target);
  if (!parsed) return [`Invalid target URL in ${file}: ${href}`];

  const merchant = merchantFromHost(parsed.hostname);
  const issues = [];

  if (merchant === "tire-rack") {
    if (!parsed.hostname.includes("anrdoezrs.net") || !parsed.pathname.includes("click-101740681-13697786")) {
      issues.push(`Tire Rack target missing CJ click ID in ${file}: ${target}`);
    }
  } else if (merchant === "mavis") {
    if (!parsed.hostname.includes("dpbolvw.net") || !parsed.pathname.includes("click-101740681-15765842")) {
      issues.push(`Mavis target missing CJ click ID in ${file}: ${target}`);
    }
    if (!parsed.searchParams.get("url")?.includes("mavis.com")) {
      issues.push(`Mavis target missing deep-link destination in ${file}: ${target}`);
    }
  } else if (merchant === "amazon") {
    if (parsed.searchParams.get("tag") !== "tiresearch-20") {
      issues.push(`Amazon target missing tiresearch-20 tag in ${file}: ${target}`);
    }
  } else if (merchant === "simpletire" || merchant === "priority-tire") {
    issues.push(`Non-affiliate retailer target found in ${file}: ${target}`);
  }

  return issues;
}

walk(root);

const issues = [];
let clickLinks = 0;
let tireRackLinks = 0;
let mavisLinks = 0;
let mavisTireLinks = 0;
let mavisInstallLinks = 0;
let amazonLinks = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => decodeHtml(match[1]));
  for (const href of hrefs) {
    if (/https?:\/\/(www\.)?(tirerack|mavis|amazon|simpletire|prioritytire)\.com/i.test(href)) {
      issues.push(`Direct outbound retailer href found in ${file}: ${href}`);
      continue;
    }

    if (!href.startsWith("/api/click?")) continue;

    clickLinks += 1;
    const clickUrl = parseUrl(href, "https://www.tiresearchengine.com");
    if (!clickUrl) {
      issues.push(`Invalid click href in ${file}: ${href}`);
      continue;
    }

    const target = clickUrl.searchParams.get("target") || "";
    const parsedTarget = parseUrl(target);
    if (!parsedTarget) {
      issues.push(`Missing or invalid click target in ${file}: ${href}`);
      continue;
    }

    const merchant = merchantFromHost(parsedTarget.hostname);
    if (merchant === "tire-rack") tireRackLinks += 1;
    if (merchant === "mavis") {
      mavisLinks += 1;
      const deepLink = parsedTarget.searchParams.get("url") || "";
      if (deepLink.includes("/shop-tires/")) mavisTireLinks += 1;
      if (deepLink.includes("/locations/")) mavisInstallLinks += 1;
    }
    if (merchant === "amazon") amazonLinks += 1;

    issues.push(...validateTarget(target, file, href));
  }
}

const summary = {
  htmlFiles: htmlFiles.length,
  clickLinks,
  tireRackLinks,
  mavisLinks,
  mavisTireLinks,
  mavisInstallLinks,
  amazonLinks
};

if (mavisTireLinks === 0) issues.push("No Mavis tire-shopping affiliate links found.");
if (mavisInstallLinks === 0) issues.push("No Mavis installation/location affiliate links found.");

console.log(JSON.stringify(summary, null, 2));

if (issues.length) {
  console.error(`Affiliate link audit failed with ${issues.length} issue(s):`);
  for (const issue of issues.slice(0, 50)) console.error(`- ${issue}`);
  if (issues.length > 50) console.error(`- ...and ${issues.length - 50} more`);
  process.exit(1);
}

console.log("Affiliate link audit passed.");
