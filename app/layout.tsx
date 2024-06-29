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
//   image:
//     "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp",
//   about: {
//     "@type": "Person",
//     "@id": "https://chukwudibarrah.com",
//     name: "Chukwudi Barrah",
//     jobTitle: "Web editor, front-end web developer and copywriter",
//     image:
//       "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp",
//     description:
//       "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
//     sameAs: [
//       "https://medium.com/@chukwudibarrah",
//       "https://www.linkedin.com/in/cbarrah",
//       "https://github.com/chukwudibarrah",
//       "https://www.instagram.com/dude.with.a.camera/",
//       "https://www.facebook.com/thechukwudibarrah",
//     ],
//     homeLocation: {
//       "@type": "Place",
//       "name": "United Kingdom",
//       "geo": {
//         "@type": "GeoCoordinates",
//         "latitude": "53.2913072",
//         "longitude": "-1.3309752",
//       }
//     }
//   },
// };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chukwudi Barrah",
  givenName: "Chukwudi",
  familyName: "Barrah",
  url: "https://chukwudibarrah.com",
  jobTitle: "Web editor, front-end web developer and copywriter",
  description:
    "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
  image:
    "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp",
  mainEntityOfPage: {
    "@type": "WebPage",
    url: "https://chukwudibarrah.com",
  },
  sameAs: [
    "https://medium.com/@chukwudibarrah",
    "https://www.linkedin.com/in/cbarrah",
    "https://github.com/chukwudibarrah",
    "https://www.instagram.com/dude.with.a.camera/",
    "https://www.facebook.com/thechukwudibarrah",
  ],
  homeLocation: {
    "@type": "Place",
    name: "United Kingdom",
    geo: {
      "@type": "GeoCoordinates",
      latitude: "53.2913072",
      longitude: "-1.3309752",
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "High Street",
    addressLocality: "Britain",
    addressRegion: "England",
    postalCode: "ABC 123",
    addressCountry: "UK",
  },
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
      <body className={worksans.className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
