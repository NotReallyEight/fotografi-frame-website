import React from "react";

type Props = {
  href: string;
  label: string;
};

const SecondaryLink: React.FC<Props> = ({ href, label }) => (
  <a
    href={href}
    className={`
        mt-auto underline
        font-family-mono uppercase
        hover:text-accent
        transition-(--transition-duration)
        w-fit
      `}
  >
    {label}
  </a>
);

export default SecondaryLink;
