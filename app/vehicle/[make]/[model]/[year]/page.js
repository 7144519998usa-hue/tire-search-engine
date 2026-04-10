import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../../../components/AmazonOfferRail";
import JsonLd from "../../../../components/JsonLd";
import { getAmazonOffersForVehicle } from "../../../../lib/amazonOfferCatalog";
import { siteUrl, sizeToSlug } from "../../../../lib/siteData";
import {
  featuredVehicles,
  getVehicleCompareLinks,
  getVehiclePageData,
} from "../../../../lib/vehicleSeo";

export async function generateStaticParams() {
  return featuredVehicles.map((vehicle) => ({
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
  }));
}

export async function generateMetadata({ params }) {
  const vehicle = getVehiclePageData(params.make, params.model, params.year);

  if (!vehicle) {
    return {};
  }

  return {
    title: `${vehicle.displayName} Tires`,
    description: vehicle.summary,
    alternates: {
      canonical: `/vehicle/${vehicle.make}/${vehicle.model}/${vehicle.year}`,
    },
    openGraph: {
      title: `${vehicle.displayName} Tires | TireSearchEngine`,
      description: vehicle.summary,
      url: `${siteUrl}/vehicle/${vehicle.make}/${vehicle.model}/${vehicle.year}`,
    },
  };
}

export default async function VehiclePage({ params }) {
  const vehicle = getVehiclePageData(params.make, params.model, params.year);

  if (!vehicle) {
    notFound();
  }

  const compareLinks = getVehicleCompareLinks(vehicle).slice(0, 4);
  const amazonOffers = getAmazonOffersForVehicle(
    vehicle.make,
    vehicle.model,
    vehicle.year
  );
  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${vehicle.displayName} tire guide`,
    description: vehicle.summary,
  };

  return (
    <>
      <JsonLd data={vehicleSchema} />
      <main className="page-shell guide-shell">
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Vehicle fitment page</span>
            <h1>{vehicle.displayName} tires</h1>
            <p>{vehicle.summary}</p>
            <div className="hero-actions">
              {vehicle.sizes[0] ? (
                <Link
                  className="search-button"
                  href={`/search?size=${encodeURIComponent(vehicle.sizes[0].size)}`}
                >
                  Compare {vehicle.sizes[0].size} offers
                </Link>
              ) : null}
              <Link className="ghost-link" href="/">
                Browse more vehicles and tire sizes
              </Link>
            </div>
          </div>

          <aside className="size-hero-panel">
            <span className="panel-kicker">Fitment focus</span>
            <ul className="bullet-list">
              {vehicle.sizes.map((size) => (
                <li key={size.size}>{size.size} is one of the tracked comparison sizes for this vehicle.</li>
              ))}
              <li>{vehicle.brands.length} linked brand pages support this vehicle path.</li>
              <li>{vehicle.guides.length} related buying guides connect this page to broader intent searches.</li>
            </ul>
          </aside>
        </section>

        <section className="content-grid">
          <article className="content-card">
            <h2>Popular tire sizes for {vehicle.displayName}</h2>
            <p>
              These fitment-focused pages help shoppers move from vehicle search
              intent into exact tire-size comparisons without guessing where to
              start.
            </p>
          </article>
          <article className="content-card">
            <h2>What to compare</h2>
            <p>
              Price matters, but drivers should also compare tread life, wet
              traction, noise, brand trust, and whether the tire matches the
              way the vehicle is actually used.
            </p>
          </article>
        </section>

        <AmazonOfferRail
          title={`Amazon tire links for ${vehicle.displayName}`}
          intro="Vehicle-level Amazon offers can now be mapped through the shared import catalog using make, model, and year keys."
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Size links</span>
            <h2>Start with the most relevant tire sizes</h2>
          </div>
          <div className="category-grid">
            {vehicle.sizes.map((size) => (
              <Link key={size.size} href={`/tire-size/${sizeToSlug(size.size)}`} className="category-card">
                <h3>{size.size} tires</h3>
                <p>{size.summary}</p>
                <span>View tire-size page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Brand paths</span>
            <h2>Compare brands and size-specific pages for this vehicle</h2>
          </div>
          <div className="category-grid">
            {vehicle.brands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="category-card">
                <h3>{brand.name} tires</h3>
                <p>{brand.description}</p>
                <span>Read brand guide</span>
              </Link>
            ))}
            {compareLinks.map((link) => (
              <Link key={link.href} href={link.href} className="category-card">
                <h3>{link.label}</h3>
                <p>
                  More specific landing page connecting vehicle intent to a
                  brand-plus-size comparison.
                </p>
                <span>View comparison page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Buying guides</span>
            <h2>Related guides for {vehicle.displayName} shoppers</h2>
          </div>
          <div className="category-grid">
            {vehicle.guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="category-card">
                <h3>{guide.title}</h3>
                <p>{guide.intro}</p>
                <span>Read guide</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
