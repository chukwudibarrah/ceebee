import Link from "next/link";
import { Metadata } from "next";


export const metadata = {
  title: "Error page | Chukwudi Barrah",
  description:
    "The page you're looking for isn't here.",
  openGraph: {
    title: "Error page | Chukwudi Barrah",
    type: "website",
    siteName: "Chukwudi Barrah",
      images: [
        {
          url: 'https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp', // Must be an absolute URL
          width: 1634,
          height: 1160,
        },
      ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Error page | Chukwudi Barrah",
    images: ["https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp"],
  },
};


export default function ErrorPage() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center text-center space-y-16">
      <h1 className="text-gray-200 text-9xl font-bold">Uh ohh...</h1>
      <p className="text-gray-200 text-6xl">
        Looks like I removed that content
      </p>
      <p className="text-gray-200 text-xl font-light">
        That&apos;s my bad. No biggie; just return to the{" "}
        <Link
          href="/"
          className="group text-gray-200 transition-all duration-300 ease-in-out"
        >
          <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
            home page
          </span>
        </Link>
        , explore the {" "}
        <Link
          href="/journal"
          className="group text-gray-200 transition-all duration-300 ease-in-out"
        >
          <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
            journal{" "}
          </span>
        </Link>
        or see some selected{" "}
        <Link
          href="/projects"
          className="group text-gray-200 transition-all duration-300 ease-in-out"
        >
          <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
            projects
          </span>
        </Link>
        .
      </p>
    </div>
  );
}
