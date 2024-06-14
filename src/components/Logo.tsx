import Image from "next/image";
import images from "@/utils/images";
import Link from "next/link";

const Logo = () => (
  <Link href="/" title="Fotografi Frame">
    <picture>
      {/* Dynamically import the logo depending on the color scheme chosen by the user */}
      <source
        srcSet={images.logo.white.src}
        media="(prefers-color-scheme: dark)"
      />
      <Image
        src={images.logo.black}
        alt="Frame Logo"
        width={200}
        height={200}
        className="h-[10vmax] w-[10vmax]"
      />
    </picture>
  </Link>
);

export default Logo;
