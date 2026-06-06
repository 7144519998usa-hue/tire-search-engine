import { notFound } from "next/navigation";
import InternalLinkPanel from "../../components/InternalLinkPanel";
import JsonLd from "../../components/JsonLd";
import { comparisons, getComparison } from "../../lib/comparisonData";
import { getInternalLinks } from "../../lib/internalLinks";
import { breadcrumbSchema, faqSchema } from "../../lib/schema";

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export function generateMetadata({ params }) {
  const comparison = getComparison(params.slug);
  if (!comparison) return {};
  return {
    title: `${comparison.title}: Practical Tire Comparison`,
    description: comparison.summary,
    alternates: { canonical: `/compare/${params.slug}` }
  };
}

export default function ComparisonPage({ params }) {
  const comparison = getComparison(params.slug);
  if (!comparison) notFound();
  const faqs = [
    {
      question: `How should I use this ${comparison.title} comparison?`,
      answer: "Use it to narrow the decision, then confirm the exact tire size, load rating, speed rating, fitment, installation, and current retailer price."
    },
    {
      question: "Can this page confirm fitment?",
      answer: "No. Fitment must be confirmed through the vehicle placard, tire sidewall, retailer fitment tool, installer, or fleet supplier."
    },
    {
      question: "What is the next step after comparing?",
      answer: "Move to the exact-size tire page, vehicle page, brand page, or retailer checkout path linked from this comparison."
    }
  ];
  const links = getInternalLinks({ commercial: params.slug.includes("steer") || params.slug.includes("truck") || params.slug.includes("retread") });

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Compare", href: "/compare" }, { name: comparison.title }])} />
      <JsonLd data={faqSchema(faqs)} />
      <article className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Comparison guide</p>
          <h1>{comparison.title}</h1>
          <p>{comparison.summary}</p>
        </div>
        <div className="info-grid">
          {comparison.rows.map(([label, left, right]) => (
            <article key={label}>
              <h2>{label}</h2>
              <p><strong>Option A:</strong> {left}</p>
              <p><strong>Option B:</strong> {right}</p>
            </article>
          ))}
        </div>
        <section className="section compact-section">
          <div className="section-heading compact-heading">
            <p className="kicker">Related pages</p>
          </div>
          <div className="intent-cards">
            {comparison.links.map((href) => <a key={href} href={href}>{href.replace(/^\//, "").replaceAll("-", " ").replaceAll("/", " / ")}</a>)}
          </div>
        </section>
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
        <p className="fitment-note">Reviewed by the Tire Search Engine editorial team. Updated June 3, 2026. Sources: retailer fitment tools, manufacturer tire information, commercial tire application notes, and the Tire Search Engine methodology.</p>
      </article>
    </>
  );
}
