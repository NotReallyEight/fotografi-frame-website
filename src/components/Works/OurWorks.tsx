const ourWorksSection = {
  title: "I Nostri Lavori",
  description:
    "Nel corso dei nostri lavori, abbiamo avuto il privilegio di collaborare con diverse aziende e settori, offrendo un'ampia gamma di servizi di produzione e promozione. Abbiamo lavorato con aziende di moda, contribuendo alla creazione di contenuti pubblicitari che raccontano dalla produzione alla vendita dei loro prodotti. Abbiamo collaborato con ristoranti all'avanguardia per realizzare contenuti accattivanti che mettono in risalto la loro cucina, la loro unicità e l'esperienza gastronomica offerta. Ci siamo inoltre distinti nella promozione del territorio, creando contenuti video e spot pubblicitari che valorizzano le bellezze e le peculiarità del territorio irpino. Abbiamo documentato manifestazioni locali e tradizioni, trasformandole in contenuti coinvolgenti e promozionali. Nelle nostre produzioni abbiamo inoltre avuto l'opportunità di realizzare contenuti televisivi, approdando anche sui canali RAI e contribuendo alla diffusione delle nostre creazioni su diverse piattaforme di comunicazione.",
};

const OurWorks = () => (
  <div className="glassmorph md:glassmorph-padding mx-auto mt-[10dvh] flex min-h-[50dvh] max-w-[90dvw] flex-col items-center justify-evenly p-4 md:mt-[20dvh] md:max-w-[75dvw]">
    <div className="font-family-header text-2xl md:text-5xl">
      {ourWorksSection.title}
    </div>

    <div className="font-family-regular text-xs md:text-base">
      {ourWorksSection.description}
    </div>
  </div>
);

export default OurWorks;
