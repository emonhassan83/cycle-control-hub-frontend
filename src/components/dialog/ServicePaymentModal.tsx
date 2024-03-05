import { useState } from "react";
import ReusableForm from "../form/ReusableForm";
import { Button, Modal } from "antd";
import { FieldValues } from "react-hook-form";
import ReusableInput from "../form/ReusableInput";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";

type TDefaultValues = {
  bike: string;
  service: string;
  coupon: string;
  price: number;
};

const ServicePaymentModal = ({ paymentInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: couponData} = useGetAllCouponsQuery(undefined);

  console.log({paymentInfo});
  const coupon = couponData?.data?.find(item => item._id === paymentInfo?.coupon)
  console.log(coupon);
  

  const defaultValues: TDefaultValues = {
    bike: paymentInfo?.bike,
    service: paymentInfo?.service,
    coupon: coupon?  coupon?.name : "Not available coupon",
    price: paymentInfo?.serviceBill,
  };

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="link"
        size="small"
        style={{ fontSize: "12px", fontWeight: "600" }}
      >
        Pay
      </Button>
      <Modal
        title="Service For Payment"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ReusableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <ReusableInput
            type="text"
            name="service"
            label="Your Service"
            placeholder="ENTER COUPON NAME"
          />
          <ReusableInput
            type="text"
            name="bike"
            label="Servicing Bike"
            placeholder="ENTER COUPON NAME"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "70%" }}>
              <ReusableInput type="text" name="coupon" label="Coupon" />
            </div>
            <div style={{ width: "30%", marginLeft: "10px" }}>
              <Button size="small" style={{ width: "100%", marginTop: "20px" }}>
                Apply Coupon
              </Button>
            </div>
          </div>
          <ReusableInput type="text" name="price" label="Amount" />
          <Button htmlType="submit" size="small">
            Pay Service
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default ServicePaymentModal;
