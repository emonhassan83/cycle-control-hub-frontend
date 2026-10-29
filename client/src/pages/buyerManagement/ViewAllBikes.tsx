import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetBikesQuery } from "@/redux/features/bikeManagement/bikeManagementApi";
import { usePurchaseBikesMutation } from "@/redux/features/salesManagement/salesManagementApi";
import { useAppSelector } from "@/redux/hooks";
import { TBike, TQueryParam } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<
  TBike,
  | "name"
  | "image"
  | "quantity"
  | "price"
  | "brand"
  | "model"
  | "type"
  | "size"
  | "color"
  | "frameMaterial"
  | "suspensionType"
  | "manufacturerCountry"
>;

const ViewAllBikes = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const user = useAppSelector(selectCurrentUser);
  
  const {
    data: bikeData,
    isFetching,
    isLoading,
  } = useGetBikesQuery([{ name: "page", value: page }, ...params]);
  const saleBikes = bikeData?.data?.filter((bike: any) => bike.isSale);
  const [purchaseBikes] = usePurchaseBikesMutation();

  const metaData = bikeData?.meta;

  const handlePurchaseBike = (id: string, seller: any) => {
    const toastId = toast.loading("Bike purchase in!");

    try {
      const bikePurchaseInfo = {
        buyerName: (user as { username?: string })?.username,
        buyerEmail: user?.email,
        phoneNumber: 1234567890,
        seller: seller._id,
        bike: id,
        buyingDate: new Date().toISOString(),
        isConfirmed: false,
      };

      //* Purchase bike from database
      purchaseBikes(bikePurchaseInfo);

      toast.success("Bike purchase successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const tableData = saleBikes?.map(
    ({
      _id,
      name,
      image,
      quantity,
      price,
      brand,
      model,
      type,
      size,
      color,
      seller,
      frameMaterial,
      suspensionType,
      manufacturerCountry,
    }) => ({
      key: _id,
      name,
      image,
      quantity,
      price,
      brand,
      model,
      type,
      size,
      color,
      seller: seller,
      frameMaterial,
      suspensionType,
      manufacturerCountry,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Product",
      dataIndex: "productName",
    },
    {
      title: "Product Image",
      dataIndex: "productImage",
      key: "x1",
      render: (productImage: string) => (
        <img src={productImage} alt="Bike" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Type",
      dataIndex: "type",
      filters: [
        {
          text: "road",
          value: "road",
        },
        {
          text: "mountain",
          value: "mountain",
        },
        {
          text: "hybrid",
          value: "hybrid",
        },
        {
          text: "electric",
          value: "electric",
        },
        {
          text: "kids",
          value: "kids",
        },
      ],
    },
    {
      title: "Color",
      dataIndex: "color",
      filters: [
        {
          text: "Black",
          value: "Black",
        },
        {
          text: "Orange",
          value: "Orange",
        },
        {
          text: "Golden",
          value: "Golden",
        },
        {
          text: "White",
          value: "White",
        },
        {
          text: "Silver",
          value: "Silver",
        },
      ],
    },
    {
      title: "Size",
      dataIndex: "size",
      filters: [
        {
          text: "Large",
          value: "Large",
        },
        {
          text: "Medium",
          value: "Medium",
        },
        {
          text: "Small",
          value: "Small",
        },
      ],
    },
    {
      title: "Action",
      key: "x3",
      render: (item) => {
        return (
          <div>
            <Button
              onClick={() => handlePurchaseBike(item.key, item.seller)}
              type="link"
              size="small"
              style={{ fontSize: "12px", fontWeight: "600" }}
              disabled={user?.role === 'admin'}
            >
              Buy Now
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
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters?.type?.forEach((item) =>
        queryParams.push({ name: "type", value: item })
      );

      filters?.color?.forEach((item) =>
        queryParams.push({ name: "color", value: item })
      );

      filters?.size?.forEach((item) =>
        queryParams.push({ name: "size", value: item })
      );

      //* set params array for filter
      setParams(queryParams);
    }
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

export default ViewAllBikes;
