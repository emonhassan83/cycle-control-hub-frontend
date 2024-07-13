import { useGetAllMyServicesQuery } from "@/redux/features/service/serviceApi";
import { TService } from "@/types";
import { Pagination, Table, TableColumnsType, TableProps, Tag } from "antd";
import moment from "moment";
import { useState } from "react";

export type TTableData = Pick<
  TService,
  | "lastServicingDate"
  | "nextServicingDate"
  | "maintenanceRecords"
  | "serviceBill"
>;

const ServiceHistory = () => {
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
      isPayed,
      status,
    }) => ({
      key: _id,
      service: service.serviceName,
      serviceId: service._id,
      bike: bike?.name,
      bikeId: bike._id,
      serviceProvider: serviceProvider?.name,
      maintenanceRecords,
      serviceBill,
      lastServicingDate: moment(lastServicingDate).format("MMM D, YYYY"),
      nextServicingDate: moment(nextServicingDate).format("MMM D, YYYY"),
      isPayed: isPayed === false ? "unpaid" : "paid",
      status
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
      title: "Service Records",
      dataIndex: "maintenanceRecords",
    },
    {
      title: "Service Bill",
      dataIndex: "serviceBill",
    },
    {
      title: "Last Servicing",
      dataIndex: "lastServicingDate",
    },
    {
      title: "Next Servicing",
      dataIndex: "nextServicingDate",
    },
    {
        title: "Payed status",
        dataIndex: "isPayed",
        render: (_, { isPayed }: any) => {  
          const color = isPayed === 'paid' ? 'blue' :  'red' ; 
          return (
            <Tag color={color}>
              {isPayed.toUpperCase()}
            </Tag>
          );
        },
      },
      { 
        title: "Status",
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

export default ServiceHistory;
