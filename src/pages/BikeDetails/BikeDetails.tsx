import { useParams } from "react-router-dom";
import { useGetASaleBikeQuery } from "@/redux/features/bikeManagement/bikeManagementApi";
import { Button, Row, Col, Typography, Divider } from "antd";
import { toast } from "sonner";
import { usePurchaseBikesMutation } from "@/redux/features/salesManagement/salesManagementApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { generatePDF } from "@/components/PDF/generatePDF";
import { saveAs } from "file-saver";

const { Title, Text } = Typography;

const BikeDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetASaleBikeQuery(id);
  const user = useAppSelector(selectCurrentUser);
  const [purchaseBikes] = usePurchaseBikesMutation();

  const bike = data?.data;

  const handleBuyNow = async () => {
    const toastId = toast.loading("Processing your purchase...");

    try {
      const bikePurchaseInfo = {
        buyer: user?._id,
        seller: bike.seller._id,
        bike: bike._id,
        buyingDate: new Date().toISOString(),
        isConfirmed: false,
      };

      const res = await purchaseBikes(bikePurchaseInfo).unwrap();
      console.log(res);

      if (res.success) {
        toast.success("Bike purchased successfully!", { id: toastId });

        //* Generate PDF invoice
        const invoiceDetails = {
          buyerName: user?.name,
          buyerEmail: user?.email,
          bikeName: bike.name,
          bikeModel: bike.model,
          bikeColor: bike.color,
          manufacturerCountry: bike.manufacturerCountry,
          sellerName: bike.seller.name,
          sellerEmail: bike.seller.email,
          quantity: 1,
          price: bike.price,
          tax: 100,
          dateOfSale: new Date().toISOString(),
          totalAmount: bike.price + 100,
        };

        //* Generate PDF blob
        const pdfBlob = await generatePDF(invoiceDetails);

        //* Save PDF as a file
        saveAs(pdfBlob, `${bike.name}-bike-invoice.pdf`);
      }
    } catch (error) {
      toast.error("Failed to purchase the bike. Please try again.", {
        id: toastId,
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <img
        src={bike.image}
        alt={bike.name}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
      />
      <Title level={2}>{bike.name}</Title>
      <Text strong>Price: ${bike.price}</Text>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Brand:</Text> <Text>{bike.brand}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Model:</Text> <Text>{bike.model}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Type:</Text> <Text>{bike.type}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Color:</Text> <Text>{bike.color}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Size:</Text> <Text>{bike.size}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Frame Material:</Text> <Text>{bike.frameMaterial}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Suspension Type:</Text>{" "}
          <Text>{bike.suspensionType}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Manufacturer Country:</Text>{" "}
          <Text>{bike.manufacturerCountry}</Text>
        </Col>
      </Row>
      <Divider />
      <Text>{bike.description}</Text>
      <Divider />
      <Button type="primary" size="large" onClick={handleBuyNow}>
        Buy Now
      </Button>
    </div>
  );
};

export default BikeDetails;
