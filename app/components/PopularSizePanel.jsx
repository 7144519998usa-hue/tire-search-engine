import Link from "next/link";
import { sizeToSlug } from "../lib/siteData";

const popularSizes = [
  "205/55R16",
  "225/65R17",
  "215/55R17",
  "235/60R18",
  "235/65R17",
  "225/60R17",
  "215/60R16",
  "245/45R20",
  "275/55R20",
  "265/70R17",
  "225/55R17",
  "235/55R18",
  "245/60R18",
  "215/65R16",
  "255/65R18",
  "275/60R20",
  "235/45R18",
  "245/40R18",
  "205/60R16",
  "225/50R17",
];

export default function PopularSizePanel() {
  return (
    <aside className="minimal-home-sidebar-panel minimal-home-sidebar-panel--sizes" aria-labelledby="most-searched-sizes-title">
      <h2 id="most-searched-sizes-title" className="minimal-home-sidebar-title">
        Most Searched Sizes
      </h2>
      <div className="minimal-home-link-list minimal-home-link-grid">
        {popularSizes.map((size) => (
          <Link
            key={size}
            href={`/tires/${sizeToSlug(size)}`}
            className="minimal-home-sidebar-link minimal-home-size-link"
          >
            {size}
          </Link>
        ))}
      </div>
    </aside>
  );
}
