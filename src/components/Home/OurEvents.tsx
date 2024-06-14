import Carousel from "../Carousel";
import type { StaticImageData } from "next/image";
import images from "@/utils/images";

const ourEventsCarouselSlides: {
  image: StaticImageData;
  imageObjectFit: "contain" | "cover";
}[] = images.event.map((image) => ({ image, imageObjectFit: "cover" }));

const OurEvents = () => (
  <div
    className="flex min-h-[100dvh] snap-center flex-col items-center justify-center md:justify-around"
    id="our-events"
  >
    <div
      className={`font-family-header mb-8 text-center text-2xl text-textLight md:text-5xl dark:text-textDark`}
    >
      Our Events
    </div>
    <div className="flex flex-col items-center justify-center *:my-8">
      <Carousel
        slides={ourEventsCarouselSlides}
        options={{ loop: true }}
        plugins={["autoplay"]}
        hideDots={{ mobile: true, desktop: false }}
        slidesPerView={2}
      />
      <a
        href="/works"
        className="rounded-3xl border-2 border-secondaryLight p-3 text-xs duration-200 hover:border-enabledLight md:text-base dark:border-secondaryDark hover:dark:border-enabledDark"
      >
        Our Portfolio
      </a>
    </div>
  </div>
);

export default OurEvents;
