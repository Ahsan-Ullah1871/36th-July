import type { MetadataRoute } from "next";

const BASE_URL = "https://36july.ahsanullah.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2024-08-05"),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
