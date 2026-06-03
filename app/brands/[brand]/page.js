import JsonLd from "../../components/JsonLd";
import InternalLinkPanel from "../../components/InternalLinkPanel";
import ProductGrid from "../../components/ProductGrid";
import RetailerSearchFallback from "../../components/RetailerSearchFallback";
import TireCategoryImage from "../../components/TireCategoryImage";
import { brandNameFromSlug, getBrandSummary, priorityBrands, brandSlug } from "../../lib/brandData";
import { getInternalLinks } from "../../lib/internalLinks";
import { breadcrumbSchema, faqSchema, itemListSchema } from "../../lib/schema";
import { descriptionForBrand, robotsForPage, titleForBrand } from "../../lib/seo";

export function generateStaticParams() {
  return priorityBrands.map((brand) => ({ brand: brandSlug(brand) }));
}

export function generateMetadata({ params }) {
  const name = brandNameFromSlug(params.brand);
  const summary = getBrandSummary(name);
  return {
    title: titleForBrand(name),
    description: descriptionForBrand(name),
    alternates: { canonical: `/brands/${params.brand}` },
    robots: robotsForPage({ products: summary.products })
  };
}

export default function BrandPage({ params }) {
  const summary = getBrandSummary(params.brand);
  const links = getInternalLinks({ brand: summary.slug });
  const faqs = [
    {
      question: `How should I compare ${summary.name} tires?`,
      answer: `Start with the exact tire size, then compare ${summary.name} models by category, load rating, speed rating, installation options, retailer availability, and current price.`
    },
    {
      question: `Can I buy ${summary.name} tires by brand alone?`,
      answer: "Brand is only one part of the decision. Confirm the size, vehicle fitment, load rating, speed rating, and retailer inventory before purchase."
    }
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Brands", href: "/brands" }, { name: `${summary.name} tires` }])} />
      {summary.products.length ? <JsonLd data={itemListSchema({ title: `${summary.name} tire models`, products: summary.products, path: `/brands/${summary.slug}` })} /> : null}
      <JsonLd data={faqSchema(faqs)} />
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Brand tire guide</p>
          <h1>{summary.name} Tires</h1>
          <p>Review {summary.name} tire models, common replacement sizes, vehicle fitment paths, and retailer options. Confirm exact size, speed rating, load rating, and fitment before purchase.</p>
        </div>
        <div className="visual-callout">
          <TireCategoryImage type={summary.products.some((product) => `${product.category} ${product.position}`.toLowerCase().includes("commercial")) ? "commercial" : "passenger"} alt={`${summary.name} tire buyer guide visual`} />
          <div>
            <p className="kicker">Buyer path</p>
            <h2>{summary.name} by size, model, and vehicle</h2>
            <p>Use this page to narrow the brand family, then move to an exact-size page or retailer path before buying.</p>
          </div>
        </div>
        <div className="info-grid">
          <article>
            <h2>{summary.name} strengths</h2>
            <p>{summary.name} appears in searches for passenger, SUV, pickup, EV, or commercial replacement tires depending on the model. Use exact-size pages for final comparison.</p>
          </article>
          <article>
            <h2>Popular {summary.name} models</h2>
            <p>{summary.models.length ? summary.models.join(", ") : "Model coverage is being expanded as verified retailer and manufacturer information is added."}</p>
          </article>
        </div>
        <div className="intent-cards">
          {summary.sizeLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a href="/shop-tires">Check retailer options</a>
        </div>
        {summary.products.length ? <ProductGrid products={summary.products} placement={`brand-${summary.slug}`} /> : <RetailerSearchFallback size="" intent={`${summary.name} tires`} placement={`brand-${summary.slug}-empty`} />}
        <section className="section compact-section">
          <div className="section-heading compact-heading">
            <p className="kicker">FAQ</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <InternalLinkPanel links={links} />
      </section>
    </>
  );
}
