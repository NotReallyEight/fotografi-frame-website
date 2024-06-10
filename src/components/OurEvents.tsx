"use client";

import config from "@/config";
import Carousel from "./Carousel";
import { StaticImageData } from "next/image";
import images from "@/utils/images";
import { useEffect, useState } from "react";

const ourEventsCarouselSlides: { image: StaticImageData }[] = images.event.map(
  (image) => ({ image })
);

const OurEvents = () => {
  return (
    <div
      className="flex min-h-screen snap-center flex-col items-center justify-center md:justify-around"
      id="our-events"
    >
      <div
        className={`font-family-header dark:text-textDark text-textLight mb-8 text-center text-5xl`}
      >
        Our Events
      </div>
      <div className="flex flex-col items-center justify-center *:my-8">
        <Carousel
          slides={ourEventsCarouselSlides}
          options={{ loop: true }}
          plugins={["autoplay"]}
        />
        <a
          href="/lavori"
          className={`border-secondaryLight dark:border-secondaryDark hover:border-enabledLight hover:dark:border-enabledDark rounded-3xl border-2 p-3 duration-200`}
        >
          Our Portfolio
        </a>
      </div>
    </div>
  );
};

export default OurEvents;
