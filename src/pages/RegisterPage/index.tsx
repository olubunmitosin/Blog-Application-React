import React from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Card, Col, Flex, Button, Typography, Form, Input, Row } from "antd";
import Seo from "../../components/SEO";
import { useNavigate } from "react-router-dom";
import { AuthRegisterInterface } from "../../models/AuthRegisterInterface";
import { userAPI } from "../../store/api/userAPI";
import { getErrorMessage } from "../../utilities/common";

const { Title, Text } = Typography;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-empty-pattern
  const [registerUser, {}] = userAPI.useRegisterUserMutation();
  const [form] = Form.useForm();
  const [registerItem, setRegisterItem] = React.useState({
    name: "",
    email: "",
    password: "",
  } as AuthRegisterInterface);

  // Register User
  const onFinish = async (values: any) => {
    try {
      const result: any = await registerUser({
        name: registerItem.name,
        email: registerItem.email,
        password: registerItem.password,
      } as AuthRegisterInterface);

      if (!result.data.status) {
        const message: string = getErrorMessage(result.data.response);
        toast.error(result.data.message + ": " + message);
      } else {
        // Set credentials
        form.resetFields();
        toast("You are successfully registered. Kindly proceed to login!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error("An error occurred while logging in!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Seo
        title="Register :: Blog Application"
        metaDescription="Register page"
        metaKeywords="Blog application, Blogger, Blog Posts"
      />
      <div className="alignLeft pt50">
        <Row gutter={16}>
          <Col span={12} offset={6}>
            <Card className="auth-card">
              <div className="auth-header">
                <Title type="secondary" level={1}>
                  Register
                </Title>
                <Text>
                  Register an account to access and manage blog posts!
                </Text>
              </div>
              <Form
                key={"register"}
                layout="vertical"
                onFinish={onFinish}
                form={form}
                name="register-user"
              >
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true }]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your full name"
                    onChange={(e: { target: { value: string } }) =>
                      setRegisterItem({ ...registerItem, name: e.target.value })
                    }
                    value={registerItem.name}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[{ required: true }]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email address"
                    onChange={(e: { target: { value: string } }) =>
                      setRegisterItem({
                        ...registerItem,
                        email: e.target.value,
                      })
                    }
                    value={registerItem.email}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                >
                  <Input.Password
                    size="large"
                    placeholder="************"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    onChange={(e: { target: { value: any } }) =>
                      setRegisterItem({
                        ...registerItem,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item className="button-form-item">
                  <Flex vertical gap="small" style={{ width: "60%" }}>
                    <Button
                      htmlType="submit"
                      iconPosition="end"
                      size="large"
                      className="auth-button"
                      icon={<ArrowRightOutlined />}
                      block
                    >
                      Register
                    </Button>
                  </Flex>
                </Form.Item>
                <Form.Item className="alignCenter">
                  <Text>Already have an account?</Text>{" "}
                  <Button href="/login" type="link">
                    {" "}
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RegisterPage;
