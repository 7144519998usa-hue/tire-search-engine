import Link from "next/link";
import JsonLd from "./JsonLd";
import BrandLinkPanel from "./BrandLinkPanel";
import MinimalSearchEngine from "./MinimalSearchEngine";
import PopularSizePanel from "./PopularSizePanel";
import { searchSiteName, siteUrl } from "../lib/siteConfig";

const trustPoints = [
  "Size-first results",
  "Mavis installed options",
  "Amazon checkout paths",
  "Visible affiliate links",
];

const highIntentLinks = [
  {
    href: "/tires/275-60-r20/all-terrain",
    label: "275/60R20 all-terrain tires",
    note: "High-intent truck search",
  },
  {
    href: "/tires/225-65-r17",
    label: "225/65R17 tires",
    note: "Popular SUV size",
  },
  {
    href: "/tires/235-45-r18",
    label: "235/45R18 tires",
    note: "Sedan replacement size",
  },
  {
    href: "/best-truck-tires",
    label: "Best truck tires",
    note: "Broad truck comparison",
  },
  {
    href: "/best-tires-for-toyota-camry",
    label: "Toyota Camry tires",
    note: "Commuter replacement",
  },
  {
    href: "/best-tires-for-toyota-tacoma",
    label: "Toyota Tacoma tires",
    note: "Truck and all-terrain",
  },
  {
    href: "/tesla-tires",
    label: "Tesla tires",
    note: "EV replacement paths",
  },
  {
    href: "/semi-truck-tire-cost",
    label: "Semi truck tire cost",
    note: "Commercial tire research",
  },
];

const shoppingPaths = [
  {
    href: "/tires/sizes",
    label: "Search by tire size",
    note: "Start with the number on the sidewall.",
  },
  {
    href: "/vehicles",
    label: "Search by vehicle",
    note: "Find pages by year, make, and model.",
  },
  {
    href: "/brands",
    label: "Compare brands",
    note: "Michelin, Goodyear, Firestone, Cooper, and more.",
  },
  {
    href: "/commercial-truck-tires",
    label: "Commercial truck tires",
    note: "Steer, drive, trailer, and fleet tire paths.",
  },
];

const homepageStyles = `
.minimal-homepage {
  padding: clamp(22px, 3vw, 44px) clamp(16px, 4vw, 44px) 44px;
  background: radial-gradient(circle at top left, rgba(31, 91, 73, 0.09), transparent 32%), radial-gradient(circle at top right, rgba(233, 111, 44, 0.08), transparent 26%), linear-gradient(180deg, #fffdf8 0%, #f6f4ed 100%);
}
.minimal-home-center-column {
  max-width: 980px;
  margin: 0 auto;
}
.minimal-home-search-engine {
  width: 100%;
  padding-top: clamp(34px, 7vw, 82px);
  gap: 18px;
}
.minimal-home-logo {
  max-width: 12ch;
  color: #15191f;
  font-size: clamp(3.2rem, 8vw, 6.8rem);
  line-height: 0.9;
  letter-spacing: -0.075em;
}
.minimal-home-subline {
  max-width: 760px;
  margin: 0 auto 4px;
  color: #4d5561;
  font-size: clamp(1.08rem, 2vw, 1.35rem);
  font-weight: 650;
  line-height: 1.45;
}
.minimal-home-search-form {
  width: min(100%, 860px);
  min-height: 66px;
  padding: 7px;
  border: 1px solid rgba(21, 25, 31, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 24px 70px rgba(33, 38, 45, 0.12);
}
.minimal-home-search-input {
  min-height: 52px;
  padding-left: 22px;
  color: #15191f;
  font-size: clamp(1.05rem, 2vw, 1.22rem);
  font-weight: 700;
}
.minimal-home-search-button {
  min-height: 52px;
  padding: 0 26px;
  background: #1f5b49;
  color: #ffffff;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 900;
  box-shadow: 0 14px 30px rgba(31, 91, 73, 0.24);
}
.minimal-home-search-button:hover,
.minimal-home-search-button:focus-visible {
  background: #173f34;
  color: #ffffff;
}
.minimal-home-search-examples,
.minimal-home-trust-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.minimal-home-search-examples {
  gap: 9px;
}
.minimal-home-example-chip,
.minimal-home-trust-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 850;
  line-height: 1;
}
.minimal-home-example-chip {
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid rgba(31, 91, 73, 0.18);
  background: rgba(255, 255, 255, 0.82);
  color: #1f5b49;
  cursor: pointer;
}
.minimal-home-trust-strip {
  gap: 10px;
  width: min(100%, 920px);
  margin: 22px auto 0;
  padding: 12px;
  border: 1px solid rgba(21, 25, 31, 0.1);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 18px 50px rgba(33, 38, 45, 0.07);
}
.minimal-home-trust-pill {
  min-height: 38px;
  padding: 0 13px;
  background: #f6f4ed;
  color: #28312d;
  font-size: 0.9rem;
}
.minimal-homepage-grid {
  display: grid;
  grid-template-columns: minmax(230px, 0.78fr) minmax(360px, 1.45fr) minmax(230px, 0.78fr);
  align-items: stretch;
  gap: 22px;
  width: min(100%, 1320px);
  max-width: 1320px;
  min-height: auto;
  margin: 34px auto 0;
}
.minimal-home-sidebar-panel,
.minimal-home-action-card,
.minimal-home-disclosure-card {
  border: 1px solid rgba(21, 25, 31, 0.1);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 18px 48px rgba(33, 38, 45, 0.07);
}
.minimal-home-sidebar-panel {
  height: 100%;
  padding: 20px;
}
.minimal-home-sidebar-title,
.minimal-home-section-heading h2 {
  color: #15191f;
  letter-spacing: -0.035em;
}
.minimal-home-sidebar-title {
  margin-bottom: 14px;
  font-size: 1.22rem;
  font-weight: 950;
}
.minimal-home-sidebar-link {
  min-height: 42px;
  padding: 10px 12px;
  border-radius: 14px;
  color: #28312d;
  font-size: 0.98rem;
  font-weight: 850;
}
.minimal-home-action-stack,
.minimal-home-action-list,
.minimal-home-path-grid,
.minimal-home-section-heading {
  display: grid;
}
.minimal-home-action-stack {
  gap: 18px;
}
.minimal-home-action-card {
  padding: clamp(20px, 3vw, 28px);
}
.minimal-home-section-heading {
  gap: 4px;
  margin-bottom: 18px;
}
.minimal-home-section-heading p {
  margin: 0;
  color: #1f5b49;
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.minimal-home-section-heading h2 {
  margin: 0;
  font-size: clamp(1.55rem, 3vw, 2.1rem);
  line-height: 1.05;
  font-weight: 950;
}
.minimal-home-action-list,
.minimal-home-path-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.minimal-home-action-link,
.minimal-home-path-link {
  display: grid;
  gap: 4px;
  min-height: 78px;
  padding: 15px;
  border: 1px solid rgba(21, 25, 31, 0.09);
  border-radius: 18px;
  background: #fffdf8;
  color: #15191f;
  text-decoration: none;
}
.minimal-home-action-link span,
.minimal-home-path-link span {
  font-size: 1.02rem;
  font-weight: 950;
  line-height: 1.12;
}
.minimal-home-action-link small,
.minimal-home-path-link small {
  color: #667064;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.3;
}
.minimal-home-disclosure-card {
  width: min(100%, 980px);
  margin: 24px auto 0;
  padding: 18px 22px;
  text-align: center;
}
.minimal-home-disclosure-card strong {
  display: block;
  margin-bottom: 5px;
  color: #15191f;
  font-size: 1rem;
  font-weight: 950;
}
.minimal-home-disclosure-card p {
  max-width: 760px;
  margin: 0 auto;
  color: #5d655f;
  font-size: 0.95rem;
  font-weight: 650;
  line-height: 1.45;
}
@media (max-width: 1060px) {
  .minimal-homepage-grid {
    grid-template-columns: 1fr;
  }
  .minimal-home-sidebar-panel {
    height: auto;
  }
}
@media (max-width: 720px) {
  .minimal-homepage {
    padding: 18px 12px 28px;
  }
  .minimal-home-logo {
    font-size: clamp(3.15rem, 18vw, 5rem);
  }
  .minimal-home-search-form,
  .minimal-home-action-list,
  .minimal-home-path-grid {
    grid-template-columns: 1fr;
  }
  .minimal-home-search-form {
    border-radius: 26px;
    padding: 9px;
  }
  .minimal-home-search-button {
    width: 100%;
  }
}
`;

export default function MinimalHomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: searchSiteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?size={search_term_string}`,
      "query-input": "required name=size",
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homepageStyles }} />
      <JsonLd data={websiteSchema} />
      <main className="minimal-homepage" aria-label={`${searchSiteName} homepage`}>
        <section className="minimal-home-center-column" aria-label="Tire search">
          <MinimalSearchEngine />
          <div className="minimal-home-trust-strip" aria-label="Tire Search Engine benefits">
            {trustPoints.map((point) => (
              <span key={point} className="minimal-home-trust-pill">
                {point}
              </span>
            ))}
          </div>
        </section>
        <div className="minimal-homepage-grid" aria-label="Popular tire links">
          <PopularSizePanel />
          <section className="minimal-home-action-stack" aria-label="Popular tire searches and shopping paths">
            <div className="minimal-home-action-card">
              <div className="minimal-home-section-heading">
                <p>Start Here</p>
                <h2>Popular Tire Searches</h2>
              </div>
              <div className="minimal-home-action-list">
                {highIntentLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="minimal-home-action-link">
                    <span>{item.label}</span>
                    <small>{item.note}</small>
                  </Link>
                ))}
              </div>
            </div>
            <div className="minimal-home-action-card minimal-home-action-card--paths">
              <div className="minimal-home-section-heading">
                <p>Shop By Path</p>
                <h2>Find the right page faster</h2>
              </div>
              <div className="minimal-home-path-grid">
                {shoppingPaths.map((item) => (
                  <Link key={item.href} href={item.href} className="minimal-home-path-link">
                    <span>{item.label}</span>
                    <small>{item.note}</small>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <BrandLinkPanel />
        </div>
        <section className="minimal-home-disclosure-card" aria-label="Affiliate disclosure">
          <strong>How this site is supported</strong>
          <p>
            Tire Search Engine may earn from qualifying purchases. Retailer links are visible, and public offer paths are
            limited to approved partners such as Mavis and Amazon.
          </p>
        </section>
      </main>
    </>
  );
}
