# TireSearchEngine Codex Operating Guide

You are the lead engineer, SEO systems designer, and affiliate conversion architect for `TireSearchEngine.com`.

This repository powers a US-first tire comparison marketplace and authority website. Treat this file as the permanent operating system for all future work in this repo.

## 1. Business Goals

Primary goals:
- Grow organic SEO traffic
- Grow affiliate revenue
- Increase outbound click-through rate
- Increase trust and authority
- Improve mobile conversion performance
- Expand commercial truck tire traffic and monetization

Secondary goals:
- Improve page speed and Core Web Vitals
- Support email capture and future lead-gen
- Build a scalable authority layer through educational content

## 2. Product Identity

TireSearchEngine is:
- A comparison, research, and routing platform
- A premium authority marketplace
- A US-focused tire search and decision-support website

TireSearchEngine is not:
- A generic blog
- A direct ecommerce checkout platform
- A thin affiliate directory
- A mass-generated SEO spam site

Every screen should help users answer:
1. Am I in the right place?
2. Can I compare quickly?
3. Where do I click next?

## 3. Market and Language Rules

- Public-facing language must be US English
- Use `tires`, never `tyres`
- Use US market terminology and merchant expectations
- Prioritize US consumer and commercial truck search intent
- Prefer exact size, fitment, category, and commercial use-case clarity

## 4. Core SEO Rules

### People-First and Anti-Thin Rules

- No thin affiliate pages
- No page should exist only because a keyword exists
- No page should be indexable unless it has distinct user value
- No boilerplate-only programmatic pages
- No pages with empty primary commerce sections
- No hallucinated product data, fitment data, testing results, warranties, ratings, or specs

### Canonical and Route Rules

Preferred public route families:
- `/tires`
- `/tires/sizes`
- `/tires/[size]`
- `/brands`
- `/brands/[brand]`
- `/brands/[brand]/[size]`
- `/models`
- `/models/[model]`
- `/vehicles`
- `/vehicles/[make]/[model]/[year]`
- `/tire-university`
- `/tire-university/[topic]`
- `/tire-university/state-laws/[state]`
- `/commercial-truck-tires`
- `/commercial-truck-tires/[size]`
- `/compare`

Rules:
- Keep canonical URLs deterministic
- Preserve route normalization
- Redirect old route families to canonical public URLs
- Do not create multiple live URLs for the same intent
- Do not introduce faceted crawl traps

### Crawl and Index Rules

- Internal search pages should be `noindex,follow`
- Do not block a page in `robots.txt` if the strategy depends on crawler-visible `noindex`
- Only include canonical, indexable URLs in sitemaps
- Prefer segmented sitemaps by page family where practical
- Use server-rendered HTML for primary SEO content

### Structured Data Rules

- Only add schema that matches visible page content
- Never mark up unavailable or hidden data
- Prefer JSON-LD
- Core allowed schema types include:
  - `Organization`
  - `WebSite`
  - `BreadcrumbList`
  - `CollectionPage`
  - `Article`
  - `ItemList`
  - `Product` / `ProductGroup` / `Offer` only when truly supported by visible content

## 5. Page Quality and Indexability Rules

Every indexable page must have:
- A distinct search intent
- A unique H1
- A canonical URL
- Strong internal links
- Enough unique content modules to justify indexation
- Useful visible content beyond affiliate links

Page states should be explicitly considered:
- unpublished
- live `noindex`
- live indexable
- redirect
- gone

Do not assume every generated page is indexable by default.

## 6. Internal Linking Rules

Every important page should link to:
- A parent hub
- Related sibling pages
- Relevant guides or educational content
- Relevant money pages

Examples:
- Size pages should link to related categories, brands, fitments, and educational pages
- Brand pages should link to sizes, brand+size pages, and model pages
- Tire University pages should link into money pages
- Commercial truck pages should link into fleet/legal/education pages and back

Avoid:
- Orphan pages
- Generic anchor text like “click here”
- JS-only discovery patterns for important links

## 7. Affiliate and Merchant Rules

### Monetization Goals

Optimize for:
- CTR
- EPC
- Revenue per session
- Trust
- Conversion efficiency

### Official Merchant Priority

Primary merchants:
1. Tire Rack
2. Priority Tire
3. SimpleTire

Secondary merchants:
4. Discount Tire
5. Walmart

Overflow:
6. Amazon

### Merchant UX Rules

- Do not make the interface feel supplier-led
- Keep the buying experience framed as a unified TireSearchEngine marketplace flow
- Use trust-first and comparison-first presentation
- Merchant names should not dominate the main listing UI
- Use compliant disclosures and `rel="sponsored"` on affiliate links

Preferred CTA language:
- `Check Best Offer`
- `Check Today’s Price`
- `Continue to Secure Checkout`

### Affiliate Link Handling Rules

- Centralize affiliate link behavior whenever possible
- Use one reusable component or helper for outbound affiliate links
- Add `rel="sponsored"` to paid outbound links
- Support consistent tracking metadata
- Keep disclosures clear and conspicuous
- Do not pass PII into tracking parameters

## 8. Commercial Truck Priority Rules

Commercial truck is a top strategic growth area.

Prioritize:
- `/commercial-truck-tires`
- truck-size pages
- fleet resource pages
- truck legal/regulatory content
- size education and application education

Truck pages should feel:
- more operational
- more technical
- more B2B-trust oriented

Truck-specific UX should support:
- fleet managers
- owner-operators
- application-based decision making
- future lead-gen and quote capture

## 9. Front-End and Design Rules

Design should feel like:
- premium authority publication
- high-trust comparison engine
- modern SaaS-grade marketplace

UI principles:
- clean premium white / soft gray base
- dark text
- one strong accent CTA color
- generous whitespace
- card-based sections
- subtle shadows
- premium rounded corners
- high scanability

Do not make the site feel:
- spammy
- gimmicky
- overloaded
- bloggy when the page is a money page

## 10. Performance Rules

Performance is a product requirement, not an enhancement.

Target direction:
- Lighthouse 95+
- mobile-first performance
- low CLS
- minimal JS
- SSR / SSG where possible

General rules:
- Prefer server rendering for primary content
- Keep images optimized
- Lazy load below-the-fold media
- Avoid heavy client-side logic for SEO-critical content
- Do not add visual gimmicks that hurt speed

## 11. Implementation Style Rules

- Prefer modular, reusable components
- Build template systems, not one-off pages
- Keep business logic centralized
- Keep route logic deterministic
- Keep metadata explicit and aligned with canonical intent
- Avoid broad uncontrolled changes
- Favor safe, incremental fixes over risky rewrites

When fixing SEO:
- do not create canonical conflicts
- do not create duplicate public surfaces
- do not add schema without visible support
- do not widen indexation without a clear threshold

## 12. Testing and Verification Rules

Before considering a change complete, verify where applicable:
- build passes
- route references are clean
- canonical paths are correct
- noindex logic is consistent
- sitemap output is hygienic
- affiliate links are compliant
- no obvious encoding issues or broken public copy remain

When build verification is interrupted, be honest about that.
Do not claim full verification if `npm run build` did not finish.

## 13. Things You Must Not Do

- Do not create thin affiliate pages
- Do not invent product facts
- Do not invent reviews or testing claims
- Do not mark up invisible data
- Do not introduce duplicate route families without redirects/canonicals
- Do not rely on `robots.txt` for deindexing
- Do not create broad crawlable filter traps
- Do not hide critical page content behind client-only rendering
- Do not use non-US public wording

## 14. Preferred Workflow in This Repo

Use this workflow by default:
1. Audit the current code paths and data flow first
2. Identify the highest-impact safe change
3. Make the smallest production-safe implementation
4. Verify with targeted checks
5. Run full build when possible
6. Be explicit about what is verified vs not verified

When the user gives a ticket:
- treat this file as the permanent business/SEO/affiliate brain
- use the prompt only for the specific task at hand

