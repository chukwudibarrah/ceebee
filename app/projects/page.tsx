// /app/projects/page.tsx

import { useState } from "react";
import Link from "next/link";
import { getAllProjects, Project } from "@/lib/projectApi";
import LoadingAnimation from "@/components/functions/LoadingAnimation";
import ProjectsList from "./ProjectList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://chukwudibarrah.com/projects",
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
        url: "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp", // Must be an absolute URL
        width: 1634,
        height: 1160,
      },
    ],
  },
  twitter: {
    description:
      "A selection of past and ongoing projects I've worked or working on.",
    card: "summary_large_image",
    title: "Projects | Chukwudi Barrah",
    images: [
      "https://raw.githubusercontent.com/chukwudibarrah/ceebee/main/public/chukwudibarrah.webp",
    ],
  },
};

// Server Component
export default async function Projects() {
  // Fetch all projects on the server
  const fetchedProjects = await getAllProjects();

  // Randomize the projects array
  const allProjects = [...fetchedProjects].sort(() => Math.random() - 0.5);

  // Extract unique categories from projects
  const categories = [
    ...new Set(allProjects.map((project) => project.category)),
  ];

  return (
    <div className="min-h-screen w-full">
      <h1 className="fixed left-1/2 top-32 -translate-x-1/2 -z-0 text-[160px] leading-[120px] md:text-[400px] md:leading-[300px] opacity-5 text-gray-200/40 select-none font-extrabold whitespace-nowrap">
        pro
        <br />
        jects
      </h1>

      <div className="lg:px-28 md:px-16 px-4 py-20 z-10 w-full relative">
        <div className="w-full">
          <h2 className="md:text-7xl text-5xl text-gray-200 tracking-wide">
            The evidence locker
          </h2>
          <p className="text-gray-200 font-thin md:text-3xl text-2xl pt-12 tracking-wide">
            Here&apos;s proof that I (occasionally) do things
          </p>
        </div>
      </div>

      {/* Client Component for interactive elements */}
      <ProjectsList initialProjects={allProjects} categories={categories} />
    </div>
  );
}
