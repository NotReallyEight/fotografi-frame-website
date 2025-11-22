import type { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";

type Props = {
  title: string;
  description: string | (string | React.JSX.Element)[];
  image?: StaticImageData;
  alt?: string;
};

const Section: React.FC<Props> = (props) => (
  <>
    <div className="md:glassmorph glassmorph-padding mx-auto mt-[10dvh] flex flex-col items-center justify-center md:max-w-[80dvw]">
      <div className="font-family-header mb-[5dvh] text-center text-2xl md:text-5xl">
        {props.title}
      </div>
      <div className="font-family-regular text-center text-xs md:text-base">
        {props.description}
      </div>
    </div>
    {props.image !== undefined && props.alt !== undefined && (
      <Image
        src={props.image}
        alt={props.alt}
        className="mx-auto md:mt-[10dvh]"
      />
    )}
  </>
);

export default Section;
