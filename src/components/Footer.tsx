import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Footer = () => (
  <div className="flex min-h-[55dvh] snap-start flex-col" id="footer">
    <div className="flex flex-2 flex-col items-center justify-evenly bg-secondaryLight *:flex *:w-full *:flex-col *:items-center *:justify-center *:p-4 md:flex-row dark:bg-secondaryDark">
      <div className="border-r-primaryLight md:border-r-2 dark:border-r-primaryDark">
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

      <div className="border-l-primaryLight md:border-l-2 dark:border-l-primaryDark">
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
        <a
          title="Canale YouTube"
          href="https://www.youtube.com/@fotografiframe"
          className="mx-2 duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaYoutube size="1.5rem" />
        </a>
        <a
          title="Chat WhatsApp"
          href="https://wa.me/+393505664114"
          className="mx-2 duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaWhatsapp size="1.5rem" />
        </a>
        <a
          title="Account Instagram"
          href="https://www.instagram.com/__.frame.__"
          className="mx-2 duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaInstagram size="1.5rem" />
        </a>
        <a
          title="Canale Telegram"
          href="https://t.me/FRAMEeventi"
          className="mx-2 duration-200 hover:scale-125"
          target="_blank"
          rel="noopener"
        >
          <FaTelegram size="1.5rem" />
        </a>
      </div>

      {/* P.IVA */}
      <div className="font-family-regular text-xs md:text-base">
        P. IVA: 03164150645
      </div>
    </div>
  </div>
);

export default Footer;
