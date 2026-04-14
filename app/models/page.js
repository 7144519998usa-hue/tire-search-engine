import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { siteUrl } from "../lib/siteData";
import { tireModels } from "../lib/tireModels";

export const metadata = {
  title: "Tire Models",
  description:
    "Browse tire model pages that connect brand research, exact sizes, and commercial buying paths.",
  alternates: {
    canonical: "/models",
  },
  openGraph: {
    title: "Tire Models | TireSearchEngine",
    description:
      "Explore tire model pages for high-intent brand and fitment research.",
    url: `${siteUrl}/models`,
  },
};

export default function ModelsHubPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Models" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Model hub</span>
            <h1>Browse tire model pages built for product-level research and comparison intent.</h1>
            <p>
              Tire model pages bridge brand trust, size availability, and
              buying-path decisions without turning the site into a thin catalog.
            </p>
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Featured models</span>
            <h2>Start with strong tire model pages</h2>
          </div>
          <div className="category-grid">
            {tireModels.map((model) => (
              <Link key={model.slug} href={`/models/${model.slug}`} className="category-card">
                <h3>{model.title}</h3>
                <p>{model.summary}</p>
                <span>Open model page</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
