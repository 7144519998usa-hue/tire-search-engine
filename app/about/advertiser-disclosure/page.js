import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { siteUrl } from "../../lib/siteData";

export const metadata = {
  title: "Advertiser Disclosure",
  description: "Understand how TireSearchEngine uses affiliate relationships and commercial partnerships.",
  alternates: {
    canonical: "/about/advertiser-disclosure",
  },
};

export default function AdvertiserDisclosurePage() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Advertiser disclosure" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "TireSearchEngine advertiser disclosure",
          description: "How affiliate and commercial relationships interact with TireSearchEngine content.",
          mainEntityOfPage: `${siteUrl}/about/advertiser-disclosure`,
        }}
      />
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={items} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Advertiser disclosure</span>
            <h1>How commercial relationships work on TireSearchEngine</h1>
            <p>
              Some outbound links may earn TireSearchEngine a commission or route leads to commercial partners.
              We surface clear disclosures near monetized modules and aim to keep comparisons useful and easy to understand.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
