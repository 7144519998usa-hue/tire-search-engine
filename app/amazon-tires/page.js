import JsonLd from "../components/JsonLd";
import AmazonProductGrid from "../components/AmazonProductGrid";
import { amazonStorefrontHref, amazonStorefrontSections } from "../lib/amazonStorefront";
import { getAmazonProductsForSection, hasAmazonApiProducts } from "../lib/amazonProducts";
import { breadcrumbSchema, faqSchema } from "../lib/schema";

export const metadata = {
  title: "Amazon Tires & Wheels | Curated Tire Search Hub",
  description: "Browse curated Amazon tire, wheel, truck tire, winter tire, EV tire, TPMS, inflator, tire chain, and tire accessory searches with Tire Search Engine.",
  alternates: { canonical: "/amazon-tires" }
};

const faqs = [
  {
    question: "Can I buy tires on Amazon through Tire Search Engine?",
    answer: "Yes. This page links to Amazon marketplace searches using the approved Tire Search Engine Amazon Associates store ID. Confirm the final seller, price, fitment, shipping, installation, and return terms on Amazon before buying."
  },
  {
    question: "Does Tire Search Engine show live Amazon prices?",
    answer: "No. Amazon prices, availability, ratings, and shipping details can change quickly. Use these links as search paths, then verify the live offer directly on Amazon."
  },
  {
    question: "Are Amazon tire searches exact fitment recommendations?",
    answer: "No. Always confirm your exact tire size, load rating, speed rating, vehicle trim, wheel package, and installation plan before checkout."
  },
  {
    question: "Why include Amazon tire accessories?",
    answer: "Many tire shoppers also need TPMS sensors, inflators, repair kits, snow chains, jacks, or wheel tools. Those accessory searches can be useful after choosing tires."
  }
];

export default function AmazonTiresPage() {
  const hasApiProducts = hasAmazonApiProducts();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Amazon Tires & Wheels", href: "/amazon-tires" }])} />
      <JsonLd data={faqSchema(faqs)} />
      <section className="section page-shell amazon-storefront-page">
        <div className="section-heading">
          <p className="kicker">Amazon tire and wheel hub</p>
          <h1>Curated Amazon tire, wheel, and accessory searches.</h1>
          <p>
            Use these Amazon marketplace paths for quick tire and wheel research, then confirm fitment, seller details,
            shipping, installation, returns, and final price directly on Amazon.
          </p>
        </div>

        <div className="amazon-storefront-hero">
          <div>
            <span>Approved Amazon Associates store ID</span>
            <strong>tiresearch-20</strong>
            <p>As an Amazon Associate, Tire Search Engine may earn from qualifying purchases.</p>
          </div>
          <a className="hero-cta is-orange" href="#amazon-popular-sizes">Shop Amazon tire searches</a>
        </div>

        <div className="amazon-storefront-layout">
          {amazonStorefrontSections.map((section) => (
            <section className="amazon-storefront-section" id={`amazon-${section.id}`} key={section.id}>
              <div className="section-heading compact-heading">
                <div>
                  <p className="kicker">{section.eyebrow}</p>
                  <h2>{section.title}</h2>
                  <p>{section.summary}</p>
                </div>
              </div>
              {hasApiProducts ? (
                <AmazonProductGrid
                  products={getAmazonProductsForSection(section.id, 8)}
                  placement={`amazon-storefront-api-${section.id}`}
                />
              ) : null}
              <div className="amazon-storefront-grid">
                {section.items.map((item, index) => (
                  <a
                    className="amazon-storefront-card"
                    href={amazonStorefrontHref(item, `amazon-storefront-${section.id}-${index + 1}`)}
                    key={`${section.id}-${item.label}`}
                    rel="nofollow sponsored noopener"
                  >
                    <span>{item.size || section.eyebrow}</span>
                    <strong>{item.label}</strong>
                    <small>{item.intent}</small>
                    <em>Search Amazon</em>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="section compact-section">
          <div className="section-heading compact-heading">
            <p className="kicker">Compare before checkout</p>
          </div>
          <div className="priority-grid">
            <a href="/tires">Browse tire sizes</a>
            <a href="/deals">Compare tire deals</a>
            <a href="/commercial-truck-tires">Commercial truck tires</a>
            <a href="/about/advertiser-disclosure">Affiliate disclosure</a>
          </div>
        </section>

        <section className="section compact-section">
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
