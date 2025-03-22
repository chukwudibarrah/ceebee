// components/content/PostContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getArticle, ArticleEntry } from "@/lib/api";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import LoadingAnimation from "@/components/functions/LoadingAnimation";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import Comments from "./EnhancedComments";
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/react";
import { ptComponents } from "./PortableTextComponents";

const PostContent = ({ slug }: { slug: string }) => {
  const [article, setArticle] = useState<ArticleEntry | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleEntry[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticle(slug);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
          
          if (fetchedArticle.related && fetchedArticle.related.length > 0) {
            setRelatedArticles(fetchedArticle.related);
          }
        } else {
          setError("Article not found");
        }
      } catch (error) {
        setError("Error fetching article");
      } finally {
        setIsFetching(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-UK", options);
  };

  if (!pathname) {
    return null;
  }

  if (isFetching) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>No article found.</div>;
  }

  return (
    <article className="min-w-screen overflow-hidden">
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
          <Image
            src={urlFor(article.image).url()}
            alt={article.title}
            width={1200}
            height={675}
            className="w-full h-auto rounded-md"
            priority
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
        
        {/* Comments Section */}
        <div className="mt-16 border-t border-neutral-800 pt-10">
          <h2 className="text-4xl font-bold text-gray-200 mb-8">Discussion</h2>
          <Comments journalId={article._id} />
          <CommentForm journalId={article._id} />
        </div>
        
        <hr className="my-16 border-neutral-800" />
        
        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-outfit mt-20 mb-12 text-gray-200">
              Continue reading
            </h3>
            <div className="grid gap-10 grid-cols-1 lg:grid-cols-2">
              {relatedArticles.map((relatedArticle) => (
                <div key={relatedArticle._id} className="">
                  <Link 
                    href={`/journals/${relatedArticle.slug.current}`}
                    aria-label="Open related article"
                    className="block group"
                  >
                    {relatedArticle.image && (
                      <div className="w-full overflow-hidden rounded-md">
                        <Image
                          src={urlFor(relatedArticle.image).url()}
                          alt={relatedArticle.title}
                          width={600}
                          height={400}
                          className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="text-sienna text-sm uppercase tracking-wider mt-4">
                      {relatedArticle.category}
                    </div>
                    <h4 className="text-2xl font-bold text-gray-200 pt-2 group-hover:text-sienna transition-colors">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-gray-300 pt-3 pb-10">
                      {relatedArticle.description}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostContent;
