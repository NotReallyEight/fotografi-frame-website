import React, { Activity } from "react";

type Props = {
  fullScreen?: boolean;
  isNavbar?: boolean;
  usesDate?: boolean;
};

const SOCIAL_LINKS: {
  label: string;
  href: string;
}[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/__.frame.__/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@fotografiframe",
  },
  {
    label: "Telegram",
    href: "https://t.me/FRAMEeventi",
  },
];

const Footer: React.FC<Props> = ({ fullScreen, isNavbar, usesDate = true }) => (
  <footer
    className={`
        flex flex-col snap-end
        text-white
        px-8 md:px-12 lg:px-[10dvw]
        space-y-8 xl:space-y-12
        mt-8 xl:mt-12
        ${fullScreen ? "h-full justify-between" : ""}
      `}
  >
    <Activity mode={isNavbar ? "hidden" : "visible"}>
      <div
        className={`
          grid grid-cols-1
          md:grid-cols-2
          gap-8 md:gap-12
          items-center justify-center
          ${fullScreen ? "h-full" : ""}
        `}
      >
        <div className="flex flex-col gap-4">
          <div
            className={`
              font-family-header group
              ${fullScreen ? "text-8xl xl:text-9xl xl:text-10xl" : ""}
            `}
          >
            Let&apos;s
            <br />
            <span className="group-hover:text-accent duration-(--transition-duration)">
              Create.
            </span>
          </div>
          <div className="xl:w-[50%] font-family-regular-md text-text-secondary pl-4 border-l-2 border-l-accent">
            Hai un progetto in mente? Contattaci.
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 md:gap-4">
          <a
            href="mailto:antonio@framegroup.it"
            className={`
              font-family-regular-lg font-light
              text-2xl md:text-3xl xl:text-4xl
              hover:text-accent
              duration-(--transition-duration)
              after:border-b-2 after:border-b-white after:block after:scale-x-0
              hover:after:scale-x-100 hover:after:border-b-accent
              after:origin-left after:duration-(--grid-fade-in-duration)
            `}
          >
            info@framegroup.it
          </a>
          <div className="flex flex-col gap-1 items-start md:items-end text-text-muted font-family-regular-md">
            <a href="tel:+393505664114">+39 350 566 4114</a>
            <div className="md:text-right">
              Via Alfredo Bartolomei, snc, Sant&apos;Angelo dei Lombardi, IT
            </div>
          </div>
        </div>
      </div>
    </Activity>

    <div className="h-px w-full bg-border" />

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-0">
      <div className="flex flex-row gap-8 justify-between xl:justify-start w-full">
        {SOCIAL_LINKS.map((link, index) => (
          <a
            href={link.href}
            key={`social-link-${index}`}
            className={`
              font-family-regular-lg
              w-full xl:w-auto
              text-center xl:text-left
              text-text-muted hover:text-white
              duration-(--transition-duration)
              text-xs tracking-widest font-bold uppercase
            `}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div
        className={`
          flex flex-row
          gap-8
          *:w-full xl:*:w-auto xl:ml-auto w-full
          font-family-regular-lg
          text-text-muted text-xs
          text-center tracking-widest font-bold uppercase
          mb-8 xl:mb-12
          justify-between xl:justify-end
        `}
      >
        <div>© Frame Group {usesDate ? new Date().getFullYear() : ""}</div>
        <div>P.IVA: 03164150645</div>
        <a
          href="/privacy-policy"
          className="hover:text-white text-center duration-(--transition-duration)"
        >
          Privacy Policy
        </a>
      </div>
    </div>
    <div className="font-family-regular-lg text-center text-xs text-text-secondary mb-8">
      Made with ♥ by{" "}
      <a href="https://instagram.com/antonio.wang_" className="font-bold">
        Antonio Wang
      </a>
      .
    </div>
  </footer>
);

export default Footer;
