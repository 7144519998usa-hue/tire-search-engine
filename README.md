# Tire Search Engine Clean

Clean-room rebuild of Tire Search Engine focused on:

- commercial truck tire SEO pages
- exact-size tire pages
- product-first shopping cards
- Tire Rack and Mavis as primary merchant paths
- Amazon as a backup marketplace path
- clean sitemap, robots, canonicals, and structured data

The previous project is reference material only. Do not bulk-copy old routes, caches, generated files, or unrelated verticals into this app.

## Local Commands

```bash
npm run audit:seo
npm run build
```

If Windows blocks local builds with `spawn EPERM`, use Vercel/GitHub Linux builds for validation.

## Required Production Environment

```bash
NEXT_PUBLIC_SITE_URL=https://www.tiresearchengine.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RVN7E6EE7V
NEXT_PUBLIC_INDEXABLE=false
TSE_TIRE_RACK_CJ_TEXT_LINK=
TSE_TIRE_RACK_CJ_CLICK_BASE=https://www.anrdoezrs.net/click-101740681-13697786
TSE_TIRE_RACK_AFFILIATE_URL_TEMPLATE=
TSE_MAVIS_CJ_TEXT_LINK=
TSE_AMAZON_ASSOCIATE_TAG=
```

Set `NEXT_PUBLIC_INDEXABLE=true` only when the production domain is ready. Preview deployments default to noindex so they do not compete with the live TireSearchEngine domain.
