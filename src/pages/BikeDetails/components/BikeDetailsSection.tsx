import { Col, Row, Typography, Avatar, Divider, Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const BikeDetailsSection = ({ bike }: any) => {
  return (
    <>
      <Divider style={{ borderColor: "#e0e0e0" }} />

      <Title level={3} style={{ color: "#333" }}>Bike Details</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Brand:</Text> <Text>{bike.brand}</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Model:</Text> <Text>{bike.model}</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Type:</Text> <Text>{bike.type}</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Color:</Text> <Text>{bike.color}</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Size:</Text> <Text>{bike.size}</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Frame Material:</Text> <Text>{bike.frameMaterial}</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Suspension Type:</Text>{" "}
          <Text>{bike.suspensionType}</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Manufacturer Country:</Text>{" "}
          <Text>{bike.manufacturerCountry}</Text>
        </Col>
      </Row>
      
      <Divider style={{ borderColor: "#e0e0e0" }} />

      <Title level={3} style={{ color: "#333" }}>Seller Information</Title>
      <Row gutter={[16, 16]} align="middle">
        <Col>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            src={bike.seller.photoUrl || "https://randomuser.me/api/portraits/men/32.jpg"}
            style={{ backgroundColor: "#f5f5f5", border: "2px solid #e0e0e0" }}
          />
        </Col>
        <Col>
          <Text strong style={{ color: "#333" }}>Name:</Text> <Text>{bike.seller.name}</Text>
          <br />
          <Text strong style={{ color: "#333" }}>Email:</Text> <Text>{bike.seller.email}</Text>
          <br />
          <Text strong style={{ color: "#333" }}>Contact:</Text> <Text>{bike.seller.contactNumber}</Text>
        </Col>
      </Row>
      
      <Title level={3} style={{ color: "#333", marginTop: "15px" }}>Customer Reviews</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>John Doe:</Text>
          <Rate value={4} disabled style={{ marginBottom: "5px" }} />
          <Paragraph style={{ marginBottom: "0" }}>
            "Great bike! Handles well on rough terrains and the suspension is
            top-notch."
          </Paragraph>
        </Col>
        <Col xs={24} sm={12} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Jane Smith:</Text>
          <Rate value={5} disabled style={{ marginBottom: "5px" }} />
          <Paragraph style={{ marginBottom: "0" }}>
            "Worth every penny! The design and performance exceeded my
            expectations."
          </Paragraph>
        </Col>
      </Row>
      <Divider style={{ borderColor: "#e0e0e0" }} />

      <Title level={3} style={{ color: "#333" }}>Specifications</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Weight:</Text> <Text>12.5kg</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Gear System:</Text> <Text>30-speed</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Brakes:</Text> <Text>Hydraulic disc brakes</Text>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Text strong>Tires:</Text> <Text>Tubeless</Text>
        </Col>
      </Row>
    </>
  );
};

export default BikeDetailsSection;
