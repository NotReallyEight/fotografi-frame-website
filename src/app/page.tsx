"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { FaAnglesDown } from "react-icons/fa6";
import images from "@/utils/images";
import VerticalSeparatorLine from "@/components/VerticalSeparatorLine";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

const aboutUsParagraphs = [
  {
    title: (
      <>
        Un team <span className="font-family-italic">con voi</span>, per voi
      </>
    ),
    description: (
      <>
        Siamo un team di ragazzi appassionati di fotografia e video,
        specializzati nella cattura dei momenti più importanti della vita. Con
        la nostra esperienza e la nostra attrezzatura all&apos;avanguardia,
        siamo in grado di creare ricordi indelebili che dureranno per sempre. Ci
        occupiamo di diverse tipologie di eventi, tra cui matrimoni, cerimonie e
        compleanni, ma anche shooting fotografici per aziende, book fotografici,
        reportage e tanto altro.
      </>
    ),
  },
  {
    title: (
      <>
        Ogni scatto è un ricordo che vive per{" "}
        <span className="font-family-italic">sempre</span>.
      </>
    ),
    description: (
      <>
        Il nostro obiettivo è sempre quello di offrire un servizio
        personalizzato, attento alle esigenze dei nostri clienti e in grado di
        soddisfare ogni loro richiesta. Ogni progetto è una nuova sfida da
        affrontare con entusiasmo e professionalità. Siamo sempre alla ricerca
        di nuove idee e di soluzioni creative per rendere ogni scatto unico ed
        emozionante.
      </>
    ),
  },
];

const ourServicesParagraphs = [
  {
    title: "Produzione social",
    description:
      "Offriamo servizi di gestione dei social e creazione di post, reels, spot e web serie, aiutando i nostri clienti a raggiungere il loro pubblico target e a distinguersi sulla piattaforma.",
    image: images.socialProduction.src,
  },
  {
    title: "Pubblicità",
    description:
      "Studiamo soluzioni personalizzate per promuovere i prodotti e i servizi dei nostri clienti, utilizzando una combinazione di creatività e strategia per massimizzare l'impatto delle loro campagne pubblicitarie.",
    image: images.advertising.src,
  },
  {
    title: "Eventi",
    description:
      "Che si tratti di un compleanno, un concerto o una cerimonia, siamo specializzati nella cattura dei momenti più belli e divertenti della festa, con servizi personalizzati e attrezzatura all'avanguardia.",
    image: images.events.src,
  },
];

const apertureValues: number[] = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollSmootherWrapper = useRef<HTMLDivElement>(null);
  const [fStop, setFStop] = useState<number>(apertureValues[0]);

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          setFStop(
            apertureValues[
              Math.round(self.progress * (apertureValues.length - 1))
            ]
          );
        },
      });
    },
    {
      scope: scrollSmootherWrapper,
    }
  );

  return (
    <>
      {/* Meta tags */}
      <title>Home - Frame</title>
      <meta
        name="description"
        content="Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre."
      />
      <meta
        name="keywords"
        content="fotografia, fotografi frame, fotografi, frame"
      />
      <div id="smooth-wrapper" ref={scrollSmootherWrapper}>
        {/* Navbar */}
        <Navbar />

        {/* Animated f stop */}
        <div className="font-family-condensed fixed bottom-8 right-8 z-10 text-base text-white lg:text-2xl">
          f/{fStop.toFixed(1)}
        </div>
        <main
          className="flex flex-col scroll-smooth"
          id="smooth-content"
          ref={containerRef}
        >
          {/* Hero Section */}
          <section className="relative flex min-h-screen flex-col items-center justify-center">
            {/* Background Image */}
            <Image
              src={images.header.src}
              data-speed="0.5"
              alt="Background"
              fill
              priority
              className="-z-10 object-cover"
              style={{ objectPosition: "center" }}
            />
            {/* Overlay for darkening */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-black bg-opacity-75" />

            {/* Noise Effect */}
            <Image
              // Next.js automatically casts to `any` even though the src property is present. Creating a personalised type cast is just overkill in this scenario.
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              src={images.noise.src}
              alt="Noise"
              fill
              className="pointer-events-none -z-10 opacity-10"
              style={{ objectFit: "cover" }}
            />

            {/* Header */}
            <div className="relative flex h-full flex-col items-center justify-center space-y-7">
              <div className="flex flex-col text-center text-white">
                <div className="font-family-header text-3xl lg:text-6xl">
                  FRAME PRODUCTION
                </div>
                <div className="font-family-secondary text-2xl lg:text-3xl">
                  Salva i tuoi{" "}
                  <span className="font-family-italic">momenti</span>.
                </div>
              </div>

              <div className="flex animate-bounce flex-row items-center justify-center space-x-3">
                <div className="font-family-italic text-shadow-gold text-base text-white lg:text-2xl">
                  Conoscici meglio
                </div>
                <FaAnglesDown className="h-4 w-4 text-white lg:h-8 lg:w-8" />
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="relative py-20">
            {/* Background Image */}
            <Image
              src={images.aboutUs.src}
              alt="Background"
              fill
              priority
              className="-z-10 object-cover"
              style={{ objectPosition: "center" }}
            />
            {/* Overlay for darkening */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-black bg-opacity-75" />

            {/* Noise Effect */}
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              src={images.noise.src}
              alt="Noise"
              fill
              className="pointer-events-none -z-10 opacity-10"
              style={{ objectFit: "cover" }}
            />

            <div className="relative flex flex-col items-center justify-center space-y-8 p-4 text-center text-3xl font-bold text-white lg:space-y-32">
              {/* Title and description */}
              <div className="flex flex-col items-center justify-center lg:space-y-4">
                <div className="font-family-secondary text-2xl lg:text-5xl">
                  Chi siamo
                </div>
                <div className="font-family-regular text-xl lg:text-2xl">
                  Un team <span className="font-family-italic">con voi</span>,
                  per voi
                </div>
              </div>

              {/* Horizontal Separator */}
              <span className="h-px w-full bg-gold lg:hidden" />

              {/* Paragraphs */}
              {aboutUsParagraphs.map((paragraph, index) => (
                <div
                  className="mx-4 flex flex-col space-y-4 lg:grid lg:w-2/3 lg:grid-cols-[1fr,auto,1fr]"
                  key={`about-us-paragraph-${index}`}
                >
                  <div
                    className={`font-family-secondary self-center text-2xl lg:text-3xl ${index % 2 === 0 ? "lg:order-first" : "lg:order-last"}`}
                  >
                    {paragraph.title}
                  </div>
                  <div className="order-2 flex items-center justify-center px-8">
                    <VerticalSeparatorLine color="gold" />
                  </div>
                  <div
                    className={`font-family-regular self-center text-base font-light lg:text-xl ${index % 2 === 0 ? "lg:order-last" : "lg:order-first"}`}
                  >
                    {paragraph.description}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Our Services Section */}
          <section className="relative bg-black py-20">
            {/* Noise Effect */}
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              src={images.noise.src}
              alt="Noise"
              fill
              className="pointer-events-none -z-10 opacity-10"
              style={{ objectFit: "cover" }}
            />

            <div className="relative flex flex-col items-center justify-center space-y-8 p-4 text-center text-3xl font-bold text-white lg:space-y-32">
              {/* Title and description */}
              <div className="flex flex-col items-center justify-center lg:space-y-4">
                <div className="font-family-secondary text-2xl lg:text-5xl">
                  Our Services
                </div>
              </div>

              {/* Horizontal Separator */}
              <span className="h-px w-full bg-gold lg:hidden" />

              {/* Services paragraphs */}
              <div className="flex w-4/5 flex-col gap-14 lg:flex-row">
                {ourServicesParagraphs.map((paragraph, index) => (
                  <>
                    <div
                      key={paragraph.title}
                      className="flex flex-1 flex-col items-center justify-center gap-2"
                    >
                      <Image
                        src={paragraph.image}
                        alt={paragraph.title}
                        width={944}
                        height={622}
                        className="h-auto w-full"
                      />
                      <div className="font-family-secondary text-center text-2xl text-white lg:text-3xl">
                        {paragraph.title}
                      </div>
                      <div className="font-family-regular text-base font-light text-white lg:text-xl">
                        {paragraph.description}
                      </div>
                    </div>
                    {/* Separator line */}
                    {index !== ourServicesParagraphs.length - 1 && (
                      <>
                        <span className="h-px w-full bg-gold lg:hidden" />
                        <VerticalSeparatorLine color="gold" />
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
