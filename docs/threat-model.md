# Threat Model

## Main assets to protect

- route architecture and page-family expansion strategy
- affiliate and redirect structure
- supplier/import workflow details
- environment secrets and database access
- private APIs and internal tools
- non-production deployments

## Likely attackers

- competitors reverse-engineering SEO and monetization strategy
- scrapers harvesting merchant and route intelligence
- opportunistic attackers probing common web weaknesses
- abusive bots enumerating endpoints and heavy queries

## Top attack paths

- scraping raw outbound affiliate destinations
- probing public APIs for inventories or route families
- indexing or discovering preview/staging deployments
- harvesting data from public assets, CSVs, docs, or source maps
- exploiting open redirects or weak import/debug routes

## Mitigation summary

- protected redirect encryption for outbound links
- middleware gating for private APIs and non-production access
- environment-aware robots and sitemap suppression
- stronger security headers and no-store responses for sensitive paths
- repo/documentation hygiene and CI guardrails
