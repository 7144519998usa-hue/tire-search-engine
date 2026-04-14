import AffiliateLink from "./AffiliateLink";
import { affiliateDisclosureText } from "../lib/affiliateLinks";

export default function PriceTable({ rows }) {
  return (
    <div className="results-table-shell">
      <table className="results-table">
        <thead>
          <tr>
            <th>Price</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Offer quality</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((item, index) => (
            <tr key={item.id}>
              <td className="price-cell">
                {index === 0 ? <span className="deal-badge">Best offer</span> : null}
                ${Number(item.price).toFixed(2)}
              </td>
              <td>{item.tires?.brand || "N/A"}</td>
              <td>{item.tires?.model || "N/A"}</td>
              <td>
                <div className="supplier-cell">
                  <span>{item.merchantRanking?.badge || "Available Offer"}</span>
                  <small>
                    {index === 0
                      ? "Best available offer for your location"
                      : "External checkout available"}
                  </small>
                </div>
              </td>
              <td>
                <AffiliateLink
                  href={item.affiliate_link}
                  merchant={item.merchantRanking?.merchantName || item.suppliers?.name || ""}
                  score={item.merchantRanking?.score || ""}
                  surface="search-results"
                  placement={index === 0 ? "primary-offer" : "secondary-offer"}
                  ariaLabel={`Check offer for ${item.tires?.brand || "tire"} ${item.tires?.model || ""}`.trim()}
                >
                  {index === 0 ? "Check Best Offer" : "Check Today’s Price"}
                </AffiliateLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="affiliate-note">{affiliateDisclosureText}</div>
    </div>
  );
}
