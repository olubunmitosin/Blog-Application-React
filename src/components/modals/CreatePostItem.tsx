import { Modal, Form, Input } from "antd";
import React from "react";
import { PostInterface } from "../../models/PostInterface";
import { postAPI } from "../../store/api/postAPI";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utilities/common";

interface CreatePostItemProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}



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
      const result: any = await createPost({
        title: postItem.title,
        content: postItem.content,
      } as PostInterface);

      if (result.data.status === true) {
        toast.success(
          "Post article has been created successfully!",
          {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
          }
        );
          
          form.resetFields();
          onCancel();
      } else {
        const message: string = getErrorMessage(result.data.response);
        toast.error(result.data.message + ": " + message);
      }
    } catch (err) {
      //console.log(err);
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
        <Form key={"createPost"} layout="vertical" form={form} name="create-post-hooks">
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
            name="content"
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
