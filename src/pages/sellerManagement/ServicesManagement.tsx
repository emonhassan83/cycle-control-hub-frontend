import {
  useCancelBikeServiceMutation,
  useConfirmBikeServiceMutation,
  useGetAllMyServicesQuery,
} from "@/redux/features/service/serviceApi";
import { TService } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<
  TService,
  | "lastServicingDate"
  | "nextServicingDate"
  | "maintenanceRecords"
  | "serviceBill"
  | "status"
>;

const ServiceManagement = () => {
  const [page, setPage] = useState(1);
  const {
    data: serviceData,
    isFetching,
    isLoading,
  } = useGetAllMyServicesQuery(undefined);
  const [confirmService, { data, error }] = useConfirmBikeServiceMutation();
  const [cancelService] = useCancelBikeServiceMutation();
  console.log({ data, error });

  const metaData = serviceData?.meta;

  const handleConfirmedService = (id: string) => {
    const toastId = toast.loading("Confirm bike service in!");
    try {
      toast.success("Confirm bike service successfully!", {
        id: toastId,
        duration: 2000,
      });

      //* Confirm bike service into DB
      confirmService(id);
      
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const handleDeniedService = (id: string) => {
    const toastId = toast.loading("Deny bike service in!");
    try {
      toast.success("Deny bike service successfully!", {
        id: toastId,
        duration: 2000,
      });

      //* Deny bike service into DB
      cancelService(id);
      
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const tableData = serviceData?.data?.map(
    ({
      _id,
      service,
      bike,
      serviceReceiver,
      maintenanceRecords,
      serviceBill,
      lastServicingDate,
      nextServicingDate,
      status
    }) => ({
      key: _id,
      service: service.serviceName,
      bike: bike.productName,
      serviceReceiver: serviceReceiver.username,
      maintenanceRecords,
      serviceBill,
      lastServicingDate: moment(lastServicingDate).format("MMM D, YYYY"),
      nextServicingDate: moment(nextServicingDate).format("MMM D, YYYY"),
      status,
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
      title: "Service Receiver",
      dataIndex: "serviceReceiver",
    },
    {
      title: "Maintenance Records",
      dataIndex: "maintenanceRecords",
    },
    {
      title: "serviceBill",
      dataIndex: "serviceBill",
    },
    {
      title: "lastServicingDate",
      dataIndex: "lastServicingDate",
    },
    {
      title: "nextServicingDate",
      dataIndex: "nextServicingDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action Service",
      key: "x3",
      render: (item) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="link"
              size="small"
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleConfirmedService(item?.key)}
            >
             Confirm
            </Button>

            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleDeniedService(item?.key)}
              danger
              type="link"
              size="small"
            >
              Denied
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
