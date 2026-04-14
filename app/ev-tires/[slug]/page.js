import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import PriceTable from "../../components/PriceTable";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import {
  evBrands,
  evIntents,
  evModels,
  getEvBrandPageData,
  getEvIntentPageData,
  getEvModelPageData,
  getEvPageIndexState,
  resolveEvSlug,
} from "../../lib/evData";
import { buildProtectedRedirectHref } from "../../lib/outboundRedirect";
import { siteUrl } from "../../lib/siteData";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const resolved = resolveEvSlug(params.slug);

  if (!resolved) {
    return {};
  }

  const page = getEvPageIndexState(resolved.type, params.slug);
  const title =
    resolved.type === "model"
      ? `${page.displayName} EV Tires`
      : resolved.type === "brand"
        ? `${page.name} EV Tires`
        : page.title;

  return {
    title,
    description: page.summary || page.evSummary || page.intro,
    robots: {
      index: page.indexable,
      follow: true,
    },
    alternates: {
      canonical: `/ev-tires/${params.slug}`,
    },
    openGraph: {
      title: `${title} | TireSearchEngine`,
      description: page.summary || page.evSummary || page.intro,
      url: `${siteUrl}/ev-tires/${params.slug}`,
    },
  };
}

function buildPageView(pageType, slug) {
  if (pageType === "model") return getEvModelPageData(slug);
  if (pageType === "brand") return getEvBrandPageData(slug);
  if (pageType === "intent") return getEvIntentPageData(slug);
  return null;
}

function getRows(page) {
  return (page.skus || []).flatMap((sku) => sku.offers.map((offer) => ({
    id: offer.offerId,
    price: offer.price,
    affiliate_link: buildProtectedRedirectHref({
      destination: offer.outboundUrl,
      merchant: offer.merchantName,
      surface: "ev-vertical",
      placement: "offer-table",
    }),
    tires: {
      brand: sku.brand,
      model: `${sku.modelName} ${sku.size}`,
    },
    suppliers: {
      name: offer.merchantName,
    },
  })));
}

export default function EvDynamicPage({ params }) {
  const resolved = resolveEvSlug(params.slug);

  if (!resolved) {
    notFound();
  }

  const page = buildPageView(resolved.type, params.slug);
  const state = getEvPageIndexState(resolved.type, params.slug);

  if (!page) {
    notFound();
  }

  const heading =
    resolved.type === "model"
      ? `${page.displayName} EV tires`
      : resolved.type === "brand"
        ? `${page.name} EV tires`
        : page.title;
  const description = page.summary || page.evSummary || page.intro;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "EV Tires", href: "/ev-tires" },
    { label: heading },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: heading,
    description,
    url: `${siteUrl}/ev-tires/${params.slug}`,
  };
  const rows = getRows(page);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">
              {resolved.type === "model" ? "EV model page" : resolved.type === "brand" ? "EV brand page" : "EV intent page"}
            </span>
            <h1>{heading}</h1>
            <p>{description}</p>
            {!state.indexable ? (
              <p>
                This page is available to shoppers now and will be added to
                search once inventory depth and coverage are strong enough.
              </p>
            ) : null}
            <div className="hero-actions">
              {resolved.type === "model" && page.existingVehicleHref ? (
                <Link className="search-button" href={page.existingVehicleHref}>
                  View current vehicle page
                </Link>
              ) : (
                <Link className="search-button" href="/search?size=235/45R18">
                  Compare EV tire offers
                </Link>
              )}
              <Link className="ghost-link" href="/ev-tires">
                Back to EV hub
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Page details</span>
            <ul className="bullet-list">
              <li>{rows.length} offer rows currently attached to this page.</li>
              <li>{state.merchants?.length || state.linkedModels?.length || 0} connected merchants or linked models.</li>
              <li>Coverage status: {state.reason.replaceAll("_", " ")}.</li>
            </ul>
          </aside>
        </section>

        {resolved.type === "model" ? (
          <section className="category-section">
            <div className="section-heading">
              <span className="eyebrow">EV fitment focus</span>
              <h2>Fitment and spec modules built for this vehicle</h2>
            </div>
            <div className="category-grid">
              {page.fitments.map((fitment) => (
                <article key={fitment.label} className="category-card">
                  <h3>{fitment.size}</h3>
                  <p>
                    {fitment.label}. Load designation: {fitment.loadDesignation}. Speed rating: {fitment.speedRating}.
                  </p>
                  <span>Fitment module</span>
                </article>
              ))}
              {page.oemFocus.map((item) => (
                <article key={item} className="category-card">
                  <h3>{item}</h3>
                  <p>EV-specific details to help shoppers compare comfort, range, and fitment priorities.</p>
                  <span>Spec support</span>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {rows.length ? <PriceTable rows={rows} /> : null}

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related EV paths</span>
            <h2>Keep the shopper moving through the EV funnel</h2>
          </div>
          <div className="category-grid">
            <Link href="/tesla-tires" className="category-card">
              <h3>Tesla tire hub</h3>
              <p>T-mark, acoustic foam, and Tesla-specific education in one place.</p>
              <span>Open Tesla hub</span>
            </Link>
            <Link href="/ev-tires/quiet" className="category-card">
              <h3>Quiet EV tires</h3>
              <p>Shop EV pages built around in-cabin noise sensitivity and acoustic technologies.</p>
              <span>Open quiet hub</span>
            </Link>
            <Link href="/ev-tires/best-range" className="category-card">
              <h3>Best range EV tires</h3>
              <p>Range-minded replacements and efficiency-first comparison paths.</p>
              <span>Open range hub</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
