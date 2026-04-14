# TireSearchEngine Auto-Expansion Engine

This repository now includes a native first-pass auto-expansion foundation inside the app layer.

## What It Does

- normalizes canonical tire-size entities from existing marketplace, EV, truck, and fitment data
- builds a deterministic page registry for canonical public route families
- assigns publication and indexability states per page family
- detects missing but valid page opportunities, with an initial emphasis on size and truck growth
- produces a regeneration queue snapshot for selective refresh planning
- exposes the current system state through the internal API route:
  - `/api/v1/system/auto-expansion`

## Core Modules

- `app/lib/canonicalEntities.js`
- `app/lib/pageRegistry.js`
- `app/lib/autoExpansion.js`
- `app/lib/regenerationQueue.js`

## Current Scope

The current implementation uses in-repo data sources that already power the site:

- featured consumer sizes
- featured brand pages
- model seeds
- vehicle fitment seeds
- EV model/brand/intent clusters
- truck and commercial-truck seed data

This gives the site a real canonical entity layer and page-registry layer without requiring a database migration first.

## Why This Matters

Before this change, route inventory, eligibility, and sitemap output were mostly coordinated by shared arrays and route helpers.

After this change, the repo now has a system-level representation of:

- which canonical pages exist
- which ones are indexable
- which ones should stay noindex
- which valid opportunities are still missing
- which pages should be refreshed first

That is the right base for future expansion into:

- persistent page registry storage
- queue-backed regeneration
- admin controls and overrides
- database-backed entity normalization
- 100k+ page inventory management

## Near-Term Follow-Ups

1. persist the page registry and regeneration queue in PostgreSQL
2. store generation timestamps and freshness signals per page
3. let the sitemap and admin views read directly from the persisted registry
4. add queue workers for selective revalidation and stale-page refresh
5. expand opportunity detection to brand-model, fitment, and comparison page families
