
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundBeams } from "@/components/ui/background-beams";

const words = [
  "Hello!",
  "Nǐ hǎo!",
  "Bonjour!",
  "Nde-ewo!",
  "Sawubona!",
  "Hola!",
  "Namastē!",
  "Salam!",
  "Konnichiwa!",
  "Shalom!",
  "Marhaba!",
  "Guten tag!",
];

export const metadata = {
  metadataBase: new URL('https://chukwudibarrah.com'),
  alternates: {
    canonical: '/',
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
          url: 'https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp', // Must be an absolute URL
          width: 1634,
          height: 1160,
        },
      ],
  },
  twitter: {
    description: "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
    card: "summary_large_image",
    title: "Chukwudi Barrah",
    images: ["https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp"],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  "name": "Chukwudi Barrah",
  "image": "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp",
  "url": "https://chukwudibarrah.com",
  "description": "Web editor, front-end web developer and copywriter; I enjoy building, creating and problem-solving.",
}

export default function Home() {
  return (
    <main className={`min-h-screen w-screen overscroll-none overflow-hidden flex flex-col items-center justify-center bg-neutral-950`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="fixed z-0 text-[90px] leading-[90px] md:text-[250px] md:leading-[250px] lg:text-[350px] lg:leading-[300px] opacity-5 text-gray-200 font-extrabold select-none">
        chukwudi
        <br />
        barrah
      </h1>
      <div className="text-[58px] pt-28 md:pt-0 md:text-[130px] lg:text-[250px] font-bold">
        <FlipWords words={words} />
      </div>
        <Link 
        href="/about"
        aria-label="Visit the about page"
        className="overflow-hidden text-center mt-20 md:mt-28 group text-gray-200 transition-all duration-300 ease-in-out z-20">
          <span
            className={`text-gray-200 text-lg md:text-3xl lg:text-4xl font-thin bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_5px] bg-no-repeat group-hover:bg-[length:0%_5px] transition-all duration-700 ease-out hover:text-sienna`}
          >
            Wait, who&apos;s Chukwudi Barrah?
          </span>
        </Link>
      <BackgroundBeams />
    </main>
  );
}
