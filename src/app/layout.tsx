import type { Metadata } from "next";
import "./globals.css";

/* ══════════════════════════════════════
   SEO — Optimized for "Noor Naila Imtinan Himam" search
   ══════════════════════════════════════ */

export const metadata: Metadata = {
  metadataBase: new URL("https://noornaila.com"),

  title: {
    default: "Noor Naila Imtinan Himam | UX Researcher & Designer",
    template: "%s | Noor Naila Imtinan Himam",
  },

  description:
    "Noor Naila Imtinan Himam is a UX Researcher & Designer crafting interactive digital experiences. Explore her portfolio, projects, research, and design work.",

  authors: [{ name: "Noor Naila Imtinan Himam", url: "https://noornaila.com" }],
  creator: "Noor Naila Imtinan Himam",
  publisher: "Noor Naila Imtinan Himam",

  alternates: {
    canonical: "https://noornaila.com",
  },

  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noornaila.com",
    siteName: "Noor Naila Imtinan Himam — Portfolio",
    title: "Noor Naila Imtinan Himam | UX Researcher & Designer",
    description:
      "Noor Naila Imtinan Himam is a UX Researcher & Designer. Explore her interactive portfolio featuring research projects, design case studies, and creative work.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noor Naila Imtinan Himam — UX Researcher & Designer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Noor Naila Imtinan Himam | UX Researcher & Designer",
    description:
      "Interactive portfolio of Noor Naila Imtinan Himam — UX Researcher, Designer & Storyteller.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },

  verification: {
    // Add your Google Search Console verification code here after setting up
    // google: "your-verification-code",
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://noornaila.com/#person",
      name: "Noor Naila Imtinan Himam",
      alternateName: ["Naila", "Noor Naila", "Naila Himam"],
      url: "https://noornaila.com",
      image: "https://noornaila.com/icons/Naila.svg",
      jobTitle: "UX Researcher & Designer",
      description:
        "Noor Naila Imtinan Himam is a UX Researcher & Designer specializing in user experience research, interaction design, and storytelling through digital products.",
      knowsAbout: [
        "UX Research",
        "UX Design",
        "User Interface Design",
        "Interaction Design",
        "User Experience",
        "Design Thinking",
        "Usability Testing",
        "Prototyping",
        "Figma",
        "Graphic Design",
      ],
      sameAs: [
        "https://www.linkedin.com/in/noornaila/",
        "https://github.com/nailserverzone",
        "https://noornaila.notion.site",
      ],
      email: "mailto:noornaila04@gmail.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://noornaila.com/#website",
      url: "https://noornaila.com",
      name: "Noor Naila Imtinan Himam — Portfolio",
      description:
        "Interactive portfolio of Noor Naila Imtinan Himam, UX Researcher & Designer.",
      publisher: { "@id": "https://noornaila.com/#person" },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": "https://noornaila.com/#webpage",
      url: "https://noornaila.com",
      name: "Noor Naila Imtinan Himam | UX Researcher & Designer",
      isPartOf: { "@id": "https://noornaila.com/#website" },
      about: { "@id": "https://noornaila.com/#person" },
      description:
        "Explore the interactive portfolio of Noor Naila Imtinan Himam — featuring UX research projects, design case studies, graphic design, and featured talks.",
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
