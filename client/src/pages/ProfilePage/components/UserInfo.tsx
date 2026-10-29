import { Card, Col, Row, Typography } from 'antd';

const { Title, Text } = Typography;

const UserInformation = ({ data }: any) => {
  return (
    <div>
      <Title level={4} style={{ color: '#1890ff', marginBottom: 16 }}>
        Personal Information
      </Title>

      <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Name</Text>
            <div className='uppercase'>{data?.name}</div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Role</Text>
            <div className='uppercase'>{data?.role}</div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Email</Text>
            <div>{data?.email}</div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Gender</Text>
            <div className='uppercase'>{data?.gender}</div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Contact No</Text>
            <div>{data?.contactNumber}</div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Address</Text>
            <div>{data?.address}</div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Joined</Text>
            <div>{new Date(data?.createdAt).toLocaleDateString()}</div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Text type="secondary">Current Status</Text>
            <div className='uppercase'>{data?.status}</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserInformation;
