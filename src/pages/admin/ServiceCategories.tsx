import AssignCouponModel from "@/components/dialog/AssignCouponModel";
import {
  useDeleteAServiceCategoryMutation,
  useGetAllServiceCategoriesQuery,
  useRemoveCouponInServiceMutation,
} from "@/redux/features/serviceCategory/serviceCategoryApi";
import { TServiceCategory } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<
  TServiceCategory,
  "serviceName" | "price" | "serviceDetails"
>;

const ServiceCategories = () => {
  const [page, setPage] = useState(1);
  const {
    data: serviceData,
    isFetching,
    isLoading,
  } = useGetAllServiceCategoriesQuery(undefined);
  
  const [removeCoupon] = useRemoveCouponInServiceMutation();
  const [deleteService] = useDeleteAServiceCategoryMutation();

  const metaData = serviceData?.meta;

  const handleDeleteCoupon = (id: string) => {
    const toastId = toast.loading("Remove to assign coupon in!");

    try {
      //* Remove coupon from service
      removeCoupon(id);

      toast.success("Remove coupon from service successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const handleDeleteService = (id: string) => {
    const toastId = toast.loading("Delete bike service in!");

    try {
      //* Remove coupon from service
      deleteService(id);

      toast.success("Delete bike service successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const tableData = serviceData?.data?.map(
    ({ _id, serviceName, price, serviceDetails, serviceProvider, coupon }) => ({
      key: _id,
      serviceName,
      price,
      serviceDetails,
      serviceProvider: serviceProvider?.name,
      couponName: coupon ? coupon?.name : "Not Available coupon",
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Service Name",
      dataIndex: "serviceName",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "serviceDetails",
      dataIndex: "serviceDetails",
    },
    {
      title: "Service Provider",
      dataIndex: "serviceProvider",
    },
    {
      title: "Coupon Name",
      dataIndex: "couponName",
    },
    {
      title: "Action",
      key: "x1",
      render: (item) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Assign coupon model */}
            <AssignCouponModel item={item} />
            <Button
              danger
              style={{ fontSize: "12px", fontWeight: "600" }}
              onClick={() => handleDeleteCoupon(item.key)}
              type="link"
              size="small"
              disabled={item.couponName === "Not Available coupon"}
            >
              Delete coupon
            </Button>
          </div>
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
              onClick={() => handleDeleteService(item.key)}
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

export default ServiceCategories;
