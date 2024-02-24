import { Card } from "antd";
const { Meta } = Card;
import BikeSaleModal from "../dialog/BikeSaleModal";

const BikeCard = ({ bike }: any) => {
  const { productImage, productName, productQuantity } =
    bike;

  return (
    <div className="my-4">
      <Card
        hoverable
        style={{ width: 280 }}
        cover={<img alt="Bike Image" src={productImage} />}
      >
        <Meta
          title={productName}
          description={`Quantity: ${productQuantity}`}
        />
        <BikeSaleModal bike={bike} />
      </Card>
    </div>
  );
};

export default BikeCard;
