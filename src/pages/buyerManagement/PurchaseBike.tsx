import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetSalesBikesQuery } from "@/redux/features/bikeManagement/bikeManagementApi";
import { Input, Row, Col, Card, Button, Pagination } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const PurchasesBike = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { data: bikeData, isLoading } = useGetSalesBikesQuery([
    { name: "page", value: page },
    { name: "searchTerm", value: searchTerm },
  ]);
  // console.log(bikeData);

  const metaData = bikeData?.meta;
  const bikes = bikeData?.data || [];

  const onSearch = (value: any) => setSearchTerm(value);

  const handleViewDetails = (id: string) => {
    navigate(`/bike-details/${id}`);
  };

  if (isLoading) return <FullPageLoading />;

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "end", marginBottom: "20px" }}
      >
        <Row style={{ width: "50%" }}>
          <Search
            placeholder="Search Bike"
            onSearch={onSearch}
            enterButton={
              <Button
                style={{ backgroundColor: "#ffffff", borderColor: "#969696" }}
              >
                Search
              </Button>
            }
          />
        </Row>
      </div>
      <Row gutter={[16, 16]}>
        {bikes.map((bike) => (
          <Col xs={24} sm={12} md={8} lg={6} key={bike._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={bike.name}
                  src={bike.image}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
              actions={[
                <Button
                  type="primary"
                  className="bg-blue-500"
                  onClick={() => handleViewDetails(bike._id)}
                >
                  View Details
                </Button>,
              ]}
            >
              <Card.Meta
                title={bike.name}
                description={`${bike.description.substring(0, 100)}...`}
              />
              <div style={{ marginTop: 10, fontWeight: "bold" }}>
                ${bike.price}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        style={{ marginTop: "20px", textAlign: "center" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default PurchasesBike;
