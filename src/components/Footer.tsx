import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Footer = () => (
  <div className="flex min-h-[55dvh] snap-start flex-col" id="footer">
    <div className="bg-secondaryLight dark:bg-secondaryDark flex flex-2 flex-col items-center justify-evenly *:flex *:w-full *:flex-col *:items-center *:justify-center *:p-4 md:flex-row">
      <div className="border-r-primaryLight dark:border-r-primaryDark md:border-r-2">
        <div className="font-family-secondary text-center text-lg md:text-2xl">
          TELEFONO
        </div>
        <div className="font-family-regular text-sm md:text-base">
          (+39) 350 566 4114
        </div>
      </div>

      <div>
        <div className="font-family-secondary text-center text-lg md:text-2xl">
          EMAIL
        </div>
        <div className="font-family-regular text-sm md:text-base">
          fotografiframe@gmail.com
        </div>
      </div>

      <div className="border-l-primaryLight dark:border-l-primaryDark md:border-l-2">
        <div className="font-family-secondary text-center text-lg md:text-2xl">
          TELEFONO
        </div>
        <div className="font-family-regular text-sm md:text-base">
          (+39) 380 210 4819
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col items-center justify-evenly">
      {/* Social network icons */}
      <div className="flex w-full flex-row items-center justify-center">
        <Link
          title="Canale YouTube"
          href="https://www.youtube.com/@fotografiframe"
          className="mx-2 duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaYoutube size="1.5rem" />
        </Link>
        <Link
          title="Chat WhatsApp"
          href="https://wa.me/+393505664114"
          className="mx-2 duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaWhatsapp size="1.5rem" />
        </Link>
        <Link
          title="Account Instagram"
          href="https://www.instagram.com/__.frame.__"
          className="mx-2 duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaInstagram size="1.5rem" />
        </Link>
        <Link
          title="Canale Telegram"
          href="https://t.me/FRAMEeventi"
          className="mx-2 duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaTelegram size="1.5rem" />
        </Link>
      </div>

      {/* P.IVA */}
      <div className="font-family-regular text-xs md:text-base">
        P. IVA: 03164150645
      </div>
    </div>
  </div>
);

export default Footer;
