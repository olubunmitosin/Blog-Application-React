import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import FooterSite from "../components/master/Footer";
import HeaderSite from "../components/master/Header";

const { Content } = Layout;

export default function BlogLayout() {
  return (
    <>
      <Layout className="site-layout">
        <HeaderSite />
        <Content
          className="site-layout themed"
          style={{
            padding: "0 50px",
            margin: " 84px auto 0",
            width: "100%",
            maxWidth: 1200,
          }}
        >
          <Outlet />
        </Content>
        <FooterSite />
      </Layout>
    </>
  );
}
