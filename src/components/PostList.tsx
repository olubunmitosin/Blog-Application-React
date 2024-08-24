import React from "react";
import { postAPI } from "../store/api/postAPI";
import PostItem from "./PostItem";
import { PostInterface } from "../models/PostInterface";
import { Col, Divider, Row, FloatButton } from "antd";
import SpinnerPostList from "./SpinnerPostList";
import CreatePostItem from "./modals/CreatePostItem";
import { FileAddOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";

const PostList = () => {

  const { data: results, error, isLoading } = postAPI.useFetchAllPostsQuery({});

  // eslint-disable-next-line no-empty-pattern
  const [deletePost, {}] = postAPI.useDeletePostMutation();

  const [isOpenCreateModal, setIsOpenCreateModal] =
    React.useState<boolean>(false);

  const handleOpenCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setIsOpenCreateModal(false);
  };

  const handleRemove = (post: PostInterface) => {
    deletePost(post);
    toast("Post deleted successfully!");
  };

  return (
    <>
      <ToastContainer />
      <FloatButton
        tooltip={<div>Add new post</div>}
        onClick={handleOpenCreateModal}
        type="primary"
        icon={<FileAddOutlined />}
      />
      <CreatePostItem
        onOk={handleCloseCreateModal}
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
      />
      <Divider orientation="center">Blog Posts</Divider>
      {isLoading && <SpinnerPostList />}
      {error && <h1>Something wrong...</h1>}
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {results?.response?.map((post: PostInterface) => (
          <Col className="gutter-row" span={8} key={post._id}>
            <PostItem remove={handleRemove} post={post} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default PostList;
