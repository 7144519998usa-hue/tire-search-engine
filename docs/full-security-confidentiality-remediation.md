# Full Security & Confidentiality Remediation

## Changes made

- Added centralized runtime configuration in `app/lib/env.js`.
- Moved server data access toward server-only env handling in `app/lib/supabaseClient.js`.
- Replaced raw outbound merchant links with encrypted internal redirect tokens using:
  - `app/lib/outboundRedirect.js`
  - `app/visit/[token]/route.js`
- Updated search and offer rendering code to use protected redirects instead of raw merchant URLs.
- Removed hardcoded Amazon associate handling from source and made it environment-driven.
- Locked down import/sync routes to hard 404 responses and blocked those paths in middleware.
- Added preview/staging protection hooks and internal API gating in `middleware.js`.
- Added security headers and disabled production browser source maps in `next.config.js`.
- Made `robots` and all sitemap outputs environment-aware to prevent non-production route disclosure.
- Expanded `.gitignore` to cover secrets, dumps, logs, exports, temp files, and raw data.
- Sanitized tracked supplier CSVs into header-only placeholders.
- Sanitized repo docs that previously exposed monetization and route strategy.
- Added `scripts/check-security-guardrails.js` and `.github/workflows/security-guardrails.yml`.

## Why each change matters

- Env centralization reduces secret sprawl and hardcoded runtime config.
- Protected redirects make affiliate and supplier relationships harder to reverse-engineer.
- Middleware limits exposure of private APIs and non-production deployments.
- Header hardening reduces clickjacking, framing, referrer leakage, and basic browser attack surface.
- Non-production sitemap/robots controls stop previews from advertising route inventories.
- Git and CI guardrails reduce the chance of reintroducing leaks later.
- Sanitized docs and CSVs reduce repo-side competitor intelligence risk.

## Risk reduced

- Less affiliate intelligence visible in HTML and source.
- Lower chance of public preview or staging discovery.
- Lower chance of route inventory leakage through sitemaps or internal APIs.
- Reduced accidental secret/data commits.
- Reduced risk of basic endpoint probing and unauthenticated internal API use.

## Unresolved risks

- Hosting-level preview protection, WAF rules, and bot controls still require owner configuration.
- Secrets present in local or external systems must still be rotated and segmented by environment.
- If other repos, backups, or dashboards contain old secrets or route plans, those remain exposure points.
- Static route/data structures still exist server-side in source; repo privacy remains critical.

## Manual owner tasks

- Set production-only secrets:
  - `TSE_ENV=production`
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SITE_URL`
  - `TSE_REDIRECT_SECRET`
  - `TSE_INTERNAL_API_KEY`
- Set preview/staging-only protections:
  - `TSE_PREVIEW_USERNAME`
  - `TSE_PREVIEW_PASSWORD`
  - `TSE_ENV=preview` or `TSE_ENV=staging`
- Optionally set:
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
  - `TSE_AMAZON_ASSOCIATE_TAG`
  - `TSE_ENABLE_VERCEL_ANALYTICS`
- Enable preview protection in hosting/CDN, not only in app code.
- Review and rotate any secret that may have existed in local files, CI, or previous repos.
- Keep the repository private and minimize collaborator/admin access.

