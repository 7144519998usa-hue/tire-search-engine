import { amazonProductHref } from "../lib/amazonProducts";

export default function AmazonProductGrid({ products = [], placement = "amazon-products" }) {
  if (!products.length) return null;

  return (
    <div className="amazon-api-product-grid">
      {products.map((product, index) => (
        <a
          className="amazon-api-product-card"
          href={amazonProductHref(product, `${placement}-${index + 1}`)}
          key={`${product.asin}-${index}`}
          rel="nofollow sponsored noopener"
        >
          {product.image ? <img src={product.image} alt={product.title} loading="lazy" /> : null}
          <span>{product.size || "Amazon"}</span>
          <strong>{product.title}</strong>
          <small>{product.displayPrice || "Check current Amazon price"}</small>
        </a>
      ))}
    </div>
  );
}
