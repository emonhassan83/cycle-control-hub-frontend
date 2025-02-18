import AssignCouponModel from "@/components/dialog/AssignCouponModel";
import FullPageLoading from "@/components/Loader/FullPageLoader";
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
  const { data, isFetching, isLoading } =
    useGetAllServiceCategoriesQuery(undefined);

  const [removeCoupon] = useRemoveCouponInServiceMutation();
  const [deleteService] = useDeleteAServiceCategoryMutation();

  const serviceData = data?.data?.filter((service) => !service.isDeleted);
  const metaData = data?.meta;

  const handleDeleteCoupon = async (id: string) => {
    const toastId = toast.loading("Remove to assign coupon in!");

    try {
      //* Remove coupon from service
      const res = await removeCoupon(id).unwrap();

      if (res?.success) {
        toast.success("Remove coupon from service successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const handleDeleteService = async (id: string) => {
    const toastId = toast.loading("Delete bike service in!");

    try {
      //* Remove coupon from service
      const res = await deleteService(id).unwrap();

      if (res?.success) {
        toast.success("Delete bike service successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const tableData = serviceData?.map(
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
      return <FullPageLoading/>;
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
