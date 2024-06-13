"use client";

import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { NextButton, PrevButton } from "./CarouselArrowButtons";
import { useDotButton, usePrevNextButtons } from "@/utils/carousel";
import CarouselDotButton from "./CarouselDotButton";
import type { EmblaPluginType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

type PluginType = "autoplay";

type Props = {
  options?: EmblaOptionsType;
  plugins?: PluginType[];
  slides: {
    title?: string;
    description?: string;
    image?: StaticImageData;
    imageObjectFit?: "cover" | "contain";
    href?: string;
  }[];
  hideDots?: { desktop?: boolean; mobile?: boolean };
  slidesPerView?: 1 | 2 | 3;
};

const pluginTypes: Record<PluginType, EmblaPluginType> = {
  autoplay: Autoplay({
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  }) as EmblaPluginType,
};

const Carousel: React.FC<Props> = (props) => {
  const plugins: EmblaPluginType[] = [];

  for (const plugin in pluginTypes)
    if (Object.hasOwn(pluginTypes, plugin))
      plugins.push(pluginTypes[plugin as keyof typeof pluginTypes]);

  const [emblaRef, emblaApi] = useEmblaCarousel(props.options, plugins);

  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="max-h-[50dvh] max-w-[80dvw] md:max-w-[50dvw]">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="ml-[-1rem] flex touch-pan-y touch-pinch-zoom">
          {props.slides.map((slide, index) => {
            const imageObjectFit = slide.imageObjectFit ?? "contain";

            return (
              <div
                className={`flex-0_0_100 ${props.slidesPerView === 2 ? "md:flex-0_0_50" : ""} ${props.slidesPerView === 3 ? "lg:flex-0_0_33" : ""} min-w-0 pl-[1rem]`}
                key={index}
              >
                <a href={slide.href}>
                  <div
                    className={`flex flex-col rounded-3xl border-secondaryLight ${imageObjectFit === "contain" ? "border-2 p-8" : ""} text-center dark:border-secondaryDark`}
                  >
                    {slide.image !== undefined && (
                      <Image
                        src={slide.image}
                        alt="Fotografia scattata da FRAME."
                        className={`mx-auto max-h-[30dvh] rounded-3xl object-${imageObjectFit}`}
                      />
                    )}
                    {slide.title !== undefined && (
                      <div className="font-family-secondary text-center text-lg md:text-2xl">
                        {slide.title}
                      </div>
                    )}
                    {slide.description !== undefined && (
                      <div className="font-family-regular text-xs md:text-base">
                        {slide.description}
                      </div>
                    )}
                  </div>
                </a>
              </div>
            );
          })}
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
        <div
          className={`max-w-[80%] *:mx-1 ${props.hideDots?.desktop ?? false ? "md:hidden" : "md:block"} ${props.hideDots?.mobile ?? false ? "hidden" : "block"}`}
        >
          {props.slides.map((_section, index) => {
            const backgroundColourClass =
              selectedIndex === index ? "carousel-dot-selected" : "";
            const carouselClasses = `h-3 w-3 rounded-[50%] border-2 dark:border-enabledDark border-enabledLight ${backgroundColourClass}`;

            return (
              <CarouselDotButton
                key={index}
                onClick={() => {
                  onDotButtonClick(index);
                }}
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
