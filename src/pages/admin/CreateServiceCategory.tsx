import ReusableForm from "@/components/form/ReusableForm";
import ReusableInput from "@/components/form/ReusableInput";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useCreateServiceCategoryMutation } from "@/redux/features/serviceCategory/serviceCategoryApi";

import { useAppSelector } from "@/redux/hooks";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CreateServiceCategory = () => {
  const user = useAppSelector(selectCurrentUser);
  const [createServiceCategory] = useCreateServiceCategoryMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Service category creating in!");

    try {
      const serviceCategory = {
        ...data,
        price: Number(data.price),
        serviceProvider: user?._id,
      };

      //* Save the service category into DB
      const res = await createServiceCategory(serviceCategory).unwrap();

      if (res?.success) {
      toast.success("Service category creating successfully!", {
        id: toastId,
        duration: 2000,
      });
    }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
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
      <h5 style={{ fontSize: "20px", marginBottom: "20px" }}>
        Create Service Category
      </h5>
      <div className="w-[50%] mx-auto">
        <ReusableForm onSubmit={onSubmit}>
          <ReusableInput
            type="text"
            name="serviceName"
            label="Service Name"
            placeholder="Provide bike service name"
          />
          <ReusableInput
            type="text"
            name="price"
            label="Price"
            placeholder="Provide service price"
          />
          <ReusableInput
            type="text"
            name="serviceDetails"
            label="Service Details"
            placeholder="Provide service details"
          />
          <Button
            style={{
              marginTop: "20px",
              width: "100%",
              borderRadius: "4px",
              backgroundColor: "#1890ff",
              color: "#fff",
            }}
            htmlType="submit"
          >
            Create
          </Button>
        </ReusableForm>
      </div>
    </div>
  );
};

export default CreateServiceCategory;
