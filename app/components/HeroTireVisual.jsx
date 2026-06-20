import ImageWithFallback from "./ImageWithFallback";
import { localTireFallbacks, tireImages } from "../lib/tireImageSources";

export default function HeroTireVisual() {
  return (
    <div className="hero-tire-visual">
      <div className="hero-image-card">
        <ImageWithFallback
          className="hero-tire-image"
          src={tireImages.road}
          fallbackSrc={localTireFallbacks.road}
          finalFallbackSrc={localTireFallbacks.road}
          alt="Real tire product photo for tire comparison search"
          width={1200}
          height={900}
          sizes="(max-width: 760px) 100vw, 420px"
          priority
        />
      </div>
      <div className="trust-card-grid">
        <span>Search by size</span>
        <span>Vehicle fitment</span>
        <span>Retailer paths</span>
        <span>Commercial truck tires</span>
      </div>
    </div>
  );
}
