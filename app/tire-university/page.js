import { articleGroups } from "../lib/educationData";
import GuideIllustration from "../components/GuideIllustration";

export const metadata = {
  title: "Tire University | Tire Size, Buying, EV & Commercial Guides",
  description: "Learn how to compare tire sizes, prices, load ratings, commercial truck tire positions, EV tire wear, and retailer options before buying.",
  alternates: { canonical: "/tire-university" }
};

export default function TireUniversityPage() {
  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Tire University</p>
        <h1>Practical tire guides for shoppers, EV owners, pickups, and commercial fleets.</h1>
        <p>Use these guides to understand tire sizing, load ratings, retailer options, commercial tire positions, and fitment checks before comparing products.</p>
      </div>
      <div className="info-grid">
        {articleGroups.map((group) => (
          <article key={group.title}>
            <GuideIllustration group={group.title} title={group.title} />
            <h2>{group.title}</h2>
            <div className="intent-cards vertical-links">
              {group.articles.map(([title, slug]) => <a key={slug} href={`/tire-university/${slug}`}>{title}</a>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
