/* eslint-disable @next/next/no-img-element */
// /app/journals/[slug]/page.tsx

// This is a server component - no "use client" directive

import { getArticle, getRandomArticles } from "@/lib/api";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import Link from "next/link";
import { ptComponents } from "@/components/content/PortableTextComponents";
import { urlFor } from "@/lib/client";
import ClientComments from "./ClientComments";
import { notFound } from "next/navigation";

// Server components can use async/await directly
export default async function JournalPost({ params }: { params: { slug: string } }) {
  // Now we can directly use params.slug (no Promise handling needed in server components)
  const { slug } = await params;
  
  try {
    // Fetch the article
    const article = await getArticle(slug);
    
    // If article not found, show 404
    if (!article) {
      notFound();
    }
    
    // Fetch random articles (excluding current one)
    const randomPosts = await getRandomArticles(slug, 3);
    
    // Format date on the server
    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString("en-UK", options);
    };

    return (
      <article className="min-w-screen overflow-hidden bg-neutral-950">
        <div className="lg:px-28 md:px-16 px-4 my-10">
          <div className="text-sienna text-sm uppercase tracking-wider mb-2">
            {article.category}
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-gray-200">
            {article.title}
          </h1>
          <p className="my-4 text-gray-200">
            {formatDate(article.publishedAt)}
          </p>
        </div>
        
        {article.image && (
          <div className="lg:px-28 md:px-16 px-4 my-10 w-full">
            <img
              src={urlFor(article.image).url()}
              alt={article.title}
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
        
        <div className="lg:px-28 md:px-16 px-4 my-16">
          {article.description && (
            <div className="text-xl md:text-2xl text-gray-300 border-l-4 border-sienna pl-6 py-2 mb-12 italic">
              {article.description}
            </div>
          )}
          
          <div className="my-16 text-gray-200">
            <PortableText value={article.content} components={ptComponents} />
          </div>
          
          {/* Client Component for Comments Section */}
          <ClientComments journalId={article._id} />
          
          <hr className="my-16 border-neutral-800" />
          
          {/* Random Articles Section */}
          {randomPosts.length > 0 && (
            <div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-outfit mt-20 mb-12 text-gray-200">
                You may also like
              </h3>
              <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
                {randomPosts.map((post) => (
                  <div key={post._id} className="">
                    <Link 
                      href={`/journals/${post.slug.current}`}
                      aria-label="Open related article"
                      className="block group"
                    >
                      {post.image && (
                        <div className="w-full overflow-hidden rounded-md">
                          <img
                            src={urlFor(post.image).url()}
                            alt={post.title}
                            className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="text-sienna text-sm uppercase tracking-wider mt-4">
                        {post.category}
                      </div>
                      <h4 className="text-xl font-bold text-gray-200 pt-2 group-hover:text-sienna transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      {post.description && (
                        <p className="text-gray-300 pt-3 pb-10 line-clamp-2">
                          {post.description}
                        </p>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    notFound();
  }
}
