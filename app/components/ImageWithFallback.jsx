"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({
  src,
  fallbackSrc = "/images/tires/generic-passenger-tire.svg",
  alt,
  width = 900,
  height = 640,
  sizes = "(max-width: 760px) 100vw, 360px",
  priority = false,
  className = ""
}) {
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);

  return (
    <Image
      className={className}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      onError={() => setImageSrc(fallbackSrc)}
    />
  );
}
