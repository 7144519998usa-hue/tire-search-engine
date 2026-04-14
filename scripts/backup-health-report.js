const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const repoRoot = process.cwd();
const configPath = path.join(repoRoot, "backup-health.config.json");
const exampleConfigPath = path.join(repoRoot, "backup-health.config.example.json");
const outputRoot = path.join(repoRoot, "recovery-tests", "backup-health");
const gitDir = path.join(repoRoot, ".git");
const now = new Date();
const reportDate = now.toISOString().slice(0, 10);

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function run(command) {
  try {
    return execSync(command, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32" ? "powershell.exe" : true,
    }).trim();
  } catch (error) {
    return "";
  }
}

function exists(relPath) {
  return fs.existsSync(path.join(repoRoot, relPath));
}

function readTextIfExists(filePath) {
  if (!fs.existsSync(filePath)) return "";
  return fs.readFileSync(filePath, "utf8");
}

function getGitRemoteFallback() {
  const config = readTextIfExists(path.join(gitDir, "config"));
  const match = config.match(/\[remote "origin"\][\s\S]*?url = (.+)/);
  return match ? match[1].trim() : "";
}

function getGitBranchFallback() {
  const head = readTextIfExists(path.join(gitDir, "HEAD")).trim();
  const match = head.match(/^ref: refs\/heads\/(.+)$/);
  return match ? match[1] : "";
}

function getLatestCommitFallback() {
  const headLog = readTextIfExists(path.join(gitDir, "logs", "HEAD")).trim();
  if (!headLog) return "";
  const lastLine = headLog.split(/\r?\n/).filter(Boolean).pop();
  if (!lastLine) return "";
  const parts = lastLine.split("\t");
  const left = parts[0] || "";
  const message = parts[1] || "";
  const fields = left.trim().split(/\s+/);
  if (fields.length < 6) return "";
  const sha = fields[1];
  const timestamp = Number(fields[fields.length - 2]);
  const iso = Number.isFinite(timestamp) ? new Date(timestamp * 1000).toISOString() : "";
  return [sha, iso, message].filter(Boolean).join(" | ");
}

function getReleaseTagsFallback() {
  const tags = new Set();
  const refsTagsDir = path.join(gitDir, "refs", "tags");
  if (fs.existsSync(refsTagsDir)) {
    for (const entry of fs.readdirSync(refsTagsDir, { withFileTypes: true })) {
      if (entry.isFile()) tags.add(entry.name);
    }
  }

  const packedRefs = readTextIfExists(path.join(gitDir, "packed-refs"));
  for (const line of packedRefs.split(/\r?\n/)) {
    if (line.startsWith("#") || !line.includes("refs/tags/")) continue;
    const ref = line.split(" ")[1];
    if (!ref) continue;
    tags.add(ref.replace("refs/tags/", ""));
  }

  return Array.from(tags).sort().reverse().slice(0, 5);
}

function findLatestBackupDir() {
  const backupRoot = process.env.BACKUP_ROOT
    ? path.resolve(repoRoot, process.env.BACKUP_ROOT)
    : path.join(repoRoot, "backups", "local");

  if (!fs.existsSync(backupRoot)) return null;

  const dirs = fs
    .readdirSync(backupRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse();

  if (!dirs.length) return null;
  return path.join(backupRoot, dirs[0]);
}

function formatList(items) {
  if (!items || !items.length) return "- none recorded";
  return items.map((item) => `- ${item}`).join("\n");
}

function statusLine(label, ok, details) {
  const state = ok ? "PASS" : "WARN";
  return `- ${label}: ${state}${details ? ` — ${details}` : ""}`;
}

const config = readJsonIfExists(configPath) || {};
const gitRemote = run("git remote get-url origin") || getGitRemoteFallback();
const gitBranch = run("git rev-parse --abbrev-ref HEAD") || getGitBranchFallback();
const latestCommit = run('git log -1 --date=iso --pretty=format:"%H | %ad | %s"') || getLatestCommitFallback();
const releaseTags = (run('git tag --sort=-creatordate').split(/\r?\n/).filter(Boolean).slice(0, 5).length
  ? run('git tag --sort=-creatordate').split(/\r?\n/).filter(Boolean).slice(0, 5)
  : getReleaseTagsFallback());
const statusShort = run("git status --short");
const latestBackupDir = findLatestBackupDir();

const requiredScripts = [
  "scripts/db-backup.sh",
  "scripts/full-backup.sh",
  "scripts/offsite-sync.sh",
  "scripts/db-backup.ps1",
  "scripts/full-backup.ps1",
  "scripts/offsite-sync.ps1",
];

const checks = [
  statusLine("Git remote configured", Boolean(gitRemote), gitRemote || "origin remote missing"),
  statusLine("Current branch detected", Boolean(gitBranch), gitBranch || "branch not detected"),
  statusLine("Latest commit visible", Boolean(latestCommit), latestCommit || "no commit detected"),
  statusLine("Release tags present", releaseTags.length > 0, releaseTags.length ? releaseTags.join(", ") : "no release tags found"),
  statusLine("Backup config present", fs.existsSync(configPath), fs.existsSync(configPath) ? configPath : "create backup-health.config.json from the example file"),
  statusLine("Backup scripts present", requiredScripts.every(exists), requiredScripts.filter((item) => !exists(item)).length ? `missing: ${requiredScripts.filter((item) => !exists(item)).join(", ")}` : "all required scripts found"),
  statusLine("Backup protocol docs present", exists("docs/backup-disaster-recovery-protocol.md") && exists("docs/disaster-recovery.md"), "protocol and restore playbook"),
  statusLine("Security guardrail script present", exists("scripts/check-security-guardrails.js"), "security verification hook available"),
  statusLine("Local backup artifact exists", Boolean(latestBackupDir), latestBackupDir || "no local backup directory found yet"),
  statusLine("Scheduler evidence configured", Boolean(config.schedulerEvidence), config.schedulerEvidence || "scheduler evidence missing from config"),
  statusLine("Database backup timestamp recorded", Boolean(config.databaseLastSuccessfulBackupAt), config.databaseLastSuccessfulBackupAt || "latest successful database backup not recorded"),
  statusLine("First successful backup recorded", Boolean(config.firstSuccessfulBackupAt), config.firstSuccessfulBackupAt || "first successful backup not recorded"),
  statusLine("Restore test evidence recorded", Boolean(config.latestStagingRestoreTestAt || config.stagingRestoreEvidence), (config.latestStagingRestoreTestAt || config.stagingRestoreEvidence) || "staging restore evidence missing"),
];

const report = `# Weekly Backup Health Report

Generated: ${now.toISOString()}
Scope: TireSearchEngine.com Monday backup verification

## Executive Summary

This report verifies the current backup readiness for code, database, assets, environment, offsite copies, and restore-readiness. Missing live evidence is reported as a warning rather than assumed complete.

## Implementation Report

### Repository backup location

- configured remote: ${gitRemote || "not detected"}
- current branch: ${gitBranch || "not detected"}
- latest commit: ${latestCommit || "not detected"}
- release tags:
${formatList(releaseTags)}

### Database backup method and schedule

- method: ${config.databaseBackupMethod || "not configured in backup-health.config.json"}
- schedule: ${config.databaseBackupSchedule || "not configured in backup-health.config.json"}
- backup location: ${config.databaseBackupLocation || "not configured in backup-health.config.json"}
- latest successful backup: ${config.databaseLastSuccessfulBackupAt || "not recorded"}
- backup size: ${config.databaseBackupSize || "not recorded"}
- retention days: ${config.databaseRetentionDays || "not recorded"}
- restore points:
${formatList(config.databaseRestorePoints)}

### Assets backup location

- ${config.assetsBackupLocation || "not configured in backup-health.config.json"}

### Environment backup encryption method

- method: ${config.environmentBackupEncryptionMethod || "not configured in backup-health.config.json"}
- location: ${config.environmentBackupLocation || "not configured in backup-health.config.json"}

### Offsite backup location

- ${config.offsiteBackupLocation || "not configured in backup-health.config.json"}

### Restore procedure

- ${config.restoreProcedure || "docs/disaster-recovery.md"}

### Date/time of first successful backup

- ${config.firstSuccessfulBackupAt || "not recorded"}

### Path of backup scripts

${formatList(requiredScripts)}

### Evidence that cron / scheduler is active

- ${config.schedulerEvidence || "not recorded"}

## Weekly Founder Checklist

### Code backup

${checks.slice(0, 4).join("\n")}

### Database backup

${checks.slice(9, 12).join("\n")}

### Assets, environment, and offsite

- Assets backup location recorded: ${config.assetsBackupLocation ? "PASS" : "WARN"}${config.assetsBackupLocation ? ` — ${config.assetsBackupLocation}` : " — missing config"}
- Environment backup method recorded: ${config.environmentBackupEncryptionMethod ? "PASS" : "WARN"}${config.environmentBackupEncryptionMethod ? ` — ${config.environmentBackupEncryptionMethod}` : " — missing config"}
- Offsite backup location recorded: ${config.offsiteBackupLocation ? "PASS" : "WARN"}${config.offsiteBackupLocation ? ` — ${config.offsiteBackupLocation}` : " — missing config"}
- DNS backup location recorded: ${config.dnsBackupLocation ? "PASS" : "WARN"}${config.dnsBackupLocation ? ` — ${config.dnsBackupLocation}` : " — missing config"}
- Business logic docs backup location recorded: ${config.businessLogicBackupLocation ? "PASS" : "WARN"}${config.businessLogicBackupLocation ? ` — ${config.businessLogicBackupLocation}` : " — missing config"}

### Restore readiness

${checks.slice(12).join("\n")}

## Repo Signals

- local working tree dirty: ${statusShort ? "yes" : "no"}
- latest local backup artifact: ${latestBackupDir || "none"}
- backup config source: ${fs.existsSync(configPath) ? configPath : exampleConfigPath}

## Immediate Follow-Ups

${!fs.existsSync(configPath) ? "- Create backup-health.config.json from backup-health.config.example.json and fill in real infrastructure locations.\n" : ""}${!config.schedulerEvidence ? "- Add real cron, scheduler, or platform evidence so the report can prove jobs are active.\n" : ""}${!config.databaseLastSuccessfulBackupAt ? "- Record the latest successful database snapshot timestamp, size, retention, and restore points.\n" : ""}${!(config.latestStagingRestoreTestAt || config.stagingRestoreEvidence) ? "- Run and document a staging restore simulation; restore proof is currently missing.\n" : ""}${releaseTags.length === 0 ? "- Add release tags before major deployments so rollback state is explicit.\n" : ""}${!latestBackupDir ? "- Run the first local or production backup so artifact evidence exists.\n" : ""}
`;

fs.mkdirSync(outputRoot, { recursive: true });
const latestPath = path.join(outputRoot, "latest.md");
const datedPath = path.join(outputRoot, `${reportDate}.md`);
fs.writeFileSync(latestPath, report, "utf8");
fs.writeFileSync(datedPath, report, "utf8");

process.stdout.write(`${report}\n\nSaved to:\n- ${latestPath}\n- ${datedPath}\n`);
