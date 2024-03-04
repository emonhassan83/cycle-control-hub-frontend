import UpdateServiceReqModal from "@/components/dialog/UpdateServiceReqModal";
import { useDeleteAServiceMutation, useGetAllMyServicesQuery } from "@/redux/features/service/serviceApi";
import { TService } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<
  TService,
  | "lastServicingDate"
  | "nextServicingDate"
  | "notes"
  | "maintenanceRecords"
  | "serviceBill"
>;

const ServiceManagement = () => {
  const [page, setPage] = useState(1);
  const {
    data: serviceData,
    isFetching,
    isLoading,
  } = useGetAllMyServicesQuery(undefined);
  const [deleteService, {data, error}] = useDeleteAServiceMutation();
  console.log({data, error});
  

  const metaData = serviceData?.meta;

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
    }) => ({
      key: _id,
      service: service.serviceName,
      serviceId: service._id,
      bike: bike.productName,
      bikeId: bike._id,
      serviceProvider: serviceProvider.username,
      maintenanceRecords,
      serviceBill,
      lastServicingDate: moment(lastServicingDate).format("MMM D, YYYY"),
      nextServicingDate: moment(nextServicingDate).format("MMM D, YYYY"),
      notes,
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
      title: "Update Request",
      key: "x1",
      render: (item) => {
        return <UpdateServiceReqModal item={item} />;
      },
    },
    {
      title: "payment",
      key: "x1",
      render: () => {
        return (
          <Button
            type="link"
            size="small"
            style={{ fontSize: "12px", fontWeight: "600" }}
          >
            Pay
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
