"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import AboutUsImage from "../../public/assets/J55C0467-scaled.jpg";
import WhiteFrameLogo from "../../public/assets/frame-logo-white.png";
import BlackFrameLogo from "../../public/assets/frame-logo-black.png";

interface AboutUsSection {
  title?: string;
  subtitle?: string;
  description1?: string;
  description2?: string;
}

const aboutUsSections: AboutUsSection[] = [
  {
    title: "Chi Siamo",
    subtitle: "Un team con voi, per voi",
  },
  {
    description1:
      "Siamo un team di ragazzi appassionati di fotografia e video, specializzati nella cattura dei momenti più importanti della vita. Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre.\n\nCi occupiamo di diverse tipologie di eventi, tra cui matrimoni, cerimonie e compleanni, ma anche shooting fotografici per aziende, book fotografici, reportage e tanto altro.",
    description2:
      "Il nostro obiettivo è sempre quello di offrire un servizio personalizzato, attento alle esigenze dei nostri clienti e in grado di soddisfare ogni loro richiesta.\n\nOgni progetto è una nuova sfida da affrontare con entusiasmo e professionalità. Siamo sempre alla ricerca di nuove idee e di soluzioni creative per rendere ogni scatto unico ed emozionante.",
  },
];

const AboutUs = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState<string>("");
  const [currentImageSrc, setCurrentImageSrc] = useState<{
    dark: string;
    light: string;
  }>({ dark: WhiteFrameLogo.src, light: BlackFrameLogo.src });
  const [objectFit, setObjectFit] = useState<"contain" | "cover">("contain");

  // This callback fires when a Step hits the offset threshold.
  const onStepEnter = ({ data }: { data: number }) => {
    if (data === 0 && currentStepIndex === 0) {
      setCurrentImageSrc({
        dark: WhiteFrameLogo.src,
        light: BlackFrameLogo.src,
      });
      setObjectFit("contain");
      setCurrentStepIndex(data);

      return;
    }

    setAnimationClass("fade-out");
    if (data === 0 && currentStepIndex !== 0) {
      setTimeout(() => {
        setCurrentImageSrc({
          dark: WhiteFrameLogo.src,
          light: BlackFrameLogo.src,
        });
        setObjectFit("contain");
        setAnimationClass("fade-in");
      }, 500);
      setCurrentStepIndex(data);

      return;
    }

    setTimeout(() => {
      setCurrentImageSrc({ dark: AboutUsImage.src, light: AboutUsImage.src });
      setObjectFit("cover");
      setAnimationClass("fade-in");
    }, 500);
    setCurrentStepIndex(data);
  };

  return (
    <div>
      <Scrollama offset={0.5} onStepEnter={onStepEnter}>
        <div className="sticky top-0 -z-10 min-h-screen opacity-20">
          <picture>
            {/* Dynamically import the image depending on the color scheme chosen by the user */}
            <source
              srcSet={currentImageSrc.dark}
              media="(prefers-color-scheme: dark)"
            />
            <Image
              src={currentImageSrc.light}
              alt="Fotografia scattata da FRAME."
              fill
              style={{ objectFit }}
              className={`${animationClass} object-${objectFit}`}
            />
          </picture>
        </div>
        {aboutUsSections.map((section, stepIndex) => (
          <Step data={stepIndex} key={stepIndex}>
            <div
              id={`about-us-${stepIndex + 1}`}
              className={
                "flex min-h-screen snap-center flex-col items-center justify-center"
              }
            >
              {(section.title !== undefined ||
                section.subtitle !== undefined) && (
                <div className="glassmorph flex flex-col">
                  {section.title !== undefined && (
                    <div className="font-family-header text-center text-5xl">
                      {section.title}
                    </div>
                  )}
                  {section.subtitle !== undefined && (
                    <div className="font-family-secondary text-center text-2xl">
                      {section.subtitle}
                    </div>
                  )}
                </div>
              )}

              {(section.description1 !== undefined ||
                section.description2 !== undefined) && (
                <div className="font-family-regular flex min-w-[100vw] flex-col items-center justify-evenly text-sm md:flex-row md:text-base">
                  {section.description1 !== undefined && (
                    <div className="glassmorph my-4 max-w-[80vw] text-center md:my-auto md:max-w-[25vw]">
                      {section.description1}
                    </div>
                  )}
                  {section.description2 !== undefined && (
                    <div className="glassmorph my-4 max-w-[80vw] text-center md:my-auto md:max-w-[25vw]">
                      {section.description2}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Step>
        ))}
      </Scrollama>
    </div>
  );
};

export default AboutUs;
