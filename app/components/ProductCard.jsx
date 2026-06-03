import MerchantButtons from "./MerchantButtons";
import ProductImage from "./ProductImage";
import { getTireBadges } from "../lib/badgeLogic";
import { getMerchantOffers } from "../lib/tireData";

function priceLabel(product) {
  if (typeof product.price === "number") {
    const merchant = product.tireRackUrl ? " at Tire Rack" : "";
    return `$${product.price.toFixed(2)}${merchant}`;
  }

  return product.priceSnapshot;
}

export default function ProductCard({ product, index = 0, placement = "product-card", pageContext = {} }) {
  const productWithOffers = {
    ...product,
    offers: getMerchantOffers(product)
  };
  const badges = getTireBadges(product, pageContext);

  return (
    <article className="product-card">
      <div className="product-media">
        <ProductImage product={product} index={index} />
        <span className="product-rank">{index + 1}</span>
        <div className="product-badges" aria-label="Product match status">
          {badges.map((badge) => <span key={badge}>{badge}</span>)}
        </div>
      </div>
      <div className="product-copy">
        <p className="kicker">{product.category}</p>
        <h3>{product.brand} {product.model}</h3>
        <div className="chips">
          <span>{product.size}</span>
          <span>{product.position}</span>
        </div>
        <dl className="product-specs">
          <div>
            <dt>Category</dt>
            <dd>{product.category}</dd>
          </div>
          <div>
            <dt>Use case</dt>
            <dd>{product.position}</dd>
          </div>
        </dl>
        <p>{product.bestFor}</p>
        <strong className="price-snapshot">{priceLabel(product)}</strong>
        <small className="fitment-note">Confirm size, load rating, speed rating, and fitment before purchase.</small>
      </div>
      <MerchantButtons product={productWithOffers} placement={placement} />
    </article>
  );
}
