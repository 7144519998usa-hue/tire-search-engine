const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const configPath = path.join(repoRoot, "security-health.config.json");
const exampleConfigPath = path.join(repoRoot, "security-health.config.example.json");
const outputRoot = path.join(repoRoot, "recovery-tests", "security-health");
const now = new Date();
const reportDate = now.toISOString().slice(0, 10);

function exists(relPath) {
  return fs.existsSync(path.join(repoRoot, relPath));
}

function read(relPath) {
  return fs.readFileSync(path.join(repoRoot, relPath), "utf8");
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function statusLine(label, ok, details) {
  return `- ${label}: ${ok ? "PASS" : "WARN"}${details ? ` — ${details}` : ""}`;
}

const config = readJsonIfExists(configPath) || {};
const nextConfig = read("next.config.js");
const middleware = read("middleware.js");
const securityWorkflowExists = exists(".github/workflows/security-scans.yml");

const appProtections = [
  statusLine("Security headers configured", nextConfig.includes("Content-Security-Policy"), "CSP, HSTS, COOP, CORP, Referrer-Policy"),
  statusLine("Import routes blocked", read("app/api/import-csv/route.js").includes("404"), "public CSV imports disabled"),
  statusLine("Internal API protection enabled", middleware.includes("x-tse-internal-key"), "internal API key gate in middleware"),
  statusLine("Rate limiting enabled", middleware.includes("findRateLimitRule"), "route-specific rate limits in middleware"),
  statusLine("Anti-scraping user-agent filter enabled", middleware.includes("isSuspiciousUserAgent"), "suspicious UA blocking on sensitive routes"),
  statusLine("Non-production preview auth enabled", middleware.includes("WWW-Authenticate"), "preview environments require credentials"),
  statusLine("Weekly vulnerability scan workflow present", securityWorkflowExists, "scheduled GitHub Actions scan"),
];

const infraProtections = [
  statusLine("Cloudflare WAF enabled", Boolean(config.cloudflareWafEnabled), config.cloudflareWafEnabled || "missing config"),
  statusLine("Cloudflare DDoS protection enabled", Boolean(config.cloudflareDdosProtectionEnabled), config.cloudflareDdosProtectionEnabled || "missing config"),
  statusLine("Cloudflare bot protection enabled", Boolean(config.cloudflareBotProtectionEnabled), config.cloudflareBotProtectionEnabled || "missing config"),
  statusLine("Rate limit evidence recorded", Boolean(config.cloudflareRateLimitEvidence || config.antiScrapingRuleEvidence), config.cloudflareRateLimitEvidence || config.antiScrapingRuleEvidence || "missing config"),
  statusLine("Server firewall evidence recorded", Boolean(config.serverFirewallEvidence), config.serverFirewallEvidence || "missing config"),
  statusLine("SSH lockdown evidence recorded", Boolean(config.sshLockdownEvidence), config.sshLockdownEvidence || "missing config"),
  statusLine("Secrets manager configured", Boolean(config.secretsManager), config.secretsManager || "missing config"),
  statusLine("Traffic/attack alerts configured", Array.isArray(config.trafficAlertDestinations) && config.trafficAlertDestinations.length > 0, Array.isArray(config.trafficAlertDestinations) ? config.trafficAlertDestinations.join(", ") : "missing config"),
  statusLine("MFA-protected admin access recorded", Boolean(config.mfaAdminMethod), config.mfaAdminMethod || "missing config"),
  statusLine("Origin lockdown method recorded", Boolean(config.originLockdownMethod), config.originLockdownMethod || "missing config"),
  statusLine("Weekly vulnerability scan evidence recorded", Boolean(config.weeklyVulnerabilityScanEvidence || config.latestVulnerabilityScanAt), config.weeklyVulnerabilityScanEvidence || config.latestVulnerabilityScanAt || "missing config"),
  statusLine("Monthly restore simulation recorded", Boolean(config.monthlyRestoreSimulationAt || config.monthlyRestoreSimulationEvidence), config.monthlyRestoreSimulationAt || config.monthlyRestoreSimulationEvidence || "missing config"),
  statusLine("Monthly penetration simulation recorded", Boolean(config.monthlyPenTestSimulationAt || config.monthlyPenTestSimulationEvidence), config.monthlyPenTestSimulationAt || config.monthlyPenTestSimulationEvidence || "missing config"),
];

const report = `# Security Implementation Report

Generated: ${now.toISOString()}
Scope: TireSearchEngine.com production-grade security hardening

## Active App-Side Protections

${appProtections.join("\n")}

## Infrastructure Protections Requiring Platform Evidence

${infraProtections.join("\n")}

## Current Production Controls Summary

### 1. Cloudflare WAF + DDoS + bot protection
- status: ${config.cloudflareWafEnabled && config.cloudflareDdosProtectionEnabled && config.cloudflareBotProtectionEnabled ? "configured" : "pending evidence"}
- zone: ${config.cloudflareZone || "not configured"}

### 2. Anti-scraping rules and rate limits
- app-side status: active in middleware for sensitive routes
- edge-side evidence: ${config.cloudflareRateLimitEvidence || config.antiScrapingRuleEvidence || "not recorded"}

### 3. OWASP Top 10 application hardening
- status: partially active in codebase
- active controls:
  - CSP and security headers
  - internal API gating
  - blocked import surfaces
  - route-level rate limiting
  - non-production auth
- remaining proof needed:
  - live secrets platform evidence
  - server firewall and origin lockdown evidence

### 4. SSH / server firewall lockdown
- ${config.serverFirewallEvidence || "not recorded"}
- ${config.sshLockdownEvidence || "not recorded"}

### 5. Encrypted secrets management
- ${config.secretsManager || "not recorded"}
- environment backup method: ${config.environmentEncryptionMethod || "not recorded"}

### 6. Real-time traffic and attack alerts
- ${Array.isArray(config.trafficAlertDestinations) && config.trafficAlertDestinations.length ? config.trafficAlertDestinations.join(", ") : "not recorded"}

### 7. MFA-protected admin access
- ${config.mfaAdminMethod || "not recorded"}

### 8. Hidden origin IP and CDN-only access
- app support: optional edge shared secret gate present in middleware
- production method: ${config.originLockdownMethod || "not recorded"}

### 9. Weekly vulnerability scans
- code workflow: ${securityWorkflowExists ? "present" : "missing"}
- evidence: ${config.weeklyVulnerabilityScanEvidence || config.latestVulnerabilityScanAt || "not recorded"}

### 10. Monthly restore + penetration test simulation
- restore evidence: ${config.monthlyRestoreSimulationAt || config.monthlyRestoreSimulationEvidence || "not recorded"}
- penetration evidence: ${config.monthlyPenTestSimulationAt || config.monthlyPenTestSimulationEvidence || "not recorded"}

## Immediate Follow-Ups

${!fs.existsSync(configPath) ? "- Create security-health.config.json from the example file and fill in real Cloudflare, firewall, secrets, alerting, MFA, and test evidence.\n" : ""}${!config.cloudflareWafEnabled ? "- Record live Cloudflare WAF status and managed ruleset evidence.\n" : ""}${!config.serverFirewallEvidence ? "- Record SSH and firewall lockdown evidence from the production host.\n" : ""}${!config.mfaAdminMethod ? "- Record the actual MFA control used for admin access.\n" : ""}${!(config.monthlyRestoreSimulationAt || config.monthlyRestoreSimulationEvidence) ? "- Run and document the monthly restore simulation.\n" : ""}${!(config.monthlyPenTestSimulationAt || config.monthlyPenTestSimulationEvidence) ? "- Run and document the monthly penetration simulation.\n" : ""}
`;

fs.mkdirSync(outputRoot, { recursive: true });
const latestPath = path.join(outputRoot, "latest.md");
const datedPath = path.join(outputRoot, `${reportDate}.md`);
fs.writeFileSync(latestPath, report, "utf8");
fs.writeFileSync(datedPath, report, "utf8");

process.stdout.write(`${report}\n\nSaved to:\n- ${latestPath}\n- ${datedPath}\n`);
