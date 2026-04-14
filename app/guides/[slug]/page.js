import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../components/AmazonOfferRail";
import AuthorMetaRow from "../../components/AuthorMetaRow";
import Breadcrumbs from "../../components/Breadcrumbs";
import DisclosurePill from "../../components/DisclosurePill";
import JsonLd from "../../components/JsonLd";
import MethodologyCard from "../../components/MethodologyCard";
import TrustStatsBar from "../../components/TrustStatsBar";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { getAmazonOffersForGuide } from "../../lib/amazonOfferCatalog";
import { defaultTrustStats, editorialTeam } from "../../lib/editorial";
import {
  featuredBrandPages,
  getSeoGuideBySlug,
  seoGuides,
  siteUrl,
} from "../../lib/siteData";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const guide = getSeoGuideBySlug(params.slug);

  if (!guide) {
    return {};
  }

  return {
    title: `${guide.title} for Smart Tire Shoppers`,
    description: guide.intro,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: `${guide.title} | TireSearchEngine`,
      description: guide.intro,
      url: `${siteUrl}/guides/${guide.slug}`,
    },
  };
}

export default function GuidePage({ params }) {
  const guide = getSeoGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.heroTitle,
    description: guide.intro,
    mainEntityOfPage: `${siteUrl}/guides/${guide.slug}`,
  };
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: guide.title },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const amazonOffers = getAmazonOffersForGuide(guide.slug);
  const relatedBrands = featuredBrandPages.slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <DisclosurePill type="affiliate" />
            <span className="eyebrow">Tire buying guide</span>
            <h1>{guide.heroTitle}</h1>
            <AuthorMetaRow
              author={editorialTeam.leadWriter}
              reviewer={editorialTeam.reviewer}
            />
            <TrustStatsBar items={defaultTrustStats} />
            <p>{guide.intro}</p>
            <div className="hero-actions">
              <Link className="search-button" href={guide.ctaHref}>
                {guide.ctaLabel}
              </Link>
              <Link className="ghost-link" href="/">
                Browse more tire categories
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">What shoppers care about</span>
            <ul className="bullet-list">
              <li>Brand trust and real-world reputation.</li>
              <li>Current price differences across major retailers.</li>
              <li>Matching the tire category to the vehicle and driving style.</li>
            </ul>
          </aside>
        </section>

        <section className="guide-grid">
          {guide.sections.map((section) => (
            <article key={section} className="content-card">
              <p>{section}</p>
            </article>
          ))}
        </section>

        <MethodologyCard />

        <AmazonOfferRail
          title={`Amazon picks for ${guide.title.toLowerCase()}`}
          intro="This guide can now pull Amazon tire offers from the shared import catalog instead of relying on hardcoded page edits."
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related pages</span>
            <h2>Go deeper from this buying guide</h2>
            <p>
              These brand pages and live comparison links strengthen the path
              from informational intent into commercial clicks.
            </p>
          </div>
          <div className="category-grid">
            <Link href={guide.ctaHref} className="category-card">
              <h3>Compare live offers</h3>
              <p>
                Move from research into current offer comparisons for a
                relevant high-intent tire search.
              </p>
              <span>View deals</span>
            </Link>
            {relatedBrands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="category-card">
                <h3>{brand.name} tires</h3>
                <p>{brand.description}</p>
                <span>Read brand guide</span>
              </Link>
            ))}
            <Link href="/deals/amazon-tires" className="category-card">
              <h3>Top Amazon tire deals</h3>
              <p>
                Move from informational intent into a curated Amazon deal hub
                built for stronger commercial click paths.
              </p>
              <span>View Amazon deals</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
