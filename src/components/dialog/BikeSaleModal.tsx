import { Button, Modal } from "antd";
import { useState } from "react";
import ReusableInput from "../form/ReusableInput";
import ReusableForm from "../form/ReusableForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ReusableDatePiker from "../form/ReusableDatePiker";
import { useSaleBikeMutation } from "@/redux/features/bikeManagement/bikeManagementApi";

type TDefaultValues = {
  seller?: string;
  quantity: number;
  date?: string;
};

const BikeSaleModal = ({ bike }: any) => {
  console.log(bike);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleBike] = useSaleBikeMutation();

  const defaultValues: TDefaultValues = {
    seller: bike?.seller.name,
    quantity: Number(bike?.quantity),
  };

  const handleSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Bike sale in!");

    try {
      const option = {
        id: bike?._id,
        bikeData: {
          seller: bike?.seller._id,
          quantity: Number(data?.quantity),
          saleDate: data?.saleDate,
        },
      };

      //* Sale bike functionality
      saleBike(option),
        toast.success("Bike sale in successfully!", {
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
      <Button onClick={showModal} size="middle" style={{ marginTop: "16px" }}>
        Sale Bike
      </Button>
      <Modal
        title="Sale Bike"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ReusableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <ReusableInput type="text" name="seller" label="Seller Name" />
          <ReusableInput
            type="text"
            name="quantity"
            label="Product Quantity"
          />
          <ReusableDatePiker name="saleDate" label="Date" />
          <Button htmlType="submit" size="small">
            Sale Bike
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default BikeSaleModal;
