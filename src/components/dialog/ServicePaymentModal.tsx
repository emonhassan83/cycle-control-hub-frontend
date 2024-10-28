import { useState } from "react";
import ReusableForm from "../form/ReusableForm";
import { Button, Modal } from "antd";
import { FieldValues } from "react-hook-form";
import ReusableInput from "../form/ReusableInput";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import { useApplyCouponInServiceMutation } from "@/redux/features/service/serviceApi";
import { toast } from "sonner";

type TDefaultValues = {
  bike: string;
  service: string;
  coupon: string;
  price: number;
};

const ServicePaymentModal = ({ paymentInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: couponData } = useGetAllCouponsQuery(undefined);
  const [applyCoupon] = useApplyCouponInServiceMutation();

  const coupon = couponData?.data?.find(
    (item) => item._id === paymentInfo?.coupon
  );

  const defaultValues: TDefaultValues = {
    bike: paymentInfo?.bike,
    service: paymentInfo?.service,
    coupon: coupon ? coupon?.name : "Not available coupon",
    price: paymentInfo?.serviceBill,
  };

  const handleApplyCoupon = async (id: string) => {
    const toastId = toast.loading("Applying coupon in service in!");
    try {
      //* Apply coupon in service in Database
      const res = await applyCoupon(id).unwrap();

      if (res.success) {
        toast.success("Apply coupon in service successfully!", {
          id: toastId,
          duration: 2000,
        });
        setIsModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
      setIsModalOpen(false);
    }
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
        size="small"
        style={{ fontSize: "12px", fontWeight: "600" }}
        disabled={
          paymentInfo?.isPayed === true || paymentInfo?.status === "denied"
        }
      >
        Add coupon
      </Button>
      <Modal
        title="Assign coupon to your service"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ReusableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <ReusableInput
            type="text"
            name="service"
            label="Service Name"
            placeholder="ENTER COUPON NAME"
          />
          <ReusableInput
            type="text"
            name="bike"
            label="Servicing Bike"
            placeholder="ENTER COUPON NAME"
          />
          <ReusableInput type="text" name="coupon" label="Coupon" />

          <Button
          style={{ backgroundColor: "#4361ee", borderColor: "#4361ee", color: "#fff"}}
            onClick={() => handleApplyCoupon(paymentInfo?.key)}
            size="small"
          >
            Apply Coupon
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default ServicePaymentModal;
