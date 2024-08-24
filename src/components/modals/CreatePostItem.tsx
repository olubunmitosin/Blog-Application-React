import { Modal, Form, Input } from "antd";
import React from "react";
import { PostInterface } from "../../models/PostInterface";
import { postAPI } from "../../store/api/postAPI";
import { ToastContainer, toast } from "react-toastify";

interface CreatePostItemProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CreatePostItem = ({ open, onCancel }: CreatePostItemProps) => {
  const [form] = Form.useForm();
  // eslint-disable-next-line no-empty-pattern
  const [createPost, {}] = postAPI.useCreatePostMutation();
  const [postItem, setPostItem] = React.useState({
    title: "",
    content: "",
  } as PostInterface);

  const onFinish = async (values: any) => {
    try {
      await createPost({
        title: postItem.title,
        content: postItem.content,
      } as PostInterface);
      form.resetFields();
      onCancel();
      toast("A new article was created");
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        open={open}
        title="Create New Post"
        okText="Create"
        onCancel={onCancel}
        onOk={onFinish}
      >
        <Form {...layout} form={form} name="control-hooks">
          <Form.Item
            name="title"
            label="Post Title"
            rules={[{ required: true }]}
          >
            <Input
              onChange={(e: { target: { value: string } }) =>
                setPostItem({ ...postItem, title: e.target.value })
              }
              value={postItem.title}
            />
          </Form.Item>

          <Form.Item
            name="body"
            label="Post Content"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              allowClear
              showCount
              onChange={(e: { target: { value: any } }) =>
                setPostItem({ ...postItem, content: e.target.value })
              }
              value={postItem.content}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePostItem;
