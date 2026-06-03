import ImageWithFallback from "./ImageWithFallback";
import { localTireFallbacks, realTireImages } from "../lib/tireImageSources";

const imageAliases = {
  steer: "commercialSteer",
  drive: "commercialDrive",
  trailer: "commercialTrailer"
};

export default function TireCategoryImage({ type = "passenger", alt = "Tire comparison visual", priority = false }) {
  const imageType = imageAliases[type] || type;

  return (
    <ImageWithFallback
      src={realTireImages[imageType] || realTireImages.passenger}
      fallbackSrc={localTireFallbacks[imageType] || localTireFallbacks.passenger}
      alt={alt}
      width={900}
      height={640}
      sizes="(max-width: 760px) 100vw, 360px"
      priority={priority}
    />
  );
}
