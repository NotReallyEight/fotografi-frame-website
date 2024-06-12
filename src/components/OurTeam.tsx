import images from "@/utils/images";
import type { StaticImageData } from "next/image";
import Image from "next/image";

const ourTeamSection = {
  title: "Il Nostro Team",
  description: [
    "Ragazzi appassionati di fotografia e video, pronti a catturare ogni momento con la massima qualità e creatività.",
    <br key="line-break" />,
    "Siamo qui per rendere indimenticabili i vostri momenti più importanti.",
  ],
};

const members: { image: StaticImageData; alt: string; href: string }[] = [
  {
    image: images.members.luca,
    alt: "Luca",
    href: "https://www.instagram.com/lucantcast/",
  },
  {
    image: images.members.domenico,
    alt: "Domenico",
    href: "https://www.instagram.com/domenicosilv/",
  },
];

const OurTeam = () => (
  <div className="mx-auto flex min-h-[100dvh] max-w-[80dvw] snap-center flex-col items-center justify-evenly md:flex-row md:justify-center">
    <div className="glassmorph flex max-h-[30%] flex-1 flex-col items-center justify-center md:max-h-[100dvh]">
      <div className="font-family-header mb-4 text-2xl md:text-5xl">
        {ourTeamSection.title}
      </div>
      <div className="font-family-regular text-xs md:text-base">
        {ourTeamSection.description}
      </div>
    </div>

    <div className="flex max-h-[30%] flex-2 flex-row items-center justify-between md:max-h-[45%]">
      {members.map((member, index) => (
        <a
          className="flex flex-1 items-center justify-center"
          href={member.href}
          key={index}
          target="_blank"
          title={member.alt}
        >
          <Image
            src={member.image}
            alt={member.alt}
            className="object-contain"
            key={index}
          />
        </a>
      ))}
    </div>
  </div>
);

export default OurTeam;
