import React, { useEffect } from "react";
import { Layout, Menu, Row, Col } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import type { MenuProps } from "antd";
import {
  ReadOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { userAPI } from "../../store/api/userAPI";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getCurrentUser } from "../../services/auth.service";

const { Header } = Layout;

export interface HeaderProps {
  isAuthenticated?: boolean;
}

const HeaderSite = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const user = getCurrentUser();
  const navigate = useNavigate();
  // eslint-disable-next-line no-empty-pattern
  const [logoutUser, {}] = userAPI.useLogoutUserMutation();

  useEffect(() => {
    if (!user) {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated, user]);

  // Login User
  const handleLogout = async (values: any) => {
    try {
      const result: any = await logoutUser({});
      if (!result.data.status) {
        toast.error(result.data.message);
      } else {
        // Set credentials
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
    } catch (err) {
      toast.error("An error occurred while trying to logout!");
    }
  };

  type MenuItem = Required<MenuProps>["items"][number];

  const protectedItems: MenuItem[] = [
    { label: <NavLink to="/">Home</NavLink>, key: "/", icon: <HomeOutlined /> },
    {
      label: <NavLink to="/posts">Posts</NavLink>,
      key: "/posts",
      icon: <ReadOutlined />,
    },
    {
      label: (
        <NavLink to="/" onClick={handleLogout}>
          Logout
        </NavLink>
      ),
      key: "/logout",
      icon: <LogoutOutlined />,
    },
  ];

  const openItems: MenuItem[] = [
    { label: <NavLink to="/">Home</NavLink>, key: "/", icon: <HomeOutlined /> },
    {
      label: <NavLink to="/login">Login</NavLink>,
      key: "/login",
      icon: <LoginOutlined />,
    },
    {
      label: <NavLink to="/register">Register</NavLink>,
      key: "/register",
      icon: <UserAddOutlined />,
    },
  ];

  const location = useLocation();
  return (
    <Header
      data-theme="light"
      className="site-layout-background site-layout-header"
    >
      <ToastContainer />
      <Row>
        <Col span={8}>
          <Logo logoColor="#333" logoSize={20}>
            Blog Application
          </Logo>
        </Col>
        <Col span={8} offset={8}>
          <Menu
            style={{ border: 0, background: "transparent" }}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["/"]}
            selectedKeys={[location.pathname]}
            items={isAuthenticated ? protectedItems : openItems}
          />
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderSite;
