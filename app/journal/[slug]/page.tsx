import PostContent from './PostContent';
import { generateStaticParams as fetchStaticParams } from './generateStaticParams';

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await fetchStaticParams();
  return slugs.map(({ slug }) => ({
    slug,
  }));
}

const PostPage = ({ params }) => {
  const { slug } = params;

  return <PostContent slug={slug} />;
};

export default PostPage;
