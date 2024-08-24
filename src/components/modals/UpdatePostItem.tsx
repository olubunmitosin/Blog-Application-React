import { Modal, Form, Input } from "antd";
import React from "react";
import { PostInterface } from "../../models/PostInterface";
import { postAPI } from "../../store/api/postAPI";
import { toast } from "react-toastify";

interface UpdatePostItemProps {
  postItem: PostInterface;
  open: boolean;
  title: string;
  onCancel: () => void;
}

const UpdatePostItem = ({
  open,
  title,
  onCancel,
  postItem,
}: UpdatePostItemProps) => {
  // eslint-disable-next-line no-empty-pattern
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [form] = Form.useForm();

  const [postItemUpdate, setPostItemUpdate] = React.useState<PostInterface>({
    id: postItem._id,
    title: postItem.title,
    content: postItem.content,
  } as PostInterface);

  const onFinish = () => {
    updatePost({
      ...postItemUpdate,
      id: postItemUpdate.id,
      title: postItemUpdate.title,
      content: postItemUpdate.content,
    });
    onCancel();
    toast.success("The article: " + postItemUpdate.title + " was updated", {
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
    });
  };

  return (
    <>
      <Modal
        key={"update" + postItemUpdate._id}
        open={open}
        title={title}
        onOk={onFinish}
        onCancel={onCancel}
        okText="Update"
      >
        <Form
          key={"update_" + postItemUpdate._id}
          layout="vertical"
          form={form}
          name="update-post-item"
          fields={[
            { name: ["update_title"], value: postItemUpdate.title },
            { name: ["update_content"], value: postItemUpdate.content },
          ]}
        >
          <Form.Item
            key={"update_title_" + postItemUpdate._id}
            name="update_title"
            label="Post Title"
            rules={[{ required: true }]}
          >
            <Input
              onChange={(e: any) =>
                setPostItemUpdate({ ...postItemUpdate, title: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            key={"update_content_" + postItemUpdate._id}
            name="update_content"
            label="Post Content"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              allowClear
              showCount
              onChange={(e: any) =>
                setPostItemUpdate({
                  ...postItemUpdate,
                  content: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePostItem;
