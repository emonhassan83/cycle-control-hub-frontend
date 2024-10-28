import { useGetSellerBikesQuery } from "../../redux/features/bikeManagement/bikeManagementApi";
import { Pagination, Table, TableColumnsType, TableProps } from "antd";
import { TBike, TQueryParam } from "@/types";
import { useState } from "react";
import BikeSaleModal from "@/components/dialog/BikeSaleModal";
import FullPageLoading from "@/components/Loader/FullPageLoader";

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
  | "description"
>;

const ViewMyBikes = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: bikeData,
    isFetching,
    isLoading,
  } = useGetSellerBikesQuery([{ name: "page", value: page }, ...params]);

  const metaData = bikeData?.meta;

  const tableData = bikeData?.data?.map(
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
      description,
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
      description,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "x1",
      render: (image: string) => (
        <img src={image} alt="Bike" style={{ width: 50, height: 50, borderRadius: "2px" }} />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
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
      key: "x2",
      render: (item) => {
        return (
          <div>
            <BikeSaleModal bike={item} />
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
      return <FullPageLoading/>;
    }
  };

  return (
    <>
      <h1 className="text-xs font-semibold text-red-500 text-center mb-6">
        *Warning: You can only update, delete and create-variant your bike where
        you can't not modify other bikes in Database*
      </h1>
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

export default ViewMyBikes;
