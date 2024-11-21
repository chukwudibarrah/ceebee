import { motion } from "framer-motion";
import FetchProjects from "../components/FetchProjects";

export default function Projects() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center overscroll-none bg-neutral-950 pt-32">
      <h1 className="fixed bottom-36 -z-0 text-[160px] leading-[120px] md:text-[400px] md:leading-[300px] opacity-5 text-gray-200/40 font-extrabold select-none">
        pro
        <br />
        jects
      </h1>
      <div className="lg:px-28 md:px-16 px-4 py-20 z-10 w-full">
        <div className="w-full">
          <h2 className="md:text-7xl text-5xl text-gray-200 tracking-wide">
            The evidence locker
          </h2>
          <p className="text-gray-200 md:text-3xl text-2xl pt-12 tracking-wide">
          Here&apos;s proof that I (occasionally) do things
          </p>
        </div>
      </div>
      <FetchProjects />
    </div>
  );
}
