import { FC } from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  imageSrc: StaticImageData;
  name: string;
  role: string;
};

const MemberImage: FC<Props> = ({ imageSrc, name, role }) => (
  <div
    className={`
        flex flex-col
        text-white mt-8
      `}
  >
    <Image
      className={`
          aspect-4/5
          object-cover
        `}
      src={imageSrc}
      alt={`Immagine profilo di ${name} - ${role}`}
    />
    <div
      className={`
          text-white
          font-family-regular-lg
          font-bold uppercase
        `}
    >
      {name}
    </div>
    <div className="font-family-regular-md">{role}</div>
  </div>
);

export default MemberImage;
