import images from "@/utils/images";

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
      primaryDescription:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
      secondaryDescription: (
        <>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos.
        </>
      ),
    },
  ],
  [
    "actors",
    {
      fullTitle: "Attori",
      title: "Attori",
      primaryDescription: "",
      secondaryDescription: "",
    },
  ],
  [
    "communicationAndMarketing",
    {
      fullTitle: "Comunicazione e Marketing",
      title: "Comm & Mark",
      primaryDescription: "",
      secondaryDescription: "",
    },
  ],
  [
    "photography",
    {
      fullTitle: "Fotografia",
      title: "Fotog.",
      primaryDescription: "",
      secondaryDescription: "",
    },
  ],
  [
    "music",
    {
      fullTitle: "Musica",
      title: "Musica",
      primaryDescription: "",
      secondaryDescription: "",
    },
  ],
  [
    "postProduction",
    {
      fullTitle: "Post Produzione",
      title: "Post Prod.",
      primaryDescription: "",
      secondaryDescription: "",
    },
  ],
  [
    "production",
    {
      fullTitle: "Produzione",
      title: "Prod.",
      primaryDescription: "",
      secondaryDescription: "",
    },
  ],
  [
    "direction",
    {
      fullTitle: "Regia",
      title: "Regia",
      primaryDescription: "",
      secondaryDescription: "",
    },
  ],
  [
    "setDesign",
    {
      fullTitle: "Sceneggiatura",
      title: "Scenegg.",
      primaryDescription: "",
      secondaryDescription: "",
    },
  ],
];
