import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Link from "next/link";

// Next.js automatically updates metadata using this export.
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Contatti - Frame",
  description:
    "Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre.",
  keywords: ["fotografia", "fotografi frame", "fotografi", "frame"],
};

export default function Birthdays() {
  return (
    <main className="flex h-[100dvh] flex-col">
      <Navbar />
      <ScrollToTopButton />

      <div className="mx-auto my-[10dvh] flex w-[80dvw] flex-col items-center justify-evenly md:flex-row">
        <div>
          <div className="font-family-header mb-[5dvh] text-2xl md:text-5xl">
            CONTATTACI
          </div>
          <div className="font-family-regular mb-[5dvh] text-xs md:text-base">
            Telefono: +39 3505664114
            <br />
            Email: fotografiframe@gmail.com
            <br />
            Sede Legale: Via Alfredo Bartolomei snc, Sant&apos;Angelo dei
            Lombardi (AV)
          </div>
          <div className="flex w-full flex-row">
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
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3014.491209309617!2d15.176276590462171!3d40.92690045060086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1339828c63cf93c9%3A0x8257a5019c2379b6!2sVia%20Alfredo%20Bartolomei%2C%2083054%20Sant&#39;Angelo%20dei%20Lombardi%20AV!5e0!3m2!1sen!2sit!4v1718395834543!5m2!1sen!2sit"
          // width="600"
          // height="450"
          className="mt-[5dvh] aspect-square h-[50dvh] max-w-[90dvw] md:mt-0"
          title="Via Alfredo Bartolomei, Sant'Angelo dei Lombardi - Google Maps"
        />
      </div>
      <Footer />
    </main>
  );
}
