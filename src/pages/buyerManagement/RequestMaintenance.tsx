import ReusableDatePiker from "@/components/form/ReusableDatePiker";
import ReusableForm from "@/components/form/ReusableForm";
import ReusableSelect from "@/components/form/ReusableSelect";
import ReusableTextArea from "@/components/form/ReusableTextArea";
import { useGetSellerPurchaseBikesQuery } from "@/redux/features/salesManagement/salesManagementApi";
import { useRequestServiceMutation } from "@/redux/features/service/serviceApi";
import { useGetAllServiceCategoriesQuery } from "@/redux/features/serviceCategory/serviceCategoryApi";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const RequestMaintenance = () => {
  const { data: bikeData } = useGetSellerPurchaseBikesQuery(undefined);
  const { data: serviceData } = useGetAllServiceCategoriesQuery(undefined);
  const confirmedBikes = bikeData?.data?.filter(
    (bike: any) => bike.isConfirmed
  );

  const [requestService] = useRequestServiceMutation();

  const applicableBikeOptions = confirmedBikes?.map((item) => ({
    value: item.bike._id,
    label: `${item.bike.name}`,
  }));

  const applicableServiceOptions = serviceData?.data?.map((item) => ({
    value: item._id,
    label: `${item.serviceName}`,
  }));

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Service requesting in!");

    try {
      const service = {
        ...data,
        maintenanceRecords: 1,
      };
      //* Request service from database
      const res = await requestService(service).unwrap();

      if (res.success) {
        toast.success("Request service successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
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
      <h5 style={{ fontSize: "20px", marginBottom: "20px" }}>
        Request For Maintenance
      </h5>
      <div className="w-[50%] mx-auto">
        <ReusableForm onSubmit={onSubmit}>
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
          <ReusableDatePiker
            name="lastServicingDate"
            label="Last Servicing Date"
          />
          <ReusableDatePiker
            name="nextServicingDate"
            label="Next Servicing Date"
          />
          <ReusableTextArea
            name="notes"
            label="notes"
            placeholder="Service notes.."
            rows={3}
          />
          <Button
            style={{
              marginTop: "10px",
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

export default RequestMaintenance;
