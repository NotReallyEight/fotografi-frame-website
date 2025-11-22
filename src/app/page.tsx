"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { FaAnglesDown } from "react-icons/fa6";
import images from "@/utils/images";
import VerticalSeparatorLine from "@/components/VerticalSeparatorLine";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Footer from "@/components/Footer";
import HorizontalSeparatorLine from "@/components/HorizontalSeparatorLine";
import { slideUpFadeIn } from "@/utils/gsap";
import TextPlugin from "gsap/TextPlugin";

const ABOUT_US_PARAGRAPHS = [
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

const OUR_SERVICES_PARAGRAPHS = [
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

const APERTURE_VALUES: number[] = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];

const PRELOADER_FIRST_TRANSITION_DELAY = 7_500;
const PRELOADER_TOTAL_DURATION = 11_500;

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, TextPlugin);

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollSmootherWrapper = useRef<HTMLDivElement>(null);
  const [fStop, setFStop] = useState<number>(APERTURE_VALUES[0]);
  const horizontalGalleryContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingIndex, setLoadingIndex] = useState<number>(0);
  const [threeDotsAnimation, setThreeDotsAnimation] = useState<boolean>(false);
  const preloaderLogoVideoRef = useRef<HTMLVideoElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstPreloaderIndexTimeout = setTimeout(() => {
      setLoadingIndex(1);
      void preloaderLogoVideoRef.current?.play();
    }, PRELOADER_FIRST_TRANSITION_DELAY);
    const preloaderFinishTimeout = setTimeout(() => {
      setLoading(false);
    }, PRELOADER_TOTAL_DURATION);

    return () => {
      clearTimeout(firstPreloaderIndexTimeout);
      clearTimeout(preloaderFinishTimeout);
    };
  }, []);

  useGSAP(
    () => {
      if (loading) {
        gsap.to(typewriterRef.current, {
          text: "Ogni grande storia nasce da un gruppo di menti che lavorano come una sola.",
          ease: "none",
          duration: (PRELOADER_FIRST_TRANSITION_DELAY - 3_000) / 1_000,
          onComplete: () => {
            setThreeDotsAnimation(true);
          },
        });
        return;
      }

      slideUpFadeIn("#smooth-content");

      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        smoothTouch: 0.05,
      });

      let latestFStop = fStop;
      let ticking = false;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          latestFStop =
            APERTURE_VALUES[
              Math.round(self.progress * (APERTURE_VALUES.length - 1))
            ];

          if (!ticking)
            requestAnimationFrame(() => {
              setFStop(latestFStop);
              ticking = false;
            });

          ticking = true;
        },
      });

      const galleryWidth =
        horizontalGalleryContainerRef.current?.scrollWidth ?? 0;

      gsap.to(horizontalGalleryContainerRef.current, {
        x: () => -(galleryWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: "#horizontal-gallery-wrapper",
          scrub: 1,
          start: "center center",
          end: () => `+=${galleryWidth - window.innerHeight}`,
        },
      });
    },
    {
      scope: scrollSmootherWrapper,
      dependencies: [loading],
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

      {loading && (
        <div
          className={`absolute inset-0 h-[100dvh] w-[100dvw] bg-black transition-opacity duration-700 ${loadingIndex === 0 ? "opacity-100" : "opacity-0"}`}
          role="status"
          aria-live="polite"
          aria-label="Loading application"
        >
          <div className="absolute bottom-16 left-0 right-0 mx-auto w-[80dvw] lg:left-16 lg:right-16 lg:mx-0 lg:w-[35dvw]">
            <div className="flex flex-row items-center gap-4">
              <div
                ref={typewriterRef}
                className="font-family-regular-extra-light typewriter inline text-lg text-white after:ml-1 after:border-r-2 after:border-r-white"
              />
              <div
                className={`${threeDotsAnimation ? "opacity-100" : "opacity-0"} dots font-family-regular-extra-light flex flex-row gap-2 text-lg duration-0 *:inline-block *:text-white *:opacity-0`}
              >
                <div>.</div>
                <div>.</div>
                <div>.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div
          className={`absolute inset-0 flex h-[100dvh] w-[100dvw] items-center justify-center bg-black transition-opacity duration-700 ${loadingIndex === 1 ? "opacity-100" : "opacity-0"}`}
        >
          <video
            ref={preloaderLogoVideoRef}
            className="h-full w-full scale-50 object-cover object-center sm:object-center lg:scale-75"
            muted
            playsInline
            preload="auto"
            aria-label="Frame Production logo animation"
          >
            <source src="/assets/preloader-animation/animated-frame-logo-16-9-con-motion-blur.webm" />
          </video>
        </div>
      )}

      {!loading && (
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
              <div className="pointer-events-none absolute inset-0 z-0 bg-black/75" />

              {/* Header */}
              <div className="relative flex h-full flex-col items-center justify-center space-y-7">
                <div className="flex flex-col text-center text-white">
                  <div className="font-family-secondary text-3xl lg:text-6xl">
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
                className="-z-10 object-cover"
                style={{ objectPosition: "center" }}
                loading="lazy"
              />
              {/* Overlay for darkening */}
              <div className="pointer-events-none absolute inset-0 z-0 bg-black/75" />

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
                <HorizontalSeparatorLine color="gold" />

                {/* Paragraphs */}
                {ABOUT_US_PARAGRAPHS.map((paragraph, index) => (
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
              <div className="relative flex flex-col items-center justify-center space-y-8 p-4 text-center text-3xl font-bold text-white lg:space-y-32">
                {/* Title */}
                <div className="flex flex-col items-center justify-center lg:space-y-4">
                  <div className="font-family-secondary text-2xl lg:text-5xl">
                    Our Services
                  </div>
                </div>

                {/* Horizontal Separator */}
                <HorizontalSeparatorLine color="gold" />

                {/* Services paragraphs */}
                <div className="flex w-4/5 flex-col gap-14 lg:flex-row">
                  {OUR_SERVICES_PARAGRAPHS.map((paragraph, index) => (
                    <React.Fragment key={`paragraph-${index}`}>
                      <div className="flex flex-1 flex-col items-center justify-center gap-2">
                        <Image
                          src={paragraph.image}
                          alt={paragraph.title}
                          width={944}
                          height={622}
                          className="h-auto w-full"
                          loading="lazy"
                        />
                        <div className="font-family-secondary text-center text-2xl text-white lg:text-3xl">
                          {paragraph.title}
                        </div>
                        <div className="font-family-regular text-base font-light text-white lg:text-xl">
                          {paragraph.description}
                        </div>
                      </div>
                      {/* Separator line */}
                      {index !== OUR_SERVICES_PARAGRAPHS.length - 1 && (
                        <>
                          <HorizontalSeparatorLine color="gold" hideOnDesktop />
                          <VerticalSeparatorLine color="gold" />
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>

            {/* Our Events Section */}
            <section className="relative bg-black py-20">
              <div className="relative flex flex-col items-center justify-center space-y-8 p-4 text-center text-3xl font-bold text-white lg:space-y-32">
                {/* Title */}
                <div className="flex flex-col items-center justify-center lg:space-y-4">
                  <div className="font-family-secondary text-2xl lg:text-5xl">
                    Our Events
                  </div>
                </div>

                {/* Horizontal gallery scroll */}
                <div
                  id="horizontal-gallery-wrapper"
                  className="h-[30vh] w-screen flex-row overflow-hidden lg:h-[50vh]"
                >
                  <div
                    ref={horizontalGalleryContainerRef}
                    className="flex h-full"
                  >
                    {images.event.map((eventImage, index) => (
                      <Image
                        key={`event-image-${index}`}
                        width={944}
                        height={622}
                        src={eventImage}
                        alt={`Event image ${index + 1}`}
                        className="h-full w-auto flex-shrink-0 object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 944px"
                      />
                    ))}
                  </div>
                </div>

                <Link
                  href={"/works"}
                  className="font-family-regular p-4 text-center text-base font-light text-white outline outline-1 outline-dustyBlue duration-200 hover:outline-white lg:text-xl"
                >
                  Our portfolio
                </Link>
              </div>
            </section>

            {/* Our Team Section */}
            <section className="relative bg-black py-20">
              <div className="relative flex flex-col items-center justify-center space-y-8 p-4 text-center text-3xl font-bold text-white lg:space-y-32">
                {/* Title and description */}
                <div className="flex flex-col items-center justify-center space-y-8 lg:space-y-28">
                  {/* Members images */}
                  <div className="w-[100vw] items-center justify-center gap-14 lg:grid lg:w-auto lg:grid-cols-[1fr_auto_1fr]">
                    <div className="font-family-secondary hidden text-8xl font-extrabold text-white lg:block">
                      OUR
                    </div>
                    <div className="flex flex-row">
                      <Image
                        alt="Luca"
                        src={images.members.luca}
                        width={300}
                        height={400}
                        loading="lazy"
                        sizes="(max-width: 768px) 150px, 300px"
                      />
                      <Image
                        alt="Domenico"
                        src={images.members.domenico}
                        width={300}
                        height={400}
                        loading="lazy"
                        sizes="(max-width: 768px) 150px, 300px"
                      />
                    </div>
                    <div className="font-family-secondary hidden text-8xl font-extrabold text-white lg:block">
                      TEAM
                    </div>
                  </div>

                  {/* Slogan */}
                  <div className="mx-4 mt-4 flex flex-col space-y-4 lg:grid lg:w-2/3 lg:grid-cols-[1fr,auto,1fr]">
                    {/* Title */}
                    <div className="font-family-secondary self-center text-2xl lg:text-3xl">
                      La qualità che cercate, con l&apos;energia che vi{" "}
                      <span className="font-family-italic">rappresenta</span>.
                    </div>

                    {/* Separator */}
                    <div className="flex items-center justify-center px-8">
                      <VerticalSeparatorLine color="gold" />
                    </div>
                    <HorizontalSeparatorLine color="gold" hideOnDesktop />

                    {/* Description */}
                    <div className="font-family-regular self-center text-base font-light lg:text-xl">
                      Ragazzi appassionati di fotografia e video, pronti a
                      catturare ogni momento con la massima qualità e
                      creatività. Siamo qui per rendere indimenticabili i vostri
                      momenti più importanti.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <section>
              <Footer />
            </section>
          </main>
        </div>
      )}
    </>
  );
}
