import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../../../../components/AmazonOfferRail";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import JsonLd from "../../../../../components/JsonLd";
import { getAmazonOffersForVehicle } from "../../../../../lib/amazonOfferCatalog";
import { buildBreadcrumbSchema } from "../../../../../lib/breadcrumbs";
import { siteUrl, sizeToSlug } from "../../../../../lib/siteData";
import { getTireCategoryBySlug, tireCategories } from "../../../../../lib/tireCategories";
import { featuredVehicles, getVehiclePageData } from "../../../../../lib/vehicleSeo";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const vehicle = getVehiclePageData(params.make, params.model, params.year);
  const category = getTireCategoryBySlug(params.category);

  if (!vehicle || !category) {
    return {};
  }

  return {
    title: `${vehicle.displayName} ${category.title}`,
    description: `${vehicle.displayName} ${category.title.toLowerCase()} for US shoppers comparing fitment, tire type, and buying paths.`,
    alternates: {
      canonical: `/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}/${category.slug}`,
    },
    openGraph: {
      title: `${vehicle.displayName} ${category.title} | TireSearchEngine`,
      description: `${vehicle.displayName} ${category.title.toLowerCase()} for exact vehicle-and-category shopping intent.`,
      url: `${siteUrl}/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}/${category.slug}`,
    },
  };
}

export default function VehicleCategoryPage({ params }) {
  const vehicle = getVehiclePageData(params.make, params.model, params.year);
  const category = getTireCategoryBySlug(params.category);

  if (!vehicle || !category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Vehicles", href: "/vehicles" },
    { label: vehicle.displayName, href: `/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}` },
    { label: category.title },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${vehicle.displayName} ${category.title}`,
    description: `${vehicle.displayName} ${category.title.toLowerCase()} for US vehicle-fitment shopping.`,
    url: `${siteUrl}/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}/${category.slug}`,
  };
  const amazonOffers = getAmazonOffersForVehicle(vehicle.make, vehicle.model, vehicle.year);
  const relatedSizes = vehicle.sizes.filter((size) => category.sizeValues.includes(size.size));

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Vehicle + category</span>
            <h1>{vehicle.displayName} {category.title.toLowerCase()} for drivers comparing fitment and tire type together.</h1>
            <p>
              This page combines exact vehicle fitment with a specific tire
              category so shoppers can narrow choices faster.
            </p>
            <div className="hero-actions">
              <Link
                className="search-button"
                href={vehicle.sizes[0] ? `/search?size=${encodeURIComponent(vehicle.sizes[0].size)}` : "/vehicles"}
              >
                Compare matching tire offers
              </Link>
              <Link className="ghost-link" href={`/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}`}>
                Back to vehicle page
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Helpful for</span>
            <ul className="bullet-list">
              <li>Combining vehicle fitment with a tire type or season.</li>
              <li>Moving from broad research into exact-size options.</li>
              <li>Comparing offers after narrowing by category.</li>
            </ul>
          </aside>
        </section>

        <AmazonOfferRail
          title={`${vehicle.displayName} Amazon tire offers`}
          intro="Vehicle-linked Amazon offers can render here when they match the fitment mapping."
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related fitment paths</span>
            <h2>Move deeper from this vehicle-category page</h2>
          </div>
          <div className="category-grid">
            {relatedSizes.map((size) => (
              <Link key={size.size} href={`/tires/${params.category}/${sizeToSlug(size.size)}`} className="category-card">
                <h3>{category.shortLabel} {size.size} tires</h3>
                <p>Category-plus-size page for this vehicle's relevant fitment range.</p>
                <span>View intersection page</span>
              </Link>
            ))}
            {vehicle.brands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="category-card">
                <h3>{brand.name} tires</h3>
                <p>{brand.description}</p>
                <span>View brand guide</span>
              </Link>
            ))}
            <Link href="/deals/amazon-tires" className="category-card">
              <h3>Top Amazon tire deals</h3>
              <p>Commercial deal hub for shoppers ready to compare merchants.</p>
              <span>View Amazon deals</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
