import {
  isRouteErrorResponse,
  useRouteError,
  useNavigate,
} from "react-router-dom";
import { Button, Empty, Typography } from "antd";

const { Title } = Typography;

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const goHome = () => navigate("/", { replace: true });

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.message || "Something goes wrong!"}</h2>
        <h3>{error.data.reason}</h3>
      </div>
    );
  }

  return (
    <div className="error-wrap">
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 160,
        }}
        description={<Title level={2}>Something goes Wrong</Title>}
      >
        <Button type="primary" size="large" onClick={goHome}>
          Back to Home Page
        </Button>
      </Empty>
    </div>
  );
};

export default ErrorPage;
