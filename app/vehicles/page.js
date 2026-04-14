import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { siteUrl } from "../lib/siteData";
import { featuredVehicles } from "../lib/vehicleSeo";

export const metadata = {
  title: "Shop Tires by Vehicle",
  description:
    "Browse vehicle tire pages by make, model, and year to move from fitment searches into tire-size and comparison pages.",
  alternates: {
    canonical: "/vehicles",
  },
  openGraph: {
    title: "Shop Tires by Vehicle | TireSearchEngine",
    description:
      "Explore vehicle tire pages for popular sedans, SUVs, trucks, and crossovers.",
    url: `${siteUrl}/vehicles`,
  },
};

export default function VehiclesHubPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Vehicles" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shop Tires by Vehicle",
    description:
      "A hub page linking to vehicle fitment pages by make, model, and year.",
    url: `${siteUrl}/vehicles`,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Vehicle hub</span>
            <h1>Find tires by vehicle make, model, and year.</h1>
            <p>
              These fitment pages help drivers move from their vehicle search
              into the right tire-size, brand, and comparison pages faster.
            </p>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Best use</span>
            <ul className="bullet-list">
              <li>Find tires by exact make, model, and year.</li>
              <li>Start from fitment before comparing sizes and brands.</li>
              <li>Move into more specific vehicle and category pages.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Popular vehicles</span>
            <h2>Explore vehicle fitment pages</h2>
          </div>
          <div className="category-grid">
            {featuredVehicles.map((vehicle) => (
              <Link
                key={`${vehicle.make}-${vehicle.model}-${vehicle.year}`}
                href={`/vehicles/${vehicle.make}/${vehicle.model}/${vehicle.year}`}
                className="category-card"
              >
                <h3>{vehicle.displayName} tires</h3>
                <p>{vehicle.summary}</p>
                <span>View vehicle page</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
