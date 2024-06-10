import Navbar from "@/components/Navbar";
import AboutUs from "@/components/AboutUs";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import Link from "next/link";
import OurServices from "@/components/OurServices";
import OurEvents from "@/components/OurEvents";
import images from "@/utils/images";

export default function Home() {
  return (
    <main className="flex h-screen snap-y snap-mandatory snap-always flex-col overflow-y-scroll scroll-smooth">
      <Navbar />
      <div className="relative min-h-[100vh] w-full snap-center" id="frame">
        <Image
          alt="Fotografia scattata da FRAME."
          src={images.header.src}
          fill
          className="h-[100vh] w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-family-header dark:text-textDark text-textLight glassmorph text-center text-5xl`}
          >
            FRAME PRODUCTION
          </span>
        </div>
      </div>
      <div
        className="min-h-[100vh] w-full snap-center"
        id="salva-i-tuoi-momenti"
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="font-family-header text-center text-5xl">
            Salva I Tuoi Momenti
          </div>
          <Link
            className="m-4 flex flex-row items-center justify-center"
            href="#about-us-1"
          >
            <div className="font-family-secondary text-center text-2xl">
              Conoscici meglio
            </div>
            <FaArrowDown className="ml-4" />
          </Link>
        </div>
      </div>
      <AboutUs />
      <OurServices />
      <OurEvents />
    </main>
  );
}
