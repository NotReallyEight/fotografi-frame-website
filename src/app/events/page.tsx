"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import { Activity, Suspense } from "react";
import { useNav } from "@/contexts/NavContext";
import Button from "@/components/Button";
import CategoriesImageGrid from "./_components/CategoriesImageGrid";
import SelectedWorksGrid from "./_components/SelectedWorksGrid";
import SecondaryLink from "@/components/SecondaryLink";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import images from "@/utils/images";
import WorkProcessGrid from "./_components/WorkProcessGrid";

const PHILOSOPHY_IMAGES: StaticImageData[] = [
  images.birthdays.header[0],
  images.birthdays.header[1],
];

export default function Contacts() {
  const { isNavOpen } = useNav();

  return (
    <>
      <Metadata
        title="Eventi - Frame"
        description="Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre."
        keywords="fotografia, fotografi frame, fotografi, frame"
      />

      <main className="flex flex-col h-dvh gap-8">
        <Navbar fixed hasLeftPadding />

        <Activity mode={isNavOpen ? "hidden" : "visible"}>
          {/* Hero Section */}
          <section className="text-white min-h-dvh flex flex-col justify-center">
            <div
              className="flex flex-col
                  px-8 md:px-12 lg:px-[10dvw]
                  gap-8"
            >
              <h1 className="font-family-header *:block">
                <span>Event</span>
                <span>Photo &</span>
                <span>Video</span>
              </h1>
              <h2 className="font-family-regular-lg text-text-secondary">
                Capturing moments with cinematic precision. We document the
                energy, the people, and the atmosphere that define your
                brand&apos;s legacy.
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <Button onClick={() => {}} text="Book Us Now" primary />
                <Button
                  onClick={() => {}}
                  text="Request a Quote"
                  primary={false}
                />
              </div>
            </div>
          </section>

          {/* Categories Image Grid */}
          <section className="px-8 md:px-12 lg:px-[10dvw] text-white space-y-4">
            <div
              className="text-accent
                        font-family-mono uppercase
                        text-xs"
            >
              Categories
            </div>
            <div className="font-family-secondary">Our Expertise</div>
            <CategoriesImageGrid />
          </section>

          {/* Selected Works Grid */}
          <section className="px-8 md:px-12 lg:px-[10dvw] text-white space-y-4">
            <div className="font-family-secondary">Selected Event Work</div>
            <SelectedWorksGrid />
          </section>

          {/* Philosophy Section */}
          <section className="px-8 md:px-12 lg:px-[10dvw] flex flex-col gap-4 text-white bg-secondary py-8">
            <div
              className="text-accent
                        font-family-mono uppercase
                        text-xs"
            >
              Philosophy
            </div>
            <div className="font-family-secondary">
              A Cinematic Narrative Approach
            </div>
            <div className="md:w-[75%] font-family-regular-lg text-text-secondary md:mt-auto">
              We don&apos;t just photograph events; we tell stories. Our team
              employs techniques borrowed from cinema—dynamic lighting,
              thoughtful framing, and focus on human emotion—to transform
              standard coverage into a visual narrative.
            </div>

            <div className="md:w-[75%] font-family-regular-lg text-text-secondary md:mt-auto">
              Every shot is considered. Every moment is captured with the intent
              of building a cohesive legacy for your event. Whether it&apos;s
              the subtle exchange of looks at a gala or the explosive energy of
              a product launch, we bring a feature-film aesthetic to every
              frame.
            </div>

            <SecondaryLink
              href="https://www.instagram.com/__.frame.__/"
              label="Explore Our Style"
            />

            <div className="flex flex-row gap-4 py-8">
              {PHILOSOPHY_IMAGES.map((image, index) => (
                <Image
                  alt={`Immagine filosofia del nostro lavoro - ${index + 1}`}
                  key={`philosophy-image-${index}`}
                  src={image}
                  className="w-[50%]"
                />
              ))}
            </div>
          </section>

          {/* The Process Section */}
          <section className="px-8 md:px-12 lg:px-[10dvw] flex flex-col gap-4 text-white py-8">
            <div className="font-family-secondary">The Process</div>
            <div className="md:w-[75%] font-family-regular-lg text-text-secondary md:mt-auto">
              From concept to delivery in 14 days.
            </div>

            <WorkProcessGrid />
          </section>

          {/* Call to Action Section */}
          <section className="px-8 md:px-12 lg:px-[10dvw] flex flex-col gap-4 text-white py-8 relative">
            <div className="font-family-secondary text-center">
              Planning An Event?
            </div>
            <h2 className="font-family-regular-lg text-text-secondary text-center w-[75%] mx-auto">
              Let&apos;s create something timeless. Our booking for next season
              is now open.
            </h2>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                onClick={() => {}}
                text="Contact Us"
                primary
                fullWidth
                className="md:w-fit"
              />
              <Button
                onClick={() => {}}
                text="Request a Quote"
                primary={false}
                fullWidth
                className="md:w-fit"
              />
            </div>
          </section>

          <Suspense fallback={<Footer usesDate={false} />}>
            <Footer />
          </Suspense>
        </Activity>
      </main>
    </>
  );
}
