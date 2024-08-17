import { useParams } from "react-router-dom";
import {
  useGetASaleBikeQuery,
  useGetSalesBikesQuery,
} from "@/redux/features/bikeManagement/bikeManagementApi";
import { usePurchaseBikesMutation } from "@/redux/features/salesManagement/salesManagementApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { generatePDF } from "@/components/PDF/generatePDF";
import { saveAs } from "file-saver";
import BikeDetailsHeroSection from "./components/BikeDetailsHeroSection";
import BikeDetailsSection from "./components/BikeDetailsSection";
import RelatedBikes from "./components/RelatedBikeProduct";
import FullPageLoading from "@/components/Loader/FullPageLoader";

const BikeDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetASaleBikeQuery(id);
  const { data: bikes } = useGetSalesBikesQuery([]);
  const user = useAppSelector(selectCurrentUser);
  const [purchaseBikes] = usePurchaseBikesMutation();

  const bikeData = bikes?.data?.filter((bike) => bike._id !== id);
  const bike = data?.data;
  // console.log(bikeData);

  const handleBuyNow = async () => {
    const toastId = toast.loading("Processing your purchase...");

    try {
      const bikePurchaseInfo = {
        buyer: user?._id,
        seller: bike.seller._id,
        bike: bike._id,
        buyingDate: new Date().toISOString(),
        isConfirmed: false,
      };

      const res = await purchaseBikes(bikePurchaseInfo).unwrap();

      if (res.success) {
        toast.success("Bike purchased successfully!", { id: toastId });

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

        const pdfBlob = await generatePDF(invoiceDetails);

        saveAs(pdfBlob, `${bike.name}-bike-invoice.pdf`);
      }
    } catch (error) {
      toast.error("Failed to purchase the bike. Please try again.", {
        id: toastId,
      });
    }
  };

  if (isLoading) return <FullPageLoading />;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <BikeDetailsHeroSection bike={bike} handleBuyNow={handleBuyNow} />
      <BikeDetailsSection bike={bike} />
      {bikeData && <RelatedBikes relatedBikes={bikeData} />}
    </div>
  );
};

export default BikeDetails;
