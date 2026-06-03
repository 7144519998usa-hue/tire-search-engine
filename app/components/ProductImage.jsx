import ImageWithFallback from "./ImageWithFallback";
import { localFallbackForProduct, realImageForProduct } from "../lib/tireImageSources";

export function categoryImageFor(product = {}) {
  return realImageForProduct(product);
}

export default function ProductImage({ product, index = 0, className = "" }) {
  const hasVerifiedRemote = product?.image && !product.image.includes("tireRackLogo");
  const src = hasVerifiedRemote ? product.image : categoryImageFor(product);
  const alt = `${product?.brand || "Tire"} ${product?.model || "model"} ${product?.size || ""} tire`.trim();

  return (
    <ImageWithFallback
      className={className}
      src={src}
      fallbackSrc={localFallbackForProduct(product)}
      alt={alt}
      width={900}
      height={640}
      sizes="(max-width: 760px) 100vw, 280px"
      priority={index < 3}
    />
  );
}
