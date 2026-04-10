# Amazon Import Foundation

This project is now prepared for bulk Amazon tire-offer imports.

## Import source

Populate `data/amazon-offers.csv` with approved Amazon product links and page-matching fields.

Current columns:

- `asin`
- `title`
- `description`
- `brand`
- `size`
- `badge`
- `productUrl`
- `specialLink`
- `imageUrl`
- `guideSlugs`
- `vehicleKeys`
- `compareKeys`
- `homepage`
- `tags`

## Matching rules

Offers can appear on:

- homepage
- tire-size pages
- brand pages
- guide pages
- vehicle pages
- brand + size comparison pages

Use pipe-separated values for multi-target fields:

- `guideSlugs`: `best-all-season-tires|best-suv-tires`
- `vehicleKeys`: `toyota/camry/2024|honda/civic/2024`
- `compareKeys`: `michelin/205-55r16|goodyear/225-65r17`

## Link rules

- Prefer a valid Amazon `specialLink` when available.
- If `specialLink` is blank and `productUrl` is an Amazon URL, the site appends the Associates tag `tiresearch-20`.
- Keep the Amazon Associate disclosure visible anywhere Amazon offers render.
- Do not scrape Amazon pages for product content.
- Do not use Amazon star ratings or reviews unless permitted by the approved Amazon data source you are using.

## Scaling path

Good next step:

1. Move this CSV into Supabase storage or tables.
2. Build an importer that writes the same fields.
3. Add API sync once your Amazon-approved product data access is ready.
