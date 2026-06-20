"use client";

import { useEffect, useState } from "react";

export default function ImageWithFallback({
  src,
  fallbackSrc = "/images/tires/generic-passenger-tire.svg",
  finalFallbackSrc = "/images/tires/generic-passenger-tire.svg",
  alt,
  width = 900,
  height = 640,
  sizes = "(max-width: 760px) 100vw, 360px",
  priority = false,
  className = ""
}) {
  const firstSrc = src || fallbackSrc || finalFallbackSrc;
  const [imageSrc, setImageSrc] = useState(firstSrc);

  useEffect(() => {
    setImageSrc(firstSrc);
  }, [firstSrc]);

  function handleError() {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      return;
    }

    if (finalFallbackSrc && imageSrc !== finalFallbackSrc) {
      setImageSrc(finalFallbackSrc);
    }
  }

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={handleError}
    />
  );
}
