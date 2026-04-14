const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const failures = [];

function read(filePath) {
  return fs.readFileSync(path.join(repoRoot, filePath), "utf8");
}

function exists(filePath) {
  return fs.existsSync(path.join(repoRoot, filePath));
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

const gitignore = read(".gitignore");
assert(gitignore.includes(".env*"), "Expected .gitignore to ignore .env files.");
assert(gitignore.includes("data/**/*.csv"), "Expected .gitignore to ignore sensitive data exports.");

const nextConfig = read("next.config.js");
assert(nextConfig.includes("productionBrowserSourceMaps: false"), "Production browser source maps must remain disabled.");
assert(nextConfig.includes("Content-Security-Policy"), "Expected security headers in next.config.js.");
assert(nextConfig.includes("Strict-Transport-Security"), "Expected HSTS in next.config.js.");
assert(nextConfig.includes("object-src 'none'"), "CSP should disable object-src.");

assert(exists("middleware.js"), "Expected middleware.js to enforce environment and API protections.");
assert(exists("app/lib/env.js"), "Expected validated environment module.");
assert(exists("app/lib/outboundRedirect.js"), "Expected protected outbound redirect helper.");
assert(exists("app/lib/requestSecurity.js"), "Expected shared request security helpers.");
assert(exists("app/visit/[token]/route.js"), "Expected internal redirect route.");
assert(exists(".github/workflows/security-scans.yml"), "Expected scheduled security scanning workflow.");

const importRoute = read("app/api/import-csv/route.js");
assert(importRoute.includes("404"), "Import route should not be publicly available.");

if (failures.length) {
  console.error("Security guardrail check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Security guardrail check passed.");
