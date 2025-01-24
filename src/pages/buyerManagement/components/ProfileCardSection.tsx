import { Card, Typography, Row, Col, Tag, Space, Image, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ProfileCardSection = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  const avatarUrl =
    data?.photoUrl || "https://i.ibb.co/QM9r3Ck/avatar-placeholder.png";

  return (
    <Row justify="center" style={{ padding: "20px" }}>
      <Col xs={24} md={16} lg={12} xl={12} style={{ width: "75%" }}>
        <Card
          bordered={false}
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#f6f9fc",
          }}
        >
          <Row gutter={16} align="middle">
            <Col span={12}>
              <Image
                width={250}
                src={avatarUrl}
                style={{ border: "1px solid #1890ff", borderRadius: "5px" }}
              />
            </Col>
            <Col span={12}>
              <Space direction="vertical" size={4} style={{ width: "100%" }}>
                <Title level={4} style={{ marginBottom: 0, textTransform: "capitalize" }}>
                  {data.name}
                </Title>
                <Text type="secondary">
                  <MailOutlined /> {data.email}
                </Text>
                <Text>
                  <PhoneOutlined /> {data.contactNumber || "N/A"}
                </Text>
                <Text>
                  <EnvironmentOutlined /> {data.address || "N/A"}
                </Text>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <Tag color={data.status === "active" ? "green" : "red"}>
                    {data.status.toUpperCase()}
                  </Tag>
                  <Tag color="blue">{data.role.toUpperCase()}</Tag>
                </div>
                <Button
                  type="primary"
                  style={{ marginTop: "16px", backgroundColor: "#1890ff" }}
                  onClick={() => navigate(`/${data?.role}/profile`)}
                >
                  View Profile
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileCardSection;
