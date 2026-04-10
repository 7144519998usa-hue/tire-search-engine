# Programmatic SEO Foundation

This project now includes a scalable basis for programmatic SEO using structured dimensions instead of one-off pages.

Current dimensions:
- Tire sizes in `app/lib/siteData.js`
- Brand pages in `app/lib/siteData.js`
- Guide pages in `app/lib/siteData.js`
- Brand-size combinations in `app/lib/programmaticSeo.js`

Current scalable route:
- `/compare/[brand]/[size]`

Examples:
- `/compare/michelin/205-55r16`
- `/compare/goodyear/225-65r17`
- `/compare/bfgoodrich/245-75r16`

How to scale slowly:
1. Add more sizes to `featuredSizes`
2. Add more brands to `featuredBrandPages`
3. Expand `allowedBrandSizeMap` in `app/lib/programmaticSeo.js`
4. Add more route families later such as:
   - `/best/[vehicle]/[size]`
   - `/brands/[brand]/[category]`
   - `/compare/[brand]/[size]/[category]`
   - `/vehicles/[make]/[model]/[year]/[size]`

Why this matters:
- Shared metadata patterns
- Shared content blueprints
- Shared internal linking
- Controlled page growth instead of publishing thousands of thin pages at once
