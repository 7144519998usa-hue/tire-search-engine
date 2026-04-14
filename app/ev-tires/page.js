import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { buildVisibleTireItemListSchema } from "../lib/structuredData";
import { evIntents, getEvHubData } from "../lib/evData";
import { siteUrl } from "../lib/siteData";

export const metadata = {
  title: "EV Tires",
  description:
    "Compare EV tires by model, quiet ride, range goals, seasonal needs, and load-aware fitment paths inside TireSearchEngine.",
  alternates: {
    canonical: "/ev-tires",
  },
  openGraph: {
    title: "EV Tires | TireSearchEngine",
    description:
      "US-focused EV tire hub for Tesla, Mustang Mach-E, and electric crossover replacement paths.",
    url: `${siteUrl}/ev-tires`,
  },
};

export default function EvTiresHubPage() {
  const hub = getEvHubData();
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "EV Tires" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const itemListSchema = buildVisibleTireItemListSchema({
    title: "Featured EV tire offers",
    rows: hub.topModels
      .flatMap((model) => model.skus || [])
      .slice(0, 10)
      .map((sku, index) => ({
        id: `${sku.skuKey}-${index}`,
        tires: {
          brand: sku.brand,
          model: sku.modelName,
        },
      })),
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">EV tire marketplace</span>
            <h1>Compare EV tires by vehicle, quiet ride, range goals, and load-aware fitment.</h1>
            <p>
              This EV hub is built for electric-vehicle replacement intent, with model pages,
              quiet and best-range filters, Tesla-spec education, and offer-aware index gating.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href="/ev-tires/tesla-model-3">
                Shop Tesla Model 3 tires
              </Link>
              <Link className="ghost-link" href="/tesla-tires">
                Open Tesla tire hub
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Launch snapshot</span>
            <ul className="bullet-list">
              <li>{hub.stats.offersTotal} tracked EV offers across the launch catalog.</li>
              <li>{hub.stats.merchants} merchants in the EV comparison layer.</li>
              <li>{hub.stats.indexableModels} indexable EV model pages passing launch gates.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Top EV models</span>
            <h2>Start with high-intent electric vehicle fitment pages</h2>
            <p>
              These pages combine EV-only education, fitment context, and offer coverage
              instead of sending every replacement search into a generic tire-size flow.
            </p>
          </div>
          <div className="category-grid">
            {hub.topModels.map((model) => (
              <Link key={model.slug} href={`/ev-tires/${model.slug}`} className="category-card">
                <h3>{model.displayName} tires</h3>
                <p>{model.summary}</p>
                <span>{model.indexable ? "Open model page" : "View gated page"}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Intent hubs</span>
            <h2>Shop by the EV buying goal, not just by size</h2>
          </div>
          <div className="category-grid">
            {evIntents.map((intent) => (
              <Link key={intent.slug} href={`/ev-tires/${intent.slug}`} className="category-card">
                <h3>{intent.title}</h3>
                <p>{intent.intro}</p>
                <span>Browse {intent.slug.replaceAll("-", " ")}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
