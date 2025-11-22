import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Logo from "./Logo";
import HorizontalSeparatorLine from "./HorizontalSeparatorLine";

const Footer = () => (
  <div className="bg-lighter-black flex flex-col space-y-8 px-8 pt-8 pb-24">
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col space-y-8 text-white">
        <div className="font-family-secondary text-2xl lg:text-3xl">
          CONTATTACI
        </div>
        <div className="font-family-regular space-y-4 text-base font-light lg:text-xl">
          <div>fotografiframe@gmail.com</div>
          <div>+39 350 566 4114</div>
          <div>+39 380 210 4819</div>
        </div>
      </div>

      <Logo />
    </div>

    {/* Horizontal Separator */}
    <HorizontalSeparatorLine color="white" hideOnDesktop={false} />

    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
      <div className="font-family-regular text-xl font-light text-white">
        P.IVA 03164150645
      </div>

      {/* Social media */}
      <div className="flex flex-row items-center justify-center">
        <Link
          title="Canale Telegram"
          href="https://t.me/FRAMEeventi"
          className="mx-2 text-white duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaTelegram size="1.5rem" />
        </Link>
        <Link
          title="Account Instagram"
          href="https://www.instagram.com/__.frame.__"
          className="mx-2 text-white duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaInstagram size="1.5rem" />
        </Link>
        <Link
          title="Chat WhatsApp"
          href="https://wa.me/+393505664114"
          className="mx-2 text-white duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaWhatsapp size="1.5rem" />
        </Link>
        <Link
          title="Canale YouTube"
          href="https://www.youtube.com/@fotografiframe"
          className="mx-2 text-white duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaYoutube size="1.5rem" />
        </Link>
      </div>
    </div>
  </div>
);

export default Footer;
