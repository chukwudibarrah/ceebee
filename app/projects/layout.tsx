import type { Metadata } from "next";


export const metadata: Metadata = {
  metadataBase: new URL('https://chukwudibarrah.com'),
  alternates: {
    canonical: '/projects',
  },
  title: "Projects | Chukwudi Barrah",
  description:
    "A selection of past and ongoing projects I've worked or working on.",
  openGraph: {
    title: "Projects | Chukwudi Barrah",
    type: "website",
    url: "https://chukwudibarrah.com/projects",
    siteName: "Chukwudi Barrah",
    description:
      "A selection of past and ongoing projects I've worked or working on.",
      images: [
        {
          url: 'https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp', // Must be an absolute URL
          width: 1634,
          height: 1160,
        },
      ],
  },
  twitter: {
    description: "A selection of past and ongoing projects I've worked or working on.",
    card: "summary_large_image",
    title: "Projects | Chukwudi Barrah",
    images: ["https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        children
  );
}
