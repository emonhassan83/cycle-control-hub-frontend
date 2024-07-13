import ServicePaymentModal from "@/components/dialog/ServicePaymentModal";
import UpdateServiceReqModal from "@/components/dialog/UpdateServiceReqModal";
import {
  useDeleteAServiceMutation,
  useGetAllMyServicesQuery,
  usePaymentBikeServiceMutation,
} from "@/redux/features/service/serviceApi";
import { TService } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps, Tag } from "antd";
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

  const handlePaymentService = (id: string) => {
    const toastId = toast.loading("Payment service in!");
    try {
      toast.success("Payment service successfully!", {
        id: toastId,
        duration: 2000,
      });

      //* Payment service into DB
      paymentService(id);
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const handleDeleteService = (id: string) => {
    const toastId = toast.loading("Delete service in!");
    try {
      toast.success("Delete service successfully!", {
        id: toastId,
        duration: 2000,
      });

      //* Delete service into DB
      deleteService(id);
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
      serviceProvider: serviceProvider.name,
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
      title: "Maintenance Records",
      dataIndex: "maintenanceRecords",
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
        const color = status === 'confirm' ? 'blue' : status === 'denied' ? 'red' : 'geekblue'; 
        return (
          <Tag color={color}>
            {status.toUpperCase()}
          </Tag>
        );
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
            type="link"
            size="small"
            disabled={item?.isPayed === true || item.status === "denied"}
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
              type="link"
              size="small"
              disabled={item.status !== "pending" && item.status !== "denied"}
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
      return <p>Loading...</p>;
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
