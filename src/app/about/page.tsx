"use client";

import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";
import { useNav } from "@/contexts/NavContext";
import { Activity, Suspense } from "react";
import { FiChevronsDown } from "react-icons/fi";
import MemberImage from "./_components/MemberImage";
import images from "@/utils/images";
import { StaticImageData } from "next/image";
import Image from "next/image";

const MEMBER_IMAGES_GRID: {
  name: string;
  role: string;
  image: StaticImageData;
}[] = [
  {
    name: "Ducantcast",
    role: "Duca ma con la e",
    image: images.members.luca,
  },
  {
    name: "Domenico Silvè",
    role: 'Il tizio del "Ragazzi avete 10 minuti"',
    image: images.members.domenico,
  },
  {
    name: "Ducantcast",
    role: "Duca ma con la e",
    image: images.members.luca,
  },
  {
    name: "Domenico Silvè",
    role: 'Il tizio del "Ragazzi avete 10 minuti"',
    image: images.members.domenico,
  },
  {
    name: "Ducantcast",
    role: "Duca ma con la e",
    image: images.members.luca,
  },
  {
    name: "Domenico Silvè",
    role: 'Il tizio del "Ragazzi avete 10 minuti"',
    image: images.members.domenico,
  },
  {
    name: "Ducantcast",
    role: "Duca ma con la e",
    image: images.members.luca,
  },
  {
    name: "Domenico Silvè",
    role: 'Il tizio del "Ragazzi avete 10 minuti"',
    image: images.members.domenico,
  },
  {
    name: "Ducantcast",
    role: "Duca ma con la e",
    image: images.members.luca,
  },
  {
    name: "Domenico Silvè",
    role: 'Il tizio del "Ragazzi avete 10 minuti"',
    image: images.members.domenico,
  },
  {
    name: "Ducantcast",
    role: "Duca ma con la e",
    image: images.members.luca,
  },
  {
    name: "Domenico Silvè",
    role: 'Il tizio del "Ragazzi avete 10 minuti"',
    image: images.members.domenico,
  },
  {
    name: "Ducantcast",
    role: "Duca ma con la e",
    image: images.members.luca,
  },
];

export default function About() {
  const { isNavOpen } = useNav();

  return (
    <>
      <Metadata
        title="About Us - Frame"
        description="Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre."
        keywords="fotografia, fotografi frame, fotografi, frame"
      />

      <main className="h-dvh">
        <Navbar hasLeftPadding fixed />

        <Activity mode={isNavOpen ? "hidden" : "visible"}>
          <div className="px-8 md:px-12 lg:px-[10dvw] mb-32">
            <div
              className="
              h-dvh
              flex flex-col
              items-center justify-center
              text-white text-center
              space-y-4
            "
            >
              {/* Hero section */}
              <Image
                alt="Foto di gruppo dei membri di FRAME"
                src={images.aboutGroupImage}
                className={`
                  absolute
                  h-dvh
                  object-cover
                `}
              />
              <div
                className={`
                    pointer-events-none absolute inset-0
                    bg-linear-to-b from-black/60 from-10% to-90% to-black
                    h-dvh
                  `}
              />
              <div className="font-family-header z-10">Meet the frame.</div>
              <div className="w-half-width font-family-regular-lg text-text-secondary z-10">
                A collective of visionaries redefining storytelling through
                cinematic motion and sound.
              </div>
              <FiChevronsDown
                size="1.5rem"
                className={`
                    animate-bounce
                    text-text-secondary
                    mt-4
                  `}
              />
            </div>
            {/*  The Crew */}
            <div
              className={`
                  flex flex-row justify-between
                  border-b-border border-b-2 pb-4
                `}
            >
              <div className="text-white">
                <div className="font-family-regular-lg text-text-secondary uppercase">
                  The Directory
                </div>
                <div className="font-family-grid-label">The Crew</div>
              </div>
              <div className="text-text-secondary uppercase self-end">
                Personnel Index [10/10]
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4">
              {MEMBER_IMAGES_GRID.map((memberImage, index) => (
                <MemberImage
                  imageSrc={memberImage.image}
                  name={memberImage.name}
                  role={memberImage.role}
                  key={`member-images-${index}`}
                />
              ))}
            </div>
          </div>

          <Suspense fallback={<Footer usesDate={false} />}>
            <Footer />
          </Suspense>
        </Activity>
      </main>
    </>
  );
}
