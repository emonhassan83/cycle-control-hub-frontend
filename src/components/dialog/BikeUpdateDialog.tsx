import { Button, Modal } from "antd";
import { useState } from "react";
import ReusableInput from "../form/ReusableInput";
import ReusableForm from "../form/ReusableForm";
import { FieldValues } from "react-hook-form";
import { useUpdateBikeMutation } from "@/redux/features/bikeManagement/bikeManagementApi";
import { toast } from "sonner";
import ReusableSelect from "../form/ReusableSelect";

type TDefaultValues = {
  productName?: string;
  productImage?: string;
  productQuantity?: number;
  price?: number;
  type?: string;
};

const productTypeOptions = [
  {
    value: "road",
    label: "road",
  },
  {
    value: "mountain",
    label: "mountain",
  },
  {
    value: "hybrid",
    label: "hybrid",
  },
  {
    value: "electric",
    label: "electric",
  },
  {
    value: "kids",
    label: "kids",
  },
];

const BikeUpdateDialog = ({ bike }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateBike, { data }] = useUpdateBikeMutation();
  console.log("data----->", data);
  
  const defaultValues: TDefaultValues = {
    productName: bike?.productName,
    productImage: bike?.productImage,
    productQuantity: Number(bike?.productQuantity),
    price: bike?.price,
    type: bike?.type,
  };

  const handleSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Bike updating in!");

    try {
      const option = {
        id: bike?.key,
        bikeData: {
          productName: data.productName,
          productImage: data.productImage,
          productQuantity: Number(data?.productQuantity),
          price: Number(data.price),
        },
      };

      console.log(option);
      

      //* Update bike into Database
      updateBike(option);

      toast.success("Bike updating in successfully!", { id: toastId, duration: 2000 });
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
        size="small"
        type="link"
        style={{ fontSize: "12px", fontWeight: "600" }}
      >
        Update
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ReusableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <ReusableInput type="text" name="productName" label="Product Name" />
          <ReusableInput
            type="text"
            name="productImage"
            label="Product Image"
          />
          <ReusableInput
            type="text"
            name="productQuantity"
            label="Product Quantity"
          />
          <ReusableInput type="text" name="price" label="Product Price" />
          <ReusableSelect
            label="Product Type"
            name="type"
            options={productTypeOptions}
          />
          <Button htmlType="submit" size="small">
            Update
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default BikeUpdateDialog;
