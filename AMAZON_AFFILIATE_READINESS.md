# Amazon Affiliate Readiness

This project now includes an Amazon-ready affiliate foundation intended to support future product population while staying aligned with current Amazon Associates guidance.

What is included:
- Shared Amazon disclosure text in `app/lib/amazonAffiliate.js`
- Amazon offer rendering component in `app/components/AmazonOfferRail.jsx`
- Disclosure component in `app/components/AmazonDisclosure.jsx`
- Page-level data slots in `app/lib/siteData.js`

Implementation intent:
- Use Amazon Special Links that include your Associate tag
- Keep the Amazon disclosure visible where Amazon links appear
- Avoid using Amazon logos, customer reviews, or star ratings unless separately permitted under the relevant Amazon terms
- Prefer Amazon Creators API or Amazon-approved product data workflows rather than manual scraping

Recommended data fields for future population:
- `asin`
- `title`
- `description`
- `specialLink`
- `imageUrl`
- `badge`

Suggested future sources:
- Amazon Creators API documentation
- Approved Associates linking tools

Suggested rollout:
1. Join Amazon Associates and get approved
2. Create your Associate tag
3. Populate Amazon offer arrays in `app/lib/siteData.js`
4. Replace placeholder entries with approved Special Links
5. Add Amazon placements first to:
   - top tire-size pages
   - top brand pages
   - highest-intent guide pages
