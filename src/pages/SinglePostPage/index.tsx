import { Button, Divider, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { postAPI } from "../../store/api/postAPI";
import { ArrowLeftOutlined } from "@ant-design/icons";

const SinglePostPage = () => {
  const { postId } = useParams();
  const goBack = () => navigate(-1);
  const navigate = useNavigate();
  const {
    data: post,
    isFetching,
    isError,
    // isSuccess
  } = postAPI.useGetSinglePostQuery(postId);
  return (
    <>
      <Button type="text" onClick={goBack} icon={<ArrowLeftOutlined />}>
        Go back
      </Button>
      <Divider />
      {isFetching && <>Loading...</>}
      {isError && <>Something goes Wrong</>}
      {post && (
        <Card>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </Card>
      )}
      {/* <Link to={`/editPost/${post.id}`} className='button'>
        Edit Post
      </Link> */}
    </>
  );
};

export default SinglePostPage;
