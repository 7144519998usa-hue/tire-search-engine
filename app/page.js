import Link from "next/link";
import FaqSection from "./components/FaqSection";
import FeaturedSizeGrid from "./components/FeaturedSizeGrid";
import AmazonOfferRail from "./components/AmazonOfferRail";
import JsonLd from "./components/JsonLd";
import SearchBar from "./components/SearchBar";
import { getAmazonOffersForHome } from "./lib/amazonOfferCatalog";
import {
  featuredSizes,
  featuredBrandPages,
  homeFaqs,
  partnerSuppliers,
  shoppingCategories,
  seoGuides,
  seoPillars,
  siteUrl,
  sizeToSlug,
  featuredVehicleLinks,
} from "./lib/siteData";

export default function HomePage() {
  const amazonOffers = getAmazonOffersForHome();
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
      <main className="page-shell home-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">TireSearchEngine.com</span>
            <h1>Find the best tires for your vehicle from the brands and suppliers drivers trust most.</h1>
            <p className="hero-text">
              Search by tire size, compare prices across suppliers, and explore
              top brands like Michelin, Goodyear, BFGoodrich, and Pirelli. When
              you find the right match, click straight to the supplier to buy.
            </p>
            <SearchBar />

            <div className="chip-row" aria-label="Popular tire sizes">
              {featuredSizes.map((item) => (
                <Link
                  key={item.size}
                  className="size-chip"
                  href={`/tire-size/${sizeToSlug(item.size)}`}
                >
                  {item.size}
                </Link>
              ))}
            </div>
          </div>

          <aside className="hero-card">
            <div className="hero-badge">Popular tires and brands</div>
            <div className="stat-grid">
              <div>
                <strong>Search by size</strong>
                <span>Start with the exact tire size on your sidewall and see matching options quickly.</span>
              </div>
              <div>
                <strong>Compare top brands</strong>
                <span>Review popular choices for all-season, touring, highway, and all-terrain driving needs.</span>
              </div>
              <div>
                <strong>Buy from suppliers</strong>
                <span>Click through to the retailer or supplier that offers the tire you want at the best price.</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="pillar-grid">
          {seoPillars.map((pillar) => (
            <article key={pillar.title} className="pillar-card">
              <span className="pillar-index">0{seoPillars.indexOf(pillar) + 1}</span>
              <h2>{pillar.title}</h2>
              <p>{pillar.description}</p>
            </article>
          ))}
        </section>

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
              tires before clicking through to a supplier.
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

        <FeaturedSizeGrid />

        <AmazonOfferRail
          title="Popular Amazon tire deals"
          intro="Featured Amazon tire links can be imported here in bulk and matched to the most commercial pages on the site."
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Buying guides</span>
            <h2>High-intent pages built around the searches tire shoppers actually make</h2>
            <p>
              These guide pages target common commercial searches and funnel
              visitors into supplier comparisons and buy clicks.
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
              intent and the tire-size, brand, and comparison pages that convert.
            </p>
          </div>
          <div className="category-grid">
            {featuredVehicleLinks.map((vehicle) => (
              <Link
                key={`${vehicle.make}-${vehicle.model}-${vehicle.year}`}
                href={`/vehicle/${vehicle.make}/${vehicle.model}/${vehicle.year}`}
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
              compare common tire sizes and buy from the supplier that best fits
              your budget and driving needs.
            </p>
            <div className="supplier-pill-row" aria-label="Popular tire suppliers">
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
