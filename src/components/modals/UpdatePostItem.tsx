import { Modal, Form, Input } from "antd";
import React from "react";
import { PostInterface } from "../../models/PostInterface";
import { postAPI } from "../../store/api/postAPI";
import { ToastContainer, toast } from "react-toastify";

interface UpdatePostItemProps {
  postItem: PostInterface;
  open: boolean;
  title: string;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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
    id: postItem.id,
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
    toast.success(
      "The article: " + postItemUpdate.title + " was updated",
      {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <Modal
        open={open}
        title={title}
        onOk={onFinish}
        onCancel={onCancel}
        okText="Update"
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          fields={[
            { name: ["title"], value: postItemUpdate.title },
            { name: ["content"], value: postItemUpdate.content },
          ]}
        >
          <Form.Item
            name="title"
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
            name="body"
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
