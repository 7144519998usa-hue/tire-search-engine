# Backup & Disaster Recovery Protocol

This repo treats backup and disaster recovery as revenue protection. The target operating objectives are:

- `RPO <= 24 hours` for the full platform
- `RPO <= 1 hour` for lead and merchant-feed data where possible
- `RTO <= 2 hours` for core site restore

## Backup scope

The backup system must cover:

- source code and deployment history
- database state
- static/media assets
- SEO operating assets and templates
- encrypted environment and infrastructure configuration
- rollback metadata for releases

## Required retention policy

- hourly database backups for the last 24 hours
- daily full backups for 30 days
- weekly backups for 12 weeks
- monthly archives for 12 months

## 3-2-1 storage rule

- 3 copies: production, local backup store, offsite archive
- 2 storage media/providers
- 1 offsite copy on a separate provider

## Scripts in this repo

- [scripts/db-backup.sh](/C:/TireSearchEngine/scripts/db-backup.sh)
- [scripts/full-backup.sh](/C:/TireSearchEngine/scripts/full-backup.sh)
- [scripts/offsite-sync.sh](/C:/TireSearchEngine/scripts/offsite-sync.sh)
- [scripts/db-backup.ps1](/C:/TireSearchEngine/scripts/db-backup.ps1)
- [scripts/full-backup.ps1](/C:/TireSearchEngine/scripts/full-backup.ps1)
- [scripts/offsite-sync.ps1](/C:/TireSearchEngine/scripts/offsite-sync.ps1)

Use the Bash scripts for Linux production jobs and the PowerShell scripts for Windows/local operator workflows.

## Required environment variables

- `DATABASE_URL`
- `BACKUP_ROOT`
- `BACKUP_OFFSITE_URI`
- `BACKUP_ENV_FILE` optional
- `GPG_RECIPIENT` or `GPG_PASSPHRASE`

## Suggested schedules

### Linux cron

```cron
0 * * * * cd /srv/tiresearchengine && /bin/bash scripts/db-backup.sh
0 2 * * * cd /srv/tiresearchengine && /bin/bash scripts/full-backup.sh
0 3 * * * cd /srv/tiresearchengine && /bin/bash scripts/offsite-sync.sh
```

### Windows Task Scheduler

- hourly: `powershell -ExecutionPolicy Bypass -File scripts\db-backup.ps1`
- daily full backup: `powershell -ExecutionPolicy Bypass -File scripts\full-backup.ps1`
- daily offsite sync: `powershell -ExecutionPolicy Bypass -File scripts\offsite-sync.ps1`

## Git protection standards

- protect `main` and `production`
- disallow force push
- preserve commit history
- create rollback tags before major deployments

Example:

```bash
git tag release-2026-04-13-v1
git push origin --tags
```

## Restore validation checklist

After any restore, verify:

- homepage loads
- `/tires`
- `/truck-tires`
- `/ev-tires`
- `robots.txt`
- sitemap output
- merchant links
- lead forms
- analytics scripts/events
- affiliate redirects and tracking

## Security controls

- encrypt environment and secret backups with AES-256 capable tooling
- do not store backups on public URLs
- restrict backup access to operators only
- rotate backup keys quarterly
- keep backup storage out of web root and out of crawlable locations
