import { Card, Button, Divider, Typography } from "antd";
import { useRouteError, useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ErrorRouterElement = () => {
  const goBack = () => navigate(-1);
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <Card title="Oppps!" style={{ width: "100%" }}>
        <Button type="primary" onClick={goBack} icon={<LeftOutlined />}>
          Go back
        </Button>
        <Divider />
        <Title level={5}>Something goes Wrong...</Title>
      </Card>
    </div>
  );
};

export default ErrorRouterElement;
