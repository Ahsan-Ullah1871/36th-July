import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://36july.ahsanullah.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "জুলাই গণঅভ্যুত্থান ২০২৪ — ৩৬তম জুলাই",
    template: "%s | জুলাই গণঅভ্যুত্থান ২০২৪",
  },
  description:
    "জুলাই–আগস্ট ২০২৪ বাংলাদেশের গণঅভ্যুত্থানের ৩৬টি দিনের ইন্টারেক্টিভ ক্যালেন্ডার। ৮৫৪+ শহীদের স্মৃতিতে নিবেদিত একটি ঐতিহাসিক দলিল।",
  keywords: [
    "জুলাই গণঅভ্যুত্থান",
    "৩৬তম জুলাই",
    "বাংলাদেশ আন্দোলন ২০২৪",
    "কোটা সংস্কার আন্দোলন",
    "আবু সাঈদ",
    "বৈষম্যবিরোধী ছাত্র আন্দোলন",
    "July uprising Bangladesh 2024",
    "Bangladesh student protest 2024",
    "36th July",
    "Quota reform movement Bangladesh",
  ],
  authors: [{ name: "Ahsanullah", url: BASE_URL }],
  creator: "Ahsanullah",
  publisher: "Ahsanullah",

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: BASE_URL,
    siteName: "জুলাই গণঅভ্যুত্থান ২০২৪",
    title: "জুলাই গণঅভ্যুত্থান ২০২৪ — ৩৬টি দিন যা ইতিহাস বদলে দিয়েছে",
    description:
      "জুলাই–আগস্ট ২০২৪ বাংলাদেশের গণঅভ্যুত্থানের ৩৬টি দিনের ইন্টারেক্টিভ ক্যালেন্ডার। ৮৫৪+ শহীদের স্মৃতিতে নিবেদিত।",
    images: [
      {
        url: "/images/d1.jpg",
        width: 1200,
        height: 630,
        alt: "জুলাই গণঅভ্যুত্থান ২০২৪ — বাংলাদেশের ঐতিহাসিক আন্দোলন",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "জুলাই গণঅভ্যুত্থান ২০২৪ — ৩৬টি দিন যা ইতিহাস বদলে দিয়েছে",
    description:
      "জুলাই–আগস্ট ২০২৪ বাংলাদেশের গণঅভ্যুত্থানের ৩৬টি দিনের ইন্টারেক্টিভ ক্যালেন্ডার।",
    images: ["/images/d1.jpg"],
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
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "জুলাই গণঅভ্যুত্থান ২০২৪",
              alternateName: "36th July | July Uprising Bangladesh 2024",
              url: BASE_URL,
              description:
                "An interactive calendar documenting the 36 days of Bangladesh's July–August 2024 uprising. Dedicated to 854+ martyrs.",
              inLanguage: "bn-BD",
              author: {
                "@type": "Person",
                name: "Ahsanullah",
                url: BASE_URL,
              },
              about: {
                "@type": "Event",
                name: "জুলাই গণঅভ্যুত্থান ২০২৪",
                alternateName: "Bangladesh July Uprising 2024",
                startDate: "2024-07-01",
                endDate: "2024-08-05",
                location: {
                  "@type": "Country",
                  name: "Bangladesh",
                },
                description:
                  "The Bangladesh student-led uprising of July–August 2024 against quota-based government job allocation, resulting in a historic political transition.",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
