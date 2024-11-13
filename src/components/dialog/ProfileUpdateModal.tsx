import { Button, Col, Modal, Row } from "antd";
import ReusableForm from "../form/ReusableForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ReusableInput from "../form/ReusableInput";
import ReusableSelect from "../form/ReusableSelect";
import { useUpdateMyProfileMutation } from "@/redux/features/user/userApi";

type TDefaultValues = {
  name?: string;
  email?: string;
  contactNumber?: number;
  gender?: number;
  address?: string;
};
const ProfileUpdateModal = ({ data, isModalOpen, setIsModalOpen }: any) => {
  const [updateMyProfile] = useUpdateMyProfileMutation();
  const user = data?.data;

  const defaultValues: TDefaultValues = {
    name: user?.name,
    email: user?.email,
    contactNumber: user?.contactNumber,
    gender: user?.gender,
    address: user?.address,
  };

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Update my Profile  in!");
    const userUpdateData = {
      id: user?._id,
      userData: data
    }

    try {
      const res = await updateMyProfile(userUpdateData).unwrap();
      if (res?.success) {
        toast.success("Update my Profile successfully!", {
          id: toastId,
          duration: 3000,
        });

        setIsModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message, {id: toastId});
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "unknown", label: "Unknown" },
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
