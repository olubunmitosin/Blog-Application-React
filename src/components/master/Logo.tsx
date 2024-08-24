import { Typography } from "antd";
import { WithChildren } from "../../models/Types";

const { Title } = Typography;

interface LogoProps extends WithChildren {
  logoColor?: string;
}

const Logo = ({ logoColor, children }: LogoProps) => {
  return (
    <Title
      className="logo-site"
      level={4}
      style={{
        color: logoColor ? logoColor : "#000",
      }}
    >
      {children}
    </Title>
  );
};

export default Logo;
