import { Col, Row, Typography, Button } from "antd";

const { Title, Text, Paragraph } = Typography;

const BikeDetailsHeroSection = ({ bike, handleBuyNow }: any) => {
  return (
    <Row gutter={[16, 16]} align="middle">
      <Col xs={24} md={12}>
        <img
          src={bike.image}
          alt={bike.name}
          style={{
            width: "100%",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "transform 0.3s",
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        />
      </Col>
      <Col xs={24} md={12}>
        <Title level={2} style={{ color: "#333" }}>{bike.name}</Title>
        <Text strong style={{ fontSize: "18px", color: "#e53935" }}>
          Price: ${bike.price}
        </Text>
        <Paragraph style={{ marginTop: "10px", lineHeight: "1.6" }}>
          {bike.description}
        </Paragraph>
        <Button
          type="primary"
          size="large"
          style={{ borderRadius: "5px", backgroundColor: "#e53935", borderColor: "#e53935" }}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </Col>
    </Row>
  );
};

export default BikeDetailsHeroSection;
