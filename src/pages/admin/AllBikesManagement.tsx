import {
  useDeleteBikeMutation,
  useGetBikesQuery,
} from "../../redux/features/bikeManagement/bikeManagementApi";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import BikeUpdateDialog from "@/components/dialog/BikeUpdateDialog";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setBike } from "@/redux/features/bikeManagement/bikeSlice";
import { toast } from "sonner";
import { TBike, TQueryParam } from "@/types";
import { useState } from "react";
import BikeSaleModal from "@/components/dialog/BikeSaleModal";

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

const AllMyBikesManagement = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading } = useGetBikesQuery([
    { name: "page", value: page },
    ...params,
  ]);
  const bikeData = data?.data?.filter((bike) => !bike.isDeleted);
  // console.log(users);

  const [deleteBike] = useDeleteBikeMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const metaData = data?.meta;

  const handleCreateVariant = (bike: TBike) => {
    //* set bike credentials in state
    dispatch(setBike(bike));
    navigate(`/admin/add-a-bike`);
  };

  const handleDeleteBike = async (id: string) => {
    const toastId = toast.loading("Try to delete bike in database!");
    try {
      // * delete bike into database
      const res = await deleteBike(id).unwrap();

      if (res.success) {
        toast.success("Delete bike in database successfully!", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const tableData = bikeData?.map(
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
      title: "Sale",
      key: "x2",
      render: (item) => {
        return (
          <div className="-mt-3">
            <BikeSaleModal bike={item} />
          </div>
        );
      },
    },
    {
      title: "Add New",
      key: "x1",
      render: (item) => {
        return (
          <div>
            <Button onClick={() => handleCreateVariant(item)} size="small">
              Create Variant
            </Button>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "x2",
      render: (item) => {
        return (
          <div>
            <BikeUpdateDialog bike={item} />
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
              onClick={() => handleDeleteBike(item.key)}
              size="small"
              style={{ fontSize: "12px", fontWeight: "600" }}
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
      <h1 className="text-xs font-semibold text-red-500 text-center mb-6">
        *Warning: Admin can update, delete and create-variant all bikes in
        Database*
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

export default AllMyBikesManagement;
