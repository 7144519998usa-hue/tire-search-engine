import Link from "next/link";

export default function HowItWorksSection({ steps }) {
  return (
    <section className="category-section">
      <div className="section-heading">
        <span className="eyebrow">How it works</span>
        <h2>Move from search to the right tire faster</h2>
        <p>
          Use one streamlined flow to search, compare, and continue to the supplier route that fits your
          needs best.
        </p>
      </div>
      <div className="category-grid">
        {steps.map((step, index) => (
          <Link key={step.title} href={step.href} className="category-card">
            <span className="pillar-index">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <span>Open this path</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
