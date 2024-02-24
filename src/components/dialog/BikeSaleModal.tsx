import { Button, Modal } from "antd";
import { useState } from "react";
import ReusableInput from "../form/ReusableInput";
import ReusableForm from "../form/ReusableForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import ReusableDatePiker from "../form/ReusableDatePiker";
import { useSaleBikeMutation } from "@/redux/features/bikeManagement/bikeManagementApi";

type TDefaultValues = {
  buyer?: string;
  productQuantity: number;
  date?: string;
};

const BikeSaleModal = ({ bike }: any) => {
  const user = useAppSelector(selectCurrentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleBike] = useSaleBikeMutation();

  const defaultValues: TDefaultValues = {
    buyer: user?.username,
    productQuantity: Number(bike?.productQuantity),
  };

  const handleSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Bike sale in!");

    try {
      const option = {
        id: bike?._id,
        bikeData: {
          sellerName: user?._id,
          productQuantity: Number(data?.productQuantity),
          saleDate: data?.saleDate,
          isSale: true,
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
          <ReusableInput type="text" name="buyer" label="Buyer Name" />
          <ReusableInput
            type="text"
            name="productQuantity"
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
