"use client";

import Link from "next/link";
import React, { useState } from "react";
import VerticalSeparatorLine from "./VerticalSeparatorLine";

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
          <React.Fragment key={`section-desktop-${index}`}>
            <Link
              href={section.href}
              className="font-family-secondary text-shadow-gold-sm link-hover-scale text-center text-white lg:text-xl"
            >
              {section.name}
            </Link>
            {/* Vertical Separator Line */}
            {index < props.sections.length - 1 && (
              <VerticalSeparatorLine color="dustyBlue" />
            )}
          </React.Fragment>
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
