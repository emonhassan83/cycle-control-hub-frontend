import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetSellerPurchaseBikesQuery } from "@/redux/features/salesManagement/salesManagementApi";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Pagination, Table, TableColumnsType, TableProps, Tag } from "antd";
import { useState } from "react";

export type TTableData = {
  bikeName: string;
  image: string;
  sellerName: string;
  price: number;
  transactionId?: string;
  buyingDate: string;
  createdAt: string;
};

const PurchasesHistory = () => {
  const [page, setPage] = useState(1);
  const { data: bikeData, isLoading, isFetching } = useGetSellerPurchaseBikesQuery([{ name: "page", value: page }]);
  const confirmedBikes = bikeData?.data?.filter((bike: any) => bike.isConfirmed || bike.status === "PAID");
  
  const metaData = bikeData?.meta;

  const tableData: TTableData[] = confirmedBikes?.map(({ _id, buyer, seller, bike, transactionId, createdAt }) => ({
    key: _id,
    buyerName: buyer.name,
    sellerName: seller.name,
    bikeName: bike.name,
    image: bike.image,
    price: bike.price,
    transactionId: transactionId,
    buyingDate: bike?.buyingDate ? new Date(bike?.buyingDate).toISOString() : "N/A",
    createdAt: createdAt
      ? new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(createdAt))
      : "N/A",
  })) || [];

  const columns: TableColumnsType<TTableData> = [
    { title: "Bike name", dataIndex: "bikeName" },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "x1",
      render: (image: string) => <img src={image} alt="Bike" style={{ width: 50, height: 50, borderRadius: "2px" }} />,
    },
    { title: "Seller", dataIndex: "sellerName" },
    { title: "Amount", dataIndex: "price" },
    { title: "TrnxID", dataIndex: "transactionId" },
    {
      title: "Tranx Time",
      dataIndex: "createdAt",
      render: (date: string) => date,
    },
    {
      title: "Status",
      key: "status",
      render: () => (
        <Tag icon={<CheckCircleOutlined />} color="processing">
          Confirmed
        </Tag>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
    console.log(filters, _sorter, extra);
    if (isLoading) {
      return <FullPageLoading />;
    }
  };

  return (
    <>
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
    </>
  );
};

export default PurchasesHistory;
