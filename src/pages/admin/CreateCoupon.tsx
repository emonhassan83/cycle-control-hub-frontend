import ReusableDatePiker from "@/components/form/ReusableDatePiker";
import ReusableForm from "@/components/form/ReusableForm";
import ReusableInput from "@/components/form/ReusableInput";
import ReusableSelect from "@/components/form/ReusableSelect";
import { useGetBikesQuery } from "@/redux/features/bikeManagement/bikeManagementApi";
import { useCreateCouponMutation } from "@/redux/features/coupon/couponApi";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

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

const CreateCoupon = () => {
  const { data: bikeData } = useGetBikesQuery(undefined);
  const [createCoupon] = useCreateCouponMutation();
  
  const applicableBikeOptions = bikeData?.data?.map((item) => ({
    value: item._id,
    label: `${item.productName}`,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Coupon creating in!");

    try {
      const couponData = {
        ...data,
        name: data.name.toUpperCase(),
        discountAmount: Number(data.discountAmount),
      };

      //* Coupon create from database
      createCoupon(couponData);

      toast.success("Coupon create successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h5 style={{ fontSize: "20px", marginBottom: "20px" }}>Create Coupon</h5>
      <div className="w-[50%] mx-auto">
        <ReusableForm onSubmit={onSubmit}>
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
          <Button style={{ marginTop: "-5px" }} htmlType="submit">
            Create
          </Button>
        </ReusableForm>
      </div>
    </div>
  );
};

export default CreateCoupon;
