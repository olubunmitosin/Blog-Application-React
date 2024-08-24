import { Modal, Form, Input } from "antd";
import React from "react";
import { PostInterface } from "../../models/PostInterface";
import { postAPI } from "../../store/api/postAPI";
import { toast } from "react-toastify";

interface CreatePostItemProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

interface Payload {
  [key: string]: any[];
}

const CreatePostItem = ({ open, onCancel }: CreatePostItemProps) => {
  const [form] = Form.useForm();
  // eslint-disable-next-line no-empty-pattern
  const [createPost, {}] = postAPI.useCreatePostMutation();
  const [postItem, setPostItem] = React.useState({
    title: "",
    content: "",
  } as PostInterface);


  const getErrorMessage = (payload: Payload) => {
    let message: string = '';
    for (const [key, value] of Object.entries(payload)) {
      for (const [index, item] of Object.entries(value)) {
        message += item + "\n";
      }
    }

    return message;
  }

  const onFinish = async (values: any) => {
    try {
      const result: any = await createPost({
        title: postItem.title,
        content: postItem.content,
      } as PostInterface);

      if (result.data.status) {
          toast("Post article has been created successfully!");
          form.resetFields();
          onCancel();
      } else {
        const message: string = getErrorMessage(result.data.response);
        toast.error(result.data.message + ": " + message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while logging in!");
    }
  };

  return (
    <>
      <Modal
        open={open}
        centered
        title="Create New Post"
        okText="Create"
        onCancel={onCancel}
        onOk={onFinish}
      >
        <Form layout="vertical" form={form} name="control-hooks">
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
              rows={5}
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
