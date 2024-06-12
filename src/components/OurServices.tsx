"use client";

import type { StaticImageData } from "next/image";
import React from "react";
import Carousel from "./Carousel";
import images from "@/utils/images";

type OurServicesSection = {
  title: string;
  description: string;
  image: StaticImageData;
  href?: string;
  imageObjectFit: "cover" | "contain";
};

const ourServicesSections: OurServicesSection[] = [
  {
    title: "Produzione Social",
    description:
      "Offriamo servizi di gestione dei social e creazione di post, reels, spot e web serie, aiutando i nostri clienti a raggiungere il loro pubblico target e a distinguersi sulla piattaforma.",
    image: images.socialProduction,
    href: "/lavori",
    imageObjectFit: "contain",
  },
  {
    title: "Pubblicità",
    description:
      "Studiamo soluzioni personalizzate per promuovere i prodotti e i servizi dei nostri clienti, utilizzando una combinazione di creatività e strategia per massimizzare l'impatto delle loro campagne pubblicitarie.",
    image: images.advertising,
    href: "/lavori",
    imageObjectFit: "contain",
  },
  {
    title: "Eventi",
    description:
      "Che si tratti di un compleanno, un concerto o una cerimonia, siamo specializzati nella cattura dei momenti più belli e divertenti della festa, con servizi personalizzati e attrezzatura all'avanguardia.",
    image: images.events,
    imageObjectFit: "contain",
  },
];

const OurServices = () => (
  <div
    className="flex min-h-[100dvh] snap-center flex-col items-center justify-center md:justify-evenly"
    id="our-services"
  >
    <div
      className={`font-family-header mb-8 text-center text-2xl text-textLight md:text-5xl dark:text-textDark`}
    >
      Our Services
    </div>
    <Carousel slides={ourServicesSections} />
  </div>
);

export default OurServices;
