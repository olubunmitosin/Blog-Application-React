import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone, ArrowRightOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Card, Col, Flex, Button, Typography, Form, Input, Row  } from "antd";
import Seo from "../../components/SEO";
import { AuthLoginInterface } from "../../models/AuthLoginInterface";
import { userAPI } from "../../store/api/userAPI";
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from "../../utilities/common";
const { Title, Text } = Typography;

const LoginPage: React.FC = () => {

  const navigate = useNavigate();
  // eslint-disable-next-line no-empty-pattern
  const [loginUser, {}] = userAPI.useLoginUserMutation();
  const [form] = Form.useForm();
  const [loginItem, setLoginItem] = React.useState({
    email: "",
    password: "",
  } as AuthLoginInterface);

  // Login User
  const onFinish = async (values: any) => {
    try {
      const result: any = await loginUser({
        email: loginItem.email,
        password: loginItem.password,
      } as AuthLoginInterface);

      if (result.data.status === false) {
        const message: string = getErrorMessage(result.data.response);
        toast.error(result.data.message + ": " + message);
      } else {
        // Set credentials
        localStorage.setItem("user", JSON.stringify(result.data.response));
        form.resetFields();
        navigate('/posts', {replace: true});
        navigate(0);
      }
    } catch (err) {
      toast.error("An error occurred while logging in!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Seo
        title="Login :: Blog Application"
        metaDescription="Login page"
        metaKeywords="Blog application, Blog Posts"
      />
      <div className="alignLeft pt50">
        <Row gutter={16}>
          <Col span={12} offset={6}>
            <Card className="auth-card">
              <div className="auth-header">
                <Title type="secondary" level={1}>Login</Title>
                <Text>Login to access and manage your blog posts!</Text>
              </div>
            <Form key={"login"} layout="vertical" onFinish={onFinish} form={form} name="login-user">
              <Form.Item
                name="email"
                label="Email Address"
                rules={[{ required: true }]}
              >
                <Input
                  size="large"
                  placeholder="Enter your email address"
                  onChange={(e: { target: { value: string } }) =>
                    setLoginItem({ ...loginItem, email: e.target.value })
                  }
                  value={loginItem.email}
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
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  onChange={(e: { target: { value: any } }) =>
                    setLoginItem({ ...loginItem, password: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item className="button-form-item">
                <Flex vertical gap="small" style={{ width: '60%' }}>
                  <Button htmlType="submit" iconPosition="end" size="large" className="auth-button" icon={<ArrowRightOutlined/>} block>Login</Button>
                </Flex>
              </Form.Item>
              <Form.Item className="alignCenter">
                <Text>Don't have an account?</Text> <Button href="/register" type="link"> Register</Button>
              </Form.Item>
            </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginPage;
