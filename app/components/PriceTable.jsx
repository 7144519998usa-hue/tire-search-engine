export default function PriceTable({ rows }) {
  return (
    <div className="results-table-shell">
      <table className="results-table">
        <thead>
          <tr>
            <th>Price</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Supplier</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((item, index) => (
            <tr key={item.id}>
              <td className="price-cell">
                {index === 0 ? <span className="deal-badge">Best price</span> : null}
                ${Number(item.price).toFixed(2)}
              </td>
              <td>{item.tires?.brand || "N/A"}</td>
              <td>{item.tires?.model || "N/A"}</td>
              <td>
                <div className="supplier-cell">
                  <span>{item.suppliers?.name || "N/A"}</span>
                  {index === 0 ? <small>Top current deal</small> : null}
                </div>
              </td>
              <td>
                <a
                  className="buy-link"
                  href={item.affiliate_link}
                  target="_blank"
                  rel="sponsored nofollow noreferrer"
                >
                  Buy now
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="affiliate-note">
        Prices and retailer links help you compare the market quickly. Some
        outbound links may earn TireSearchEngine a commission at no extra cost
        to you.
      </div>
    </div>
  );
}
