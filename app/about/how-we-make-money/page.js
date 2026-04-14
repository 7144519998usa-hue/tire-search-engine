import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { siteUrl } from "../../lib/siteData";

export const metadata = {
  title: "How We Make Money",
  description: "See how TireSearchEngine earns revenue through affiliate referrals, deals, and lead-generation flows.",
  alternates: {
    canonical: "/about/how-we-make-money",
  },
};

export default function HowWeMakeMoneyPage() {
  const items = [
    { label: "Home", href: "/" },
    { label: "How we make money" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How TireSearchEngine makes money",
          description: "The business model behind TireSearchEngine's comparison, affiliate, and lead-generation pages.",
          mainEntityOfPage: `${siteUrl}/about/how-we-make-money`,
        }}
      />
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={items} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Business model</span>
            <h1>How TireSearchEngine earns revenue</h1>
            <p>
              Revenue can come from affiliate clickouts, curated deal placements, and commercial lead-generation
              flows. We pair that with visible disclosures so users understand when a page contains monetized paths.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
