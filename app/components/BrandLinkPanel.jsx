import Link from "next/link";
import { topBrands } from "../lib/siteData";

function slugifyBrand(value) {
  return String(value).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function BrandLinkPanel() {
  return (
    <aside className="minimal-home-sidebar-panel minimal-home-sidebar-panel--brands" aria-labelledby="top-brands-title">
      <h2 id="top-brands-title" className="minimal-home-sidebar-title">
        Top Brands
      </h2>
      <div className="minimal-home-link-list minimal-home-link-grid">
        {topBrands.map((brand) => (
          <Link key={brand.name} href={`/brands/${slugifyBrand(brand.name)}`} className="minimal-home-sidebar-link">
            {brand.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
