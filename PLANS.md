# PLANS

This file tracks major multi-step implementation plans for TireSearchEngine.com.

## Plan Naming Rules

- Use one section per sprint or major initiative.
- Name sections as `## YYYY-MM-DD - Sprint Name`.
- Keep plans implementation-focused, not aspirational.
- Update status and verification notes as work progresses.

## Required Sections For Each Plan

- `Objective`
- `Scope`
- `Files likely to change`
- `Assumptions`
- `Dependencies / risks`
- `Acceptance criteria`
- `Verification`
- `Rollout notes`

## 2026-04-12 - Sprint: Build Stabilization + Authority Layer

### Objective

Stabilize the current build, resolve route and rendering issues, and complete the first publisher-grade authority shell across the highest-traffic templates.

### Scope

- finish route cleanup so the app can build successfully
- verify homepage conversion and trust-layer modules
- verify vehicle fitment decision pages
- verify truck route architecture after alias and nested-route changes
- extend authority shell across key commercial templates already touched
- confirm sitemap, schema, and disclosure behavior on affected pages

### Files likely to change

- `app/truck-tires/**`
- `app/commercial-truck-tires/**`
- `app/page.js`
- `app/vehicles/[make]/[model]/[year]/page.js`
- `app/guides/[slug]/page.js`
- `app/compare/page.js`
- `app/components/SiteHeader.jsx`
- `app/components/SiteFooter.jsx`
- `app/components/*`
- `app/lib/vehicleSeo.js`
- `app/lib/truckData.js`
- `app/lib/pageEligibility.js`
- `app/lib/structuredData.js`
- `app/globals.css`
- `app/sitemap.js`
- `app/sitemaps/truck-pages/sitemap.js`

### Assumptions

- the repo remains JavaScript-first, not a TypeScript migration
- current Supabase-style data access remains in place for now
- homepage and vehicle recommendation modules can use placeholder recommendation logic until real ranking data is wired
- installer quote and email capture flows are allowed to ship as soft capture states before full backend persistence

### Dependencies / risks

- the truck route tree still appears to contain both `[size]` and `[slug]` directories, which may continue to block Next.js route compilation
- previous build attempts were interrupted, so unresolved errors may still exist
- Windows bracketed-path cleanup is awkward and may require targeted file removal or directory normalization
- large CSS additions may need cleanup if build or render issues surface

### Acceptance criteria

- `npm run build` completes successfully
- homepage renders the new search, trust, comparison, and capture modules without obvious layout breakage
- vehicle pages render fitment summary, recommendation cards, installed-cost block, installer module, and save/email capture cleanly
- trust/disclosure components render correctly on guides and compare hub
- truck routes resolve only for approved live paths
- no invalid or incomplete product snippet schema is emitted by the updated pages
- sitemap output remains environment-aware and only includes approved indexable pages

### Verification

- run `npm run check:security`
- run `npm run build`
- manually inspect:
  - `/`
  - `/vehicles/toyota/camry/2024`
  - `/guides/best-all-season-tires`
  - `/compare`
  - `/truck-tires`
  - `/commercial-truck-tires`
- verify visible disclosure links:
  - `/about/editorial-policy`
  - `/about/advertiser-disclosure`
  - `/about/how-we-make-money`
- spot check generated metadata and JSON-LD on homepage and one guide page

### Rollout notes

- ship only after build passes
- keep truck monetization depth internal; public copy should stay broad-marketplace friendly
- if installer/email flows remain placeholder-only, document that clearly before expanding traffic to those surfaces
- after stabilization, next sprint should focus on persistence for installer leads and saved-fitment/email capture

