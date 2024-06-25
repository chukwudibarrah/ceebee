import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { worksans } from "@/styles/fonts";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { GoogleAnalyticsTracking } from "./components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://chukwudibarrah.com"),
  alternates: {
    canonical: "/",
  },
  title: "Chukwudi Barrah",
  description:
    "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
  openGraph: {
    title: "Chukwudi Barrah",
    type: "website",
    url: "https://chukwudibarrah.com",
    siteName: "Chukwudi Barrah",
    description:
      "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
    images: [
      {
        url: "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp", // Must be an absolute URL
        width: 1634,
        height: 1160,
      },
    ],
  },
  twitter: {
    description:
      "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
    card: "summary_large_image",
    title: "Chukwudi Barrah",
    images: [
      "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp",
    ],
  },
};

// const jsonLd = {
//   "@context": "https://schema.org",
//   "@type": "WebSite",
//   url: "https://chukwudibarrah.com",
//   description:
//     "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
//   about: {
//     name: "Chukwudi Barrah",
//     jobTitle: "Web Editor",
//     image:
//       "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp",
//   },
// };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://chukwudibarrah.com',
      name: 'Chukwudi Barrah',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Web Editor, Front-end Web Developer and Copywriter',
      },
      mainEntityOfPage: {'@id': 'https://chukwudibarrah.com'},
      subjectOf: {'@id': 'https://chukwudibarrah.com'},
    },
    {
      '@type': 'AboutPage',
      '@id': 'https://chukwudibarrah.com',
      url: 'https://my.site',
      name: "Chukwudi Barrah's Website",
      inLanguage: 'en-US',
      description: 'The personal website of LISP legend Chukwudi Barrah',
      mainEntity: {'@id': 'https://chukwudibarrah.com'},
    },
    {
      '@type': 'WebPage',
      '@id': 'https://chukwudibarrah.com',
      url: 'https://my.site/about/',
      name: "Chukwudi Barrah",
      isPartOf: {
        '@id': 'https://chukwudibarrah.com',
      },
      about: {'@id': 'https://chukwudibarrah.com'},
      mainEntity: {'@id': 'https://chukwudibarrah.com'},
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="G-141ZFEMEVE" />
      <GoogleAnalytics gaId="G-141ZFEMEVE" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <body className={worksans.className}>
        <GoogleAnalyticsTracking />
        <Navbar />
        {children}
        <Analytics />
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
