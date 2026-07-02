import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://36july.ahsanullah.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "জুলাই গণঅভ্যুত্থান ২০২৪ — 36th July",
    template: "%s | জুলাই গণঅভ্যুত্থান ২০২৪",
  },
  description:
    "An interactive calendar documenting the 36 days of Bangladesh's July–August 2024 uprising. Dedicated to 854+ martyrs of the quota reform movement.",
  keywords: [
    "July uprising Bangladesh 2024",
    "Bangladesh student protest 2024",
    "36th July",
    "Quota reform movement Bangladesh",
    "জুলাই গণঅভ্যুত্থান",
    "৩৬তম জুলাই",
    "বাংলাদেশ আন্দোলন ২০২৪",
    "কোটা সংস্কার আন্দোলন",
    "Abu Sayed Bangladesh",
    "বৈষম্যবিরোধী ছাত্র আন্দোলন",
    "Bangladesh revolution 2024",
    "Sheikh Hasina resignation",
  ],
  applicationName: "36th July",
  authors: [{ name: "Ahsanullah", url: BASE_URL }],
  creator: "Ahsanullah",
  publisher: "Ahsanullah",
  category: "history",

  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "36th July — জুলাই গণঅভ্যুত্থান ২০২৪",
    title: "July Uprising Bangladesh 2024 — 36 Days That Changed History",
    description:
      "An interactive calendar documenting the 36 days of Bangladesh's July–August 2024 uprising. 854+ martyrs. A nation's awakening.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "July Uprising Bangladesh 2024 — 36 Days That Changed History",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "July Uprising Bangladesh 2024 — 36 Days That Changed History",
    description:
      "An interactive calendar documenting the 36 days of Bangladesh's July–August 2024 uprising. 854+ martyrs.",
    images: ["/opengraph-image"],
    creator: "@ahsanullah",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "bn-BD": BASE_URL,
      "en-US": BASE_URL,
    },
  },

  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" dir="ltr">
      <head>
        <meta name="theme-color" content="#160f08" />
        <meta name="color-scheme" content="dark" />
        <link rel="canonical" href={BASE_URL} />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "36th July — জুলাই গণঅভ্যুত্থান ২০২৪",
                alternateName: [
                  "36th July",
                  "July Uprising Bangladesh 2024",
                  "জুলাই গণঅভ্যুত্থান ২০২৪",
                ],
                url: BASE_URL,
                description:
                  "An interactive calendar documenting the 36 days of Bangladesh's July–August 2024 uprising. Dedicated to 854+ martyrs.",
                inLanguage: ["bn-BD", "en-US"],
                author: {
                  "@type": "Person",
                  name: "Ahsanullah",
                  url: BASE_URL,
                },
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${BASE_URL}/?q={search_term_string}`,
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Event",
                name: "July Uprising Bangladesh 2024",
                alternateName: "জুলাই গণঅভ্যুত্থান ২০২৪",
                startDate: "2024-07-01",
                endDate: "2024-08-05",
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode:
                  "https://schema.org/OfflineEventAttendanceMode",
                location: {
                  "@type": "Country",
                  name: "Bangladesh",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "BD",
                  },
                },
                description:
                  "The Bangladesh student-led uprising of July–August 2024 against quota-based government job allocation, resulting in a historic political transition and the resignation of Prime Minister Sheikh Hasina.",
                image: `${BASE_URL}/opengraph-image`,
                url: BASE_URL,
                organizer: {
                  "@type": "Organization",
                  name: "Anti-Discrimination Student Movement",
                  alternateName: "বৈষম্যবিরোধী ছাত্র আন্দোলন",
                },
              },
            ]),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
