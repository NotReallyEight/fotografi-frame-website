"use client";

import { StaticImageData } from "next/image";
import React from "react";
import SocialProductionImage from "../../public/assets/Anteprima-Osteria-Voria-_3-scaled-e1707843396974-qjraknj7t3qlqcxrxv0rjkti3ex85mh4yypwq6cgtk.jpg";
import AdvertisingImage from "../../public/assets/J55C4944-scaled-qjral5e5eyf1uy7u1kqocyb9dqh77vg1df44uflzjc.jpg";
import EventsImage from "../../public/assets/Voice-97-scaled-q49kzr3t2nc2jedny31pxdv1zagqjb8yx2pk7vb424.jpg";
import Carousel from "./Carousel";
import config from "@/config";

interface OurServicesSection {
  title: string;
  description: string;
  image: StaticImageData;
}

const ourServicesSections: OurServicesSection[] = [
  {
    title: "Produzione Social",
    description:
      "Offriamo servizi di gestione dei social e creazione di post, reels, spot e web serie, aiutando i nostri clienti a raggiungere il loro pubblico target e a distinguersi sulla piattaforma.",
    image: SocialProductionImage,
  },
  {
    title: "Pubblicità",
    description:
      "Studiamo soluzioni personalizzate per promuovere i prodotti e i servizi dei nostri clienti, utilizzando una combinazione di creatività e strategia per massimizzare l'impatto delle loro campagne pubblicitarie.",
    image: AdvertisingImage,
  },
  {
    title: "Eventi",
    description:
      "Che si tratti di un compleanno, un concerto o una cerimonia, siamo specializzati nella cattura dei momenti più belli e divertenti della festa, con servizi personalizzati e attrezzatura all'avanguardia.",
    image: EventsImage,
  },
];

const OurServices = () => {
  return (
    <div
      className="flex min-h-screen snap-center flex-col items-center justify-center md:justify-around"
      id="our-services"
    >
      <div
        className={`font-family-header dark:text-[${config.styles.text.dark}] text-[${config.styles.text.light}] mb-8 text-center text-5xl`}
      >
        Our Services
      </div>
      <Carousel slides={ourServicesSections} />
    </div>
  );
};

export default OurServices;
