import Link from "next/link";
import { featuredSizes, sizeToSlug } from "../lib/siteData";

export default function FeaturedSizeGrid() {
  return (
    <section className="featured-size-section">
      <div className="section-heading">
        <span className="eyebrow">Popular tire sizes</span>
        <h2>Start with one of the most searched tire sizes</h2>
        <p>
          These are some of the most common replacement sizes for cars, SUVs,
          and trucks, making them a fast way to start comparing prices and
          brands.
        </p>
      </div>
      <div className="size-card-grid">
        {featuredSizes.map((item) => (
          <article key={item.size} className="size-card">
            <span className="size-card-label">{item.size}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <small>{item.vehicleFit}</small>
            <Link href={`/tires/${sizeToSlug(item.size)}`}>Shop this tire size</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
