import { Button, Modal } from "antd";
import ReusableForm from "../form/ReusableForm";
import ReusableInput from "../form/ReusableInput";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import ReusableSelect from "../form/ReusableSelect";
import ReusableDatePiker from "../form/ReusableDatePiker";
import { useGetBikesQuery } from "@/redux/features/bikeManagement/bikeManagementApi";
import { toast } from "sonner";
import { useUpdateCouponMutation } from "@/redux/features/coupon/couponApi";
import moment from "moment";

type TDefaultValues = {
  name: string;
  expiry: moment.Moment;
  discountType: string;
  discountAmount: number;
  applicableBikeIds: string[];
};

const discountTypeOptions = [
  {
    value: "percentage",
    label: "percentage",
  },
  {
    value: "fixed",
    label: "fixed",
  },
];

const UpdateCouponModal = ({ coupon }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: bikeData } = useGetBikesQuery(undefined);
  const [updateCoupon] = useUpdateCouponMutation();

  const applicableBikeOptions = bikeData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const defaultValues: TDefaultValues = {
    name: coupon?.name,
    expiry: moment(coupon?.expiry),
    discountType: coupon?.discountType,
    discountAmount: Number(coupon?.discountAmount),
    applicableBikeIds: coupon?.applicableBikeIds,
  };

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Bike coupon updating!");
    try {
      const option = {
        id: coupon.key,
        coupon: {
          name: data?.name,
          expiry: data?.expiry,
          discountType: data?.discountType,
          discountAmount: Number(data?.discountAmount),
          applicableBikeIds: data?.applicableBikeIds,
        },
      };
      //* Update coupon in database
      const res = await updateCoupon(option).unwrap();

      if (res.success) {
        toast.success("Bike coupon update successfully!", {
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
      >
        Update
      </Button>
      <Modal
        title="Update A Coupon"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <ReusableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <div style={{
              width: "100%",
              display: "flex",
              gap: "10px",
              marginTop: "8px",
            }}>
          <div style={{ width: "100%", marginBottom: "8px" }}>
            <ReusableInput
              type="text"
              name="name"
              label="Coupon Name"
              placeholder="ENTER COUPON NAME"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ width: "100%", marginBottom: "8px" }}>
            <ReusableDatePiker name="expiry" label="Coupon Expiry" />
          </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "10px"
            }}
          >
            <ReusableSelect
              options={discountTypeOptions}
              name="discountType"
              label="Discount Type"
            />
            <ReusableInput
              type="text"
              name="discountAmount"
              label="Discount Amount"
              placeholder="Discount Amount"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ width: "100%", marginBottom: "8px" }}>
            <ReusableSelect
              mode="multiple"
              options={applicableBikeOptions}
              name="applicableBikeIds"
              label="Applicable Bike"
            />
          </div>
          <Button
            htmlType="submit"
            size="small"
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Update Coupon
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default UpdateCouponModal;
