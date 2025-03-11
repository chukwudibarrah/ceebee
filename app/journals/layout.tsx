import type { Metadata } from "next";


export const metadata: Metadata = {
  metadataBase: new URL('https://chukwudibarrah.com'),
  alternates: {
    canonical: 'https://chukwudibarrah.com/journals',
  },
  title: "Journals - Chukwudi Barrah",
  description:
    "A selection of past and ongoing journals I've worked or working on.",
  openGraph: {
    title: "Journals - Chukwudi Barrah",
    type: "website",
    url: "https://chukwudibarrah.com/journals",
    siteName: "Chukwudi Barrah",
    description:
      "A selection of past and ongoing journals I've worked or working on.",
      images: [
        {
          url: 'https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp', // Must be an absolute URL
          width: 1634,
          height: 1160,
        },
      ],
  },
  twitter: {
    description: "A selection of past and ongoing journals I've worked or working on.",
    card: "summary_large_image",
    title: "Journals - Chukwudi Barrah",
    images: ["https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp"],
  },
};

export default function JournalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        children
  );
}
