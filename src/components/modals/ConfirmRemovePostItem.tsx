import { Modal, Typography } from "antd";

const { Title } = Typography;

interface ConfirmRemovePostItemProps {
  open: boolean;
  title: string;
  onOk: (values: any) => void;
  onCancel: () => void;
  contentRemove: string;
}

const ConfirmRemovePostItem = ({
  open,
  title,
  onOk,
  onCancel,
  contentRemove,
}: ConfirmRemovePostItemProps) => {
  return (
    <Modal open={open} title={title} onOk={onOk} onCancel={onCancel}>
      <Title level={4}>{contentRemove}</Title>
    </Modal>
  );
};

export default ConfirmRemovePostItem;
