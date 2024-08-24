import { Typography } from "antd";
import { WithChildren } from "../../models/Types";

const { Title } = Typography;

interface LogoProps extends WithChildren {
  logoSize?: number;
  logoColor?: string;
}

const Logo = ({ logoSize, logoColor, children }: LogoProps) => {
  return (
    <Title
      className="logo-site"
      level={4}
      style={{
        fontSize: logoSize ? logoSize : 16,
        color: logoColor ? logoColor : "#000",
      }}
    >
      {children}
    </Title>
  );
};

export default Logo;
