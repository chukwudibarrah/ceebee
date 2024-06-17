import PostContent from './PostContent';
import { generateStaticParams as fetchStaticParams } from './generateStaticParams';
import { getArticle } from "@/lib/api";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await fetchStaticParams();
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const article = await getArticle(slug);
  if (!article) {
    return {
      title: "Article not found",
      description: "The article you are looking for does not exist.",
    };
  }

  const articleFields = article.fields as {
    title: string;
    description: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };

  const title = `${articleFields.title} | Chukwudi Barrah`;

  return {
    title,
    description: articleFields.description,
    openGraph: {
      images: articleFields.featuredImage
        ? [`https:${articleFields.featuredImage.fields.file.url}`]
        : [],
    },
  };
}

const PostPage = ({ params }) => {
  const { slug } = params;

  return <PostContent slug={slug} />;
};

export default PostPage;
