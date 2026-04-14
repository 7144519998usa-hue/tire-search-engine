import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { getBrandPageBySlug, getFeaturedSizeBySlug, siteUrl, sizeToSlug } from "../../lib/siteData";
import { getTireModelBySlug, tireModels } from "../../lib/tireModels";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const model = getTireModelBySlug(params.slug);

  if (!model) {
    return {};
  }

  return {
    title: model.title,
    description: model.summary,
    alternates: {
      canonical: `/models/${model.slug}`,
    },
    openGraph: {
      title: `${model.title} | TireSearchEngine`,
      description: model.summary,
      url: `${siteUrl}/models/${model.slug}`,
    },
  };
}

export default function TireModelPage({ params }) {
  const model = getTireModelBySlug(params.slug);

  if (!model) {
    notFound();
  }

  const brand = getBrandPageBySlug(model.brandSlug);
  const sizes = model.supportedSizes
    .map((size) => getFeaturedSizeBySlug(sizeToSlug(size)))
    .filter(Boolean);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Models", href: "/models" },
    { label: model.title },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Tire model</span>
            <h1>{model.title}</h1>
            <p>{model.summary}</p>
            <div className="hero-actions">
              {brand ? (
                <Link className="search-button" href={`/brands/${brand.slug}`}>
                  View {brand.name} tires
                </Link>
              ) : null}
              <Link className="ghost-link" href="/models">
                Browse tire models
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Why shoppers land here</span>
            <ul className="bullet-list">
              {model.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Supported sizes</span>
            <h2>Exact-size paths connected to this model</h2>
          </div>
          <div className="category-grid">
            {sizes.map((size) => (
              <Link key={size.size} href={`/tires/${sizeToSlug(size.size)}`} className="category-card">
                <h3>{size.size} tires</h3>
                <p>{size.summary}</p>
                <span>Open size page</span>
              </Link>
            ))}
            {brand ? (
              <Link href={`/brands/${brand.slug}`} className="category-card">
                <h3>{brand.name} brand page</h3>
                <p>{brand.description}</p>
                <span>Open brand page</span>
              </Link>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
}
