"use client";

import Navbar from "@/components/Navbar";
import HorizontalSeparatorLine from "@/components/HorizontalSeparatorLine";
import Gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import images from "@/utils/images";
import Image from "next/image";
import Footer from "@/components/Footer";

const productionVideos: {
  title: string;
  id: string;
}[] = [
  {
    title: "Silarus - La Moda che Scorre",
    id: "aW9yPWg4ryA",
  },
  {
    title: "Spot Morra De Sanctis - CASA Sanremo",
    id: "upkRLaQNOFc",
  },
  {
    title: "10 Anni InfoIrpinia",
    id: "FwNtA1SdZSQ",
  },
];

Gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function Works() {
  const scrollSmootherWrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Horizontal scrolling gallery
      const panels = Gsap.utils.toArray(".horizontal-gallery-panel");
      const mainEl = document.querySelector("main");

      if (mainEl === null) return;

      const panelsOffsetWidth = (
        document.querySelector(
          ".horizontal-gallery-container"
        ) as unknown as HTMLElement
      ).offsetWidth;

      ScrollSmoother.create({
        content: "#smooth-content",
        wrapper: "#smooth-wrapper",
        smooth: 1,
        effects: true,
        smoothTouch: 0.5,
      });

      Gsap.to(panels, {
        x: -panelsOffsetWidth,
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-gallery-container",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          end: `+=${panelsOffsetWidth}`,
        },
      });

      // Brands images marquee infinite scroll
      const marquee = document.querySelector(
        ".marquee"
      ) as unknown as HTMLElement | null;

      if (!marquee) return;

      // Get the children elements from the marquee div
      const marqueeChildren = Array.from(marquee.children) as HTMLElement[];

      // Wait for any images inside the marquee to load so measurements are accurate
      void (async () => {
        const marqueeImages = Array.from(marquee.querySelectorAll("img"));
        await Promise.all(
          marqueeImages.map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((res) => {
                  img.addEventListener("load", res, { once: true });
                })
          )
        );

        // One set of a marquee (if there are 8 images it's gonna be the width of 8 images combined)
        const singleSetWidth = marquee.scrollWidth;
        // The target width: usually we want pretty much more than the viewport
        // obviously because otherwise there's gonna be empty spaces
        const targetWidth = window.innerWidth + singleSetWidth;

        while (marquee.scrollWidth < targetWidth) {
          const fragment = document.createDocumentFragment();
          // For every child of the marquee children, append it to the document fragment
          for (const child of marqueeChildren)
            fragment.appendChild(child.cloneNode(true));

          // As a result, append the document fragment to the marquee
          marquee.appendChild(fragment);
        }

        const totalWidth = singleSetWidth;
        let x = 0;
        const speed = 1;

        // Once the thing reaches the end then we can "snap" without snapping as it's
        // smoothly to the initial position (which is going to be 0).
        const setX = Gsap.quickSetter(marquee, "x", "px");
        const tick = () => {
          x -= speed;
          if (x <= -totalWidth) x += totalWidth;
          setX(x);
        };

        Gsap.ticker.add(tick);
      })();
    },
    {
      scope: scrollSmootherWrapper,
    }
  );

  return (
    <>
      {/* Meta tags */}
      <title>Lavori - Frame</title>
      <meta
        name="description"
        content="Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre."
      />
      <meta
        name="keywords"
        content="fotografia, fotografi frame, fotografi, frame"
      />
      <div id="smooth-wrapper" ref={scrollSmootherWrapper}>
        {/* Navbar */}
        <Navbar />

        <main className="flex flex-col bg-black" id="smooth-content">
          <div className="m-auto flex h-dvh flex-col items-center justify-center gap-7 p-4 text-center text-white lg:w-1/2">
            <div className="font-family-header text-3xl lg:text-6xl">
              I Nostri Lavori
            </div>
            <HorizontalSeparatorLine color="gold" hideOnDesktop={false} />
            <div className="font-family-regular text-base font-light lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas. Iaculis massa nisl malesuada lacinia integer nunc
              posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
              litora torquent per conubia nostra inceptos himenaeos.
            </div>
          </div>

          {/* Horizontal scrolling section */}
          <div className="horizontal-gallery-container flex h-dvh w-full flex-nowrap">
            {images.worksGrid.map((image, index) => (
              <Image
                key={`horizontal-gallery-image-${index}`}
                width={600}
                height={900}
                src={image}
                alt={`Production image ${index + 1}`}
                className="image horizontal-gallery-panel flex h-full w-auto shrink-0 object-cover"
                loading="lazy"
              />
            ))}
          </div>

          {/* Production video cards */}
          {productionVideos.map((video) => (
            <div
              key={`production-video-${video.id}`}
              className="flex h-dvh w-full bg-black"
            >
              <a
                href={`https://youtu.be/${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative m-auto inline-block cursor-pointer"
              >
                <Image
                  alt={`Production video thumbnail - ${video.title}`}
                  src={images.demoProductionThumbnail}
                  height={720}
                  width={1280}
                  sizes="(min-width: 768px) 80vh, 100vh"
                  className="m-auto duration-200 group-hover:opacity-25 group-focus:opacity-25"
                />

                <div className="font-family-secondary absolute bottom-8 left-8 text-3xl text-white opacity-0 duration-200 group-hover:opacity-100 group-focus:opacity-100">
                  {video.title}
                </div>
              </a>
            </div>
          ))}

          {/* Brands grid */}
          <div className="mx-auto mb-16 flex flex-col gap-16">
            <div className="font-family-secondary mx-auto text-3xl text-white">
              BRAND CON CUI ABBIAMO COLLABORATO
            </div>
            <div className="marquee flex flex-row">
              {images.worksBrands.map((image, index) => (
                <Image
                  src={image}
                  alt="Logo Brand"
                  key={index}
                  height={200}
                  width={200}
                  className="h-48 w-48"
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  );
}
