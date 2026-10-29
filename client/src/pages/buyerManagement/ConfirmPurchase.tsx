import {
  useCancelPurchaseBikesMutation,
  useConformPurchaseBikesMutation,
  useGetSellerPurchaseBikesQuery,
} from "@/redux/features/salesManagement/salesManagementApi";
import { TPurchaseBike } from "@/types";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { generatePDF } from "@/components/PDF/generatePDF";
import { useNavigate } from "react-router-dom";

export type TTableData = Pick<TPurchaseBike, "isConfirmed"|"transactionId">;

const ConfirmPurchase = () => {
  const [page, setPage] = useState(1);
  const {
    data: bikeData,
    isFetching,
    isLoading,
  } = useGetSellerPurchaseBikesQuery([{ name: "page", value: page }]);
  const user = useAppSelector(selectCurrentUser);
  // const [initialPayment] = useInitialPaymentMutation();
  const [conformPurchaseBikes] = useConformPurchaseBikesMutation();
  const [cancelPurchaseBikes] = useCancelPurchaseBikesMutation();
  const navigate = useNavigate();

  const metaData = bikeData?.meta;

  const tableData = bikeData?.data?.map(({ _id, seller, bike, isConfirmed, transactionId, status }) => ({
    key: _id,
    bikeId: bike._id,
    sellerName: seller?.name,
    name: bike?.name as string,
    image: bike?.image as string,
    quantity: bike?.quantity as number,
    price: bike?.price as number,
    transactionId,
    status,
    isConfirmed,
  }));
  
  const handleConfirmPurchaseBike = async (bikeConfirmData: any) => {
    // const toastId = toast.loading("Trying to confirm purchase bike!");
    
    const bike = bikeData?.data?.find((item: any) => item?._id === bikeConfirmData?.key);
    
    //* Confirm status to sent to server
    try {
      const res = await conformPurchaseBikes(bikeConfirmData.bikeId).unwrap();

      if (res?.success) {
        // const response = await initialPayment(bikeConfirmData?.key).unwrap();
        // if (response?.data?.paymentUrl) {
        //   window.location.href = response.data.paymentUrl;
        // }

        toast.success("Confirm purchase bike successfully!", {
          duration: 2000,
        });

        //* Navigate to the payment success page
        navigate('/payment/success');
      }

      const invoiceDetails = {
        buyerName: user?.name,
        buyerEmail: user?.email,
        bikeName: bike?.bike?.name,
        bikeModel: bike?.bike?.model,
        bikeColor: bike?.bike?.color,
        manufacturerCountry: bike?.bike?.manufacturerCountry,
        sellerName: bike?.seller?.name,
        sellerEmail: bike?.seller?.email,
        quantity: 1,
        price: bike?.bike?.price,
        tax: 100,
        dateOfSale: new Date().toISOString(),
        totalAmount: bike && bike?.bike?.price + 100,
      };

      const pdfBlob = await generatePDF(invoiceDetails);

      saveAs(pdfBlob, `${bike?.bike?.name}-bike-invoice.pdf`);
    } catch (error: any) {
      toast.error(error.message, { duration: 2000 });
      console.error(error.message);
    }
  };

  const handleCancelPurchaseBike = async (id: string) => {
    const toastId = toast.loading("Trying to cancel purchase bike!");

    //* Confirm status to sent to server
    try {
      const res = await cancelPurchaseBikes(id);

      if ((res as any).success) {
        toast.success("Cancel purchase bike successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Bike name",
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
              onClick={() => handleConfirmPurchaseBike(item)}
              size="small"
              style={{ fontSize: "12px", fontWeight: "600" }}
              disabled={item?.isConfirmed || item.status === "PAID" }
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
              size="small"
              onClick={() => handleCancelPurchaseBike(item.bikeId)}
              style={{ fontSize: "12px", fontWeight: "600" }}
              disabled={item?.isConfirmed || item.status === "PAID"}
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

export default ConfirmPurchase;
