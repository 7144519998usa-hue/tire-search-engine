import Link from "next/link";
import FaqSection from "./components/FaqSection";
import FeaturedSizeGrid from "./components/FeaturedSizeGrid";
import AmazonOfferRail from "./components/AmazonOfferRail";
import ComparisonSpotlightSection from "./components/ComparisonSpotlightSection";
import HomeSearchTabs from "./components/HomeSearchTabs";
import HowItWorksSection from "./components/HowItWorksSection";
import JsonLd from "./components/JsonLd";
import NewsletterCaptureSection from "./components/NewsletterCaptureSection";
import TrustLogoStrip from "./components/TrustLogoStrip";
import { getAmazonOffersForHome } from "./lib/amazonOfferCatalog";
import { buildFaqSchema } from "./lib/structuredData";
import {
  featuredSizes,
  featuredBrandPages,
  homeFaqs,
  homepageComparisonSpotlights,
  homepageHowItWorks,
  homepageTrustPoints,
  partnerSuppliers,
  shoppingCategories,
  seoGuides,
  seoPillars,
  siteUrl,
  sizeToSlug,
  featuredVehicleLinks,
} from "./lib/siteData";

export default function HomePage() {
  const amazonOffers = getAmazonOffersForHome(4);
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TireSearchEngine",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?size={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={buildFaqSchema(homeFaqs)} />
      <main className="page-shell home-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">Compare prices from trusted tire suppliers</span>
            <h1>Compare Tire Prices Fast. Find the Right Tire With Confidence.</h1>
            <p className="hero-text">
              Search by tire size, vehicle, or brand to compare popular options
              across trusted suppliers and move into the best-fit tire faster.
            </p>
            <HomeSearchTabs />

            <div className="chip-row" aria-label="Popular tire sizes">
              {featuredSizes.map((item) => (
                <Link
                  key={item.size}
                  className="size-chip"
                  href={`/tires/${sizeToSlug(item.size)}`}
                >
                  {item.size}
                </Link>
              ))}
            </div>
          </div>

          <aside className="hero-card">
            <div className="hero-badge">Fast comparison preview</div>
            <div className="stat-grid">
              <div>
                <strong>Search by size or vehicle</strong>
                <span>Start with the fitment path that feels fastest and narrow into the strongest options quickly.</span>
              </div>
              <div>
                <strong>Compare top brands</strong>
                <span>Review consumer, SUV, truck, and premium tire paths without bouncing across retailer tabs.</span>
              </div>
              <div>
                <strong>Find the best route to checkout</strong>
                <span>See the best next step for pricing, brand comparison, and deal-driven purchase paths.</span>
              </div>
            </div>
          </aside>
        </section>

        <TrustLogoStrip items={homepageTrustPoints} />

        <HowItWorksSection steps={homepageHowItWorks} />

        <section className="pillar-grid">
          {seoPillars.map((pillar) => (
            <article key={pillar.title} className="pillar-card">
              <span className="pillar-index">0{seoPillars.indexOf(pillar) + 1}</span>
              <h2>{pillar.title}</h2>
              <p>{pillar.description}</p>
            </article>
          ))}
        </section>

        <ComparisonSpotlightSection items={homepageComparisonSpotlights} />

        <section className="brand-section">
          <div className="section-heading">
            <span className="eyebrow">Top brands</span>
            <h2>Compare the tire brands drivers search for most</h2>
            <p>
              Shop well-known tire makers across all-season, touring, truck,
              SUV, and premium performance categories.
            </p>
          </div>
          <div className="brand-grid">
            {featuredBrandPages.map((brand) => (
              <Link
                key={brand.name}
                href={`/brands/${brand.slug}`}
                className="brand-card"
              >
                <span className="brand-mark">{brand.name.slice(0, 1)}</span>
                <h3>{brand.name}</h3>
                <p>{brand.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Shop by need</span>
            <h2>Popular tire shopping paths</h2>
            <p>
              These high-intent shopper journeys mirror how real buyers compare
              tires before continuing to a trusted checkout path.
            </p>
          </div>
          <div className="category-grid">
            {shoppingCategories.map((category) => (
              <Link key={category.title} href={category.href} className="category-card">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span>Explore deals</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Application paths</span>
            <h2>Compare tires by size, vehicle, and application</h2>
            <p>
              Explore clear shopping paths for passenger, SUV, pickup, off-road,
              winter, and commercial tire needs from one marketplace.
            </p>
          </div>
          <div className="category-grid">
            <Link href="/truck-tires" className="category-card">
              <h3>Truck & commercial</h3>
              <p>
                Explore approved truck application, position, and heavy-duty size pages
                within the larger tire marketplace.
              </p>
              <span>Explore truck pages</span>
            </Link>
            <Link href="/tire-university/fleet-resources" className="category-card">
              <h3>Fleet resources</h3>
              <p>
                Read fleet and replacement-planning education for commercial tire buyers.
              </p>
              <span>Read fleet resources</span>
            </Link>
          </div>
        </section>

        <FeaturedSizeGrid />

        <AmazonOfferRail
          title="Popular Amazon tire deals"
          intro="Featured Amazon tire links can be matched to the most relevant size, brand, and guide pages on the site."
          items={amazonOffers}
          limit={4}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Amazon deals</span>
            <h2>Shop the strongest Amazon tire deal path</h2>
            <p>
              Use the dedicated Amazon deals hub to move from research content
              into the site’s highest-priority Amazon offer placements.
            </p>
          </div>
          <div className="category-grid">
            <Link href="/deals/amazon-tires" className="category-card">
              <h3>Top Amazon tire deals</h3>
              <p>
                Curated Amazon tire offers tied to high-intent size, brand,
                vehicle, and buying-guide pages.
              </p>
              <span>View Amazon deals</span>
            </Link>
          </div>
        </section>

        <NewsletterCaptureSection />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Buying guides</span>
            <h2>High-intent pages built around the searches tire shoppers actually make</h2>
            <p>
              These guide pages target common commercial searches and funnel
              visitors into marketplace comparisons and clearer buying paths.
            </p>
          </div>
          <div className="category-grid">
            {seoGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="category-card">
                <h3>{guide.title}</h3>
                <p>{guide.intro}</p>
                <span>Read guide</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Shop by vehicle</span>
            <h2>Vehicle pages that can scale into make, model, and year SEO demand</h2>
            <p>
              These fitment pages create a bridge between vehicle-based search
              intent and the tire-size, brand, and comparison pages shoppers use next.
            </p>
          </div>
          <div className="category-grid">
            {featuredVehicleLinks.map((vehicle) => (
              <Link
                key={`${vehicle.make}-${vehicle.model}-${vehicle.year}`}
                href={`/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}`}
                className="category-card"
              >
                <h3>{vehicle.label}</h3>
                <p>
                  Start with a known vehicle, then move into size-specific tire
                  comparisons and trusted brand options.
                </p>
                <span>View vehicle page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <div>
            <span className="eyebrow">Top searches</span>
            <h2>Shop popular tire sizes, compare leading brands, and go straight to checkout</h2>
            <p>
              From commuter cars to SUVs and trucks, TireSearchEngine helps you
              compare common tire sizes and buy from the retailer that best fits
              your budget and driving needs.
            </p>
            <div className="supplier-pill-row" aria-label="Popular tire retailers">
              {partnerSuppliers.map((supplier) => (
                <span key={supplier} className="supplier-pill">
                  {supplier}
                </span>
              ))}
            </div>
          </div>
          <Link className="search-button" href="/search?size=205/55R16">
            Compare popular tire deals
          </Link>
        </section>

        <FaqSection items={homeFaqs} />
      </main>
    </>
  );
}
