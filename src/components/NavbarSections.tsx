"use client";

import config from "@/config";
import { useState } from "react";

// TODO: Add href for these routes and also change <a> tags to <Link> tags
const sections: { name: string; href?: string }[] = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "LAVORI",
    href: "/works",
  },
  {
    name: "COMPLEANNI",
    href: "/birthdays",
  },
  {
    name: "CONTATTI",
  },
];

const NavbarSections = () => {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);

  return (
    <>
      {/* Navbar sections - desktop */}
      <div className="hidden flex-row items-center justify-center md:flex">
        {sections.map((section, index) => (
          <a
            className="font-family-secondary mr-5 py-[1rem] text-[2.5vmin] after:block after:scale-x-0 after:border-b-2 after:border-textLight after:duration-200 hover:after:scale-x-100 dark:after:border-textDark"
            href={section.href}
            key={`section-desktop-${index}`}
          >
            {section.name}
          </a>
        ))}
      </div>
      {/* Navbar sections - mobile */}
      <div
        className={`mr-5 flex h-[5vmin] cursor-pointer items-center justify-center ${dropdownOpened ? "burger-menu-open" : ""} md:hidden`}
        onClick={() => {
          setDropdownOpened(!dropdownOpened);
        }}
      >
        <div className="burger-menu" />
      </div>
      <div
        className={`${dropdownOpened ? "navbar-dropdown-sections-open absolute" : "hidden"} glassmorph right-0 top-[10dvh] flex flex-col items-center justify-center ease-out md:hidden`}
      >
        {sections.map((section, index) => (
          <a
            className="font-family-secondary w-full p-4 text-center text-textLight dark:text-textDark"
            href={section.href}
            key={`section-mobile-${index}`}
          >
            {section.name}
          </a>
        ))}
      </div>
    </>
  );
};

export default NavbarSections;
