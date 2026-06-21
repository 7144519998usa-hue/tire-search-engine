import { buildAmazonUrl, buildMavisInstallationUrl, buildMavisUrl, buildTireRackUrl } from "../lib/tireData";
import { buildGoUrl } from "../lib/redirects";

export default function RetailerSearchFallback({ size = "", intent = "", placement = "empty-results", commercial = false }) {
  const query = [size, intent, "tires"].filter(Boolean).join(" ");
  const retailers = [
    { merchant: "Tire Rack", label: `Search ${size} at Tire Rack`, href: buildTireRackUrl({ query, size }), type: "primary", note: "Retailer tire search" },
    { merchant: "Mavis", label: `Shop installed ${size} tires`, href: buildMavisUrl({ query, size }), type: "secondary", note: "Mavis tire affiliate path" },
    { merchant: "Mavis", label: `Find Mavis installation for ${size}`, href: buildMavisInstallationUrl({ query, size }), type: "secondary", note: "Store and installer path" },
    { merchant: "Amazon", label: `Search ${size} on Amazon`, href: buildAmazonUrl({ query }), type: "tertiary", note: "Marketplace affiliate path" }
  ].filter((item) => item.href);

  return (
    <div className="empty-results">
      <p className="kicker">Retailer search paths</p>
      <h2>Check live retailer availability for this size.</h2>
      <p>We are still verifying exact in-site product matches for this size. Use these retailer paths to confirm current stock, price, installation, and fitment.</p>
      <div className="retailer-fallback-grid">
        {retailers.map((retailer) => (
          <a
            key={`${retailer.merchant}-${retailer.label}`}
            className={`retailer-fallback-card is-${retailer.type}`}
            href={buildGoUrl({ merchant: retailer.merchant, href: retailer.href, placement, tireSize: size })}
            rel="nofollow sponsored noopener"
          >
            <em>Retailer Search</em>
            <strong>{retailer.merchant}</strong>
            <span>{retailer.label}</span>
            <small>{retailer.note}</small>
          </a>
        ))}
      </div>
      {commercial ? <a className="text-link" href="#commercial-quote">Request a commercial tire quote</a> : null}
    </div>
  );
}
