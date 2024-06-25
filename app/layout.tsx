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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://chukwudibarrah.com",
  "about": {
    "@type": "Person",
    "@id": "https://chukwudibarrah.com/about",
    name: "Chukwudi Barrah",
    mainEntityOfPage: {
      "@id": "https://chukwudibarrah.com",
    },
    "sameAs": [
      "https://medium.com/@chukwudibarrah",
      "https://www.linkedin.com/in/cbarrah",
      "https://github.com/chukwudibarrah",
      "https://www.instagram.com/dude.with.a.camera/",
      "https://www.facebook.com/thechukwudibarrah",
    ]
  }

  
};

// const jsonLd = {
//   '@context': 'https://schema.org',
//   '@graph': [
//     {
//       '@type': 'Person',
//       '@id': 'https://chukwudibarrah.com',
//       name: 'Chukwudi Barrah',
//       mainEntityOfPage: {'@id': 'https://chukwudibarrah.com'},
//       subjectOf: {'@id': 'https://chukwudibarrah.com'},
//       description: "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem",
//       image: "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp",
//     },
//     {
//       '@type': 'WebSite',
//       '@id': 'https://chukwudibarrah.com',
//       url: 'https://chukwudibarrah.com',
//       name: "Chukwudi Barrah",
//       inLanguage: 'en-GB',
//       isPartOf: {
//         '@id': 'https://chukwudibarrah.com',
//       },
//       about: {'@id': 'https://chukwudibarrah.com'},
//       mainEntity: {'@id': 'https://chukwudibarrah.com'},
//     },
//     {
//       '@type': 'AboutPage',
//       '@id': 'https://chukwudibarrah.com/about',
//       url: 'https://chukwudibarrah.com/about',
//       name: "About Chukwudi Barrah",
//       description: 'Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.',
//       mainEntity: {'@id': 'https://chukwudibarrah.com'},
//     },
//   ],
// };

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
