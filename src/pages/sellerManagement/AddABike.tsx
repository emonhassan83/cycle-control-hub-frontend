import { Button, Row } from "antd";
import ReusableForm from "../../components/form/ReusableForm";
import ReusableInput from "../../components/form/ReusableInput";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { usePostBikeMutation } from "@/redux/features/bikeManagement/bikeManagementApi";
import { toast } from "sonner";
import ReusableSelect from "@/components/form/ReusableSelect";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

type TDefaultValues = {
  productName?: string;
  productImage?: string;
  productQuantity?: number;
  price?: number;
  brand?: string;
  model?: string;
  type?: string;
  size?: string;
  color?: string;
  frameMaterial?: string;
  suspensionType?: string;
  manufacturerCountry?: string;
};

const productTypeOptions = [
  {
    value: "road",
    label: "road",
  },
  {
    value: "mountain",
    label: "mountain",
  },
  {
    value: "hybrid",
    label: "hybrid",
  },
  {
    value: "electric",
    label: "electric",
  },
  {
    value: "kids",
    label: "kids",
  },
];

const productSizeOptions = [
  {
    value: "Large",
    label: "Large",
  },
  {
    value: "Medium",
    label: "Medium",
  },
  {
    value: "Small",
    label: "Small",
  }
];

const productMaterialOptions = [
  {
    value: "Aluminum",
    label: "Aluminum",
  },
  {
    value: "Metal",
    label: "Metal",
  }
];

const AddABike = () => {
  const user = useAppSelector(selectCurrentUser);
  const { bike } = useAppSelector((state) => state.bike) as unknown as {
    bike?: TDefaultValues;
  };
  const [addBike, { data}] = usePostBikeMutation();
  const navigate = useNavigate();

  console.log("data ------>", data);

  const defaultValues: TDefaultValues = {
    productName: bike?.productName,
    productImage: bike?.productImage,
    productQuantity: bike?.productQuantity,
    price: bike?.price,
    brand: bike?.brand,
    model: bike?.model,
    type: bike?.type,
    size: bike?.size,
    color: bike?.color,
    frameMaterial: bike?.frameMaterial,
    suspensionType: bike?.suspensionType,
    manufacturerCountry: bike?.manufacturerCountry,
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Try to add bike in database!");

    try {
      const originalDate = new Date();
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");

      // Form the desired date string in the format YYYY-MM-DD
      const releaseDate = `${year}-${month}-${day}`;

      const bikeData = {
        ...data,
        // seller: user?._id,
        productQuantity: Number(data?.productQuantity),
        price: Number(data?.price),
        releaseDate,
        isSale: false,
      };
  
      // * add bike in database
      addBike(bikeData);
      toast.success("Add bike in database successfully!", {id: toastId, duration: 3000 });

      //* Navigate to user in view bikes page
      navigate(`/${user?.role}/view-bikes`);
      
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h5 style={{ fontSize: "20px" }}>Add a Bike</h5>
      <Row
        justify="center"
        align="middle"
        style={{ height: "100vh", marginTop: "-20vh" }}
      >
        <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <ReusableInput
              type="text"
              name="productName"
              label="Product Name"
            />
            <ReusableInput
              type="text"
              name="productImage"
              label="Product Image"
            />
            <ReusableInput
              type="text"
              name="productQuantity"
              label="Product Quantity"
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <ReusableInput type="text" name="price" label="Price" />
            <ReusableInput type="text" name="brand" label="Brand" />
            <ReusableInput type="text" name="model" label="Model" />
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <div>
              <ReusableSelect
            label="Product Type"
            name="type"
            options={productTypeOptions}
          />
            </div>
            <div>
              <ReusableSelect
            label="Size"
            name="size"
            options={productSizeOptions}
          />
            </div>
            <ReusableInput type="text" name="color" label="Color" />
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <div>
              <ReusableSelect
            label="Frame Material"
            name="frameMaterial"
            options={productMaterialOptions}
          />
            </div>
            <ReusableInput
              type="text"
              name="suspensionType"
              label="Suspension Type"
            />
            <ReusableInput
              type="text"
              name="manufacturerCountry"
              label="Manufacturer Country"
            />
          </div>
          <Button style={{}} htmlType="submit">
            Add
          </Button>
        </ReusableForm>
      </Row>
    </div>
  );
};

export default AddABike;
