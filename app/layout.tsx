// /app/layout.tsx

import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { worksans, outfit, lato, zilla } from "@/styles/fonts";
import "./globals.css";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import { GoogleAnalyticsTracking } from "@/components/functions/GoogleAnalytics";

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
