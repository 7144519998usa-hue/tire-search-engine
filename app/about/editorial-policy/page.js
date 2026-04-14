import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { siteUrl } from "../../lib/siteData";

export const metadata = {
  title: "Editorial Policy",
  description: "Read how TireSearchEngine approaches research, comparisons, updates, and editorial standards.",
  alternates: {
    canonical: "/about/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Editorial policy" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "TireSearchEngine editorial policy",
          description: "How TireSearchEngine approaches editorial standards and commerce content.",
          mainEntityOfPage: `${siteUrl}/about/editorial-policy`,
        }}
      />
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={items} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Editorial standards</span>
            <h1>How TireSearchEngine approaches research and recommendations</h1>
            <p>
              We build pages to help shoppers compare fitment, pricing paths, and tradeoffs clearly. Our
              editorial goal is to make the decision easier before the clickout happens.
            </p>
          </div>
        </section>
        <section className="guide-grid">
          <article className="content-card"><p>We prioritize buyer usefulness, fitment clarity, and commercial transparency over thin keyword targeting.</p></article>
          <article className="content-card"><p>Pages should explain tradeoffs in plain English, not just surface raw specs or undifferentiated offer lists.</p></article>
          <article className="content-card"><p>Freshness matters. Commercial pages should be updated when pricing paths, fitment context, or recommendation logic changes materially.</p></article>
        </section>
      </main>
    </>
  );
}
