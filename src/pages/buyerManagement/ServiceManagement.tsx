import UpdateCouponModal from "@/components/dialog/UpdateCouponModal";
import { useGetAllMyServicesQuery } from "@/redux/features/service/serviceApi";
import { TService } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";

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
  const metaData = serviceData?.meta;

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
      bike: bike.productName,
      serviceProvider: serviceProvider.username,
      maintenanceRecords,
      serviceBill,
      lastServicingDate,
      nextServicingDate,
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
        return <UpdateCouponModal coupon={item} />;
      },
    },
    {
      title: "Delete",
      key: "x3",
      render: () => {
        return (
          <div>
            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
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
