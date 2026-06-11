const fs = require("fs");
const path = require("path");

const root = process.cwd();
const requiredFiles = [
  "app/layout.js",
  "app/page.js",
  "app/robots.js",
  "app/sitemap.xml/route.js",
  "app/sitemap_index.xml/route.js",
  "app/lib/site.js",
  "app/lib/tireData.js",
  "app/lib/schema.js",
  "app/lib/redirects.js",
  "middleware.js",
  "next.config.mjs",
  "package.json"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error("Typecheck failed: required project files are missing.");
  missing.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const requiredScripts = ["build", "start", "import:cj", "audit:seo", "lint", "typecheck"];
const missingScripts = requiredScripts.filter((script) => !packageJson.scripts?.[script]);

if (missingScripts.length) {
  console.error("Typecheck failed: required package scripts are missing.");
  missingScripts.forEach((script) => console.error(`- ${script}`));
  process.exit(1);
}

console.log("JavaScript project structure check passed.");
