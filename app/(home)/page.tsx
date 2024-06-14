"use client";

import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import { outfit, zilla } from "@/fonts";
import { Boxes } from "@/components/ui/background-boxes";

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

export default function Home() {
  return (
    <main className={`min-h-screen w-screen overscroll-none overflow-hidden flex flex-col items-center justify-center bg-neutral-950 ${outfit.className}`}>
      <h1 className="fixed z-0 text-[90px] leading-[90px] md:text-[250px] md:leading-[250px] lg:text-[350px] lg:leading-[300px] opacity-5 text-gray-200 font-extrabold select-none">
        chukwudi
        <br />
        barrah
      </h1>
      <div className={`text-[58px]  pt-28 md:pt-0 md:text-[130px] lg:text-[170px] font-bold z-20`}>
        <FlipWords words={words} />
      </div>
      <div>
        <div className={`overflow-hidden text-center mt-20 md:mt-28 group text-gray-300 transition-all duration-300 ease-in-out`}>
          <Link
            href="/about"
            className={`text-gray-300 text-lg md:text-3xl bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_5px] bg-no-repeat group-hover:bg-[length:0%_5px] transition-all duration-700 ease-out z-20 hover:text-sienna ${zilla.className}`}
          >
            Wait, who&apos;s Chukwudi Barrah?
          </Link>
        </div>
      </div>
    </main>
  );
}