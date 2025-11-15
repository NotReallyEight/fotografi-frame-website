"use client";

import { useState } from "react";
import Logo from "./Logo";
import NavbarSections from "./NavbarSections";
import Link from "next/link";
import gsap from "gsap";
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

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

  const handleBurgerMenuToggle = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  useGSAP(() => {
    slideUpFadeIn({ window, target: "#navbar" });
  });

  return (
    <div
      id="navbar"
      className="lg:center-fixed-div fixed left-4 right-4 top-4 z-10 items-center justify-center gap-4 space-y-4 lg:top-7 lg:m-0 lg:w-2/3"
    >
      <div className="flex h-fit flex-row items-center justify-between rounded-xl bg-lighterBlack px-7 py-4">
        <Logo />
        <NavbarSections
          sections={sections}
          toggleBurgerMenu={handleBurgerMenuToggle}
        />
      </div>
      <div
        className={`font-family-secondary *:bg-grey ${isBurgerMenuOpen ? "navbar-dropdown-sections-open flex" : "hidden"} flex-col items-center justify-center space-y-4 rounded-xl bg-lighterBlack p-4 text-center text-base text-white *:self-stretch *:rounded-xl *:p-4 lg:hidden`}
      >
        {sections.map((section, index) => (
          <Link
            href={section.href}
            key={`navbar-dropdown-section-${index}`}
            className="duration-200 hover:bg-lighterBlack"
          >
            {section.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
