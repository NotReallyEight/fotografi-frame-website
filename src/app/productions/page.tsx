"use client";

import Button from "@/components/Button";
import Metadata from "@/components/Metadata";
import Navbar from "@/components/Navbar";
import { useNav } from "@/contexts/NavContext";
import { Activity, Suspense } from "react";
import ShowcaseReelVideoPlayer from "./_components/ShowcaseReelVideoPlayer";
import Footer from "@/components/Footer";
import SelectedProductionsGrid from "./_components/SelectedProductionsGrid";
import ProductionCategoriesGrid from "./_components/ProductionCategoriesGrid";
import VisualLanguageSection from "./_components/VisualLanguageSection";
import WorkProcessGrid from "@/components/WorkProcessGrid";
import {
  FiMessageSquare,
  FiEdit,
  FiDownloadCloud,
  FiFilm,
} from "react-icons/fi";

const WORK_PROCESS_STEPS: {
  description: string;
  icon: React.ReactElement;
  title: string;
}[] = [
  {
    description:
      "Scripting, storyboarding, and strategic alignment to define the visual north star.",
    icon: <FiMessageSquare size={32} className="text-accent" />,
    title: "01. Concept & Planning",
  },
  {
    description:
      "Execution with industry-standard glass and lighting by our specialized field crew.",
    icon: <FiFilm size={32} className="text-accent" />,
    title: "02. Shooting",
  },
  {
    description:
      "Non-linear assembly, sound design, and color grading for a distinct aesthetic.",
    icon: <FiEdit size={32} className="text-accent" />,
    title: "03. Editing",
  },
  {
    description:
      "Platform-optimized assets delivered through our secure client cloud.",
    icon: <FiDownloadCloud size={32} className="text-accent" />,
    title: "04. Final Delivery",
  },
];

export default function Productions() {
  const { isNavOpen } = useNav();

  return (
    <>
      <Metadata
        title="Produzioni - Frame"
        description="Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre."
        keywords="fotografia, fotografi frame, fotografi, frame"
      />

      <main className="flex flex-col h-dvh gap-16">
        <Navbar fixed hasLeftPadding />

        <Activity mode={isNavOpen ? "hidden" : "visible"}>
          {/* Hero Section */}
          <section className="text-white min-h-dvh flex flex-col justify-center gap-8">
            <div
              className="flex flex-col
                  px-8 md:px-12 lg:px-[10dvw]
                  gap-8"
            >
              <h1 className="font-family-header *:block">
                <span>Video</span>
                <span>Prod.</span>
              </h1>
              <h2 className="font-family-regular-lg text-text-secondary">
                We translate human emotion into high-fidelity visual narratives.
                Our lens defines the intersection of architectural precision and
                cinematic movement.
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <Button onClick={() => {}} text="View Work" primary />
                <Button
                  onClick={() => {}}
                  text="Start A Project"
                  primary={false}
                />
              </div>
            </div>
          </section>

          {/* Showcase Reel Video Section */}
          <section className="px-8 md:px-12 lg:px-[10dvw] w-full mx-auto flex flex-col gap-4">
            <div className="gap-2">
              <div className="font-family-regular-md uppercase text-text-secondary">
                Music Video
              </div>
              <div className="font-family-secondary text-white">
                Soggetti Erotici - Ah ah ah
              </div>
            </div>

            <ShowcaseReelVideoPlayer />
          </section>

          {/* Selected Productions Grid */}
          <section className="px-8 md:px-12 lg:px-[10dvw] text-white space-y-4">
            <div className="font-family-secondary">Selected Productions</div>
            <SelectedProductionsGrid />
          </section>

          {/* Production Categories Grid */}
          <section className="px-8 md:px-12 lg:px-[10dvw] text-white space-y-4">
            <div
              className="text-accent
                        font-family-mono uppercase
                        text-xs"
            >
              Categories
            </div>
            <div className="font-family-secondary">Our Expertise</div>
            <ProductionCategoriesGrid />
          </section>

          {/* Visual language section */}
          <section className="px-8 md:px-12 lg:px-[10dvw] text-white space-y-4">
            <VisualLanguageSection />
          </section>

          {/* The Process Section */}
          <section className="px-8 md:px-12 lg:px-[10dvw] flex flex-col gap-4 text-white py-8">
            <div className="font-family-secondary">The Process</div>
            <div className="md:w-[75%] font-family-regular-lg text-text-secondary md:mt-auto">
              From concept to delivery in 14 days.
            </div>

            <WorkProcessGrid steps={WORK_PROCESS_STEPS} />
          </section>

          {/* Call to Action Section */}
          <section className="px-8 md:px-12 lg:px-[10dvw] flex flex-col gap-8 text-white py-8 relative">
            <div className="font-family-secondary text-center">
              Have a project in mind?
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                onClick={() => {}}
                text="Start a project"
                primary
                fullWidth
                className="md:w-fit"
              />
              <Button
                onClick={() => {}}
                text="Contact us"
                primary={false}
                fullWidth
                className="md:w-fit"
              />
            </div>
          </section>

          {/* Footer */}
          <Suspense fallback={<Footer usesDate={false} />}>
            <Footer />
          </Suspense>
        </Activity>
      </main>
    </>
  );
}
