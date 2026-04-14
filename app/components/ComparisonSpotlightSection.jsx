import Link from "next/link";

export default function ComparisonSpotlightSection({ items }) {
  return (
    <section className="category-section">
      <div className="section-heading">
        <span className="eyebrow">Comparison spotlight</span>
        <h2>Start with the most compared tire routes</h2>
        <p>
          Surface the comparisons and buying paths that tend to convert earlier, before the shopper gets
          lost in specs or retailer tabs.
        </p>
      </div>
      <div className="category-grid">
        {items.map((item) => (
          <Link key={item.title} href={item.href} className="category-card">
            <span className="deal-badge">{item.bestFor}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small>{item.priceCue}</small>
            <span>View comparison path</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
