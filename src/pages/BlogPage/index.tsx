import PostList from "../../components/PostList";
import Seo from "../../components/SEO";

const BlogPage = () => {
  return (
    <>
      <Seo
        title="Posts"
        metaDescription="Posts page"
        metaKeywords="Posts page Keywords"
      />
      <PostList />
    </>
  );
};

export default BlogPage;
