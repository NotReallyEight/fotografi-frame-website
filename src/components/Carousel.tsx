"use client";

import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import Image, { StaticImageData } from "next/image";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import CarouselDotButton, { useDotButton } from "./CarouselDotButton";
import config from "@/config";
import { EmblaPluginType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

type PluginType = "autoplay";

type Props = {
  options?: EmblaOptionsType;
  plugins?: PluginType[];
  slides: {
    title?: string;
    description?: string;
    image?: StaticImageData;
    href?: string;
  }[];
};

const pluginTypes: Record<PluginType, EmblaPluginType> = {
  autoplay: Autoplay({
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  }),
};

const Carousel: React.FC<Props> = (props) => {
  const plugins: EmblaPluginType[] = [];

  for (const plugin in pluginTypes) {
    plugins.push(pluginTypes[plugin as keyof typeof pluginTypes]);
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(props.options, plugins);

  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="max-h-[50vh] max-w-[80vw] md:max-w-[50vw]">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="ml-[-1rem] flex touch-pan-y touch-pinch-zoom">
          {props.slides.map((slide, index) => (
            // <div className="min-w-0 flex-[0_0_100%] pl-[1rem]" key={index}>
            //   <div className="flex flex-col rounded-3xl p-8 text-center shadow-[inset_0_0_0_0.2rem_rgb(234,234,234)]">
            //     {slide.image !== undefined && (
            //       <Image
            //         src={slide.image}
            //         alt="Fotografia scattata da FRAME."
            //         className="mx-auto max-h-[30vh] rounded-3xl object-contain"
            //       />
            //     )}
            //     {slide.title !== undefined && (
            //       <div className="font-family-secondary text-center text-2xl">
            //         {slide.title}
            //       </div>
            //     )}
            //     {slide.description !== undefined && (
            //       <div className="font-family-regular text-sm md:text-base">
            //         {slide.description}
            //       </div>
            //     )}
            //   </div>
            // </div>

            <div className="min-w-0 flex-[0_0_100%] pl-[1rem]" key={index}>
              <a href={slide.href}>
                <div className="border-secondaryLight dark:border-secondaryDark flex flex-col rounded-3xl border-2 p-8 text-center">
                  {slide.image !== undefined && (
                    <Image
                      src={slide.image}
                      alt="Fotografia scattata da FRAME."
                      className="mx-auto max-h-[30vh] rounded-3xl object-contain"
                    />
                  )}
                  {slide.title !== undefined && (
                    <div className="font-family-secondary text-center text-2xl">
                      {slide.title}
                    </div>
                  )}
                  {slide.description !== undefined && (
                    <div className="font-family-regular text-sm md:text-base">
                      {slide.description}
                    </div>
                  )}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel controls */}
      <div className="mt-2 flex flex-row items-center justify-between">
        {/* Carousel buttons */}
        <div className="max-w-[20%] *:mx-1">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        {/* Carousel dots */}
        <div className="max-w-[80%] *:mx-1">
          {props.slides.map((_section, index) => {
            const backgroundColourClass =
              selectedIndex === index ? "carousel-dot-selected" : "";
            const carouselClasses = `h-3 w-3 rounded-[50%] border-2 dark:border-enabledDark border-enabledLight ${backgroundColourClass}`;

            return (
              <CarouselDotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={carouselClasses}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
