import FullPageLoading from "@/components/Loader/FullPageLoader";
import {
  useCancelBikeServiceMutation,
  useConfirmBikeServiceMutation,
  useGetAllServicesQuery,
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
  | "status"
>;

const AllServicesManagement = () => {
  const [page, setPage] = useState(1);
  const {
    data: serviceData,
    isFetching,
    isLoading,
  } = useGetAllServicesQuery(undefined);
  // console.log(serviceData);

  const [confirmService] = useConfirmBikeServiceMutation();
  const [cancelService] = useCancelBikeServiceMutation();

  const metaData = serviceData?.meta;

  const handleConfirmedService = async (id: string) => {
    const toastId = toast.loading("Confirm bike service in!");
    try {
      //* Confirm bike service into DB
      const res = await confirmService(id).unwrap();

      if (res.success) {
        toast.success("Confirm bike service successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const handleDeniedService = async (id: string) => {
    const toastId = toast.loading("Deny bike service in!");
    try {
      //* Deny bike service into DB
      const res = await cancelService(id).unwrap();

      if (res.success) {
        toast.success("Deny bike service successfully!", {
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
      serviceReceiver,
      maintenanceRecords,
      serviceBill,
      lastServicingDate,
      nextServicingDate,
      status,
    }) => ({
      key: _id,
      service: service.serviceName,
      bike: bike.name,
      serviceReceiver: serviceReceiver?.name,
      maintenanceRecords,
      serviceBill,
      lastServicingDate: moment(lastServicingDate).format("MMM D, YYYY"),
      nextServicingDate: moment(nextServicingDate).format("MMM D, YYYY"),
      status: status,
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
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
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
      title: "Action Service",
      key: "x3",
      render: (item) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4
            }}
          >
            <Button
              size="small"
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleConfirmedService(item?.key)}
              disabled={item.status === "confirmed"}
            >
              Confirm
            </Button>

            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleDeniedService(item?.key)}
              danger
              size="small"
              disabled={item.status === "denied"}
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

export default AllServicesManagement;
