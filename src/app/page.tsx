import Navbar from "@/components/Navbar";
import AboutUs from "@/components/AboutUs";
import Image from "next/image";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Link from "next/link";
import OurServices from "@/components/OurServices";
import OurEvents from "@/components/OurEvents";
import images from "@/utils/images";
import OurTeam from "@/components/OurTeam";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <main className="flex h-[100dvh] snap-y snap-mandatory snap-always flex-col overflow-y-scroll scroll-smooth">
      <Navbar />
      <ScrollToTopButton />
      <div
        className="relative z-30 min-h-[100dvh] w-full snap-center"
        id="frame"
      >
        <Image
          alt="Fotografia scattata da FRAME."
          src={images.header.src}
          fill
          className="h-[100dvh] w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-family-header glassmorph glassmorph-padding text-center text-2xl text-textLight md:text-5xl dark:text-textDark`}
          >
            FRAME PRODUCTION
          </span>
        </div>
      </div>
      <div
        className="min-h-[100dvh] w-full snap-center"
        id="salva-i-tuoi-momenti"
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="font-family-header text-center text-2xl md:text-5xl">
            Salva I Tuoi Momenti
          </div>
          <Link
            className="m-4 flex flex-row items-center justify-center"
            href="#about-us-1"
          >
            <div className="font-family-secondary text-center text-lg md:text-2xl">
              Conoscici meglio
            </div>
            <FaArrowDown className="ml-4" />
          </Link>
        </div>
      </div>
      <AboutUs />
      <OurServices />
      <OurEvents />
      <OurTeam />
      <Footer />
    </main>
  );
}
