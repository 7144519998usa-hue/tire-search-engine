# TireSearchEngine Publisher Authority Execution Package

## Purpose

This document converts the authority-system architecture into an executable package for future Codex and engineering work.

It is intentionally split into:

- Prisma schema draft
- route scaffolding map
- page scoring and governance logic
- component build checklist
- launch QA checklist

Current repo note:

- the live codebase is currently `Next.js + JavaScript` with custom data modules and Supabase-style access
- the schema below is a target-state draft for a normalized PostgreSQL + Prisma layer
- route scaffolding is mapped to the current repo shape where possible

## 1. Prisma Schema Draft

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum VehicleType {
  passenger
  suv
  pickup
  van
  ev
  commercial
  trailer
}

enum PublicationStatus {
  draft
  review
  published
  suppressed
}

enum RobotsDirective {
  index
  noindex
}

enum DisclosureType {
  affiliate
  advertiser
  lead_gen
}

model Brand {
  id               Int         @id @default(autoincrement())
  name             String
  slug             String      @unique
  description      String?
  logoUrl          String?
  countryOfOrigin  String?
  summary          String?
  strengths        Json?
  weaknesses       Json?
  categoryCoverage Json?
  isActive         Boolean     @default(true)
  editorialStatus  String?
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt
  tireModels       TireModel[]
}

model TireModel {
  id                 Int             @id @default(autoincrement())
  brandId            Int
  name               String
  slug               String
  fullName           String
  category           String
  season             String?
  terrain            String?
  subcategory        String?
  vehicleType        VehicleType
  isEVOptimized      Boolean         @default(false)
  isRunFlat          Boolean         @default(false)
  has3PMSF           Boolean         @default(false)
  hasMPlusS          Boolean         @default(false)
  warrantyMiles      Int?
  summary            String?
  positioning        String?
  bestFor            Json?
  avoidFor           Json?
  pros               Json?
  cons               Json?
  editorialVerdict   String?
  launchYear         Int?
  isActive           Boolean         @default(true)
  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt
  brand              Brand           @relation(fields: [brandId], references: [id], onDelete: Cascade)
  sizes              TireModelSize[]
  offers             Offer[]

  @@unique([brandId, slug])
}

model TireSize {
  id             Int             @id @default(autoincrement())
  normalizedSize String          @unique
  sectionWidth   Int?
  aspectRatio    Int?
  rimDiameter    String?
  loadIndex      String?
  speedRating    String?
  plyRating      String?
  loadRange      String?
  isActive       Boolean         @default(true)
  modelSizes     TireModelSize[]
  offers         Offer[]
}

model TireModelSize {
  id               Int       @id @default(autoincrement())
  tireModelId      Int
  tireSizeId       Int
  skuReference     String?
  utqgTraction     String?
  utqgTemperature  String?
  utqgTreadwear    String?
  maxLoad          String?
  maxPressure      String?
  sidewall         String?
  weightLbs        Float?
  warrantyMiles    Int?
  isOEFitment      Boolean   @default(false)
  isActive         Boolean   @default(true)
  tireModel        TireModel @relation(fields: [tireModelId], references: [id], onDelete: Cascade)
  tireSize         TireSize  @relation(fields: [tireSizeId], references: [id], onDelete: Cascade)

  @@unique([tireModelId, tireSizeId])
}

model VehicleMake {
  id      Int            @id @default(autoincrement())
  name    String
  slug    String         @unique
  type    VehicleType
  models  VehicleModel[]
}

model VehicleModel {
  id               Int           @id @default(autoincrement())
  makeId           Int
  name             String
  slug             String
  type             VehicleType
  drivetrainOptions Json?
  fuelType         String?
  isActive         Boolean       @default(true)
  make             VehicleMake   @relation(fields: [makeId], references: [id], onDelete: Cascade)
  years            VehicleYear[]

  @@unique([makeId, slug])
}

model VehicleYear {
  id             Int              @id @default(autoincrement())
  vehicleModelId Int
  year           Int
  generation     String?
  notes          String?
  isActive       Boolean          @default(true)
  vehicleModel   VehicleModel     @relation(fields: [vehicleModelId], references: [id], onDelete: Cascade)
  fitments       VehicleFitment[]

  @@unique([vehicleModelId, year])
}

model VehicleFitment {
  id                Int          @id @default(autoincrement())
  vehicleYearId     Int
  trim              String?
  oeSizePrimary     String
  oeSizesAlt        Json?
  optionalSizes     Json?
  loadRequirements  String?
  speedRequirements String?
  fitmentNotes      String?
  winterNotes       String?
  towingNotes       String?
  evNotes           String?
  isVerified        Boolean      @default(false)
  vehicleYear       VehicleYear  @relation(fields: [vehicleYearId], references: [id], onDelete: Cascade)
}

model Merchant {
  id                    Int      @id @default(autoincrement())
  name                  String
  slug                  String   @unique
  logoUrl               String?
  affiliateNetwork      String?
  domain                String
  trustScore            Float?
  shippingPolicySummary String?
  returnsPolicySummary  String?
  isActive              Boolean  @default(true)
  offers                Offer[]
}

model Offer {
  id            Int       @id @default(autoincrement())
  merchantId    Int
  tireModelId   Int
  tireSizeId    Int?
  title         String
  price         Float?
  salePrice     Float?
  currency      String    @default("USD")
  availability  String?
  stockStatus   String?
  shippingCost  Float?
  offerUrl      String
  affiliateUrl  String
  lastCheckedAt DateTime?
  isActive      Boolean   @default(true)
  merchant      Merchant  @relation(fields: [merchantId], references: [id], onDelete: Cascade)
  tireModel     TireModel @relation(fields: [tireModelId], references: [id], onDelete: Cascade)
  tireSize      TireSize? @relation(fields: [tireSizeId], references: [id], onDelete: SetNull)
}

model EditorialBlock {
  id                   Int      @id @default(autoincrement())
  blockType            String
  key                  String
  title                String?
  content              Json
  appliesToRouteFamily Json?
  appliesToCategory    Json?
  appliesToVehicleType Json?
  appliesToBrandIds    Json?
  appliesToTireModelIds Json?
  status               String
  updatedAt            DateTime @updatedAt
}

model FaqItem {
  id         Int      @id @default(autoincrement())
  routeFamily String
  entityType String?
  entityId   Int?
  question   String
  answer     String
  isIndexable Boolean @default(true)
  sortOrder  Int      @default(0)
}

model InternalLinkRule {
  id                 Int      @id @default(autoincrement())
  sourceRouteFamily  String
  targetRouteFamily  String
  relationType       String
  anchorTemplate     String
  priority           Int      @default(0)
  minRelevanceScore  Float    @default(0)
  isActive           Boolean  @default(true)
}

model PageGovernance {
  id                    Int               @id @default(autoincrement())
  route                 String            @unique
  routeFamily           String
  entityType            String?
  entityId              Int?
  publicationStatus     PublicationStatus @default(draft)
  robotsDirective       RobotsDirective   @default(noindex)
  qualityScore          Float             @default(0)
  contentDepthScore     Float             @default(0)
  dataCompletenessScore Float             @default(0)
  productCountScore     Float             @default(0)
  internalLinkScore     Float             @default(0)
  duplicateRiskScore    Float             @default(0)
  staleFlag             Boolean           @default(false)
  orphanFlag            Boolean           @default(false)
  schemaStatus          String?
  lastReviewedAt        DateTime?
  notes                 String?
}
```

## 2. Route Scaffolding Map

### Current repo-aligned route families

- `/`
- `/tires`
- `/tires/[category]`
- `/tires/[category]/[size]`
- `/tires/[size]`
- `/brands`
- `/brands/[brand]`
- `/brands/[brand]/[size]`
- `/brands/[brand]/truck-tires`
- `/models`
- `/models/[model]`
- `/vehicles`
- `/vehicles/[make]/[model]/[year]`
- `/compare`
- `/guides/[slug]`
- `/tire-university/[topic]`
- `/truck-tires`
- `/truck-tires/[slug]`
- `/truck-tires/[slug]/[application]`
- `/commercial-truck-tires`
- `/commercial-truck-tires/[size]`
- `/ev-tires`
- `/ev-tires/[slug]`
- `/tesla-tires`

### Target normalized families to build toward

- `/tires/size/[size]`
- `/tires/by-vehicle/[make]/[model]/[year]`
- `/learn/[topic]`
- `/best/[category]`
- `/best/[category]/[use-case]`
- `/truck-tires/size/[size]`
- `/truck-tires/by-application/[application]`
- `/truck-tires/by-position/[position]`
- `/truck-tires/by-service/[service]`
- `/ev-tires/[make]/[model]/[year]`

### Mapping rule

Do not hard-cut the repo to the target tree all at once. Use this migration order:

1. preserve current ranking/live families
2. extend with normalized families where new work is needed
3. add redirects only when a normalized family becomes authoritative
4. keep one canonical per intent

## 3. Page Scoring Pseudocode

```ts
type PageScoreInput = {
  contentDepthScore: number
  dataCompletenessScore: number
  productSetScore: number
  internalLinkScore: number
  uniquenessScore: number
  commercialUsefulnessScore: number
  duplicateRiskScore: number
  hasParentLink: boolean
  hasUsefulIntro: boolean
  hasValidEntity: boolean
  offerCount: number
  minimumOfferCount?: number
}

function scorePage(input: PageScoreInput) {
  const qualityScore =
    input.contentDepthScore * 0.25 +
    input.dataCompletenessScore * 0.20 +
    input.productSetScore * 0.20 +
    input.internalLinkScore * 0.15 +
    input.uniquenessScore * 0.10 +
    input.commercialUsefulnessScore * 0.10;

  const hardFail =
    !input.hasValidEntity ||
    !input.hasParentLink ||
    !input.hasUsefulIntro ||
    input.duplicateRiskScore > 80 ||
    (
      typeof input.minimumOfferCount === "number" &&
      input.offerCount < input.minimumOfferCount
    );

  if (hardFail) {
    return {
      qualityScore,
      robots: "noindex,follow",
      status: "suppressed_or_hold",
    };
  }

  if (qualityScore >= 75) {
    return {
      qualityScore,
      robots: "index,follow",
      status: "indexable",
    };
  }

  if (qualityScore >= 60) {
    return {
      qualityScore,
      robots: "noindex,follow",
      status: "publishable_but_hold",
    };
  }

  return {
    qualityScore,
    robots: "noindex,follow",
    status: "draft_only",
  };
}
```

### Suggested route-family thresholds

- hubs: minimum 8 meaningful internal links and 4 editorial modules
- brand pages: minimum 3 meaningful child entities or strong editorial depth
- tire model pages: minimum 2 sizes or enough model-specific differentiation
- vehicle pages: verified or strongly supported fitment plus 2 categories and 3 related links
- size pages: minimum product depth plus educational context
- compare pages: genuine overlap plus clear differentiators

## 4. Component Build Checklist

### SEO components

- [ ] `SchemaInjector`
- [ ] `LastReviewedBadge`
- [ ] `Breadcrumbs`
- [ ] `RelatedLinksGrid`
- [ ] `ClusterHubLinks`
- [ ] `SiblingPagesGrid`

### Editorial authority components

- [x] `DisclosurePill`
- [x] `AuthorMetaRow`
- [x] `TrustStatsBar`
- [x] `MethodologyCard`
- [ ] `HowWeChooseBlock`
- [ ] `TerminologyCallout`
- [ ] `SeasonalAdviceBlock`
- [ ] `FitmentWarningBox`

### Commercial components

- [x] `AffiliateLink`
- [x] `PriceTable`
- [ ] `OfferCard`
- [ ] `OfferTable`
- [ ] `MerchantBadge`
- [ ] `BestForNotIdealFor`
- [ ] `RecommendationCard` extraction from current recommendation experience

### Comparison components

- [ ] `ComparisonTable`
- [ ] `ProsConsColumns`
- [ ] `UseCaseVerdictTable`
- [ ] `AlternativeModelsGrid`
- [x] comparison spotlight preview on homepage

### Fitment components

- [x] `VehicleFitmentSummary`
- [x] `RecommendationExperience`
- [x] `InstalledCostExplainer`
- [x] `InstallerQuoteModule`
- [ ] `FitmentTable`
- [ ] `OEvsOptionalSizeBlock`
- [ ] `EVRangeNoiseBlock`
- [ ] `TruckServicePositionBlock`

### Retention components

- [x] `NewsletterCaptureSection`
- [x] `EmailCaptureStrip`
- [ ] `SaveComparisonEmailCapture`
- [ ] `ReplacementReminderCapture`

## 5. Schema Generator Checklist

Build or extend helpers for:

- [x] `BreadcrumbList`
- [x] `Organization`
- [x] `WebSite`
- [x] `FAQPage`
- [x] visible `ItemList`
- [ ] safe `CollectionPage` builder
- [ ] safe `Article` builder
- [ ] eligible `Product` builder
- [ ] eligible `Offer/AggregateOffer` builder

Rule:

- never emit `Product` unless offers or product-specific visible content actually support it
- FAQ schema only when FAQ is truly present on the page

## 6. Governance / Admin TODOs

- [ ] stale page audit by route family
- [ ] orphan page audit
- [ ] missing schema audit
- [ ] low-content-depth audit
- [ ] empty-offer audit
- [ ] duplicate-intro audit
- [ ] indexable-but-excluded audit
- [ ] broken-affiliate-link audit

## 7. Launch QA Checklist

### Technical QA

- [ ] route resolves correctly
- [ ] canonical is correct
- [ ] lowercase route normalization holds
- [ ] breadcrumb trail is valid
- [ ] metadata is present
- [ ] JSON-LD validates
- [ ] mobile layout is stable
- [ ] no broken CTA or affiliate links

### Content QA

- [ ] intro is specific to the page
- [ ] page solves a real user intent
- [ ] no generic filler blocks
- [ ] internal links are relevant
- [ ] disclosure is visible where monetized
- [ ] methodology or standards path is visible where needed

### Commercial QA

- [ ] offer cards or comparison modules work
- [ ] outbound clicks are tracked
- [ ] affiliate links route through protected redirect logic
- [ ] no misleading price language

### SEO QA

- [ ] sitemap inclusion/exclusion is correct
- [ ] robots directive is correct
- [ ] page meets quality threshold before indexation
- [ ] no duplicate public surfaces exist for the same intent

## 8. Immediate Next Build Order

1. normalize the truck route tree so `npm run build` can complete
2. finish stabilizing homepage and vehicle decision modules
3. add authority shell to additional monetized templates
4. implement safe `CollectionPage` and `Article` schema builders
5. formalize page scoring into a real governance utility
6. extend indexation controls and audit reporting

## 9. Direct Build Prompt

Use this in future sessions:

> Read `AGENTS.md`, `PLANS.md`, and `docs/publisher-authority-execution-package.md` first.
> Build TireSearchEngine.com as a publisher-grade authority system, not a thin affiliate site.
> Prefer existing route families and abstractions in the current repo.
> Only ship pages that are useful, internally linked, commercially credible, and distinct enough to deserve indexation.
> Keep truck/fleet depth strong internally while preserving the broad public marketplace brand.

