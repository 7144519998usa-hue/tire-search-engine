import { notFound } from "next/navigation";
import GuideIllustration from "../../components/GuideIllustration";
import InternalLinkPanel from "../../components/InternalLinkPanel";
import JsonLd from "../../components/JsonLd";
import { articles, getArticle } from "../../lib/educationData";
import { getInternalLinks } from "../../lib/internalLinks";
import { articleSchema, breadcrumbSchema, faqSchema } from "../../lib/schema";
import { descriptionForGuide, titleForGuide } from "../../lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: titleForGuide(article.title),
    description: descriptionForGuide(article.title),
    alternates: { canonical: `/tire-university/${params.slug}` },
    robots: article.indexable ? { index: true, follow: true } : { index: false, follow: true }
  };
}

export default function TireArticlePage({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const links = getInternalLinks({ commercial: article.group.includes("Commercial") });
  const faqs = [
    {
      question: `Why does ${article.title.toLowerCase()} matter?`,
      answer: "It affects fitment, safety, cost, replacement options, and retailer availability. Confirm the relevant tire spec before buying."
    },
    {
      question: "Can this guide confirm tire fitment?",
      answer: "No. Use the guide to understand the topic, then confirm fitment with the vehicle placard, tire sidewall, retailer, installer, or fleet supplier."
    }
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Tire University", href: "/tire-university" }, { name: article.title }])} />
      <JsonLd data={articleSchema({ title: article.title, description: descriptionForGuide(article.title), path: `/tire-university/${params.slug}` })} />
      <JsonLd data={faqSchema(faqs)} />
      <article className="section page-shell article-page">
        <div className="section-heading">
          <p className="kicker">{article.group}</p>
          <h1>{article.title}</h1>
          <p>Use this guide to make a practical tire decision before comparing retailer paths. Always confirm exact tire size, load rating, speed rating, vehicle fitment, and installation details before purchase.</p>
        </div>
        <div className="visual-callout">
          <GuideIllustration group={article.group} title={article.title} />
          <div>
            <p className="kicker">Visual guide</p>
            <h2>Use the diagram, then confirm the spec.</h2>
            <p>Images help explain the concept, but your final decision should still come from the vehicle placard, tire sidewall, and retailer fitment confirmation.</p>
          </div>
        </div>
        <nav className="intent-cards" aria-label="Table of contents">
          <a href="#what-it-means">What it means</a>
          <a href="#how-to-compare">How to compare</a>
          <a href="#next-steps">Next steps</a>
        </nav>
        <section id="what-it-means">
          <h2>What it means</h2>
          <p>{article.title} affects tire fitment, safety, ride quality, cost, and retailer availability. Start with the exact size or vehicle fitment, then compare only products that match those requirements.</p>
        </section>
        <section id="how-to-compare">
          <h2>How to compare</h2>
          <p>Compare exact size first, then season, category, load requirements, warranty notes, installation options, and retailer availability. For commercial tires, also confirm position, casing, haul type, and load range.</p>
        </section>
        <section id="next-steps">
          <h2>Next steps</h2>
          <div className="intent-cards">
            <a href="/tires/225-65-r17">Compare passenger tire sizes</a>
            <a href="/commercial-truck-tires">Compare commercial truck tires</a>
            <a href="/vehicles">Find tires by vehicle</a>
            <a href="/deals">Check retailer paths</a>
          </div>
        </section>
        <section>
          <h2>FAQ</h2>
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
        <p className="fitment-note">Last updated June 3, 2026.</p>
      </article>
    </>
  );
}
