import React from "react";
import { postAPI } from "../store/api/postAPI";
import PostItem from "./PostItem";
import { PostInterface } from "../models/PostInterface";
import { Col, Divider, Row, Pagination, FloatButton } from "antd";
// import type { PaginationProps } from 'antd';
import SpinnerPostList from "./SpinnerPostList";
import CreatePostItem from "./modals/CreatePostItem";
import { FileAddOutlined } from "@ant-design/icons";

const PostList = () => {
  const limit = 10;
  const {
    data: posts,
    error,
    isLoading,
  } = postAPI.useFetchAllPostsQuery(limit);

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
  };

  console.log('All pages:', limit);

  return (
    <>
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
      {/* <div>{`${posts?.total || 'NA'}`}</div> */}
      <Divider orientation="center">Articles</Divider>
      {isLoading && <SpinnerPostList />}
      {error && <h1>Something wrong...</h1>}
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {posts?.map((post) => (
          <Col className="gutter-row" span={8} key={post.id}>
            <PostItem remove={handleRemove} post={post} />
          </Col>
        ))}
      </Row>
      <Divider />
      <Pagination
        // showSizeChanger
        // onShowSizeChange={onShowSizeChange}
        defaultCurrent={1}
        total={100}
      />
    </>
  );
};

export default PostList;
