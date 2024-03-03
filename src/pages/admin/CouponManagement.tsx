import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import { TCoupon } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";

export type TTableData = Pick<
  TCoupon,
  "name" | "expiry" | "discountType" | "discountAmount" | "applicableBikeIds"
>;

const CouponManagement = () => {
  const [page, setPage] = useState(1);
  const {
    data: couponData,
    isFetching,
    isLoading,
  } = useGetAllCouponsQuery(undefined);
  console.log(couponData);

  const metaData = couponData?.meta;
  
  const tableData = couponData?.data?.map(
    ({
      _id,
      name,
      expiry,
      discountType,
      discountAmount,
      applicableBikeIds,
    }) => ({
      key: _id,
      name,
      expiry,
      discountType,
      discountAmount,
      applicableBikeIds,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Coupon name",
      dataIndex: "name",
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
    },
    {
      title: "Discount Amount",
      dataIndex: "discountAmount",
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
    },
    {
      title: "Update Coupon",
      key: "x1",
      render: () => {
        return (
          <Button
            style={{ fontSize: "12px", fontWeight: "600" }}
            type="link"
            size="small"
          >
            update
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
              danger
              type="link"
              size="small"
              disabled={item.role === "admin"}
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

export default CouponManagement;
