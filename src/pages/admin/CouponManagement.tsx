import UpdateCouponModal from "@/components/dialog/UpdateCouponModal";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import {
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "@/redux/features/coupon/couponApi";
import { TCoupon } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<
  TCoupon,
  "name" | "expiry" | "discountType" | "discountAmount" | "applicableBikeIds"
>;

const CouponManagement = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    isFetching,
    isLoading,
  } = useGetAllCouponsQuery(undefined);
  const [deleteCoupon] = useDeleteCouponMutation();
  const couponData = (data?.data)?.filter((coupon) => !coupon.isDeleted);

  const metaData = data?.meta;

  const handleDeleteCoupon = async(id: string) => {
    const toastId = toast.loading("Delete coupon in!");
    try {
      //* Change user role into DB
      const res = await deleteCoupon(id).unwrap();

      if (res.success) {
        toast.success("Delete coupon successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  const tableData = couponData?.map(
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
      expiry: moment(expiry).format("MMM D, YYYY"),
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
      render: (item) => {
        return <UpdateCouponModal coupon={item} />;
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
              onClick={() => handleDeleteCoupon(item?.key)}
              danger
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

export default CouponManagement;
