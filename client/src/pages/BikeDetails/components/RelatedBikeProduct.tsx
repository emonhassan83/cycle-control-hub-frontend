import { Row, Col, Card, Button, Divider, Typography } from "antd";

const { Title, Text } = Typography;

const RelatedBikes = ({ relatedBikes }: { relatedBikes: any }) => {
  return (
    <>
      <Divider style={{ borderColor: "#e0e0e0" }} />

      <Title level={3} style={{ color: "#333" }}>
        Related Bikes
      </Title>
      <Row gutter={[16, 16]}>
        {relatedBikes?.slice(0, 4)?.map((bike: any) => (
          <Col xs={24} sm={12} md={6} key={bike._id}>
            <Card
              hoverable
              cover={<img alt={bike.name} src={bike.image} />}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Card.Meta
                title={bike.name}
                description={`${bike.description.substring(0, 100)}...`}
              />
              <Text strong style={{ color: "#e53935" }}>
                Price: ${bike.price}
              </Text>
              <Button
                className="bg-blue-500"
                type="primary"
                style={{ marginTop: "10px" }}
              >
                View Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RelatedBikes;
