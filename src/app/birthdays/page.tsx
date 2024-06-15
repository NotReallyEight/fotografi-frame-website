import Navbar from "@/components/Navbar";
import images from "@/utils/images";
import type { StaticImageData } from "next/image";
import type { Metadata } from "next";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import Section from "@/components/Birthdays/Section";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import Link from "next/link";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// Next.js automatically updates metadata using this export.
// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Compleanni - Frame",
  description:
    "Con la nostra esperienza e la nostra attrezzatura all'avanguardia, siamo in grado di creare ricordi indelebili che dureranno per sempre.",
  keywords: ["fotografia", "fotografi frame", "fotografi", "frame"],
};

const birthdaysHeaderSlides: {
  image: StaticImageData;
  imageObjectFit: "contain" | "cover";
}[] = images.birthdays.header.map((image) => ({
  image,
  imageObjectFit: "cover",
}));

const birthdaysCarousels: {
  image: StaticImageData;
  imageObjectFit: "contain" | "cover";
}[][] = images.birthdays.carousels.map((carousel) =>
  carousel.map((image) => ({
    image,
    imageObjectFit: "cover",
  }))
);

const birthdaysSection: Record<
  "blackAndWhite" | "introduction" | "eighteenMoments" | "servicesWeOffer",
  {
    title: string;
    description: string | (string | JSX.Element)[];
  }
> = {
  blackAndWhite: {
    title: "BLACK AND WHITE",
    description: [
      "Il bianco e nero è una scelta artistica senza tempo che aggiunge un'aura di drammaticità, eleganza e profondità a ogni immagine. Con il suo gioco di luci e ombre, contrasti intensi e una semplicità essenziale, il bianco e nero ha il potere di catturare l'essenza di un momento in modo unico e suggestivo. Le immagini in bianco e nero possono trasmettere emozioni più intense e profonde, focalizzando l'attenzione su dettagli e espressioni che altrimenti potrebbero passare inosservati. Rimuovendo il colore, siamo in grado di concentrarci sull'essenza della scena, catturando la vera anima dell'evento. Il bianco e nero ha inoltre la capacità di conferire un senso di atemporalità alle immagini, permettendo loro di resistere al passare del tempo e di mantenere la loro rilevanza e bellezza nel corso degli anni. Le fotografie in bianco e nero possono diventare veri e propri pezzi d'arte, capaci di trasmettere emozioni e storie senza tempo.",
      <br key="line-break" />,
      "Nella nostra pratica fotografica, riconosciamo la potenza del bianco e nero e lo utilizziamo strategicamente per aggiungere profondità e significato alle nostre immagini. Grazie alla sua capacità di enfatizzare l'emozione e la composizione, il bianco e nero è uno strumento indispensabile nella nostra cassetta degli attrezzi creativi, permettendoci di creare immagini che lasciano un'impressione duratura e indimenticabile.",
    ],
  },
  introduction: {
    title: "AFFIDATI A NOI",
    description: [
      "Nel settore degli eventi per diciottesimi, abbiamo accumulato una vasta esperienza, distinguendoci per la nostra dedizione e passione nel creare esperienze indimenticabili. Collaboriamo strettamente con i nostri clienti per tradurre le loro visioni in realtà, offrendo servizi personalizzati. Grazie alla nostra reputazione consolidata di affidabilità e professionalità, siamo diventati un punto di riferimento per coloro che desiderano organizzare feste memorabili e di successo per i neo-diciottenni.",
      <br key="line-break" />,
      "Ci concentriamo sulla creazione di un'atmosfera indimenticabile attraverso la selezione accurata della musica e l'organizzazione di un team di professionisti del settore. Collaboriamo con oltre 10 DJ, vocalist, band e service per garantire una varietà di opzioni e stili musicali, personalizzando ogni evento in base ai gusti e alle preferenze del festeggiato e dei suoi ospiti. La nostra attenzione si estende anche alla scelta della location, alla cura degli effetti luminosi e sonori, utilizzando luci e effetti speciali per amplificare l'esperienza e creare un'ambientazione unica e coinvolgente. Grazie alla nostra vasta rete di collaboratori e alla nostra esperienza nel settore, ci impegniamo a garantire che ogni diciottesimo sia un evento unico e memorabile.",
    ],
  },
  eighteenMoments: {
    title: "I MOMENTI DEL DICIOTTESIMO",
    description:
      "Il nostro servizio per gli eventi per diciottesimi è progettato per catturare ogni momento speciale in modo completo e dettagliato. Iniziamo con un'anteprima, durante la quale fotografiamo il soggetto in un ambiente tranquillo prima dell'inizio della festa, creando immagini che raccontano l'attesa e l'eccitazione per l'evento. Il reportage comprende foto spontanee scattate all'inizio della festa, documentando l'atmosfera e gli avvenimenti con un occhio attento per i dettagli e le emozioni del momento. Le foto di gruppo sono un momento speciale durante il servizio, durante il quale ci assicuriamo di catturare i momenti di condivisione e gioia vicino alla torta o in un set appositamente preparato da noi, creando immagini che saranno tesori da custodire per sempre. Infine, durante il party, continuiamo a catturare i momenti più vibranti e divertenti, immortalando sorrisi, balli e momenti di allegria, garantendo una testimonianza autentica e vivace di tutto l'evento. Grazie alla nostra attenzione per i dettagli e alla nostra passione per la fotografia, offriamo un servizio completo che permette al festeggiato e ai suoi ospiti di rivivere e condividere ogni momento speciale dell'evento.",
  },
  servicesWeOffer: {
    title: "I SERVIZI CHE OFFRIAMO",
    description:
      "I nostri servizi offrono un'ampia gamma di opzioni per catturare e immortalare ogni momento speciale dell'evento. La nostra fotografia è un'espressione di talento e passione, con un'attenzione particolare ai dettagli e alle emozioni. Dall'attesa dell'anteprima all'effervescenza della festa, i nostri fotografi catturano l'essenza di ogni momento. Il nostro servizio video trasforma l'evento in un'esperienza cinematografica coinvolgente e indimenticabile. Utilizziamo tecniche di ripresa all'avanguardia e un montaggio creativo per creare video che raccontano la storia dell'evento in modo dinamico e coinvolgente. Il Photobooth è un'aggiunta divertente e interattiva all'evento, offrendo ai partecipanti l'opportunità di scattare foto e riceverle stampate durante l'evento.",
  },
};

export default function Birthdays() {
  return (
    <main className="flex h-[100dvh] flex-col">
      <Navbar />
      <ScrollToTopButton />

      <div className="mx-auto mt-[10dvh]">
        <Carousel
          slides={birthdaysHeaderSlides}
          slidesPerView={2}
          options={{ loop: true }}
          plugins={["autoplay"]}
          maxWidth={{
            desktop: "80dvw",
            mobile: "80dvw",
          }}
        />
      </div>

      {/* Introduzione */}
      <div className="mx-auto mt-[10dvh] flex flex-col items-center justify-center md:max-w-[80dvw] md:flex-row">
        <Image
          src={images.birthdays.introduction}
          alt="Fotografia scattata da FRAME."
          className="flex-1 object-contain md:max-h-[65dvh]"
        />
        <div className="mt-[10dvh] flex h-[100%] flex-1 flex-col items-center justify-evenly p-8 md:mt-0">
          <div className="font-family-header mb-[5dvh] text-2xl md:text-5xl">
            {birthdaysSection.introduction.title}
          </div>
          <div className="font-family-regular text-xs md:text-base">
            {birthdaysSection.introduction.description}
          </div>
        </div>
      </div>

      {/* I momenti del diciottesimo */}
      <Section
        alt="Descrizione momenti del diciottesimo"
        description={birthdaysSection.eighteenMoments.description}
        image={images.birthdays.eighteeenthMoments}
        title={birthdaysSection.eighteenMoments.title}
      />

      {/* Carousel */}
      <div className="mx-auto mt-[10dvh]">
        <Carousel
          slides={birthdaysCarousels[0]}
          slidesPerView={3}
          options={{ loop: true }}
          plugins={["autoplay"]}
          maxWidth={{
            desktop: "80dvw",
            mobile: "80dvw",
          }}
        />
      </div>

      {/* I servizi che offriamo */}
      <Section
        alt="Descrizione servizi che offriamo"
        description={birthdaysSection.servicesWeOffer.description}
        image={images.birthdays.servicesWeOffer}
        title={birthdaysSection.servicesWeOffer.title}
      />

      {/* Video YouTube */}
      <div className="mx-auto mt-[10dvh] flex max-w-[80dvw] flex-col items-center justify-center md:flex-row">
        <YouTubeEmbed
          title="Trailer 18 Anni Dino"
          videoId="kM1efh5S8EI"
          className="mb-8 md:mb-0 md:mr-8"
        />
        <YouTubeEmbed
          title="Trailer Compleanno Simone"
          videoId="18-NfPkbI_4"
          className="mb-8 md:mb-0"
        />
        <YouTubeEmbed
          title="Trailer Compleanno Gerardo"
          videoId="QxXHLO3CedU"
          className="md:ml-8"
        />
      </div>

      {/* Black and white */}
      <Section
        description={birthdaysSection.blackAndWhite.description}
        title={birthdaysSection.blackAndWhite.title}
      />

      {/* Black and white - First carousel */}
      <div className="mx-auto mt-[10dvh]">
        <Carousel
          slides={birthdaysCarousels[1]}
          slidesPerView={3}
          options={{ loop: true }}
          plugins={["autoplay"]}
          maxWidth={{
            desktop: "80dvw",
            mobile: "80dvw",
          }}
        />
      </div>

      {/* Black and white - Second carousel */}
      <div className="mx-auto mt-[10dvh]">
        <Carousel
          slides={birthdaysCarousels[2]}
          slidesPerView={3}
          options={{ loop: true }}
          plugins={["autoplay"]}
          maxWidth={{
            desktop: "80dvw",
            mobile: "80dvw",
          }}
        />
      </div>

      {/* Conclusion */}
      <div className="mx-auto mt-[10dvh] flex max-w-[80dvw] flex-col items-center justify-center">
        <div className="font-family-regular text-center text-xs md:text-base">
          Con anni di pratica nel settore e un portfolio ricco di lavori
          apprezzati, possiamo offrirvi non solo competenza tecnica, ma anche
          una visione artistica che darà vita ai vostri ricordi in modo
          straordinario. Siamo pronti ad ascoltarvi e a collaborare con voi per
          realizzare la vostra visione, mettendo la nostra esperienza al
          servizio delle vostre esigenze.
          <br />
          Contattaci oggi e lasciate che sia il nostro lavoro a parlare per noi.
        </div>

        <Link
          href="/contacts"
          className="mb-[10dvh] mt-[5dvh] rounded-3xl border-2 border-secondaryLight p-3 text-xs duration-200 hover:border-enabledLight md:text-base dark:border-secondaryDark hover:dark:border-enabledDark"
        >
          CONTATTACI
        </Link>
      </div>

      <Footer />
    </main>
  );
}
