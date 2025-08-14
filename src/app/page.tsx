import Navbar from "@/components/Navbar";
import Image from "next/image";
import type { Metadata } from "next";
import { FaAnglesDown } from "react-icons/fa6";
import images from "@/utils/images";

// Next.js automatically updates metadata using this export.
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Home - Frame",
  description:
    "Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre.",
  keywords: ["fotografia", "fotografi frame", "fotografi", "frame"],
};

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col scroll-smooth">
      {/* Background Image */}
      <Image
        src={images.header.src}
        alt="Background"
        fill
        priority
        className="-z-10 object-cover"
        style={{ objectPosition: "center" }}
      />
      {/* Overlay for darkening */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black bg-opacity-75" />

      {/* Noise Effect */}
      <Image
        src={(images.noise as { [key: string]: any; src: string }).src}
        alt="Noise"
        fill
        className="pointer-events-none -z-10 opacity-10"
        style={{ objectFit: "cover" }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Animated f stop */}
      <div className="fixed bottom-8 right-8 font-['var(--font-roboto-condensed)'] text-base text-white lg:text-2xl">
        f/1.8
      </div>

      {/* Header */}
      <div className="relative m-auto flex flex-col space-y-7">
        <div className="flex flex-col text-center text-white">
          <div className="font-family-header text-3xl lg:text-6xl">
            FRAME PRODUCTION
          </div>
          <div className="font-family-secondary text-2xl lg:text-3xl">
            Salva i tuoi <span className="font-family-italic">momenti</span>.
          </div>
        </div>

        <div className="flex animate-bounce flex-row items-center justify-center space-x-3">
          <div className="font-family-italic text-shadow-gold text-base text-white lg:text-2xl">
            Conoscici meglio
          </div>
          <FaAnglesDown className="h-4 w-4 text-white lg:h-8 lg:w-8" />
        </div>
      </div>
    </main>
  );
}
