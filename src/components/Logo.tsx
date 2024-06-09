import config from "@/config";
import BlackLogo from "../../public/assets/frame-logo-black.png";
import WhiteLogo from "../../public/assets/frame-logo-white.png";
import Image from "next/image";

const Logo = () => {
  return (
    <a href={config.url} title="Fotografi Frame">
      <picture>
        {/* Dynamically import the logo depending on the color scheme chosen by the user */}
        <source srcSet={WhiteLogo.src} media="(prefers-color-scheme: dark)" />
        <Image
          src={BlackLogo}
          alt="Frame Logo"
          width={200}
          height={200}
          className="h-[10vmax] w-[10vmax]"
        />
      </picture>
    </a>
  );
};

export default Logo;
