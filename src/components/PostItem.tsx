import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { PostInterface } from "../models/PostInterface";
import { Link } from "react-router-dom";
import UpdatePostItem from "./modals/UpdatePostItem";
import ConfirmRemovePostItem from "./modals/ConfirmRemovePostItem";

const { Meta } = Card;

export interface PostItemProps {
  post: PostInterface;
  remove: (post: PostInterface) => void;
}

const PostItem = ({ post, remove }: PostItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);

  const handleCancelUpdate = () => {
    setIsModalOpen(false);
  };

  const handleOpenRemoveModal = () => {
    setIsConfirmRemoveOpen(true);
  };

  const handleCloseRemoveModal = () => {
    setIsConfirmRemoveOpen(false);
  };

  const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    remove(post);
  };

  const handlePostUpdateOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <UpdatePostItem
        title={`Update Post: ${post.title}`}
        open={isModalOpen}
        onCancel={handleCancelUpdate}
        postItem={post}
      />
      <ConfirmRemovePostItem
        onOk={handleRemove}
        open={isConfirmRemoveOpen}
        title="Please confirm Remove"
        onCancel={handleCloseRemoveModal}
        contentRemove={post.title}
      />
      <Card
        style={{ width: "100%", marginBottom: 20 }}
        actions={[
          <EditOutlined key="edit" onClick={handlePostUpdateOpen} />,
          <DeleteOutlined key="delete" onClick={handleOpenRemoveModal} />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={post.title}
          description={post.content.substring(0, 100)}
        />
        <div className="readMoreWrap">
          <Link to={`/posts/${post._id}`}>Read more...</Link>
        </div>
      </Card>
    </>
  );
};

export default PostItem;
