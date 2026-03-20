import images from "@/utils/images";
import Image, { StaticImageData } from "next/image";

const SELECTED_WORKS_IMAGES: StaticImageData[] = [
  images.birthdays.carousels[0][0],
  images.birthdays.carousels[0][1],
  images.birthdays.carousels[0][2],
];

const SelectedWorksGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4">
    {SELECTED_WORKS_IMAGES.map((image, index) => (
      <div
        key={`selected-event-work-${index}`}
        className={`
            relative w-full h-full
            ${index === 0 ? "md:col-span-8 md:row-span-2" : "md:col-span-4"}
          `}
      >
        <Image
          alt={`Lavoro selezionato per evento - ${index + 1}`}
          src={image}
          className={`
            object-cover
            border border-border
            aspect-square
          `}
        />
      </div>
    ))}
  </div>
);

export default SelectedWorksGrid;
