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

  const handleSubmit = (data: FieldValues) => {
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
      updateCoupon(option);

      toast.success("Bike coupon update successfully!", {
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
      >
        Update
      </Button>
      <Modal
        title="Update A Coupon"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ReusableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <ReusableInput
            type="text"
            name="name"
            label="Coupon Name"
            placeholder="ENTER COUPON NAME"
          />
          <ReusableDatePiker name="expiry" label="Coupon Expiry" />
          <div style={{ marginTop: "-10px", marginBottom: "-10px" }}>
            <ReusableSelect
              options={discountTypeOptions}
              name="discountType"
              label="Discount Type"
            />
          </div>
          <ReusableInput
            type="text"
            name="discountAmount"
            label="Discount Amount"
            placeholder="Discount Amount"
          />
          <ReusableSelect
            mode={"multiple"}
            options={applicableBikeOptions}
            name="applicableBikeIds"
            label="Applicable Bike"
          />
          <Button htmlType="submit" size="small">
            Update coupon
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default UpdateCouponModal;
