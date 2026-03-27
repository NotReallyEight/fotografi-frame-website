import images from "@/utils/images";
import Image from "next/image";
import type { StaticImageData } from "next/image";

const VISUAL_LANGUAGE_SECTION_IMAGES: StaticImageData[] = [
  images.birthdays.carousels[0][0],
  images.birthdays.carousels[0][1],
];

const VisualLanguageSection = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="flex flex-col gap-4">
      <div className="font-family-secondary">The Visual Language of Space</div>
      <div className="flex flex-col gap-2 font-family-regular-lg text-text-secondary">
        <span>
          We believe every frame is an architectural decision. Our approach to
          video production is rooted in structural integrity—treating the
          viewport as a canvas for depth and tension.
        </span>
        <span>
          By blending the brutalist aesthetic with cinematic warmth, we create
          content that feels both monumental and deeply personal. We don&apos;t
          just capture events; we curate them into enduring visual legacies.
        </span>
      </div>
      <div className="w-full grid grid-cols-[1fr_auto] items-center gap-4">
        {/* Horizontal line */}
        <div className="h-px border border-border" />
        <div className="font-family-regular-md uppercase">
          Studio Philosophy
        </div>
      </div>
    </div>

    <div>
      {/* Two images */}
      <div className="grid grid-cols-2 gap-4 relative">
        {VISUAL_LANGUAGE_SECTION_IMAGES.map((image, index) => (
          <div key={`visual-language-section-image-${index}`}>
            <Image
              alt={"Visual language section image"}
              src={image}
              className={`aspect-3/4 object-cover ${index % 2 === 0 ? "mt-8" : "mb-8"}`}
            />
          </div>
        ))}
        <div className="absolute bg-accent/20 rounded-[50%] animate-pulse w-full h-full -z-10 blur-3xl" />
      </div>
    </div>
  </div>
);

export default VisualLanguageSection;
