import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { getEvModelPageData } from "../lib/evData";
import { siteUrl } from "../lib/siteData";

const teslaModels = ["tesla-model-3", "tesla-model-y"].map((slug) => getEvModelPageData(slug)).filter(Boolean);

export const metadata = {
  title: "Tesla Tires",
  description:
    "Tesla-focused tire hub covering T-mark guidance, acoustic foam context, quiet ride priorities, and Tesla EV fitment pages.",
  alternates: {
    canonical: "/tesla-tires",
  },
  openGraph: {
    title: "Tesla Tires | TireSearchEngine",
    description:
      "Compare Tesla tire paths with T-mark, quiet ride, and EV replacement guidance in one place.",
    url: `${siteUrl}/tesla-tires`,
  },
};

export default function TeslaTiresPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Tesla Tires" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Tesla tire hub</span>
            <h1>Tesla tires with T-mark guidance, quiet-ride context, and spec-safe EV filters.</h1>
            <p>
              This hub organizes Tesla tire shopping around T0, T1, and T2 context,
              acoustic-foam education, and high-intent Tesla model replacement pages.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href="/ev-tires/tesla-model-3">
                Shop Tesla Model 3 tires
              </Link>
              <Link className="ghost-link" href="/ev-tires/quiet">
                Browse quiet EV tires
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Tesla-specific modules</span>
            <ul className="bullet-list">
              <li>T-mark explainer for Tesla shoppers comparing OEM-style markings.</li>
              <li>Acoustic-foam context for quieter EV cabins.</li>
              <li>Spec-safe links into Tesla model pages and quiet/range hubs.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Tesla model pages</span>
            <h2>Choose the Tesla replacement path that matches your vehicle</h2>
          </div>
          <div className="category-grid">
            {teslaModels.map((model) => (
              <Link key={model.slug} href={`/ev-tires/${model.slug}`} className="category-card">
                <h3>{model.displayName} tires</h3>
                <p>{model.summary}</p>
                <span>Open Tesla model page</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
