import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "জুলাই গণঅভ্যুত্থান ২০২৪ — 36th July",
    short_name: "36th July",
    description:
      "An interactive calendar documenting the 36 days of Bangladesh's July–August 2024 uprising. Dedicated to 854+ martyrs.",
    start_url: "/",
    display: "standalone",
    background_color: "#160f08",
    theme_color: "#160f08",
    lang: "bn",
    dir: "ltr",
    categories: ["history", "education", "news"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
