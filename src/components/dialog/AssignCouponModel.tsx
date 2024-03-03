import { Button, Modal } from "antd";
import ReusableForm from "../form/ReusableForm";
import ReusableSelect from "../form/ReusableSelect";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import { toast } from "sonner";
import { useAssignCouponInServiceMutation } from "@/redux/features/serviceCategory/serviceCategoryApi";

const AssignCouponModel = ({ item }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: couponData } = useGetAllCouponsQuery(undefined);
  const [assignCoupon] = useAssignCouponInServiceMutation();
  
  const applicableCouponOptions = couponData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const handleSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Assigning coupon to service in!");
    try {
      const option = {
        id: item.key,
        coupon: data,
      };

      //* Assign coupon functionality
      assignCoupon(option),

      toast.success("Assigning coupon to service successfully!", {
        id: toastId,
        duration: 2000,
      });
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
      setIsModalOpen(false);
    }
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
        disabled={item.couponName !== "Not Available coupon"}
      >
        Assign coupon
      </Button>
      <Modal
        title="Assign coupon to service"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ReusableForm onSubmit={handleSubmit}>
          <ReusableSelect
            options={applicableCouponOptions}
            name="coupon"
            label="Assign Coupon"
          />
          <Button htmlType="submit" size="small">
            Assign coupon
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default AssignCouponModel;
