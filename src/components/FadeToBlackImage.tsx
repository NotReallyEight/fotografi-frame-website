import Image from "next/image";
import React from "react";
import type { StaticImageData } from "next/image";

type Props = {
  src: StaticImageData | string;
  alt: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
};

const FadeToBlackImage: React.FC<Props> = ({
  src,
  alt,
  className = "",
  imageClassName = "",
  overlayClassName = "",
}) => (
  <div
    className={`
        relative
        aspect-auto md:aspect-video
        overflow-hidden
        ${className}
      `}
  >
    <Image
      src={src}
      alt={alt}
      fill={false}
      className={`
          w-full
          aspect-auto md:aspect-video
          object-cover object-bottom
          ${imageClassName}
        `}
    />
    <div
      className={`
          pointer-events-none absolute inset-0
          bg-linear-to-b from-black via-black/60 to-black
          ${overlayClassName}
        `}
    />
  </div>
);

export default FadeToBlackImage;
