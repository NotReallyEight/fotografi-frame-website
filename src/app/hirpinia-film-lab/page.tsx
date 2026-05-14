"use client";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";
import { useNav } from "@/contexts/NavContext";
import images from "@/utils/images";
import Image from "next/image";
import { Activity, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { TRAINING_AREAS } from "./constants";

const NoSSRProjectStat = dynamic(() => import("./_components/ProjectStat"), {
  ssr: false,
});

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TOGETHER_PICTURES_STATS: [string, string][] = [
  ["100+", "Partecipanti"],
  ["9", "Reparti"],
  ["9", "Produzioni"],
];

const BEHIND_THE_LENS_IMAGE_COUNT_PER_LAYOUT = 5;

export default function HirpiniaFilmLab() {
  const { isNavOpen } = useNav();
  const mainScrollBarRef = useRef(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClient(true);
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const statEls = document.querySelectorAll<HTMLDivElement>(".stat");
        statEls.forEach((statEl, i) => {
          if (statEl === null) return;

          const numberEl = statEl.children[0];
          const targetText = TOGETHER_PICTURES_STATS[i][0].replace("+", "");

          // Mock object
          const obj = { value: 0 };

          gsap.fromTo(
            obj,
            { value: 0 },
            {
              value: Number(targetText),
              duration: 2,
              ease: "power1.out",
              scrollTrigger: {
                trigger: statEl,
                start: "top 90%",
                invalidateOnRefresh: true,
              },
              onUpdate: () => {
                numberEl.textContent =
                  Math.floor(obj.value).toString() +
                  (TOGETHER_PICTURES_STATS[i][0].includes("+") ? "+" : "");
              },
            }
          );
        });

        ScrollTrigger.refresh();
      }, mainScrollBarRef);

      return () => ctx.revert();
    },
    {
      dependencies: [isClient],
    }
  );

  return (
    <>
      <Metadata
        title="HirpiniaFilmLab - Frame"
        description="Laboratorio cinematografico dedicato alla formazione audiovisiva e alla crescita di giovani filmmaker. Hirpinia Film Lab unisce teoria e pratica per sviluppare nuove produzioni e voci del cinema indipendente."
        keywords="laboratorio cinematografico, formazione audiovisiva, cinema indipendente, filmmaking, produzione video, Irpinia film lab, corsi cinema"
      />

      <main
        className={"flex flex-col h-dvh space-y-32 md:space-y-64"}
        ref={mainScrollBarRef}
      >
        <Navbar fixed hasLeftPadding />

        <Activity mode={isNavOpen ? "hidden" : "visible"}>
          {/* Hero section */}
          <section
            className={
              "text-white min-h-dvh flex flex-col justify-center gap-8 mb-0 relative"
            }
          >
            <div
              className={`flex flex-col
                  px-8 md:px-12 lg:px-[10dvw]
                  gap-8 z-10`}
            >
              <h1 className="font-family-header normal-case *:block md:*:inline">
                <span>Hirpinia</span>
                <span>Film</span>
                <span>Lab</span>
              </h1>
              <h2 className="font-family-regular-lg text-text-secondary">
                Formazione e storytelling nel cuore del cinema indipendente. Un
                laboratorio audiovisivo che accompagna giovani talenti nella
                creazione di nuove voci del cinema contemporaneo.
              </h2>
              <Button
                href="https://www.instagram.com/hirpiniafilmlab/"
                text="Scopri il progetto"
                primary
              />
            </div>
            <Image
              className={`
                absolute inset-0
                w-full h-full
                -z-10
                object-cover object-bottom-left
                opacity-20
              `}
              alt="BTS image"
              src={images.hirpiniaFilmLab.heroBg}
              fill
              sizes="100dvw"
            />
            <div
              className={`
                          pointer-events-none absolute inset-0
                          bg-linear-to-b from-black/0 to-black/70
                        `}
            />
          </section>

          {/* The Vision Section */}
          <section
            className={
              "px-8 md:px-12 lg:px-[10dvw] text-white space-y-8 flex flex-col items-center"
            }
          >
            <div
              className={
                "relative flex flex-col items-center justify-center gap-8"
              }
            >
              <div className="font-family-secondary">La Nostra Visione</div>
              <div className="font-family-regular-lg text-text-secondary lg:w-[50%]">
                Hirpinia Film Lab è un laboratorio cinematografico dedicato alla
                formazione pratica nel settore audiovisivo. Uniamo teoria e
                produzione sul campo per sviluppare competenze concrete in
                regia, produzione e linguaggio filmico. Il nostro obiettivo è
                creare un ponte tra il territorio e l&apos;industria
                cinematografica contemporanea, formando una nuova generazione di
                filmmaker consapevoli e preparati.
              </div>
            </div>

            {/* Image grid */}
            <div className={"grid md:grid-cols-8 gap-8"}>
              {images.hirpiniaFilmLab.theVisionGrid.map((image, index) => {
                let order: number = index + 1;

                if (index === 1) order = 3;
                if (index === 2) order = 2;

                return (
                  <div
                    className={`
                      relative
                      ${(index + 1) % 3 === 2 ? "aspect-4/3 col-span-4" : "aspect-3/4 col-span-2"}
                      group
                      order-${order}
                      md:order-${index + 1}
                    `}
                    key={`the-vision-image-${index}`}
                  >
                    <Image
                      width={(index + 1) % 3 === 2 ? 900 : 600}
                      height={(index + 1) % 3 === 2 ? 600 : 900}
                      alt="The vision image"
                      src={image}
                      className={
                        "lg:saturate-0 group-hover:saturate-100 duration-(--grid-fade-in-duration)"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Training Areas Section */}
          <section
            className={
              "px-8 md:px-12 lg:px-[10dvw] text-white space-y-8 flex flex-col"
            }
          >
            <div className="font-family-secondary">Aree di Formazione</div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Image grid */}
              {TRAINING_AREAS.map(([trainingAreaKey, { fullTitle }], index) => (
                <a
                  className={`
                      relative
                      group
                      overflow-hidden
                    `}
                  key={`training-area-${trainingAreaKey}`}
                  href={`/hirpinia-film-lab/${trainingAreaKey}`}
                >
                  <Image
                    alt={`Reparto ${fullTitle}`}
                    src={images.hirpiniaFilmLab.trainingAreas[trainingAreaKey]}
                    width={900}
                    height={900}
                    className={
                      "aspect-square object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 duration-(--grid-fade-in-duration)"
                    }
                  />
                  <div className="absolute left-4 bottom-4 flex flex-col gap-2">
                    <div
                      className="text-accent
                        font-family-mono uppercase
                        text-xs"
                    >{`0${index + 1}`}</div>
                    <div
                      className="font-family-regular-lg
              text-lg md:text-xl lg:text-2xl
              font-bold uppercase text-white"
                    >
                      {fullTitle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Behind The Lens Section */}
          <section
            className={
              "px-8 md:px-12 lg:px-[10dvw] text-white space-y-8 flex flex-col"
            }
          >
            <div className="font-family-secondary">Dietro l&apos;obiettivo</div>

            <div
              className={
                "grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-8"
              }
            >
              {/* Image grid */}
              {images.hirpiniaFilmLab.behindTheLensSectionMedia.map(
                (media, index) => (
                  <div
                    className={`
                      relative
                      group
                      opacity-80
                      ${index % BEHIND_THE_LENS_IMAGE_COUNT_PER_LAYOUT === 0 ? "md:col-span-2 md:row-span-2" : ""}
                      ${index % BEHIND_THE_LENS_IMAGE_COUNT_PER_LAYOUT === 2 ? "md:row-span-2" : ""}
                      overflow-hidden
                    `}
                    key={`training-area-${index}`}
                  >
                    {media.endsWith("mp4") ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        src={media}
                        className={
                          "w-full h-75 md:h-158 object-cover object-bottom-left"
                        }
                      />
                    ) : (
                      <Image
                        alt={`Behind the lens image ${index}`}
                        src={media}
                        width={900}
                        height={900}
                        className={"object-cover w-full h-full"}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </section>

          {/* Together Image Section */}
          <section
            className={
              "relative w-dvw aspect-3/2 lg:aspect-[2.39/1] text-white flex flex-col mb-0"
            }
          >
            <Image
              alt="Foto di gruppo dei membri di HirpiniaFilmLab"
              src={images.hirpiniaFilmLab.together}
              fill
              className={"w-full object-cover opacity-50"}
            />
            <div className="absolute top-0 left-0 px-8 md:px-12 lg:px-[10dvw] w-full h-full grid grid-cols-3">
              {TOGETHER_PICTURES_STATS.map((stat, index) => (
                <NoSSRProjectStat
                  index={index}
                  stat={stat}
                  key={`project-stat-${index}`}
                />
              ))}
            </div>
            <div
              className={`
                pointer-events-none
                absolute inset-0
                bg-linear-to-b from-black via-black/0 to-black
              `}
            />
          </section>

          {/* Footer */}
          <Suspense fallback={<Footer usesDate={false} />}>
            <Footer />
          </Suspense>
        </Activity>
      </main>
    </>
  );
}
