import { Button, Modal } from "antd";
import ReusableForm from "../form/ReusableForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ReusableInput from "../form/ReusableInput";
import ReusableSelect from "../form/ReusableSelect";

const ProfileUpdateModal = ({ data, isModalOpen,  setIsModalOpen}: any) => {
  // console.log(data);
  

  const handleSubmit = async (data: FieldValues) => {
    toast.loading("Assigning coupon to service in!");
   console.log(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        size="small"
        style={{ fontSize: "12px", fontWeight: "600" }}
        // disabled={data.couponName !== "Not Available coupon"}
      >
        Assign coupon
      </Button>
      <Modal
        title="Update Profile Model"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <ReusableForm onSubmit={handleSubmit}>
          <ReusableInput
            type="text"
            name="name"
            label="Name"
          />
           <ReusableInput
            type="email"
            name="email"
            label="Email"
          />
          <ReusableInput
            type="text"
            name="contactNumber"
            label="Contact Number"
          />
          <ReusableSelect
            name="gender"
            label="Gender"
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Unknown", label: "Unknown" },
            ]}
          />
          <ReusableInput
          type="text"
            name="address"
            label="Address"
          />
          <Button
            style={{ backgroundColor: "#1890ff", color: "#fff" }}
            htmlType="submit"
            size="small"
          >
            Update Profile
          </Button>
        </ReusableForm>
      </Modal>
    </>
  );
};

export default ProfileUpdateModal;
