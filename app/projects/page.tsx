// app/projects/page.tsx
import FetchProjects from "../components/FetchProjects";

export default function Projects() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center overscroll-none bg-neutral-950 pt-32">
      <h1 className="fixed bottom-36 -z-0 text-[160px] leading-[120px] md:text-[400px] md:leading-[300px] opacity-5 text-gray-200/40 font-extrabold select-none">
        pro
        <br />
        jects
      </h1>
      <div className="md:px-32 px-11 py-20 z-10 w-full">
        <div className="w-full">
          <h2 className="text-5xl text-brown text-left lg:w-[45%]">
            A selection of past and ongoing projects
          </h2>
        </div>
      </div>
      <FetchProjects />
    </div>
  );
}
