import { Modal, Button, Typography, Card, Col, Row, Alert } from "antd";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const demoCredentials = [
  {
    role: 'Super Admin',
    email: 'john@example.com',
    password: 'superadmin123',
  },
  {
    role: 'Admin',
    email: 'alice@example.com',
    password: 'admin123',
  },
  {
    role: 'User',
    email: 'emily@example.com',
    password: 'user123',
  },
];

const ShowCredentialsModal = ({ open, setOpen }: TProps) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      visible={open}
      onCancel={handleCancel}
      footer={null}
      title="Show Demo Accounts"
      width={600}
    >
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <Alert
          message="Warning"
          description="These are demo credentials intended for demonstration purposes only! Please do not use them for actual authentication."
          type="warning"
          showIcon
          style={{ marginBottom: '16px' }}
        />

        <Row gutter={16} justify="center">
          {demoCredentials.map((credential, index) => (
            <Col span={24} key={index}>
              <Card
                title={credential.role}
                bordered={false}
                style={{
                  marginBottom: '16px',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                hoverable
                headStyle={{ backgroundColor: '#f0f2f5' }}
              >
                <Typography.Text strong>Email:</Typography.Text> {credential.email}<br />
                <Typography.Text strong>Password:</Typography.Text> {credential.password}
              </Card>
            </Col>
          ))}
        </Row>

        <Button
          type="primary"
          onClick={handleCancel}
          style={{ marginTop: '16px' }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ShowCredentialsModal;
