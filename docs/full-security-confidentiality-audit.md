# Full Security & Confidentiality Audit

## Summary

This audit focused on confidentiality leaks, competitor intelligence exposure, attack-surface reduction, and runtime hardening for the TireSearchEngine codebase.

## Findings

| Title | Severity | Exact location | Attack or business risk | Remediation | Status |
| --- | --- | --- | --- | --- | --- |
| Hardcoded analytics and verification values | Medium | `app/layout.js` | Public runtime configuration was embedded directly in source, making environment separation weaker and increasing accidental credential/config reuse risk. | Moved to validated environment-driven configuration. | Fixed |
| Publicly named Supabase environment usage in server query layer | High | `app/lib/supabaseClient.js` | Server data access relied on `NEXT_PUBLIC_*` variables, which weakens separation between server-only and public runtime config. | Switched server data access to server env variables with local-only fallback. | Fixed |
| Hardcoded Amazon associate tag | High | `app/lib/amazonOfferCatalog.js` | Affiliate structure and partner identifier were directly encoded in source, making monetization easier to copy. | Moved tag handling to server env and removed hardcoded identifier. | Fixed |
| Raw outbound affiliate destinations exposed to frontend | High | `app/lib/queries.js`, `app/components/AmazonOfferRail.jsx`, `app/ev-tires/[slug]/page.js` | Competitors and scrapers could inspect merchant destinations and relationship structure directly in HTML/client flows. | Added encrypted internal redirect flow via `/visit/[token]`. | Fixed |
| Public import/sync endpoints present | High | `app/api/import-csv/route.js`, `app/api/import-csv/supplier-sync/route.js` | These routes revealed operational import surfaces and could be probed or abused. | Converted routes to hard 404 responses and blocked them in middleware. | Fixed |
| Tracked raw supplier CSV files | High | `data/amazon-offers.csv`, `data/amazon-first-live-batch.csv` | Supplier/export artifacts in source control leak operational data structure and partner workflows. | Sanitized tracked files to header-only templates and added ignore rules for future exports. | Mitigated |
| Repo docs revealed monetization and route strategy | Medium | `AMAZON_AFFILIATE_READINESS.md`, `AMAZON_IMPORT_FOUNDATION.md`, `PROGRAMMATIC_SEO_FOUNDATION.md`, `SEARCH_SUBMISSION_CHECKLIST.md` | A repo leak would have exposed rollout direction, route families, and partner workflow details. | Rewrote docs to operationally discreet versions. | Fixed |
| Minimal `.gitignore` protection | High | `.gitignore` | Sensitive local files, exports, crawl outputs, and temporary artifacts could be committed accidentally. | Expanded ignore rules for env files, exports, logs, data dumps, temp files, and artifacts. | Fixed |
| Empty `next.config.js` left headers and source maps unmanaged | High | `next.config.js` | The app lacked strong baseline security headers and explicit source-map policy. | Added security headers and disabled production browser source maps. | Fixed |
| No environment-based preview/staging protection in code | High | runtime / deployment behavior | Non-production environments could be publicly inspectable and crawlable if hosted without manual protection. | Added middleware support for preview auth, non-production noindex behavior, and private API gating. | Fixed in code; owner config required |
| Public/private API separation was too permissive | High | `app/api/v1/**` | Internal modeling and offer APIs were publicly reachable if deployed as-is, enabling route and dataset probing. | Added internal API key gate in middleware and input validation in handlers. | Fixed |
| Verbose event logging patterns | Medium | `app/api/affiliate-click/route.js`, `app/api/v1/analytics/event/route.js` | Logging patterns could capture sensitive link destinations or internal metadata. | Removed verbose logging and returned generic no-store responses. | Fixed |
| Non-production robots and sitemap leakage | High | `app/robots.js`, `app/sitemap.js`, `app/sitemaps/**` | Preview/staging environments could expose route inventories via robots/sitemaps. | Added non-production robots disallow and empty sitemap responses. | Fixed |
| Missing CI guardrails for confidentiality regressions | Medium | repository tooling | Future commits could reintroduce source maps, import surfaces, or weak ignore rules. | Added a repo guardrail script and GitHub Actions workflow. | Fixed |
| Middleware lacks dedicated WAF/CDN bot controls | Medium | infrastructure | App-level throttling helps, but heavy scraping and volumetric abuse still need edge controls. | Add CDN/WAF bot management and rate limits outside the app. | Owner action |
| Local `.env.local` contains active Supabase values | High | local workspace only | Sensitive runtime values are present locally and should be assumed sensitive. | Keep ignored, rotate if ever shared or previously committed elsewhere. | Owner action |

