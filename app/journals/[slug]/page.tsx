/* eslint-disable @next/next/no-img-element */
// /app/journals/[slug]/page.tsx

import { getArticle, getRandomArticles } from "@/lib/api";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ptComponents } from "@/components/content/PortableTextComponents";
import { urlFor } from "@/lib/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import EnhancedComments from "@/components/content/EnhancedComments";
import JournalImageWithOverlay from "@/components/content/JournalImageWithOverlay";

// ******************
// Journal metadata
// ******************

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticle(slug);

  if (!post) {
    return {
      title: "Journal not found - Chukwudi Barrah",
    };
  }

  const imageUrl = urlFor(post.image).url();

  return {
    title: `${post.title} - Chukwudi Barrah`,
    description: post.description || `Read ${post.title}`,

    // OpenGraph metadata
    openGraph: {
      title: post.title,
      description: post.description || `Read ${post.title}`,
      url: `https://chukwudibarrah.com/journals/${post.slug.current}`,
      siteName: "Chukwudi Barrah",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_GB",
      type: "article",
      publishedTime: post.publishedAt,
    },

    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || `Read ${post.title}`,
      images: [imageUrl],
      creator: "@chukwudi.barrah",
    },

    // Basic metadata
    keywords: [post.category, post.description].filter(Boolean),

    // Robots metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Alternative versions
    alternates: {
      canonical: `https://chukwudibarrah.com/journals/${post.slug.current}`,
    },
  };
}

// ******************
// Journal
// ******************

export default async function JournalPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

    const formattedDate = formatDate(article.publishedAt);

    return (
      <AuthProvider>
        <article className="min-w-screen overflow-hidden">
          {article.image ? (
            <JournalImageWithOverlay
              image={article.image}
              category={article.category}
              title={article.title}
              date={formattedDate}
            />
          ) : (
            <div className="lg:px-28 md:px-16 px-4 my-20">
              <div className="text-persian text-sm uppercase tracking-wider mb-2">
                {article.category}
              </div>
              <h1 className="text-5xl md:text-8xl font-bold text-gray-200">
                {article.title}
              </h1>
              <p className="my-4 text-gray-200">{formattedDate}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 lg:gap-16 lg:px-28 md:px-16 px-4 my-16">
            <div className="lg:col-span-2 font-thin">
              <PortableText value={article.content} components={ptComponents} />

              {/* Enhanced Comments Section */}
              <EnhancedComments journalId={article._id} />

              <hr className="my-16 border-neutral-800 block lg:hidden" />
            </div>

            {/* Random Articles Section */}
            {randomPosts.length > 0 && (
              <div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-outfit lg:mt-6 mb-12">
                  You&apos;ll also want to see these
                </h3>
                <div className="grid gap-10 grid-cols-1">
                  {randomPosts.map((post) => (
                    <div key={post._id} className="">
                      <Link
                        href={`/journals/${post.slug.current}`}
                        aria-label="Open related article"
                        className="block group"
                      >
                        {post.image && (
                          <div className="w-full overflow-hidden rounded-[5px]">
                            <img
                              src={urlFor(post.image).url()}
                              alt={post.title}
                              className="w-full h-auto transform rounded-[5px] transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="text-persian text-sm uppercase tracking-wider mt-4">
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
      </AuthProvider>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    notFound();
  }
}
