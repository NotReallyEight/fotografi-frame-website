"use client";

import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";
import { useNav } from "@/contexts/NavContext";
import images from "@/utils/images";
import Image from "next/image";
import { Activity, Suspense } from "react";
import { TRAINING_AREAS } from "../constants";
import Button from "@/components/Button";

type Props = {
  departmentName: string;
};

const DepartmentPageClient = ({ departmentName }: Props) => {
  const { isNavOpen } = useNav();
  const departmentInfo = TRAINING_AREAS.find(
    (area) => area[0] === departmentName
  );

  if (!departmentInfo)
    return (
      <div className="h-dvh flex flex-col items-center justify-center">
        <div className="text-white font-family-secondary text-center">
          Oops! Qualcosa è andato storto.
        </div>
      </div>
    );

  return (
    <>
      <Metadata
        title="HirpiniaFilmLab - Frame"
        description="Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre."
        keywords="fotografia, fotografi frame, fotografi, frame"
      />
      <main className={"flex flex-col h-dvh space-y-32 md:space-y-64"}>
        <Navbar fixed hasLeftPadding />
        <Activity mode={isNavOpen ? "hidden" : "visible"}>
          {/* Hero section */}
          <div className="text-white lg:min-h-dvh flex flex-col justify-center gap-8 lg:mb-0 relative">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] auto-rows-auto max-h-[75%] p-8 md:p-16 gap-8">
              <div className="row-span-2 font-family-header mt-auto z-10">
                {departmentInfo[1].title}
              </div>
              <div className="z-10 font-family-regular-lg md:text-xl lg:text-2xl">
                {departmentInfo[1].primaryDescription}
              </div>
              <div className="text-text-secondary z-10 font-family-regular-lg">
                {departmentInfo[1].secondaryDescription}
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
                src={
                  images.hirpiniaFilmLab.trainingAreaDedicatedPages[
                    departmentName as keyof typeof images.hirpiniaFilmLab.trainingAreaDedicatedPages
                  ].bg
                }
                fill
                sizes="100dvw"
              />
              <div
                className={`
                          pointer-events-none absolute inset-0
                          bg-linear-to-b from-black/0 to-black/70
                        `}
              />
            </div>
          </div>

          <div className="columns-2 md:columns-3 gap-4 relative p-4">
            {images.hirpiniaFilmLab.trainingAreaDedicatedPages[
              departmentName as keyof typeof images.hirpiniaFilmLab.trainingAreaDedicatedPages
            ].images.map((image, index) => (
              <Image
                alt={`${departmentName} image - ${index}`}
                src={image}
                key={`backstage-image-${index}`}
                width={900}
                height={900}
                className="mb-4"
              />
            ))}

            <div
              className={`
                          pointer-events-none absolute inset-0
                          bg-linear-to-b from-black/0 to-black/80
                        `}
            />
          </div>

          {/* Call to Action section */}
          <section className="px-8 md:px-12 lg:px-[10dvw] flex flex-col gap-8 text-white py-8 relative">
            <div className="font-family-secondary text-center">
              Rientra nel set
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                href="/hirpinia-film-lab"
                text="Vai al Lab"
                primary
                fullWidth
                className="md:w-fit"
                newTab={false}
              />
            </div>
          </section>

          {/* Footer */}
          <Suspense fallback={<Footer usesDate={false} />}>
            <Footer />
          </Suspense>
        </Activity>
      </main>
    </>
  );
};

export default DepartmentPageClient;
