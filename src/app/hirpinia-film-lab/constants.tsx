import images from "@/utils/images";
import type React from "react";

export const TRAINING_AREAS: [
  keyof typeof images.hirpiniaFilmLab.trainingAreas,
  {
    fullTitle: string;
    title: string;
    primaryDescription: React.ReactElement | string;
    secondaryDescription: React.ReactElement | string;
  },
][] = [
  [
    "artDepartment",
    {
      fullTitle: "Art Department",
      title: "Art Dept.",
      primaryDescription: "Art Department cinematografico e scenografia film",
      secondaryDescription: (
        <>
          L&apos;Art Department è l&apos;area delle produzioni cinematografiche
          responsabile della costruzione dell&apos;identità visiva di un film.
          Si occupa di scenografia, art direction e production design, definendo
          l&apos;aspetto estetico degli ambienti, dei set e degli oggetti di
          scena che danno forma al mondo narrativo.
          <br />
          <br />
          In questo reparto i ragazzi sviluppano competenze legate alla
          progettazione e alla realizzazione dei set, lavorando sulla
          costruzione di spazi e atmosfere coerenti con la storia. L&apos;Art
          Department collabora con tutti gli altri reparti della produzione per
          trasformare la visione registica in un linguaggio visivo concreto e
          riconoscibile.
        </>
      ),
    },
  ],
  [
    "actors",
    {
      fullTitle: "Attori",
      title: "Attori",
      primaryDescription: "Dipartimento Attori e recitazione cinematografica",
      secondaryDescription: (
        <>
          Il Dipartimento Attori è l&apos;area delle produzioni cinematografiche
          dedicata alla recitazione e alla costruzione della performance. Si
          occupa dello studio del personaggio, della direzione attoriale e
          dell&apos;interpretazione, elementi fondamentali per dare autenticità
          e profondità alla narrazione filmica.
          <br />
          <br />
          In questo reparto i ragazzi lavorano sulla presenza scenica,
          sull&apos;espressività e sulla relazione con la macchina da presa,
          sviluppando un approccio realistico e consapevole alla recitazione. Il
          dipartimento collabora strettamente con la regia e gli altri reparti
          per tradurre la visione del film in performance credibili e coerenti.
        </>
      ),
    },
  ],
  [
    "communicationAndMarketing",
    {
      fullTitle: "Comunicazione e Marketing",
      title: "Comm & Mark",
      primaryDescription: "Comunicazione, Marketing & Social Media",
      secondaryDescription: (
        <>
          Il dipartimento di Comunicazione, Marketing & Social Media si occupa
          della gestione dell&apos;identità e della presenza digitale delle
          produzioni cinematografiche. Lavora sulla costruzione del brand, sulla
          strategia di comunicazione e sulla creazione di contenuti pensati per
          i canali social e digitali.
          <br />
          <br />
          In questo reparto i ragazzi sviluppano competenze legate al social
          media marketing, al branding e alla content strategy, imparando a
          raccontare un progetto attraverso linguaggi visivi e narrativi
          adattati alle piattaforme digitali. Il dipartimento collabora con le
          altre aree per garantire una comunicazione coerente, efficace e
          riconoscibile.
        </>
      ),
    },
  ],
  [
    "photography",
    {
      fullTitle: "Fotografia",
      title: "Fotog.",
      primaryDescription: "Reparto fotografia e direzione della fotografia",
      secondaryDescription: (
        <>
          Il reparto Fotografia è l&apos;area delle produzioni cinematografiche
          responsabile della costruzione dell&apos;immagine e dell&apos;estetica
          visiva del film. Si occupa di direzione della fotografia, composizione
          dell&apos;inquadratura, esposizione e illuminazione, definendo il
          linguaggio visivo attraverso la gestione della luce e della camera.
          <br />
          <br />
          In questo reparto i ragazzi sviluppano competenze tecniche e creative
          legate alla cinematography, lavorando su set reali e collaborando con
          la regia per tradurre la narrazione in immagini. Il dipartimento cura
          la coerenza visiva del film, dalla scelta delle inquadrature alla
          costruzione dell&apos;atmosfera attraverso la luce.
        </>
      ),
    },
  ],
  [
    "music",
    {
      fullTitle: "Musica",
      title: "Musica",
      primaryDescription: "Reparto Musica e colonna sonora",
      secondaryDescription: (
        <>
          Il reparto Musica è l&apos;area delle produzioni cinematografiche
          dedicata alla creazione della colonna sonora e dell&apos;identità
          sonora di un film. Si occupa di composizione musicale, arrangiamento e
          sviluppo di temi sonori che accompagnano e amplificano la narrazione
          visiva.
          <br />
          <br />
          In questo reparto i ragazzi lavorano sulla musica applicata alle
          immagini, sperimentando il rapporto tra suono ed emozione
          all&apos;interno del linguaggio cinematografico. Il dipartimento
          collabora con le altre aree per costruire un&apos;esperienza
          audiovisiva coerente, in cui la musica diventa parte integrante della
          narrazione.
        </>
      ),
    },
  ],
  [
    "postProduction",
    {
      fullTitle: "Post Produzione",
      title: "Post Prod.",
      primaryDescription: "Reparto Post Produzione e finalizzazione del film",
      secondaryDescription: (
        <>
          Il reparto Post Produzione è l&apos;area delle produzioni
          cinematografiche in cui il materiale girato viene assemblato, rifinito
          e trasformato nel prodotto finale. Si occupa di montaggio, color
          grading, sound design e finalizzazione dell&apos;immagine, definendo
          il ritmo e l&apos;identità definitiva del film.
          <br />
          <br />
          In questo reparto i ragazzi lavorano sulle fasi successive alla
          ripresa, sviluppando competenze tecniche e creative legate al
          montaggio e alla costruzione narrativa. La post produzione rappresenta
          il momento in cui il linguaggio audiovisivo prende forma definitiva,
          attraverso la collaborazione tra editing, suono e correzione del
          colore.
        </>
      ),
    },
  ],
  [
    "production",
    {
      fullTitle: "Produzione",
      title: "Prod.",
      primaryDescription: "Reparto Produzione cinematografica",
      secondaryDescription: (
        <>
          Il reparto Produzione è l&apos;area delle produzioni cinematografiche
          responsabile dell&apos;organizzazione generale del film, dalla
          pianificazione delle riprese alla gestione delle risorse sul set. Si
          occupa di coordinamento, logistica e supporto operativo, garantendo
          che ogni fase della produzione si svolga in modo efficiente e
          strutturato.
          <br />
          <br />
          In questo reparto i ragazzi sviluppano competenze legate alla gestione
          della produzione audiovisiva, lavorando a stretto contatto con tutti
          gli altri reparti. La produzione rappresenta il punto di connessione
          tra organizzazione e creatività, assicurando che la visione del
          progetto venga realizzata concretamente sul set.
        </>
      ),
    },
  ],
  [
    "direction",
    {
      fullTitle: "Regia",
      title: "Regia",
      primaryDescription: "Reparto Regia e direzione cinematografica",
      secondaryDescription: (
        <>
          Il reparto Regia è l&apos;area delle produzioni cinematografiche
          responsabile della visione creativa e narrativa del film. Si occupa
          della direzione degli attori, della messa in scena e della costruzione
          del linguaggio cinematografico, traducendo la sceneggiatura in
          immagini e sequenze visive.
          <br />
          <br />
          In questo reparto i ragazzi sviluppano competenze legate alla regia
          cinematografica, lavorando sulla gestione del set, sullo storytelling
          visivo e sulla relazione con tutti i reparti produttivi. La regia
          rappresenta il punto di sintesi tra creatività e tecnica, guidando la
          realizzazione del progetto filmico dall&apos;idea alla sua esecuzione.
        </>
      ),
    },
  ],
  [
    "setDesign",
    {
      fullTitle: "Sceneggiatura",
      title: "Scenegg.",
      primaryDescription: "Reparto Sceneggiatura e scrittura cinematografica",
      secondaryDescription: (
        <>
          Il reparto Sceneggiatura è l&apos;area delle produzioni
          cinematografiche dedicata alla scrittura e allo sviluppo della storia.
          Si occupa della costruzione narrativa del film, della struttura delle
          scene e dei dialoghi, definendo le basi su cui si sviluppa
          l&apos;intero linguaggio cinematografico.
          <br />
          <br />
          In questo reparto i ragazzi lavorano sulla sceneggiatura
          cinematografica, sviluppando competenze legate allo storytelling, alla
          costruzione dei personaggi e all&apos;equilibrio narrativo. Il
          dipartimento collabora con regia e produzione per trasformare le idee
          in un racconto strutturato e realizzabile sul set.
        </>
      ),
    },
  ],
];
