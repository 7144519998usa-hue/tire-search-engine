import Link from "next/link";

export default function MethodologyCard({ href = "/about/editorial-policy", title = "How we evaluate this category" }) {
  return (
    <section className="content-card methodology-card">
      <span className="eyebrow">Methodology</span>
      <h2>{title}</h2>
      <p>
        We structure commercial pages around fitment, price clarity, and buyer usefulness. That includes
        visible disclosures, comparison-first layouts, and regularly refreshed buying guidance.
      </p>
      <div className="hero-actions">
        <Link className="secondary-button" href={href}>
          Read our methodology
        </Link>
        <Link className="ghost-link" href="/about/how-we-make-money">
          How we make money
        </Link>
      </div>
    </section>
  );
}
