"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  sections: { name: string; href: string }[];
  toggleBurgerMenu: () => void;
};

const NavbarSections = (props: Props) => {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);

  return (
    <>
      {/* Navbar sections - desktop */}
      <div className="hidden flex-row items-center justify-center gap-7 md:flex">
        {props.sections.map((section, index) => (
          <>
            <Link
              href={section.href}
              key={`section-desktop-${index}`}
              className="font-family-secondary text-shadow-gold-sm text-center text-white lg:text-xl xl:text-3xl"
            >
              {section.name}
            </Link>
            {/* Vertical Separator Line */}
            {index < props.sections.length - 1 && (
              <span className="h-8 w-px self-stretch bg-dustyBlue" />
            )}
          </>
        ))}
      </div>
      {/* Navbar sections - mobile */}
      <div
        className={`mr-5 flex h-[5vmin] cursor-pointer items-center justify-center ${dropdownOpened ? "burger-menu-open" : ""} md:hidden`}
        onClick={() => {
          setDropdownOpened(!dropdownOpened);
          props.toggleBurgerMenu();
        }}
      >
        <div className="burger-menu" />
      </div>
    </>
  );
};

export default NavbarSections;
