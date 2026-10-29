import { Button, Modal } from "antd";
import { useState } from "react";
import ReusableInput from "../form/ReusableInput";
import ReusableForm from "../form/ReusableForm";
import { FieldValues } from "react-hook-form";
import { useUpdateBikeMutation } from "@/redux/features/bikeManagement/bikeManagementApi";
import { toast } from "sonner";
import ReusableSelect from "../form/ReusableSelect";

type TDefaultValues = {
  name?: string;
  image?: string;
  quantity?: number;
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
  const [updateBike] = useUpdateBikeMutation();

  // console.log("Update Bike Response Data: ", data);

  const defaultValues: TDefaultValues = {
    name: bike?.name,
    image: bike?.image,
    quantity: Number(bike?.quantity),
    price: bike?.price,
    type: bike?.type,
  };

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Bike updating in!");

    try {
      const option = {
        id: bike?.key,
        bikeData: {
          name: data.name,
          productImage: data.productImage,
          quantity: Number(data?.quantity),
          price: Number(data.price),
        },
      };
      //* Update bike into Database
      const res = await updateBike(option).unwrap();

      if (res.success) {
        toast.success("Bike updating in successfully!", {
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
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <ReusableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <ReusableInput
              type="text"
              name="name"
              label="Product Name"
              style={{ width: "100%" }}
            />
            <ReusableInput
              type="text"
              name="price"
              label="Product Price"
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <ReusableInput
              type="text"
              name="quantity"
              label="Product Quantity"
              style={{ width: "100%" }}
            />
            <ReusableSelect
              label="Product Type"
              name="type"
              options={productTypeOptions}
            />
          </div>
          <div style={{ width: "100%", marginBottom: "8px", marginTop: "-20px" }}>
            <ReusableInput
              type="text"
              name="image"
              label="Product Image"
              style={{ width: "100%" }}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              width: "100%",
              marginTop: "10px",
            }}
            htmlType="submit"
            size="small"
          >
            Update Bike
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default BikeUpdateDialog;
