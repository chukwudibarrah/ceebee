import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient, Entry } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import LoadingAnimation from "@/app/components/LoadingAnimation";

interface ImageFileDetails {
  image: {
    width: number;
    height: number;
  };
}

interface ImageFile {
  url: string;
  details: ImageFileDetails;
}

interface ImageFields {
  file: ImageFile;
  description: string;
  fields: any; // Add fields property
}

interface RelatedPostFields {
  slug: string;
  title: string;
  featuredImage?: Entry<ImageFields>;
  fields: any; // Add fields property
}

interface PostFields {
  title: string;
  slug: string;
  content: any; // Adjust this according to your actual content type
  featuredImage?: Entry<ImageFields>;
  published: string;
  related?: Entry<RelatedPostFields>[];
  fields: any; // Add fields property
}

type Post = Entry<PostFields>;

const PostContent = ({ slug }: { slug: string }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug || !isFetching) {
        return;
      }
      try {
        const response = await client.getEntries<PostFields>({
          content_type: "journal",
          "fields.slug": slug,
        });

        if (response.items.length > 0) {
          setPost(response.items[0]);
          setError(null);
        } else {
          setError("Post not found");
        }
      } catch (error) {
        setError("Error fetching Contentful entry");
      } finally {
        setIsFetching(false);
      }
    };

    fetchPost();
  }, [client, slug, isFetching]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-UK", options);
  };

  if (isFetching) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>No post found.</div>;
  }

  const options = {
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
      "heading-4": (node: any) => (
        <h4 className="text-2xl md:text-4xl">
          {node.content.map((item: any, index: any) => (
            <span key={index}>{documentToReactComponents(item, options)}</span>
          ))}
        </h4>
      ),
      paragraph: (node: any) => (
        <p className="leading-normal text-base lg:text-xl my-7">
          {node.content.map((item: any, index: any) => (
            <span key={index}>{documentToReactComponents(item, options)}</span>
          ))}
        </p>
      ),
      hyperlink: (node: any) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer" id="animate">
          {node.content[0].value}
        </a>
      ),
    },
  };

  return (
    <article className="min-w-screen overflow-hidden bg-neutral-950">
      <div className="">
        <div className="md:mx-28 mx-4 my-10">
          <h1 className="text-5xl md:text-8xl font-bold text-gray-200">{post.fields.title}</h1>
          <p className="my-4 text-gray-200">{formatDate(post.fields.published)}</p>
        </div>
        {post.fields.featuredImage && (
          <Image
            src={`https:${post.fields.featuredImage.fields.file.url}`}
            alt="Post Thumbnail"
            width={post.fields.featuredImage.fields.file.details.image.width}
            height={post.fields.featuredImage.fields.file.details.image.height}
          />
        )}
      </div>
      <div className="md:mx-28 mx-4 my-16">
        <div className="my-16 text-gray-200">{documentToReactComponents(post.fields.content, options)}</div>
        <hr />
        <div>
          <h3 className="text-4xl font-outfit mt-20 mb-12 text-gray-200">Continue reading</h3>
        </div>
        <div className="related-articles grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-200">
          {post.fields.related?.map((relatedPost) => (
            <Link key={relatedPost.sys.id} href={`/journal/${relatedPost.fields.slug}`} passHref>
              <div className="related-article-card">
                {relatedPost.fields.featuredImage && (
                  <Image
                    src={`https:${relatedPost.fields.featuredImage.fields.file.url}`}
                    alt={relatedPost.fields.title}
                    className="max-w-full h-auto hover:scale-95 transition-all duration-700 ease-in-out overflow-hidden"
                    width={relatedPost.fields.featuredImage.fields.file.details.image.width}
                    height={relatedPost.fields.featuredImage.fields.file.details.image.height}
                  />
                )}
                <h4 className="text-3xl font-outfit my-4 hover:text-sienna">{relatedPost.fields.title}</h4>
                <p className="mt-1 font-zilla md:text-2xl font-light">{relatedPost.fields.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostContent;
