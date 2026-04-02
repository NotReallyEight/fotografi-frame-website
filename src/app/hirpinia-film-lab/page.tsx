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

const NoSSRProjectStat = dynamic(() => import("./_components/ProjectStat"), {
  ssr: false,
});

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TRAINING_AREAS: [
  keyof typeof images.hirpiniaFilmLab.trainingAreas,
  string,
][] = [
  ["artDepartment", "Art Department"],
  ["actors", "Attori"],
  ["communicationAndMarketing", "Comunicazione e Marketing"],
  ["photography", "Fotografia"],
  ["music", "Musica"],
  ["postProduction", "Post Produzione"],
  ["production", "Produzione"],
  ["direction", "Regia"],
  ["setDesign", "Sceneggiatura"],
];

const TOGETHER_PICTURES_STATS: [string, string][] = [
  ["100+", "Partecipanti"],
  ["09", "Reparti"],
  ["6", "Produzioni"],
];

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
        description="Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre."
        keywords="fotografia, fotografi frame, fotografi, frame"
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
                Storytelling e collaborazione tra giovani talenti. Formando la
                nuova generazione delle voci del cinema.
              </h2>
              <Button
                href="https://www.instagram.com/hirpiniafilmlab/"
                text="Segui il progetto"
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
              <div className="font-family-secondary">La Visione</div>
              <div className="font-family-regular-lg text-text-secondary lg:w-[50%]">
                Un laboratorio di cinema dove la teoria incontra la pratica.
                Supportiamo la gioventù locale attraverso una formazione pratica
                e un tutoraggio tecnico professionale, colmando il divario tra
                le storie locali e gli schermi di tutto il mondo.
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
              {TRAINING_AREAS.map(
                ([trainingAreaKey, trainingAreaLabel], index) => (
                  <div
                    className={`
                      relative
                      group
                      overflow-hidden
                    `}
                    key={`training-area-${trainingAreaKey}`}
                  >
                    <Image
                      alt={`Reparto ${trainingAreaLabel}`}
                      src={
                        images.hirpiniaFilmLab.trainingAreas[trainingAreaKey]
                      }
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
                        {trainingAreaLabel}
                      </div>
                    </div>
                  </div>
                )
              )}
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
                      ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}
                      ${index === 2 ? "md:row-span-2" : ""}
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
              "relative w-dvw aspect-3/2 lg:aspect-[2.39/1] text-white flex flex-col"
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
