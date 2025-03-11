import type { Metadata } from "next";


export const metadata: Metadata = {
  alternates: {
    canonical: 'https://chukwudibarrah.com/about',
  },
  title: "About | Chukwudi Barrah",
  description:
    "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
  openGraph: {
    title: "About | Chukwudi Barrah",
    type: "website",
    url: "https://chukwudibarrah.com/about",
    siteName: "Chukwudi Barrah",
    description:
      "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
      images: [
        {
          url: 'https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp', // Must be an absolute URL
          width: 1634,
          height: 1160,
        },
      ],
  },
  twitter: {
    description: "Web editor, developer and copywriter; I enjoy building, creating and problem-solving.",
    card: "summary_large_image",
    title: "About | Chukwudi Barrah",
    images: ["https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudi-barrah.webp"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        children
  );
}
