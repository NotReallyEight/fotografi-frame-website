import Navbar from "@/components/Navbar";
import OurWorks from "@/components/Works/OurWorks";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import images from "@/utils/images";
import Image from "next/image";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// Next.js automatically updates metadata using this export.
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Lavori - Frame",
  description:
    "Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre.",
  keywords: ["fotografia", "fotografi frame", "fotografi", "frame"],
};

export default function Works() {
  return (
    <main className="flex h-[100dvh] flex-col bg-primaryLight dark:bg-primaryDark">
      <Navbar />
      <ScrollToTopButton />

      {/* Introduction */}
      <OurWorks />

      {/* Image grid */}
      <div className="mt-[10dvh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.worksGrid.map((image, index) => (
          <a
            key={index}
            href={image.src}
            target="_blank"
            rel="noopener"
            title="Fotografia scattata da FRAME."
          >
            <Image src={image} alt="Fotografia scattata da FRAME." />
          </a>
        ))}
      </div>

      {/* YouTube Videos */}
      <YouTubeEmbed
        title="Silarus - La Moda che Scorre"
        videoId="aW9yPWg4ryA"
        className="mx-auto mt-[10dvh]"
      />
      <YouTubeEmbed
        title="Spot Morra De Sanctis - CASA Sanremo"
        videoId="upkRLaQNOFc"
        className="mx-auto mt-[10dvh]"
      />
      <YouTubeEmbed
        title="10 Anni InfoIrpinia"
        videoId="FwNtA1SdZSQ"
        className="mx-auto mt-[10dvh]"
      />

      {/* Brands grid */}
      <div className="font-family-secondary mt-[10dvh] text-center text-lg md:text-2xl">
        BRAND CON CUI ABBIAMO COLLABORATO
      </div>
      <div className="mx-auto mb-[10dvh] mt-[5dvh] grid grid-cols-1 md:w-[90dvw] md:grid-cols-2 lg:grid-cols-3">
        {images.worksBrands.map((image, index) => (
          <Image src={image} alt="Logo Brand" key={index} />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
