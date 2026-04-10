import Link from "next/link";
import { featuredSizes, sizeToSlug } from "../lib/siteData";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <h2>TireSearchEngine</h2>
          <p>
            Compare popular tire sizes, top brands, and supplier pricing in one
            place so you can find the right tire faster.
          </p>
        </div>

        <div className="footer-column">
          <h3>Popular tire sizes</h3>
          {featuredSizes.map((item) => (
            <Link key={item.size} href={`/tire-size/${sizeToSlug(item.size)}`}>
              {item.size}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link href="/search?size=205/55R16">Search results</Link>
          <Link href="/vehicle/ford/f-150/2024">Vehicle route</Link>
          <a href="mailto:partners@tiresearchengine.com">Affiliate and ad partnerships</a>
        </div>
      </div>
    </footer>
  );
}
