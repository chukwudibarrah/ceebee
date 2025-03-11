// /app/projects/ProjectList.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProjectsList({ initialProjects, categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    // Reset visible count when changing categories
    setVisibleCount(5);
  };

  // Filter projects based on selected category
  const filteredProjects = selectedCategory
    ? initialProjects.filter((project) => project.category === selectedCategory)
    : initialProjects;

  // Get only the visible projects
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Determine if there are more projects to load
  const hasMoreProjects = visibleCount < filteredProjects.length;

  // Handle load more button click
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <>
      {/* Category filters */}
      {categories.length > 0 && (
        <div className="relative max-w-6xl py-8 lg:px-28 md:px-16 px-4 z-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full transition-colors text-sm ${
                selectedCategory === category
                  ? "bg-sienna text-white"
                  : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
              }`}
            >
              {category}
            </button>
          ))}
          {selectedCategory && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setVisibleCount(5);
              }}
              className="px-4 py-2 rounded-full bg-neutral-700 text-gray-300 hover:bg-neutral-600 text-sm"
            >
              See all
            </button>
          )}
        </div>
      )}

      <div className="w-screen min-h-screen pb-32 z-10 md:text-2xl text-xl lg:px-28 md:px-16 px-4 relative">
        {visibleProjects.length > 0 ? (
          <div>
            <ul className="list-disc list-inside text-gray-200 md:text-2xl text-xl font-thin space-y-4">
              {visibleProjects.map((project) => (
                <li key={project._id}>
                  <span>
                    <span className="text-sm text-persian">
                      {project.category}
                    </span>
                    <br />
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-normal font-medium"
                    >
                      {project.title}
                      <br />
                      <span className="text-gray-400 font-thin">
                        See project
                      </span>
                    </Link>
                  </span>
                </li>
              ))}
            </ul>

            {/* Load More button */}
            {hasMoreProjects && (
              <div className="mt-24 lg:mt-32">
                <button
                  onClick={handleLoadMore}
                  className="underline underline-offset-4 decoration-4 decoration-sienna"
                >
                  Get more
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">
              That&apos;s all of it for now, unfortunately.
            </p>
            {selectedCategory && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setVisibleCount(5);
                }}
                className="mt-4 px-6 py-2 bg-sienna text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
