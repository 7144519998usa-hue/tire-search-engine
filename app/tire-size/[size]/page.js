import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import PriceTable from "../../components/PriceTable";
import {
  featuredSizes,
  getFeaturedSizeBySlug,
  homeFaqs,
  siteUrl,
  slugToSize,
  sizeToSlug,
} from "../../lib/siteData";
import { getSearchResults } from "../../lib/queries";

export async function generateStaticParams() {
  return featuredSizes.map((item) => ({
    size: sizeToSlug(item.size),
  }));
}

export async function generateMetadata({ params }) {
  const size = slugToSize(params.size);

  return {
    title: `${size} Tires: Compare Prices, Brands, and Suppliers`,
    description: `Compare ${size} tire prices across suppliers, review brands, and click through affiliate-ready offers from one landing page.`,
    alternates: {
      canonical: `/tire-size/${String(params.size).toLowerCase()}`,
    },
    openGraph: {
      title: `${size} Tires | TireSearchEngine`,
      description: `Compare live offers and supplier pricing for ${size} tires.`,
      url: `${siteUrl}/tire-size/${String(params.size).toLowerCase()}`,
    },
  };
}

export default async function TireSizeLandingPage({ params }) {
  const page = getFeaturedSizeBySlug(params.size);

  if (!page) {
    notFound();
  }

  const { rows, brands, suppliers } = await getSearchResults(page.size);
  const faqItems = [
    {
      question: `What vehicles commonly use ${page.size} tires?`,
      answer: page.vehicleFit,
    },
    {
      question: `How should drivers compare ${page.size} tire options?`,
      answer:
        "Start with the lowest delivered price, then compare trusted suppliers, tire model reputation, and intended use before clicking through.",
    },
    ...homeFaqs.slice(1, 2),
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${page.size} tire offers`,
    itemListElement: rows.slice(0, 10).map((row, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: row.affiliate_link,
      name: `${row.tires?.brand || "Tire"} ${row.tires?.model || ""}`.trim(),
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <main className="page-shell size-landing">
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Tire size landing page</span>
            <h1>Shop {page.size} tires from top brands and suppliers in one place.</h1>
            <p>
              {page.summary} Compare popular options, check prices, and click
              through to the supplier when you are ready to buy.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href={`/search?size=${encodeURIComponent(page.size)}`}>
                Compare {page.size} deals
              </Link>
              <Link className="ghost-link" href="/">
                Back to homepage
              </Link>
            </div>
          </div>

          <aside className="size-hero-panel">
            <span className="panel-kicker">Popular shopper signals</span>
            <ul className="bullet-list">
              <li>{brands.length} brands surfaced for this size.</li>
              <li>{suppliers.length} suppliers available to shop from.</li>
              <li>Useful for comparing value, brand preference, and buying options.</li>
            </ul>
          </aside>
        </section>

        <section className="content-grid">
          <article className="content-card">
            <h2>About {page.size}</h2>
            <p>{page.vehicleFit}</p>
            <p>
              This is a high-interest tire size for shoppers comparing leading
              brands, long-lasting tread life, and the best available price for
              their vehicle.
            </p>
          </article>

          <article className="content-card">
            <h2>How to buy</h2>
            <p>
              Review the offers below, choose the tire and supplier that fit
              your needs, and use the buy link to continue directly to the
              retailer's product page.
            </p>
          </article>
        </section>

        <section className="size-results-block">
          <div className="section-heading">
            <span className="eyebrow">Featured offers</span>
            <h2>{page.size} price comparison</h2>
          </div>
          {rows.length === 0 ? (
            <section className="empty-state">
              <h2>No offers available yet.</h2>
              <p>Connect additional supplier data to populate this landing page.</p>
            </section>
          ) : (
            <PriceTable rows={rows} />
          )}
        </section>

        <section className="faq-section">
          <div className="section-heading">
            <span className="eyebrow">SEO content</span>
            <h2>{page.size} buying questions</h2>
          </div>
          <div className="faq-grid">
            {faqItems.map((item) => (
              <article key={item.question} className="faq-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
