# Prelaunch Security & Confidentiality Checklist

- repository is private and collaborator access is reviewed
- secrets are rotated and environment-scoped
- `TSE_ENV` is set correctly in each environment
- preview and staging are protected with auth or network restrictions
- non-production sends `noindex, nofollow, noarchive`
- production browser source maps are disabled
- private API routes require `x-tse-internal-key`
- import/sync routes return 404
- protected redirect flow works and raw affiliate URLs are not exposed in page HTML
- production robots and sitemaps include only approved live pages
- non-production robots and sitemaps do not expose route inventories
- public assets contain no exports, dumps, screenshots, or internal docs
- headers are present: CSP, Referrer-Policy, Permissions-Policy, X-Frame-Options, nosniff
- analytics and logs do not store raw secrets or full affiliate destinations
- CI guardrail check passes
- owner-reviewed CDN/WAF/bot controls are enabled

