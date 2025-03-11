// app/journals/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { getGroupedArticlesByYear, getCategories } from "@/lib/api";
import LoadingAnimation from "@/components/functions/LoadingAnimation";

export default function Journals() {
  const [groupedPosts, setGroupedPosts] = useState({});
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all categories
        const allCategories = await getCategories();
        setCategories(allCategories);
        
        // Fetch posts grouped by year
        const groupedPostsByYear = await getGroupedArticlesByYear();
        setGroupedPosts(groupedPostsByYear);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category: string) => {
    // Toggle selected category
    setSelectedCategory(prev => prev === category ? null : category);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  // Filter the grouped posts based on selected category
  const filteredGroupedPosts = selectedCategory 
    ? Object.entries(groupedPosts).reduce((acc, [year, months]) => {
        const filteredMonths = Object.entries(months).reduce((monthAcc, [month, posts]) => {
          const filteredPosts = posts.filter(post => post.category === selectedCategory);
          if (filteredPosts.length > 0) {
            monthAcc[month] = filteredPosts;
          }
          return monthAcc;
        }, {});
        
        if (Object.keys(filteredMonths).length > 0) {
          acc[year] = filteredMonths;
        }
        return acc;
      }, {})
    : groupedPosts;

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <h1
        className="fixed left-1/2 top-32 -translate-x-1/2 -z-0 text-[200px] leading-[150px] md:text-[400px] md:leading-[300px] opacity-5 text-gray-200/40 font-extrabold text-center whitespace-nowrap"
      >
        jour
        <br />
        nal
      </h1>
      
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
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 rounded-full bg-neutral-700 text-gray-300 hover:bg-neutral-600 text-sm"
            >
              Clear filter
            </button>
          )}
        </div>
      )}
      
      <div className="relative max-w-6xl py-8 lg:px-28 md:px-16 px-4 z-10">
        {Object.keys(filteredGroupedPosts).length > 0 ? (
          Object.keys(filteredGroupedPosts)
            .map(Number)
            .sort((a, b) => b - a)
            .map((year) => (
              <div key={year} className="mb-16">
                <div className="text-gray-200 font-thin text-sm md:text-base uppercase mb-8">
                  {year}
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    {Object.keys(filteredGroupedPosts[year])
                      .sort((a, b) => moment(b, "MMM").month() - moment(a, "MMM").month())
                      .map((month) => (
                        <div key={month} className="mb-8">
                          <h4 className="text-sienna text-xl md:text-2xl font-extralight uppercase">
                            {month}
                          </h4>
                        </div>
                      ))}
                  </div>
                  <div className="col-span-9">
                    {Object.keys(filteredGroupedPosts[year])
                      .sort((a, b) => moment(b, "MMM").month() - moment(a, "MMM").month())
                      .map((month) => (
                        <div key={month} className="mb-8">
                          <ul className="space-y-4">
                            {filteredGroupedPosts[year][month].map((post) => (
                              <li key={post._id} className="group">
                                <Link
                                  href={`/journals/${post.slug.current}`}
                                  aria-label="Open journal post"
                                  className="inline-block text-gray-200 text-xl md:text-2xl font-thin hover:text-sienna transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-sienna after:origin-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                                >
                                  {post.title}
                                  <span className="ml-3 text-sm text-gray-400">{post.category}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No articles found</p>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-4 px-6 py-2 bg-sienna text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
