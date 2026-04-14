import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../../../components/AmazonOfferRail";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import EmailCaptureStrip from "../../../../components/EmailCaptureStrip";
import InstalledCostExplainer from "../../../../components/InstalledCostExplainer";
import InstallerQuoteModule from "../../../../components/InstallerQuoteModule";
import JsonLd from "../../../../components/JsonLd";
import RecommendationExperience from "../../../../components/RecommendationExperience";
import VehicleFitmentSummary from "../../../../components/VehicleFitmentSummary";
import { getAmazonOffersForVehicle } from "../../../../lib/amazonOfferCatalog";
import { buildBreadcrumbSchema } from "../../../../lib/breadcrumbs";
import { siteUrl, sizeToSlug } from "../../../../lib/siteData";
import { getTireCategoryBySlug } from "../../../../lib/tireCategories";
import {
  featuredVehicles,
  getVehicleCompareLinks,
  getVehiclePageData,
} from "../../../../lib/vehicleSeo";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const vehicle = getVehiclePageData(params.make, params.model, params.year);

  if (!vehicle) {
    return {};
  }

  return {
    title: `${vehicle.displayName} Tires`,
    description: vehicle.summary,
    alternates: {
      canonical: `/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}`,
    },
    openGraph: {
      title: `${vehicle.displayName} Tires | TireSearchEngine`,
      description: vehicle.summary,
      url: `${siteUrl}/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}`,
    },
  };
}

export default function VehiclePage({ params }) {
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
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Vehicles", href: "/vehicles" },
    { label: vehicle.displayName },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${vehicle.displayName} tires`,
    description: vehicle.summary,
    url: `${siteUrl}/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}`,
  };
  const suggestedCategories = [
    getTireCategoryBySlug("all-season"),
    getTireCategoryBySlug("suv-4x4"),
    getTireCategoryBySlug("truck"),
    getTireCategoryBySlug("all-terrain"),
  ].filter((category) =>
    category &&
    vehicle.sizes.some((size) => category.sizeValues.includes(size.size))
  );

  return (
    <>
      <JsonLd data={vehicleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Vehicle fitment page</span>
            <h1>{vehicle.displayName} tires</h1>
            <p>
              {vehicle.summary} See the best-fit options, estimated installed cost,
              and local install paths before you click out.
            </p>
            <div className="hero-actions">
              {vehicle.sizes[0] ? (
                <Link
                  className="search-button"
                  href={`/search?size=${encodeURIComponent(vehicle.sizes[0].size)}`}
                >
                  See my best-fit tires
                </Link>
              ) : null}
              <Link className="ghost-link" href={`/tires/${sizeToSlug(vehicle.sizes[0]?.size || "")}`}>
                Browse by tire size
              </Link>
            </div>
          </div>

          <aside className="size-hero-panel">
            <span className="panel-kicker">Fitment focus</span>
            <ul className="bullet-list">
              <li>Vehicle-specific size guidance with OEM-focused fitment paths.</li>
              <li>Estimated installed total before checkout.</li>
              <li>Local installer options without forcing the lead flow.</li>
            </ul>
          </aside>
        </section>

        <VehicleFitmentSummary vehicle={vehicle} focusBadges={vehicle.focusBadges} />

        <RecommendationExperience
          vehicle={vehicle}
          recommendations={vehicle.recommendations}
        />

        <InstalledCostExplainer estimate={vehicle.installedCostEstimate} />

        <InstallerQuoteModule
          vehicleName={vehicle.displayName}
          primarySize={vehicle.sizes[0]?.size || ""}
        />

        <EmailCaptureStrip
          vehicleName={vehicle.displayName}
          primarySize={vehicle.sizes[0]?.size || ""}
        />

        <AmazonOfferRail
          title={`Amazon tire links for ${vehicle.displayName}`}
          intro="Vehicle-level Amazon offers can render here when they match the mapped fitment and category paths."
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Exact tire sizes</span>
            <h2>Start with the most relevant replacement sizes</h2>
          </div>
          <div className="category-grid">
            {vehicle.sizes.map((size) => (
              <Link key={size.size} href={`/tires/${sizeToSlug(size.size)}`} className="category-card">
                <h3>{size.size} tires</h3>
                <p>{size.summary}</p>
                <span>View size page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Vehicle tire categories</span>
            <h2>Category paths that match this vehicle</h2>
          </div>
          <div className="category-grid">
            {suggestedCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}/${category.slug}`}
                className="category-card"
              >
                <h3>{vehicle.displayName} {category.title.toLowerCase()}</h3>
                <p>{category.description}</p>
                <span>View vehicle-category page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Brands and comparisons</span>
            <h2>Continue from fitment into stronger buying pages</h2>
          </div>
          <div className="category-grid">
            {vehicle.brands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="category-card">
                <h3>{brand.name} tires</h3>
                <p>{brand.description}</p>
                <span>View brand guide</span>
              </Link>
            ))}
            {compareLinks.map((link) => (
              <Link key={link.href} href={link.href} className="category-card">
                <h3>{link.label}</h3>
                <p>Brand-plus-size page tied to this vehicle's fitment path.</p>
                <span>View brand-size page</span>
              </Link>
            ))}
            <Link href="/deals/amazon-tires" className="category-card">
              <h3>Top Amazon tire deals</h3>
              <p>Deal hub for shoppers ready to compare checkout options and buy.</p>
              <span>View Amazon deals</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
