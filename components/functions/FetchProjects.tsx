"use client";

import { useState, useEffect } from "react";
import LoadingAnimation from "./LoadingAnimation";
import Link from "next/link";

interface Project {
  title: string;
  url: string;
  category: string;
}

export default function FetchProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projectIndex, setProjectIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const projectsPerPage = 5;

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: Project[] = await response.json();
        
        if (result && result.length > 0) {
          setAllProjects(result); 
        } else {
          throw new Error('Empty or invalid response from API');
        }
      } catch (error) {
        console.error("Error fetching all projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  useEffect(() => {
    if (allProjects.length > 0) {
      setProjects(
        selectedCategory === "All"
          ? allProjects
          : allProjects.filter((project) => project.category === selectedCategory)
      );
      setProjectIndex(0);
    }
  }, [selectedCategory, allProjects]);

  useEffect(() => {
    if (projects.length > 0) {
      setDisplayedProjects(projects.slice(0, projectIndex + projectsPerPage));
    }
  }, [projects, projectIndex]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLButtonElement>) => {
    const newCategory = (event.target as HTMLSelectElement).value || (event.target as HTMLButtonElement).textContent;
    if (newCategory) {
      setSelectedCategory(newCategory);
    }
  };

  const loadMoreProjects = () => {
    if (projectIndex + projectsPerPage < projects.length) {
      setProjectIndex(projectIndex + projectsPerPage);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="w-screen min-h-screen pb-32 z-10 md:text-2xl text-xl lg:px-28 md:px-16 px-4">
      <div className="text-gray-200 font-thin">
        <p>Filter by flavour</p>
        <div className={`hidden max-w-full pt-10 pb-24 md:flex space-x-2 md:space-x-7 lg:space-x-12`}>
          {["All", "Editing and copywriting", "Podcasting", "Web development", "Web editing"].map((category) => (
            <button 
            key={category} 
            type="button"
            aria-label="Filter projects by category" 
            onClick={handleCategoryChange} 
            className={`px-3 py-2 rounded-md ${selectedCategory === category ? "text-sienna tracking-widest" : "text-gray-200"}`}>
              {category}
            </button>
          ))}
        </div>
        <div className={`block md:hidden max-w-full pt-7 pb-20`}>
          <select id="skill" name="skill" onChange={handleCategoryChange} value={selectedCategory} className="bg-transparent outline-sienna ring-sienna border-gray-200 border-2 rounded-md" required>
            <option value="" disabled>Select</option>
            {["All", "Editing and copywriting", "Podcasting", "Web development", "Web editing"].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {displayedProjects.map((project, index) => (
        <div key={index}>
          <ul className="list-disc list-inside text-gray-200 md:text-2xl text-xl font-thin">
            <li className="group">
              <Link 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna leading-loose" 
              >
                {project.title}
              </Link>
            </li>
          </ul>
        </div>
      ))}
      {projects.length > 0 && projectIndex + projectsPerPage < projects.length && (
        <div className="flex my-32 group">
          <button 
          type="button" 
          aria-label="Load more projects"
          onClick={loadMoreProjects} 
          className="text-xl md:text-2xl text-gray-200 bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_8px] bg-no-repeat group-hover:bg-[length:0%_8px] transition-all duration-700 ease-out hover:text-sienna">
            Show me more...
          </button>
        </div>
      )}
    </div>
  );
}
