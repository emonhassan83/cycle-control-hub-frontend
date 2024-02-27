import {
  useCancelPurchaseBikesMutation,
  useConformPurchaseBikesMutation,
  useGetSellerPurchaseBikesQuery,
} from "@/redux/features/salesManagement/salesManagementApi";
import { TPurchaseBike } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<TPurchaseBike, "isConfirmed">;

const ConfirmPurchase = () => {
  const [page, setPage] = useState(1);
  const {
    data: bikeData,
    isFetching,
    isLoading,
  } = useGetSellerPurchaseBikesQuery([{ name: "page", value: page }]);
  const [conformPurchaseBikes] = useConformPurchaseBikesMutation();
  const [cancelPurchaseBikes] = useCancelPurchaseBikesMutation();

  const metaData = bikeData?.meta;
  
  const tableData = bikeData?.data?.map(({ seller, bike, isConfirmed }) => ({
    key: bike?._id,
    sellerName: seller?.username,
    bikeName: bike?.productName as string,
    productImage: bike?.productImage as string,
    quantity: bike?.productQuantity as number,
    price: bike?.price as number,
    isConfirmed,
  }));

  const handleConfirmPurchaseBike = (id: string) => {
    const toastId = toast.loading("Trying to confirm purchase bike!");

    //* Confirm status to sent to server
    try {
      conformPurchaseBikes(id);
      toast.success("Confirm purchase bike successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const handleCancelPurchaseBike = (id: string) => {
    const toastId = toast.loading("Trying to cancel purchase bike!");

    //* Confirm status to sent to server
    try {
      cancelPurchaseBikes(id);
      toast.success("Cancel purchase bike successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Bike name",
      dataIndex: "bikeName",
    },
    {
      title: "Product Image",
      dataIndex: "productImage",
      key: "x1",
      render: (productImage: string) => <img src={productImage} alt="Bike" style={{ width: 50, height: 50 }} />,
    },
    {
      title: "Seller",
      dataIndex: "sellerName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "price",
    },
    {
      title: "Action",
      key: "x1",
      render: (item) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => handleConfirmPurchaseBike(item.key)}
              size="small"
              style={{ fontSize: "12px", fontWeight: "600" }}
              disabled={item?.isConfirmed}
            >
              Confirm
            </Button>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "x3",
      render: (item) => {
        return (
          <div>
            <Button
              danger
              type="link"
              size="small"
              onClick={() => handleCancelPurchaseBike(item.key)}
              style={{ fontSize: "12px", fontWeight: "600" }}
              disabled={item?.isConfirmed}
            >
              Cancel
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

export default ConfirmPurchase;
