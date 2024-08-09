import { Button, Col, Row } from "antd";
import ReusableForm from "../../components/form/ReusableForm";
import ReusableInput from "../../components/form/ReusableInput";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { usePostBikeMutation } from "@/redux/features/bikeManagement/bikeManagementApi";
import { toast } from "sonner";
import ReusableSelect from "@/components/form/ReusableSelect";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ReusableTextArea from "@/components/form/ReusableTextArea";

type TDefaultValues = {
  name?: string;
  image?: string;
  quantity?: number;
  price?: number;
  brand?: string;
  model?: string;
  type?: string;
  size?: string;
  color?: string;
  frameMaterial?: string;
  suspensionType?: string;
  manufacturerCountry?: string;
  description?: string;
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
  },
];

const productMaterialOptions = [
  {
    value: "Aluminum",
    label: "Aluminum",
  },
  {
    value: "Metal",
    label: "Metal",
  },
];

const AddABike = () => {
  const user = useAppSelector(selectCurrentUser);
  const { bike } = useAppSelector((state) => state.bike) as unknown as {
    bike?: TDefaultValues;
  };
  const [addBike, { data }] = usePostBikeMutation();
  const navigate = useNavigate();

  console.log("Add Bike Response Data: ", data);
  // console.log("Bike Data: ", bike);

  const defaultValues: TDefaultValues = {
    name: bike?.name,
    image: bike?.image,
    quantity: bike?.quantity,
    price: bike?.price,
    brand: bike?.brand,
    model: bike?.model,
    type: bike?.type,
    size: bike?.size,
    color: bike?.color,
    frameMaterial: bike?.frameMaterial,
    suspensionType: bike?.suspensionType,
    manufacturerCountry: bike?.manufacturerCountry,
    description: bike?.description,
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
        seller: user?._id,
        quantity: Number(data?.quantity),
        price: Number(data?.price),
        releaseDate,
      };

      // * add bike in database
      const res = await addBike(bikeData).unwrap();
      // console.log(res);

      if (res?.success) {
        toast.success("Add bike in database successfully!", {
          id: toastId,
          duration: 3000,
        });

        //* Navigate to user in view bikes page
        navigate(`/${user?.role}/view-bikes`);
      }
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
    <h5 style={{ fontSize: "20px", marginBottom: "20px" }}>Add a Bike</h5>
    <Row
      justify="center"
      align="middle"
    >
      <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ReusableInput type="text" name="name" label="Product Name" />
          <ReusableInput type="text" name="image" label="Product Image" />
          <ReusableInput
            type="text"
            name="quantity"
            label="Product Quantity"
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            width: "100%",
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
            width: "100%",
          }}
        >
          <Col span={8}>
            <ReusableSelect
              label="Product Type"
              name="type"
              options={productTypeOptions}
            />
          </Col>
          <Col span={8}>
            <ReusableSelect
              label="Size"
              name="size"
              options={productSizeOptions}
            />
          </Col>
          <Col span={8}>
            <ReusableInput type="text" name="color" label="Color" />
          </Col>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Col span={8}>
            <ReusableSelect
              label="Frame Material"
              name="frameMaterial"
              options={productMaterialOptions}
            />
          </Col>
          <Col span={8}>
            <ReusableInput
              type="text"
              name="suspensionType"
              label="Suspension Type"
            />
          </Col>
          <Col span={8}>
            <ReusableInput
              type="text"
              name="manufacturerCountry"
              label="Manufacturer Country"
            />
          </Col>
        </div>
        <ReusableTextArea
          name="description"
          label="Product description"
          rows={3}
          style={{ width: "100%" }}
        />
        <Button
          style={{
            marginTop: "20px",
            width: "100%",
            borderRadius: "4px",
            backgroundColor: "#1890ff",
            color: "#fff",
          }}
          htmlType="submit"
        >
          Add
        </Button>
      </ReusableForm>
    </Row>
  </div>
);
};

export default AddABike;
