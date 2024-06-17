import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react"
import { sendGAEvent } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster"
import { worksans } from "@/styles/fonts";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { GoogleAnalyticsTracking } from "./components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Chukwudi Barrah",
  description:
    "Web editor, developer and copywriter; I enjoy building, creating and problem-solving.",
    openGraph: {
      title: 'Chukwudi Barrah',
      description: "Web editor, developer and copywriter; I enjoy building, creating and problem-solving.",
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
        <Analytics/>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
