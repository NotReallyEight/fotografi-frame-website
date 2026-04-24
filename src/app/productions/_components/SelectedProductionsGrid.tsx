import images from "@/utils/images";
import Image, { StaticImageData } from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const SELECTED_PRODUCTIONS_IMAGES: {
  description: string;
  src: StaticImageData;
  title: string;
  type: string;
}[] = [
  {
    description: "Luxury Real Estate Campaign",
    src: images.birthdays.carousels[0][0],
    title: "Concrete Dreams",
    type: "Documentario",
  },
  {
    description: "Luxury Real Estate Campaign",
    src: images.birthdays.carousels[0][1],
    title: "Concrete Dreams",
    type: "Videoclip",
  },
  {
    description: "Luxury Real Estate Campaign",
    src: images.birthdays.carousels[0][2],
    title: "Concrete Dreams",
    type: "Commercial",
  },
];

const SelectedProductionsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {SELECTED_PRODUCTIONS_IMAGES.map((image, index) => (
      <div
        key={`selected-production-work-${index}`}
        className="overflow-hidden relative group"
      >
        <Image
          alt={`Lavoro selezionato per produzione - ${index + 1}`}
          src={image.src}
          className={`
              object-cover
              border border-border
              aspect-square
              opacity-20
              duration-(--grid-fade-in-duration)
              group-hover:scale-125
              saturate-0
              -z-10
            `}
        />
        <div className="text-text-secondary font-family-regular-md uppercase z-10 absolute top-4 left-4">
          {image.type}
        </div>
        <FiArrowUpRight
          className="hidden group-hover:flex z-10 absolute right-4 top-4"
          size={"1.5rem"}
        />
        <div
          className={`
            absolute bottom-4 left-4
            flex flex-col gap-2
          `}
        >
          <div
            className="font-family-regular-lg
              text-lg md:text-xl lg:text-2xl
              font-bold uppercase text-white"
          >
            {image.title}
          </div>
          <div className="font-family-regular-lg text-text-secondary">
            {image.description}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default SelectedProductionsGrid;
