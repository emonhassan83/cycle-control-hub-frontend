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
  // saleDate?: Date;
};

const BikeSaleModal = ({ bike }: any) => {
  // console.log(bike);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleBike] = useSaleBikeMutation();

  const defaultValues: TDefaultValues = {
    seller: bike?.seller?.name,
    quantity: 10,
  };

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Bike sale in!");

    try {
      const bikeData = {
        bikeId: bike?.key,
        quantity: Number(data?.quantity),
        saleDate: data?.saleDate,
      };

      //* Sale bike functionality
      const res = await saleBike(bikeData).unwrap();
      // console.log(res);

      if (res.success) {
        toast.success("Bike sale in successfully!", {
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
      <Button onClick={showModal} size="small" style={{ marginTop: "16px" }}>
        Sale Bike
      </Button>
      <Modal
        title="Sale Bike"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <ReusableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <div className="flex gap-4" style={{ width: "100%" }}>
            <div style={{ width: "100%" }}>
              <ReusableInput type="text" name="seller" label="Seller Name" />
            </div>
            <div style={{ width: "100%" }}>
              <ReusableInput
                type="text"
                name="quantity"
                label="Product Quantity"
              />
            </div>
          </div>
          <ReusableDatePiker name="saleDate" label="Date" />

          <Button
            style={{
              backgroundColor: "#4361ee",
              borderColor: "#4361ee",
              color: "#fff",
              marginTop: "10px",
            }}
            htmlType="submit"
            size="small"
          >
            Sale Bike
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default BikeSaleModal;
