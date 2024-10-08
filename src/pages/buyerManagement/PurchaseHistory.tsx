import { useGetSellerPurchaseBikesQuery } from "@/redux/features/salesManagement/salesManagementApi";
import { TPurchaseBike } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";

export type TTableData = Pick<TPurchaseBike, "buyingDate">;

const PurchasesHistory= () => {
  const [page, setPage] = useState(1);
  const {
    data: bikeData,
    isLoading,
    isFetching,
  } = useGetSellerPurchaseBikesQuery([{ name: "page", value: page }]);
  const confirmedBikes = bikeData?.data?.filter(
    (bike: any) => bike.isConfirmed
  );
  // console.log(confirmedBikes);
  
  const metaData = bikeData?.meta;

  const tableData = confirmedBikes?.map(({ _id, buyer, seller, bike }) => ({
    key: _id,
    buyerName: buyer.name,
    sellerName: seller.name,
    bikeName: bike.name as string,
    image: bike.image as string,
    model: bike.model as string,
    price: bike.price as number,
    buyingDate: bike.buyingDate as string,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Bike name",
      dataIndex: "bikeName",
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "x1",
      render: (image: string) => (
        <img src={image} alt="Bike" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Bike Model",
      dataIndex: "model",
    },
    {
      title: "Seller",
      dataIndex: "sellerName",
    },
    {
      title: "Amount",
      dataIndex: "price",
    },
    {
      title: "Action",
      key: "x1",
      render: () => {
        return (
          <div>
            <Button
              type="link"
              size="small"
              style={{ fontSize: "12px", fontWeight: "600" }}
            >
              Confirmed
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
    console.log(filters, _sorter, extra);

    if (isLoading) {
      return <p>Loading...</p>;
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
