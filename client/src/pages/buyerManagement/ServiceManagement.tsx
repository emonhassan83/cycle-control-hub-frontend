import ServicePaymentModal from "@/components/dialog/ServicePaymentModal";
import UpdateServiceReqModal from "@/components/dialog/UpdateServiceReqModal";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import {
  useDeleteAServiceMutation,
  useGetAllMyServicesQuery,
  usePaymentBikeServiceMutation,
} from "@/redux/features/service/serviceApi";
import { TService } from "@/types";
import {
  Button,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<
  TService,
  | "lastServicingDate"
  | "nextServicingDate"
  | "maintenanceRecords"
  | "serviceBill"
  | "notes"
>;

const ServiceManagement = () => {
  const [page, setPage] = useState(1);
  const {
    data: serviceData,
    isFetching,
    isLoading,
  } = useGetAllMyServicesQuery(undefined);
  const [deleteService] = useDeleteAServiceMutation();
  const [paymentService] = usePaymentBikeServiceMutation();

  const metaData = serviceData?.meta;

  const handlePaymentService = async (id: string) => {
    const toastId = toast.loading("Payment service in!");
    try {
      //* Payment service into DB
      const res = await paymentService(id).unwrap();

      if (res.success) {
        toast.success("Payment service successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const handleDeleteService = async (id: string) => {
    const toastId = toast.loading("Delete service in!");
    try {
      //* Delete service into DB
      const res = await deleteService(id).unwrap();

      if (res.success) {
        toast.success("Delete service successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const tableData = serviceData?.data?.map(
    ({
      _id,
      service,
      bike,
      serviceProvider,
      maintenanceRecords,
      serviceBill,
      lastServicingDate,
      nextServicingDate,
      notes,
      status,
      isPayed,
    }) => ({
      key: _id,
      service: service.serviceName,
      serviceId: service._id,
      bike: bike.name,
      bikeId: bike._id,
      serviceProvider: serviceProvider?.name || "UnKnown",
      maintenanceRecords,
      serviceBill,
      lastServicingDate: moment(lastServicingDate).format("MMM D, YYYY"),
      nextServicingDate: moment(nextServicingDate).format("MMM D, YYYY"),
      coupon: service?.coupon,
      notes,
      status,
      isPayed,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Service",
      dataIndex: "service",
    },
    {
      title: "Bike",
      dataIndex: "bike",
    },
    {
      title: "Service Provider",
      dataIndex: "serviceProvider",
    },
    {
      title: "Service Bill",
      dataIndex: "serviceBill",
    },
    {
      title: " Service Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }: any) => {
        const color =
          status === "confirm"
            ? "blue"
            : status === "denied"
            ? "red"
            : "geekblue";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Update Request",
      key: "x1",
      render: (item) => {
        return <UpdateServiceReqModal item={item} />;
      },
    },
    {
      title: "Add Coupon in service",
      key: "x1",
      render: (item) => {
        return <ServicePaymentModal paymentInfo={item} />;
      },
    },
    {
      title: "payment",
      key: "x1",
      render: (item) => {
        return (
          <Button
            style={{ fontSize: "12px", fontWeight: "600" }}
            onClick={() => handlePaymentService(item?.key)}
            size="small"
            disabled={
              item?.isPayed === true ||
              item.status === "denied" ||
              item.status === "PENDING"
            }
          >
            pay
          </Button>
        );
      },
    },
    {
      title: "Delete",
      key: "x3",
      render: (item) => {
        return (
          <div>
            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleDeleteService(item?.key)}
              danger
              size="small"
              disabled={
                (item.status !== "pending" && item.status !== "denied") ||
                item.isPayed
              }
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log(_pagination, filters, _sorter, extra);

    if (isLoading) {
      return <FullPageLoading/>;
    }
  };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: "20px" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default ServiceManagement;
