import Link from "next/link";
import AuthorMetaRow from "../components/AuthorMetaRow";
import Breadcrumbs from "../components/Breadcrumbs";
import DisclosurePill from "../components/DisclosurePill";
import JsonLd from "../components/JsonLd";
import MethodologyCard from "../components/MethodologyCard";
import TrustStatsBar from "../components/TrustStatsBar";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { defaultTrustStats, editorialTeam } from "../lib/editorial";
import { featuredBrandPages, featuredSizes, siteUrl, sizeToSlug } from "../lib/siteData";

export const metadata = {
  title: "Compare Tires",
  description:
    "Compare popular tire brands and exact sizes through TireSearchEngine's US-focused comparison hub.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Compare Tires | TireSearchEngine",
    description:
      "Start from popular brands and exact sizes to compare the strongest tire shopping paths.",
    url: `${siteUrl}/compare`,
  },
};

export default function CompareHubPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Compare" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <DisclosurePill type="affiliate" />
            <span className="eyebrow">Comparison hub</span>
            <h1>Compare popular tire brands and exact-size shopping paths.</h1>
            <AuthorMetaRow
              author={editorialTeam.leadWriter}
              reviewer={editorialTeam.reviewer}
            />
            <TrustStatsBar items={defaultTrustStats} />
            <p>
              This hub moves shoppers into the strongest commercial brand-plus-size
              pages without relying on generic search flows alone.
            </p>
          </div>
        </section>

        <MethodologyCard href="/about/editorial-policy" title="How these comparison paths are structured" />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Brand comparisons</span>
            <h2>Popular brand-plus-size paths</h2>
          </div>
          <div className="category-grid">
            {featuredBrandPages.slice(0, 4).map((brand) =>
              featuredSizes.slice(0, 2).map((size) => (
                <Link
                  key={`${brand.slug}-${size.size}`}
                  href={`/brands/${brand.slug}/${sizeToSlug(size.size)}`}
                  className="category-card"
                >
                  <h3>{brand.name} {size.size}</h3>
                  <p>Direct comparison page for a trusted brand and a high-intent size.</p>
                  <span>Open comparison</span>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
