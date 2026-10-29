/* eslint-disable @typescript-eslint/no-unused-vars */
import ReusableForm from "@/components/form/ReusableForm";
import ReusableSelect from "@/components/form/ReusableSelect";
import {
  useBulkDeleteBikesMutation,
  useGetSellerBikesQuery,
} from "@/redux/features/bikeManagement/bikeManagementApi";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const BulkDeleteBikes = () => {
  const { data: bikeData } = useGetSellerBikesQuery(undefined);
  const [deleteBike, { data }] = useBulkDeleteBikesMutation();
  console.log("Bulk delete Bikes: ", data);

  const bikeOptions = bikeData?.data?.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Bikes Delate in!");

    try {
      //* Delete bikes from the database
      const res = await deleteBike(data).unwrap();

      if (res.success) {
        toast.success("Bikes Delate in successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <h1 className="text-xs font-semibold text-red-500 text-center mb-6">
        *Warning: You can only delete your bike where you can't not modify other
        bikes in Database*
      </h1>
      <div className="w-[50%] mx-auto">
        <ReusableForm onSubmit={handleSubmit}>
          <ReusableSelect
            mode="multiple"
            options={bikeOptions}
            name="ids"
            label="Select Bikes"
          />
          <Button htmlType="submit" style={{ marginTop: "-10px" }}>
            Delete Bikes
          </Button>
        </ReusableForm>
      </div>
    </>
  );
};

export default BulkDeleteBikes;
