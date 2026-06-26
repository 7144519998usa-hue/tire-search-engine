import { buildGoUrl } from "../lib/redirects";

export function primaryMerchantHref(product, placement = "product-card") {
  const offer = product?.offers?.[0];
  if (!offer) return "";

  return buildGoUrl({
    merchant: offer.merchant,
    href: offer.href,
    placement,
    tireSize: product.size
  });
}

export default function MerchantButtons({ product, placement = "product-card" }) {
  return (
    <div className="merchant-buttons">
      {product.offers.map((offer) => (
        <a
          key={`${product.id}-${offer.merchant}-${offer.label}`}
          href={buildGoUrl({
            merchant: offer.merchant,
            href: offer.href,
            placement,
            tireSize: product.size
          })}
          className={`merchant-button is-${offer.type}`}
          rel="nofollow sponsored noopener"
        >
          <span>{offer.label}</span>
          <small>{offer.note}</small>
        </a>
      ))}
    </div>
  );
}
