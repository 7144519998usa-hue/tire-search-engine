import JsonLd from "./components/JsonLd";
import HeroTireVisual from "./components/HeroTireVisual";
import ProductGrid from "./components/ProductGrid";
import SearchBox from "./components/SearchBox";
import TireCategoryImage from "./components/TireCategoryImage";
import { itemListSchema, webSiteSchema } from "./lib/schema";
import { commercialPriorityPages, getProducts, priorityPages } from "./lib/tireData";

function formatPriorityLabel(href = "") {
  return href
    .replace(/^\/+/, "")
    .split("/")
    .map((part) =>
      part
        .replaceAll("-", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    )
    .join(" - ");
}

export const metadata = {
  title: "Compare Tire Prices by Size, Vehicle, Brand, or Truck Application",
  description: "Search passenger, SUV, EV, pickup, and commercial truck tire options before visiting Tire Rack, SimpleTire, Mavis, Priority Tire, or Amazon fallback links.",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  const homeTruckProducts = getProducts({ commercialOnly: true, limit: 3 });

  return (
    <>
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={itemListSchema({ title: "Commercial truck tire picks", products: homeTruckProducts, path: "/" })} />
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">Tire comparison engine</p>
          <h1>Compare tire prices by size, vehicle, brand, or truck application.</h1>
          <p>Search passenger, SUV, EV, pickup, and commercial truck tire options before visiting a retailer.</p>
          <SearchBox />
          <div className="search-tabs" aria-label="Popular tire search paths">
            <a href="/tires/225-65-r17">Tire Size</a>
            <a href="/vehicles">Vehicle</a>
            <a href="/models">Brand</a>
            <a href="/commercial-truck-tires">Commercial Truck</a>
          </div>
          <div className="hero-cta-row" aria-label="Popular tire shopping links">
            <a className="hero-cta is-orange" href="/tires/265-60-r18">Check Tire Rack price</a>
            <a className="hero-cta" href="/commercial-truck-tires">Commercial truck tires</a>
            <a className="hero-cta" href="/deals">Browse tire deals</a>
          </div>
        </div>
        <div className="hero-panel hero-deal-panel">
          <HeroTireVisual />
        </div>
      </section>

      <section className="category-strip" aria-label="Tire shopping categories">
        <a href="/tires/225-65-r17">
          <TireCategoryImage type="passenger" alt="Passenger and SUV tire comparison visual" />
          <span>Passenger & SUV Tires</span>
          <small>Daily-driver sizes, all-season options, and replacement tire links.</small>
        </a>
        <a href="/best-all-terrain-tires">
          <TireCategoryImage type="allTerrain" alt="All-terrain tire tread for pickup and SUV tire comparison" />
          <span>Pickup & All-Terrain Tires</span>
          <small>Truck, Tacoma, F-150, Jeep, towing, and mixed-road tire options.</small>
        </a>
        <a href="/ev-tires">
          <TireCategoryImage type="ev" alt="EV tire visual for Tesla and electric vehicle tire comparison" />
          <span>EV Tires</span>
          <small>Tesla and EV replacement paths with fitment and retailer warnings.</small>
        </a>
        <a href="/commercial-truck-tires">
          <TireCategoryImage type="commercial" alt="Commercial truck tire visual for steer drive and trailer tire comparison" />
          <span>Commercial Truck Tires</span>
          <small>Steer, drive, trailer, fleet, and owner-operator tire searches.</small>
        </a>
        <a href="/shop-tires">
          <TireCategoryImage type="tread" alt="Tire tread close-up for installed tire option comparison" />
          <span>Installed Tire Options</span>
          <small>Compare retailer links, local-service paths, and marketplace choices.</small>
        </a>
      </section>

      <section className="section">
        <div className="section-heading compact-heading">
          <p className="kicker">Popular passenger, SUV, and pickup sizes</p>
          <a href="/tires">View all tire sizes</a>
        </div>
        <div className="priority-grid">
          {priorityPages.map((href) => (
            <a key={href} href={href}>{formatPriorityLabel(href)}</a>
          ))}
        </div>
      </section>

      <section className="section intent-section compact-section">
        <div className="section-heading compact-heading">
          <p className="kicker">Popular commercial truck sizes</p>
          <a href="/commercial-truck-tires">Open commercial hub</a>
        </div>
        <div className="priority-grid">
          {commercialPriorityPages.map((href) => (
            <a key={href} href={href}>{formatPriorityLabel(href)}</a>
          ))}
        </div>
      </section>

      <section className="section intent-section compact-section">
        <div className="section-heading compact-heading">
          <p className="kicker">Trusted retailer paths</p>
          <a href="/tires">View tire size hub</a>
        </div>
        <div className="priority-grid retailer-paths">
          <a href="/tires/265-60-r18">Tire Rack tire deals</a>
          <a href="/shop-tires">SimpleTire and Priority Tire paths</a>
          <a href="/shop-tires">Mavis installed tire options</a>
          <a href="/deals">Amazon fallback marketplace links</a>
        </div>
      </section>

      <section className="section shopping-path-section">
        <div className="section-heading compact-heading">
          <div>
            <p className="kicker">Shop by the path that fits</p>
            <h2>Use the homepage to reach useful tire pages faster.</h2>
          </div>
          <a href="/shop-tires">Open shopping hub</a>
        </div>
        <div className="shopping-path-grid">
          <article className="shopping-path-card is-featured">
            <span>Passenger and SUV</span>
            <h3>Start with exact tire size pages.</h3>
            <p>Compare common replacement sizes for Camry, Civic, RAV4, CR-V, Rogue, and daily-driver SUVs before confirming fitment at the retailer.</p>
            <div className="mini-link-row">
              <a href="/tires/235-45-r18">235/45R18 tires</a>
              <a href="/tires/225-65-r17">225/65R17 tires</a>
              <a href="/vehicles">Find by vehicle</a>
            </div>
          </article>
          <article className="shopping-path-card">
            <span>Tire Rack path</span>
            <h3>Go straight to retailer-ready pages.</h3>
            <p>Use exact-size pages with Tire Rack, SimpleTire, Priority Tire, Mavis, and Amazon fallback links shown in one place.</p>
            <div className="mini-link-row">
              <a href="/tires/265-60-r18">265/60R18 Tire Rack path</a>
              <a href="/tires/275-60-r20">275/60R20 truck tires</a>
            </div>
          </article>
          <article className="shopping-path-card">
            <span>Commercial priority</span>
            <h3>Keep truck tire searches separate.</h3>
            <p>Steer, drive, trailer, and fleet pages stay focused on commercial truck sizing instead of mixing with passenger tire results.</p>
            <div className="mini-link-row">
              <a href="/commercial-truck-tires/positions/steer">Steer tires</a>
              <a href="/tires/295-75-r22-5/drive">295/75R22.5 drive</a>
            </div>
          </article>
          <article className="shopping-path-card">
            <span>Fitment reminder</span>
            <h3>Confirm before checkout.</h3>
            <p>Always verify tire size, load rating, speed rating, trim, wheel package, installation, shipping, and current price on the retailer site.</p>
            <div className="mini-link-row">
              <a href="/tire-university/how-to-read-tire-size">Read tire size guide</a>
              <a href="/about/advertiser-disclosure">Affiliate disclosure</a>
            </div>
          </article>
        </div>
      </section>

      <section className="section intent-section compact-section">
        <div className="section-heading compact-heading">
          <p className="kicker">Vehicle tire finder</p>
          <a href="/vehicles">Browse vehicles</a>
        </div>
        <div className="priority-grid">
          <a href="/vehicles/toyota/camry">Toyota Camry tires</a>
          <a href="/vehicles/honda/civic">Honda Civic tires</a>
          <a href="/vehicles/ford/f-150">Ford F-150 tires</a>
          <a href="/vehicles/tesla/model-3">Tesla Model 3 tires</a>
        </div>
      </section>

      <section className="link-band">
        <a href="/commercial-truck-tires/positions/steer">Commercial steer tires</a>
        <a href="/tires/295-75-r22-5/drive">295/75R22.5 drive tires</a>
        <a href="/tires/445-50-r22-5/trailer">445/50R22.5 trailer tires</a>
        <a href="/tires/245-60-r18/all-season">245/60R18 all-season tires</a>
        <a href="/shop-tires">Shop tire deals</a>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="kicker">Commercial truck tire searches</p>
          <h2>Steer, drive, trailer, fleet, and owner-operator tire paths.</h2>
          <a href="/commercial-truck-tires">Open commercial truck tire hub</a>
        </div>
        <ProductGrid products={homeTruckProducts} placement="home-commercial" pageContext={{ type: "commercial" }} />
      </section>

      <section className="section intent-section compact-section">
        <div className="section-heading compact-heading">
          <p className="kicker">Tire University</p>
          <a href="/tire-university">Open tire guides</a>
        </div>
        <div className="priority-grid">
          <a href="/tire-university/how-to-read-tire-size">How to read tire size</a>
          <a href="/tire-university/steer-vs-drive-vs-trailer-tires">Steer vs drive vs trailer tires</a>
          <a href="/tire-university/how-to-compare-tire-prices">How to compare tire prices</a>
          <a href="/tire-university/tesla-model-3-tire-guide">Tesla Model 3 tire guide</a>
        </div>
      </section>
    </>
  );
}
