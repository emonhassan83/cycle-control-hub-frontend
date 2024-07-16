import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSalesBikesQuery } from "@/redux/features/bikeManagement/bikeManagementApi";
import { usePurchaseBikesMutation } from "@/redux/features/salesManagement/salesManagementApi";
import { Input, Row } from "antd";
import { SearchProps } from "antd/es/input";
const { Search } = Input;
import { useAppSelector } from "@/redux/hooks";
import { TBike, TQueryParam } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { generatePDF } from "@/components/PDF/generatePDF";

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

const PurchasesBike = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAppSelector(selectCurrentUser);
  const {
    data: bikeData,
    isFetching,
    isLoading,
  } = useGetSalesBikesQuery([
    { name: "page", value: page },
    {
      name: "searchTerm",
      value: searchTerm,
    },
    ...params,
  ]);
  const [purchaseBikes] = usePurchaseBikesMutation();
  // console.log(bikeData);

  const metaData = bikeData?.meta;

  const handlePurchaseBike = async (bike: any) => {
    const toastId = toast.loading("Bike purchase in!");

    try {
      const bikePurchaseInfo = {
        buyer: user?._id,
        seller: bike.seller._id,
        bike: bike.key,
        buyingDate: new Date().toISOString(),
        isConfirmed: false,
      };

      //* Purchase bike from database
      const res = await purchaseBikes(bikePurchaseInfo).unwrap();
      // console.log(res);

      if (res.success) {
      toast.success("Bike purchase successfully!", {
        id: toastId,
        duration: 2000,
      });

      //* Generate PDF invoice
      const invoiceDetails = {
        buyerName: user?.name,
        buyerEmail: user?.email,
        bikeName: bike.name,
        bikeModel: bike.model,
        bikeColor: bike.color,
        manufacturerCountry: bike.manufacturerCountry,
        sellerName: bike.seller.name,
        sellerEmail: bike.seller.email,
        quantity: 1,
        price: bike.price,
        tax: 100,
        dateOfSale: new Date().toISOString(),
        totalAmount: bike.price + 100,
      };

      //* Generate PDF blob
      const pdfBlob = await generatePDF(invoiceDetails);

      //* Save PDF as a file
      saveAs(pdfBlob, `${bike.name}-bike-invoice.pdf`);
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const onSearch: SearchProps["onSearch"] = (value) => setSearchTerm(value);

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
      dataIndex: "name",
    },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "x1",
      render: (productImage: string) => (
        <img src={productImage} alt="Bike" style={{ width: 50, height: 50 }} />
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
      key: "x3",
      render: (item) => {
        return (
          <div>
            <Button
              onClick={() => handlePurchaseBike(item)}
              type="link"
              size="small"
              style={{ fontSize: "12px", fontWeight: "600" }}
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
      <div
        style={{ display: "flex", justifyContent: "end", marginBottom: "20px" }}
      >
        <Row style={{ width: "50%" }}>
          <Search placeholder="Search Bike" onSearch={onSearch} enterButton />
        </Row>
      </div>
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

export default PurchasesBike;
