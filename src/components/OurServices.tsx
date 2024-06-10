"use client";

import { StaticImageData } from "next/image";
import React from "react";
import Carousel from "./Carousel";
import config from "@/config";
import images from "@/utils/images";

interface OurServicesSection {
  title: string;
  description: string;
  image: StaticImageData;
  href?: string;
}

const ourServicesSections: OurServicesSection[] = [
  {
    title: "Produzione Social",
    description:
      "Offriamo servizi di gestione dei social e creazione di post, reels, spot e web serie, aiutando i nostri clienti a raggiungere il loro pubblico target e a distinguersi sulla piattaforma.",
    image: images.socialProduction,
    href: "/lavori",
  },
  {
    title: "Pubblicità",
    description:
      "Studiamo soluzioni personalizzate per promuovere i prodotti e i servizi dei nostri clienti, utilizzando una combinazione di creatività e strategia per massimizzare l'impatto delle loro campagne pubblicitarie.",
    image: images.advertising,
    href: "/lavori",
  },
  {
    title: "Eventi",
    description:
      "Che si tratti di un compleanno, un concerto o una cerimonia, siamo specializzati nella cattura dei momenti più belli e divertenti della festa, con servizi personalizzati e attrezzatura all'avanguardia.",
    image: images.events,
  },
];

const OurServices = () => {
  return (
    <div
      className="flex min-h-screen snap-center flex-col items-center justify-center md:justify-around"
      id="our-services"
    >
      <div
        className={`font-family-header dark:text-textDark text-textLight mb-8 text-center text-5xl`}
      >
        Our Services
      </div>
      <Carousel slides={ourServicesSections} />
    </div>
  );
};

export default OurServices;
