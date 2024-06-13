import PostContent from './PostContent';

const PostPage = ({ params }) => {
  const { slug } = params;

  return (
    <PostContent slug={slug} />
  );
};

export default PostPage;
