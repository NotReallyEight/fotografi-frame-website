"use client";

import { useState } from "react";
import Logo from "./Logo";
import NavbarSections from "./NavbarSections";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { slideUpFadeIn } from "@/utils/gsap";

const sections: { name: string; href: string }[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Produzioni",
    href: "/productions",
  },
  {
    name: "Contatti",
    href: "/contacts",
  },
];

const Navbar = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

  const handleBurgerMenuToggle = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  useGSAP(() => {
    slideUpFadeIn("#navbar");
  }, []);

  return (
    <div
      id="navbar"
      className="fixed top-4 right-4 left-4 z-10 mx-0 items-center justify-center gap-4 space-y-4 lg:top-7 lg:right-0 lg:left-0 lg:m-0 lg:mx-auto lg:w-2/3"
    >
      <div className="bg-lighter-black flex h-fit flex-row items-center justify-between rounded-xl px-7 py-4">
        <Logo />
        <NavbarSections
          sections={sections}
          toggleBurgerMenu={handleBurgerMenuToggle}
        />
      </div>
      <div
        className={`font-family-secondary *:bg-grey ${isBurgerMenuOpen ? "navbar-dropdown-sections-open flex" : "hidden"} bg-lighter-black flex-col items-center justify-center space-y-4 rounded-xl p-4 text-center text-base text-white *:self-stretch *:rounded-xl *:p-4 lg:hidden`}
      >
        {sections.map((section, index) => (
          <Link
            href={section.href}
            key={`navbar-dropdown-section-${index}`}
            className="hover:bg-lighter-black duration-200"
          >
            {section.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
