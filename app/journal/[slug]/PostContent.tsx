"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getArticle, getRelatedArticles } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { zilla } from "@/styles/fonts";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { ArticleEntry } from "@/lib/contentfulTypes";
import Link from "next/link";

const PostContent = ({ slug }: { slug: string }) => {
  const [article, setArticle] = useState<ArticleEntry | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleEntry[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticle(slug);
        if (fetchedArticle) {
          setArticle(fetchedArticle);

          // Ensure related entries are properly typed and checked
          const relatedEntries = fetchedArticle.fields.related as unknown;
          if (
            Array.isArray(relatedEntries) &&
            relatedEntries.every((item) => item.sys && item.fields)
          ) {
            const related = await getRelatedArticles(
              relatedEntries as ArticleEntry[]
            );
            setRelatedArticles(related);
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

  const renderOptions = {
    renderNode: {
      "embedded-asset-block": (node: any) => (
        <Image
          key={node.data.target.sys.id}
          src={`https:${node.data.target.fields.file.url}`}
          alt={node.data.target.fields.description}
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
        />
      ),
      "heading-4": (node) => (
        <h4 className="text-2xl md:text-4xl">
          {node.content.map((item, index) => (
            <span key={index}>
              {documentToReactComponents(item, renderOptions)}
            </span>
          ))}
        </h4>
      ),
      paragraph: (node) => (
        <p className="leading-loose md:text-xl lg:text-2xl my-7">
          {node.content.map((item, index) => (
            <span key={index}>
              {documentToReactComponents(item, renderOptions)}
            </span>
          ))}
        </p>
      ),
      "ordered-list": (node) => (
        <p className="leading-loose md:text-xl lg:text-2xl my-7 list-decimal list-inside">
          {node.content.map((item, index) => (
            <span key={index}>
              {documentToReactComponents(item, renderOptions)}
            </span>
          ))}
        </p>
      ),
      "unordered-list": (node) => (
        <p className="leading-loose md:text-xl lg:text-2xl my-7 list-disc list-outside">
          {node.content.map((item, index) => (
            <span key={index}>
              {documentToReactComponents(item, renderOptions)}
            </span>
          ))}
        </p>
      ),
      hyperlink: (node) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          id="animate"
        >
          {node.content[0].value}
        </a>
      ),
    },
    renderMark: {
      code: (text: any) => {
        return (
          <code
            className={`bg-neutral-900 p-1 rounded-sm py-2 px-5 ${zilla.className}`}
          >
            {text}
          </code>
        );
      },
    },
  };

  const articleFields = article.fields as {
    title: string;
    slug: string;
    description: string;
    related: any; // Adjust to the correct type if possible
    content: any; // Adjust to the correct type if possible
    published: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
      };
    };
  };

  return (
    <article className="min-w-screen overflow-hidden bg-neutral-950">
      <div className="lg:px-28 md:px-16 px-4 my-10">
        <h1 className="text-5xl md:text-8xl font-bold text-gray-200">
          {articleFields.title}
        </h1>
        <p className="my-4 text-gray-200">
          {formatDate(articleFields.published)}
        </p>
      </div>
      {articleFields.featuredImage && (
        <div className="lg:px-28 md:px-16 px-4 my-10 w-full">
          <Image
            src={`https:${articleFields.featuredImage.fields.file.url}`}
            alt="Article Thumbnail"
            width={articleFields.featuredImage.fields.file.details.image.width}
            height={
              articleFields.featuredImage.fields.file.details.image.height
            }
          />
        </div>
      )}
      <div className="lg:px-28 md:px-16 px-4 my-16">
        <div className="my-16 text-gray-200">
          {documentToReactComponents(articleFields.content, renderOptions)}
        </div>
        <hr />
        <div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-outfit mt-20 mb-12 text-gray-200">
            Continue reading
          </h3>
        </div>
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-2">
          {relatedArticles.map((relatedArticle) => {
            const relatedFields = relatedArticle.fields as {
              title: string;
              description: string;
              slug: string;
              featuredImage?: {
                fields: {
                  file: {
                    url: string;
                    details: {
                      image: {
                        width: number;
                        height: number;
                      };
                    };
                  };
                };
              };
            };
            return (
              <div key={relatedArticle.sys.id} className="">
                <Link 
                href={`/journal/${relatedFields.slug}`}
                aria-label="Open related article"
                >
                  {relatedFields.featuredImage && (
                    <div className="w-full">
                      <Image
                        src={`https:${relatedFields.featuredImage.fields.file.url}`}
                        alt="Article Thumbnail"
                        width={
                          relatedFields.featuredImage.fields.file.details.image
                            .width
                        }
                        height={
                          relatedFields.featuredImage.fields.file.details.image
                            .height
                        }
                      />
                    </div>
                  )}
                  <h4 className="text-2xl font-bold text-gray-200 pt-7">
                    {relatedFields.title}
                  </h4>
                  <p className="text-gray-200 pt-3 pb-10">
                  {relatedFields.description}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default PostContent;
