# Disaster Recovery Playbook

This playbook defines the minimum restore sequence for TireSearchEngine.com after deployment failure, data corruption, or infrastructure loss.

## Recovery targets

- `RPO <= 24 hours`
- `RTO <= 2 hours`
- lead and merchant-feed data should aim for `RPO <= 1 hour`

## Pre-incident requirements

- current release tag exists
- latest successful full backup exists
- latest hourly database backup exists
- offsite sync is current
- operators can access secrets and DNS/CDN dashboards

## Scenario A: Bad deployment

1. Roll back to the last stable deployment or release tag.
2. Confirm the site shell and key commercial routes load.
3. Re-run smoke checks:
   - `/`
   - `/tires`
   - `/truck-tires`
   - `/ev-tires`
   - `/compare`
4. Confirm:
   - canonical tags
   - robots directives
   - sitemap availability
   - affiliate redirects
   - lead forms

## Scenario B: Database corruption

1. Stop writes if possible.
2. Identify the latest clean backup.
3. Restore the database snapshot.

Example:

```bash
gunzip -c backups/local/<timestamp>/database/database.sql.gz | psql "$DATABASE_URL"
```

4. Revalidate:
   - route resolution
   - page generation
   - vehicle and size pages
   - merchant mappings
   - lead capture tables
   - internal link graph inputs

## Scenario C: Full server or environment loss

1. Provision replacement infrastructure.
2. Restore encrypted environment configuration.
3. Restore database.
4. Restore static assets.
5. Deploy code from the last stable tag or bundle.
6. Reapply DNS/CDN rules.
7. Validate:
   - DNS resolution
   - homepage and primary route families
   - `robots.txt`
   - sitemap index
   - affiliate redirects
   - lead forms
   - analytics events

## Business-critical validation

Run this checklist after any restore:

- homepage loads
- [tires hub](/C:/TireSearchEngine/app/tires/page.js) equivalent public route works
- [truck hub](/C:/TireSearchEngine/app/truck-tires/page.js) works
- [EV hub](/C:/TireSearchEngine/app/ev-tires/page.js) works
- schema output appears on key pages
- sitemap responses are healthy
- robots rules are correct
- merchant links resolve through tracking safely
- lead forms accept submissions
- analytics and click tracking still fire

## Weekly restore drill

At least weekly:

1. restore a recent backup into a non-production environment
2. validate the routes and monetization flows above
3. record recovery duration and gaps
4. update this document if restore steps changed
