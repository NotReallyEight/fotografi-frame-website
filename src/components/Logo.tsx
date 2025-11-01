import Image from "next/image";
import images from "@/utils/images";
import Link from "next/link";

type Props = {
  dark?: boolean;
};

const Logo = ({ dark = false }: Props) => (
  <Link href="/" title="Fotografi Frame">
    <Image
      src={dark ? images.logo.black : images.logo.white}
      alt="Frame Logo"
      width={125}
      height={125}
      className="max-h-20 max-w-20 xl:max-h-24 xl:max-w-24"
    />
  </Link>
);

export default Logo;
