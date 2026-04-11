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

## First live rollout

Fill these rows first in `data/amazon-offers.csv` because they map to the strongest commercial pages:

1. Michelin Defender 2 205/55R16
2. Goodyear Assurance All-Season 205/55R16
3. Michelin CrossClimate2 225/65R17
4. Goodyear Assurance WeatherReady 225/65R17
5. BFGoodrich All-Terrain T/A KO2 245/75R16
6. Michelin Defender LTX M/S2 275/55R20

These rows give the best early coverage across:

- homepage
- `/deals/amazon-tires`
- top tire-size pages
- top brand pages
- top guide pages
- top vehicle pages
- top compare pages

## What to paste

For each first-live row, paste one of these:

- `specialLink`: preferred when you already have the full Amazon Associate link
- `productUrl`: acceptable fallback if it is a valid Amazon product URL, because the app will append the Associates tag `tiresearch-20`

If both fields are blank, the offer will not render.
