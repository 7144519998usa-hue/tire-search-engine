# Weekly Backup Verification Checklist

Frequency: every Monday
Owner: founder or project lead
Goal: confirm TireSearchEngine.com remains recoverable across code, database, assets, environment, and operational SEO/IP assets.

## Automated report

Run:

```bash
npm run backup:health
```

This generates a Monday health report at:

- [latest backup health report](/C:/TireSearchEngine/recovery-tests/backup-health/latest.md)

## What the report verifies

- repository backup location
- current branch and latest commit visibility
- release tag presence
- database backup method and schedule
- database snapshot timestamp, size, retention, and restore points when configured
- assets backup location
- environment backup encryption method
- offsite backup location
- restore procedure
- first successful backup timestamp
- backup script paths
- scheduler evidence

## Required config

Create `backup-health.config.json` from [backup-health.config.example.json](/C:/TireSearchEngine/backup-health.config.example.json) and fill in the live infrastructure details.

## Weekly founder review questions

1. Can code be rolled back quickly from GitHub and release tags?
2. Is the latest database backup within the expected window?
3. Are assets, environment, and offsite backups recorded explicitly?
4. Is scheduler evidence current and real?
5. Has a restore simulation been documented recently?

## Red flags

- no release tags
- no recorded database snapshot timestamp
- no scheduler evidence
- no offsite location configured
- no staging restore evidence
- no recent backup artifact
