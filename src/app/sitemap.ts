import images from "@/utils/images";
import type { MetadataRoute } from "next";

export const revalidate = 60;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://antoniowang.dev/",
      lastModified: new Date(),
    },
    {
      url: "https://antoniowang.dev/about/",
      lastModified: new Date(),
    },
    {
      url: "https://antoniowang.dev/contacts/",
      lastModified: new Date(),
    },
    {
      url: "https://antoniowang.dev/events/",
      lastModified: new Date(),
    },
    {
      url: "https://antoniowang.dev/hirpinia-film-lab/",
      lastModified: new Date(),
    },
    ...Object.keys(images.hirpiniaFilmLab.trainingAreas).map((key) => ({
      url: `https://antoniowang.dev/hirpinia-film-lab/${key}`,
      lastModified: new Date(),
    })),
    {
      url: "https://antoniowang.dev/productions/",
      lastModified: new Date(),
    },
    {
      url: "https://antoniowang.dev/studio/",
      lastModified: new Date(),
    },
    {
      url: "https://antoniowang.dev/works/",
      lastModified: new Date(),
    },
  ];
}
