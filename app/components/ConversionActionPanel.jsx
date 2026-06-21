import { buildGoUrl } from "../lib/redirects";
import { buildAmazonUrl, buildMavisInstallationUrl, buildMavisUrl, buildTireRackUrl } from "../lib/tireData";

function moneyLabel({ productCount = 0, pricedCount = 0, commercial = false } = {}) {
  if (pricedCount > 0) {
    return `${pricedCount} live Tire Rack price${pricedCount === 1 ? "" : "s"} available`;
  }
  if (productCount > 0) {
    return `${productCount} exact match${productCount === 1 ? "" : "es"} found`;
  }
  return commercial ? "Commercial quote path available" : "Retailer search paths available";
}

export default function ConversionActionPanel({
  size = "",
  intent = "",
  commercial = false,
  productCount = 0,
  pricedCount = 0,
  placement = "conversion-panel"
}) {
  const query = [size, intent, commercial ? "commercial truck tires" : "tires"].filter(Boolean).join(" ");
  const actions = [
    {
      merchant: "Tire Rack",
      label: pricedCount > 0 ? "Check Tire Rack Prices" : "Search Tire Rack",
      href: buildTireRackUrl({ query, size }),
      note: "Tire-focused retailer",
      type: "primary"
    },
    {
      merchant: "Mavis",
      label: commercial ? "Mavis Tire Options" : "Mavis Installed Tires",
      href: buildMavisUrl({ query, size }),
      note: "Affiliate tire path",
      type: "secondary"
    },
    {
      merchant: "Mavis",
      label: "Find Installation",
      href: buildMavisInstallationUrl({ query, size }),
      note: "Store and installer path",
      type: "secondary"
    },
    {
      merchant: "Amazon",
      label: "Search Amazon",
      href: buildAmazonUrl({ query }),
      note: "Marketplace affiliate path",
      type: "secondary"
    }
  ].filter((action) => action.href);

  return (
    <aside className="conversion-panel" aria-label="Tire shopping actions">
      <div className="conversion-copy">
        <p className="kicker">{commercial ? "Fleet buying path" : "Shopping path"}</p>
        <h2>{moneyLabel({ productCount, pricedCount, commercial })}</h2>
        <p>
          Start with exact-size matches, then confirm fitment, load rating, speed rating,
          installation, shipping, and current price with the retailer before checkout.
        </p>
      </div>
      <div className="conversion-actions">
        {actions.map((action) => (
          <a
            key={`${action.merchant}-${action.label}`}
            className={`merchant-button is-${action.type}`}
            href={buildGoUrl({ merchant: action.merchant, href: action.href, placement, tireSize: size })}
            rel="nofollow sponsored noopener"
          >
            <span>{action.label}</span>
            <small>{action.note}</small>
          </a>
        ))}
      </div>
    </aside>
  );
}
