"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as contentful from "contentful";
import moment from "moment";

export default function Journal() {
  const [groupedPosts, setGroupedPosts] = useState({});

  const client = contentful.createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getEntries({
          content_type: "journal",
          order: ["fields.published"],
        });

        const groupedPostsByYear = response.items.reduce((acc, post) => {
          const publishedDate = post.fields.published;
          if (typeof publishedDate === "string") {
            const year = moment(publishedDate).format("YYYY");
            const month = moment(publishedDate).format("MMM");

            if (!acc[year]) {
              acc[year] = {};
            }

            if (!acc[year][month]) {
              acc[year][month] = [];
            }

            acc[year][month].push(post);
          }

          return acc;
        }, {});

        setGroupedPosts(groupedPostsByYear);
      } catch (error) {
        console.error("Error fetching Contentful entries:", error);
      }
    };

    fetchPosts();
  }, [client]);

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <h1
        className="fixed left-1/2 top-32 -translate-x-1/2 -z-0 text-[200px] leading-[150px] md:text-[400px] md:leading-[300px] opacity-5 text-gray-200/40 font-extrabold text-center whitespace-nowrap"
      >
        jour
        <br />
        nal
      </h1>
      <div className="relative max-w-6xl py-32 lg:px-28 md:px-16 px-4 z-10">
        {Object.keys(groupedPosts)
          .map(Number)
          .sort((a, b) => b - a)
          .map((year) => (
            <div key={year} className="mb-16">
              <div className="text-gray-200 font-thin text-sm md:text-base uppercase mb-8">
                {year}
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3">
                  {Object.keys(groupedPosts[year])
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
                  {Object.keys(groupedPosts[year])
                    .sort((a, b) => moment(b, "MMM").month() - moment(a, "MMM").month())
                    .map((month) => (
                      <div key={month} className="mb-8">
                        <ul className="space-y-4">
                          {groupedPosts[year][month].map((post) => (
                            <li key={post.sys.id} className="group">
                              <Link
                                href={`/journal/${post.fields.slug}`}
                                aria-label="Open journal post"
                                className="inline-block text-gray-200 text-xl md:text-2xl font-thin hover:text-sienna transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-sienna after:origin-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                              >
                                {post.fields.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
