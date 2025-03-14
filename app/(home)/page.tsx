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
  metadataBase: new URL("https://chukwudibarrah.com"),
  alternates: {
    canonical: "/",
  },
  title: "Home",
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

export default function Home() {
  return (
    <main
      className={`min-h-screen w-screen overscroll-none overflow-hidden flex flex-col items-center justify-center`}
    >
      <h1 className="fixed z-0 text-[110px] leading-[90px] md:text-[230px] md:leading-[250px] lg:text-[350px] lg:leading-[270px] opacity-5 text-gray-200 font-extrabold select-none">
        <span className="block lg:hidden">
          chuk <br />wudi <br />barrah
        </span>
        <span className="hidden lg:block">
        chukwudi
        <br />
        barrah
        </span>
      </h1>
      <div className="text-[58px] pt-28 md:pt-0 md:text-[130px] lg:text-[250px] font-bold">
        <FlipWords words={words} />
      </div>
      <div className="overflow-hidden text-center mt-20 md:mt-28 text-gray-200 text-xl md:text-2xl font-thin z-20 space-y-2 md:w-[35%] w-[80%]">
        <p>
          You&apos;ve stumbled (lol &quot;stumbled&quot; wink wink) on the
          digital playground of{" "}
          <span>
            <Link
              href="/about"
              aria-label="Visit the about page"
              className="overflow-hidden text-center mt-20 md:mt-28 group text-gray-200 transition-all duration-300 ease-in-out z-20"
            >
              <span
                className={`text-gray-200 text-xl md:text-2xl font-thin bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_5px] bg-no-repeat group-hover:bg-[length:0%_5px] transition-all duration-700 ease-out hover:text-sienna`}
              >
                Chukwudi Barrah
              </span>
            </Link>
          </span>
          .
        </p>
        <p>Don&apos;t worry; most people can&apos;t pronounce it either.</p>
      </div>
      <BackgroundBeams />
    </main>
  );
}
