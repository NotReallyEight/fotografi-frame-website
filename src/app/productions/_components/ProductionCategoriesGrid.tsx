import images from "@/utils/images";
import Image, { StaticImageData } from "next/image";

const PRODUCTION_CATEGORIES: {
  title: string;
  description: string;
  src: StaticImageData;
}[] = [
  {
    title: "Commercials",
    description:
      "High-impact brand storytelling designed for global reach and digital conversion. We build brand equity through precision framing.",
    src: images.event[0],
  },
  {
    title: "Event Videos",
    description:
      "Dynamic coverage for high-end activations, runway shows, and corporate summits. Capturing energy in its purest form.",
    src: images.event[1],
  },
  {
    title: "Documentaries",
    description:
      "Long-form narratives exploring human culture, technology, and art. Authentic stories told with a cinematic edge.",
    src: images.event[2],
  },
  {
    title: "Social Media",
    description:
      "Vertically optimized content that disrupts the scroll. Fast-paced, high-energy visuals for modern digital platforms.",
    src: images.event[3],
  },
];

const ProductionCategoriesGrid = () => (
  // <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
  //   {PRODUCTION_CATEGORIES.map((category, index) => (
  //     <div
  //       key={`production-category-${index}`}
  //       className={`
  // 				relative group
  // 				aspect-auto
  //         overflow-hidden
  //         ${index !== 0 ? "border-t border-border" : ""}
  //         md:border-t-0 ${index > 1 ? "md:border-t" : ""}
  // 				p-8
  //         flex flex-col gap-4 bg-secondary
  // 			`}
  //     >
  //       <div className="flex flex-col gap-2">
  //         <div className="font-family-secondary">{category.title}</div>
  //         <div className="font-family-regular-lg text-text-secondary">
  //           {category.description}
  //         </div>
  //       </div>
  //       <Image
  //         alt={category.title}
  //         src={category.src}
  //         className={`
  // 					object-cover
  // 					opacity-50
  // 					aspect-square
  // 				`}
  //       />
  //     </div>
  //   ))}
  // </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
    {PRODUCTION_CATEGORIES.map((category, index) => (
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

export default ProductionCategoriesGrid;
