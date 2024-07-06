import { Card } from "antd";
const { Meta } = Card;
import BikeSaleModal from "../dialog/BikeSaleModal";

const BikeCard = ({ bike }: any) => {
  const { image, name, quantity } = bike;

  return (
    <div className="my-4">
      <Card
        hoverable
        style={{ width: 280 }}
        cover={<img alt="Bike Image" src={image} />}
      >
        <Meta
          title={name}
          description={`Quantity: ${quantity}`}
        />
        <BikeSaleModal bike={bike} />
      </Card>
    </div>
  );
};

export default BikeCard;
