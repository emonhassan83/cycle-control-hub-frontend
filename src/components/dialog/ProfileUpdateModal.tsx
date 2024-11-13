import { Button, Col, Modal, Row } from "antd";
import ReusableForm from "../form/ReusableForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ReusableInput from "../form/ReusableInput";
import ReusableSelect from "../form/ReusableSelect";

type TDefaultValues = {
  name?: string;
  email?: string;
  contactNumber?: number;
  gender?: number;
  address?: string;
};
const ProfileUpdateModal = ({ data, isModalOpen, setIsModalOpen }: any) => {
  const user = data?.data;

  const defaultValues: TDefaultValues = {
    name: user?.name,
    email: user?.email,
    contactNumber: user?.contactNumber,
    gender: user?.gender,
    address: user?.address,
  };

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
      >
        Update Profile
      </Button>
      <Modal
        title="Update Profile Model"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <ReusableForm onSubmit={handleSubmit} defaultValues={defaultValues}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <ReusableInput type="text" name="name" label="Name" />
            </Col>
            <Col xs={24} sm={12}>
              <ReusableSelect
                name="gender"
                label="Gender"
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Unknown", label: "Unknown" },
                ]}
              />
            </Col>
          </Row>
          <ReusableInput
            type="email"
            name="email"
            label="Email"
            style={{ display: "none" }}
          />
          <ReusableInput
            type="text"
            name="contactNumber"
            label="Contact Number"
          />

          <ReusableInput type="text" name="address" label="Address" />
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
