"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import { Activity, Suspense } from "react";
import { useNav } from "@/contexts/NavContext";
import Button from "@/components/Button";
import StudioFeature from "./_components/StudioFeature";
import Image from "next/image";
import images from "@/utils/images";
import FadeToBlackImage from "@/components/FadeToBlackImage";

const STUDIO_FEATURES = [
  "118mq Surface Area",
  "Daylight (North exp.)",
  "1x 63A + 2x 32A Power",
  "Digital Station",
  "Remote Viewing",
  "Wall Mount Backgrounds",
  "Dedicated Relax Area",
  "Private Ramp Access",
  "1GB/s Fiber Wi-Fi",
];

export default function Studio() {
  const { isNavOpen } = useNav();

  return (
    <>
      <Metadata
        title="Studio - Frame"
        description="Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre."
        keywords="fotografia, fotografi frame, fotografi, frame"
      />

      <main className="h-dvh">
        <Navbar hasLeftPadding fixed />

        <Activity mode={isNavOpen ? "hidden" : "visible"}>
          <div
            className="
              h-dvh
              flex flex-col
              items-center justify-center
              text-white text-center
              space-y-8
            "
          >
            {/* Hero section */}
            <div className="font-family-header">
              THE
              <br />
              STUDIO.
            </div>
            <div className="w-half-width font-family-regular-lg text-text-secondary">
              The main studio is a 118mq facility designed for flexibility. It
              satisfies the needs of lean productions as well as demanding ones.
              Professionals can work in a comfortable, modular space adapted to
              every necessity.
            </div>
            <Button onClick={() => {}} text="Request Info" />
          </div>

          {/* Studio Planimetry */}
          <div
            className={`
                md:h-dvh
                grid grid-cols-1
                md:grid-cols-[1fr_auto_2fr]
                space-y-4 md:space-y-0
                items-center
                p-4 md:p-8 xl:p-12
              `}
          >
            <div className="flex flex-col text-white space-y-4 xl:ml-4">
              <div className="font-family-secondary">
                Floor
                <br />
                Plan
              </div>
              <div className="w-16 h-1 bg-accent" />
              <div className="flex flex-col space-y-2">
                {STUDIO_FEATURES.map((feature, index) => (
                  <StudioFeature
                    text={feature}
                    key={`studio-feature-${index}`}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px md:w-px md:h-full bg-border" />

            <Image
              alt="Immagine della planimetria dello studio"
              src={images.demoStudioPlanimetry}
              className="mx-auto"
            />
          </div>

          {/* Visual Reference */}
          <FadeToBlackImage
            src={images.birthdays.header[1]}
            alt="Riferimento visivo: esempio di allestimento nello studio fotografico Frame"
          />

          <Suspense fallback={<Footer usesDate={false} />}>
            <Footer />
          </Suspense>
        </Activity>
      </main>
    </>
  );
}
