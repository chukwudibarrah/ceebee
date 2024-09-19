import type { Metadata } from "next";


export const metadata: Metadata = {
  metadataBase: new URL('https://chukwudibarrah.com'),
  // alternates: {
  //   canonical: '/journal',
  // },
  title: "Journal | Chukwudi Barrah",
  description:
    "Writing is never truly finished; only abandoned. These are a collection of my abandoned musings and thoughts.",
  openGraph: {
    title: "Journal | Chukwudi Barrah",
    type: "website",
    url: "https://chukwudibarrah.com/journal",
    siteName: "Chukwudi Barrah",
    description:
      "Writing is never truly finished; only abandoned. These are a collection of my abandoned musings and thoughts.",
      images: [
        {
          url: 'https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp', // Must be an absolute URL
          width: 1634,
          height: 1160,
        },
      ],
  },
  twitter: {
    description: "Writing is never truly finished; only abandoned. These are a collection of my abandoned musings and thoughts.",
    card: "summary_large_image",
    title: "Journal | Chukwudi Barrah",
    images: ["https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp"],
  },
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        children
  );
}
