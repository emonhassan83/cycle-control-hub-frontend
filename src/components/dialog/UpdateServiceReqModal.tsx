import { Button, Modal } from "antd";
import ReusableForm from "../form/ReusableForm";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import ReusableSelect from "../form/ReusableSelect";
import ReusableDatePiker from "../form/ReusableDatePiker";
import { useGetSellerPurchaseBikesQuery } from "@/redux/features/salesManagement/salesManagementApi";
import { useGetAllServiceCategoriesQuery } from "@/redux/features/serviceCategory/serviceCategoryApi";
import moment from "moment";
import { useUpdateAServiceMutation } from "@/redux/features/service/serviceApi";
import { toast } from "sonner";
import ReusableTextArea from "../form/ReusableTextArea";

type TDefaultValues = {
  bike: string;
  service: string;
  lastServicingDate: moment.Moment;
  nextServicingDate: moment.Moment;
  notes: string;
};

const UpdateServiceReqModal = ({ item }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: bikeData } = useGetSellerPurchaseBikesQuery(undefined);
  const { data: serviceData } = useGetAllServiceCategoriesQuery(undefined);
  const confirmedBikes = bikeData?.data?.filter(
    (bike: any) => bike.isConfirmed
  );
  const [updateService] = useUpdateAServiceMutation();

  const applicableBikeOptions = confirmedBikes?.map((item) => ({
    value: item.bike._id,
    label: `${item.bike.name}`,
  }));

  const applicableServiceOptions = serviceData?.data?.map((item) => ({
    value: item._id,
    label: `${item.serviceName}`,
  }));

  const defaultValues: TDefaultValues = {
    bike: item?.bike,
    service: item?.service,
    lastServicingDate: moment(item?.lastServicingDate),
    nextServicingDate: moment(item?.nextServicingDate),
    notes: item?.notes,
  };

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Service updating..!");
    try {
      const option = {
        id: item?.key,
        service: {
          ...data,
          bike: data?.bikeId,
          service: data?.serviceId,
        },
      };
      //* Update service in database
      const res = await updateService(option).unwrap();

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
        disabled={item?.isPayed === true}
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
          <div className="md:flex gap-4">
            <ReusableSelect
              options={applicableBikeOptions}
              name="bike"
              label="Select Bike"
            />
            <ReusableSelect
              options={applicableServiceOptions}
              name="service"
              label="Select Service"
            />
          </div>
          <div className="md:flex gap-4 mb-4">
            <ReusableDatePiker
              name="lastServicingDate"
              label="Last Servicing Date"
            />
            <ReusableDatePiker
              name="nextServicingDate"
              label="Next Servicing Date"
            />
          </div>
          <div style={{ marginTop: "-10px", marginBottom: "-10px" }}></div>
          <ReusableTextArea
            // type="text"
            name="notes"
            label="Notes"
            placeholder="Service notes.."
          />
          <Button  style={{ backgroundColor: "#4361ee", borderColor: "#4361ee", color: "#fff"}} htmlType="submit" size="small">
            Update request
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default UpdateServiceReqModal;
