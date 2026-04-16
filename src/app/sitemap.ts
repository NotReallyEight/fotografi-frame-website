import config from "@/config";
import images from "@/utils/images";
import type { MetadataRoute } from "next";

export const revalidate = 60;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.url,
      lastModified: new Date(),
    },
    {
      url: `${config.url}/about/`,
      lastModified: new Date(),
    },
    {
      url: `${config.url}/contacts/`,
      lastModified: new Date(),
    },
    {
      url: `${config.url}/events/`,
      lastModified: new Date(),
    },
    {
      url: `${config.url}/hirpinia-film-lab/`,
      lastModified: new Date(),
    },
    ...Object.keys(images.hirpiniaFilmLab.trainingAreas).map((key) => ({
      url: `${config.url}/hirpinia-film-lab/${key}/`,
      lastModified: new Date(),
    })),
    {
      url: `${config.url}/productions/`,
      lastModified: new Date(),
    },
    {
      url: `${config.url}/studio/`,
      lastModified: new Date(),
    },
    {
      url: `${config.url}/works/`,
      lastModified: new Date(),
    },
  ];
}
