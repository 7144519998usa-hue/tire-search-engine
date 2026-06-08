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
npm run import:cj
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

## CJ Product Catalog Import

CJ confirmed API access for joined advertisers. Keep the Personal Access Token server-side only; never add it as a `NEXT_PUBLIC_` value.

Create `.env.local` for local importing:

```bash
CJ_PERSONAL_ACCESS_TOKEN=
CJ_WEBSITE_ID=
CJ_ADVERTISER_IDS=1463221
CJ_PRODUCT_SEARCH_ENDPOINT=https://ads.api.cj.com/query
CJ_PRODUCT_LIMIT=1000
CJ_PRODUCT_BATCH_KEYWORDS=tires,truck tires,semi truck tires,commercial truck tires,steer tires,drive tires,trailer tires,winter tires,all season tires,all terrain tires,EV tires,205/55R16,225/65R17,235/45R18,235/60R18,245/60R18,265/60R18,275/55R20,275/60R20,11R22.5,295/75R22.5,445/50R22.5
```

Run:

```bash
npm run import:cj
```

The importer writes normalized products to `app/lib/cjProductCatalog.js`. If CJ provides a different GraphQL query shape for this account, save that query to a local file and set `CJ_PRODUCT_SEARCH_QUERY_FILE=path/to/query.graphql`.
