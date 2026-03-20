import images from "@/utils/images";
import Image from "next/image";
import type { StaticImageData } from "next/image";

const EVENT_CATEGORIES: {
  title: string;
  description: string;
  src: StaticImageData;
}[] = [
  {
    title: "Corporate Events",
    description:
      "Professional coverage for brands, conferences, and high-stakes networking.",
    src: images.event[0],
  },
  {
    title: "Private Events",
    description:
      "Intimate moments, gala dinners, and personal milestones captured forever.",
    src: images.event[1],
  },
  {
    title: "Concerts & Shows",
    description:
      "High-energy stage photography capturing the raw power of performance.",
    src: images.event[2],
  },
  {
    title: "Cultural Events",
    description:
      "Documenting rich heritage, tradition and community festivals.",
    src: images.event[3],
  },
];

const CategoriesImageGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
    {EVENT_CATEGORIES.map((category, index) => (
      <div
        key={`event-category-${index}`}
        className={`
            relative group
            aspect-auto
            overflow-hidden
            ${index !== 0 ? "border-t border-border" : ""}
          `}
      >
        <Image
          alt={category.title}
          src={category.src}
          className={`
            object-cover
            opacity-50 saturate-0
            group-hover:saturate-100
            duration-(--transition-duration)
          `}
        />
        <div
          className={`
            flex flex-col
            absolute bottom-4 left-4
            text-white
          `}
        >
          <div
            className={`
            text-white
            font-family-regular-lg
            text-lg md:text-xl lg:text-2xl
            font-bold uppercase
          `}
          >
            {category.title}
          </div>
          <div className="font-family-regular-md w-[75%]">
            {category.description}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default CategoriesImageGrid;
