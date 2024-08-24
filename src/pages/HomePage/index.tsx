import React from "react";
import { Typography } from "antd";
import Seo from "../../components/SEO";
const { Title } = Typography;

const HomePage: React.FC = () => {
  return (
    <>
      <Seo
        title="Home"
        metaDescription="Home page"
        metaKeywords="Blog application, Posts"
      />
      <div className="alignCenter pt50">
        <div className="">
          <Title>Blog Application using:</Title>
          <Title level={2} type="secondary">
            TypeScript, Ant Design, React Toolkit, RTK Query
          </Title>
        </div>
      </div>
    </>
  );
};

export default HomePage;
