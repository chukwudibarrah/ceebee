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
          order: ["fields.published"], // Sort by published date
        });

        // Grouping posts by year and month of publication
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
    <div className="flex min-h-screen w-screen overscroll-none bg-neutral-950 justify-center">
      <h1
        className={`fixed pt-64 -z-0 text-[200px] leading-[150px] md:text-[400px] md:leading-[300px] opacity-5 text-gray-200/40 font-extrabold`}
      >
        jour
        <br />
        nal
      </h1>
      <div className="py-32 justify-items-center md:mx-28 mx-4 z-10">
        {Object.keys(groupedPosts)
          .map(Number) // Convert keys to numbers
          .sort((a, b) => b - a) // Sort by latest year first
          .map((year) => (
            <div key={year} className="pb-10">
              <h3
                className={`text-sienna font-thin text-sm md:text-normal uppercase pb-2 pt-10`}
              >
                {year}
              </h3>
              <div className="grid grid-cols-3">
                <div>
                  {Object.keys(groupedPosts[year])
                    .sort((a, b) => moment(b, "MMM").month() - moment(a, "MMM").month()) // Sort months in reverse order
                    .map((month) => (
                      <div key={month} className="pb-12 xl:pb-5">
                        <h4
                          className={`uppercase text-sienna text-xl md:text-2xl font-extralight`}
                        >
                          {month}
                        </h4>
                      </div>
                    ))}
                </div>
                <div className="col-span-2">
                  {Object.keys(groupedPosts[year])
                    .sort((a, b) => moment(b, "MMMM").month() - moment(a, "MMMM").month())
                    .map((month) => (
                      <ul
                        key={month}
                        className="list-disc list-inside text-gray-200 text-xl md:text-4xl font-outfit font-thin"
                      >
                        {groupedPosts[year][month].map((post) => (
                          <li className="pb-4 group" key={post.sys.id}>
                            <Link
                              href={`/journal/${post.fields.slug}`}
                              className={`bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna md:text-2xl font-thin`}
                            >
                              {post.fields.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
