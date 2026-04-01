"use client";

import Logo from "./Logo";
import { useGSAP } from "@gsap/react";
import { opacityFadeIn } from "@/utils/gsap";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { Activity, type FC } from "react";
import Footer from "./Footer";
import { useNav } from "@/contexts/NavContext";
import { LinkProps } from "next/link";

type Props = {
  fixed?: boolean;
  hasBorder?: boolean;
  hasLeftPadding?: boolean;
};

const sections: {
  name: string;
  href: LinkProps<unknown>["href"];
}[] = [
  {
    name: "Film Lab",
    href: "/hirpinia-film-lab",
  },
  {
    name: "Work",
    href: "/works",
  },
  {
    name: "Studio",
    href: "/studio",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contacts",
  },
];

const Navbar: FC<Props> = ({ fixed, hasBorder, hasLeftPadding }) => {
  const burgerMenuClasses = "cursor-pointer ml-auto mr-4 md:hidden";
  const currentPathname = usePathname();
  const { isNavOpen, setIsNavOpen } = useNav();

  const toggleNavOpen = () => setIsNavOpen((prevState) => !prevState);
  useGSAP(() => {
    if (!isNavOpen) return;

    opacityFadeIn("#nav-menu");
  }, [isNavOpen]);

  return (
    <>
      <header
        id="navbar"
        className={`
          ${fixed ? "fixed" : ""}
          items-center
          grid grid-cols-[auto_1fr]
          md:grid-cols-3
          w-full
          ${hasLeftPadding ? "md:pl-12" : "md:pl-4"}
          z-10 backdrop-blur-md
          ${hasBorder ? "border-b-2 border-b-border" : ""}
        `}
      >
        <Logo />

        {/* Nav sections - Desktop */}
        <nav
          className={`
            hidden md:flex
            flex-row items-center justify-center
            gap-4 md:gap-12
            font-family-nav-link
            text-text-secondary
          `}
        >
          {sections.map((section, index) => (
            <a
              key={`nav-${index}`}
              href={typeof section.href === "string" ? section.href : "/"}
              className={`
                hover:text-white
                duration-(--transition-duration)
              `}
            >
              {section.name}
            </a>
          ))}
        </nav>

        {/* FPS counter */}
        <div
          className={`
            md:flex hidden
            flex-row items-center
            ml-auto mr-12
            gap-4
            font-family-mono
          `}
        >
          {/* Circle */}
          <div className="bg-red-600/80 w-3.5 h-3.5 rounded-full motion-safe:animate-pulse" />
          <div className="text-text-secondary justify-center font-family-mono">
            FPS 25.00
          </div>
        </div>

        {/* Burger menu - Mobile */}
        <button
          type="button"
          onClick={toggleNavOpen}
          aria-label={
            isNavOpen
              ? "Chiudi menù di navigazione"
              : "Apri menù di navigazione"
          }
          aria-expanded={Boolean(isNavOpen)}
          aria-controls="nav-menu"
          className={burgerMenuClasses}
        >
          {isNavOpen ? (
            <FiX color="white" size={"1.5rem"} />
          ) : (
            <FiMenu color="white" size={"1.5rem"} />
          )}
        </button>
      </header>
      <Activity mode={isNavOpen ? "visible" : "hidden"}>
        <div
          id="nav-menu"
          className={`
              h-full
              flex flex-col
              items-start justify-center
              text-white
              fixed inset-0
            `}
        >
          {sections.map((section, index) => (
            <div
              key={`nav-${index}`}
              className={`
                  flex flex-row items-end
                  space-x-4 ml-8
                `}
            >
              <div className="font-family-mono mb-1">0{index + 1}</div>
              <a
                href={typeof section.href === "string" ? section.href : "/"}
                className={`
                    font-family-header
                    text-6xl
                    cursor-pointer
                    ${section.href === currentPathname ? "underline" : "hover:underline"}
                  `}
              >
                {section.name}
              </a>
            </div>
          ))}
          <div className="fixed bottom-0">
            <Footer isNavbar />
          </div>
        </div>
      </Activity>
    </>
  );
};

export default Navbar;
