import { Image, Button, Row, Col, Card, Upload } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  useMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/features/user/userApi";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import uploadImageToImgbb from "@/components/ImageUploader/ImageUploader";
import UserInformation from "./components/UserInfo";
import ChangePasswordSection from "./components/ChangePasswordSection";
import ProfileUpdateModal from "@/components/dialog/ProfileUpdateModal";
import { toast } from "sonner";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useMyProfileQuery("");
  const [updateMyProfile, { isLoading: updating }] =
    useUpdateMyProfileMutation();

  if (isLoading) {
    return <FullPageLoading />;
  }

  const handleFileUpload = async (file: File) => {
    try {
      const image = await uploadImageToImgbb(file);

      const updatedUserData = {
        id: data?.data?._id,
        userData: { 
          photoUrl: image },
      };

      const upload = await updateMyProfile(updatedUserData).unwrap();
      if (upload?.success) {
        toast.success("Profile photo updated successfully");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <>
      <ProfileUpdateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={data}
      />
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col xs={24} md={8}>
          <Card
            cover={
              <Image
                src={
                  data?.data?.photoUrl ||
                  "https://i.ibb.co.com/qsdyjP8/placeholder-img.png"
                }
                alt="User Photo"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            }
            actions={[
              <Upload
                customRequest={({ file }) => handleFileUpload(file as File)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} loading={updating}>
                  Upload Photo
                </Button>
              </Upload>,
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                Edit Profile
              </Button>,
            ]}
          />
        </Col>
        <Col xs={24} md={16}>
          <UserInformation data={data?.data} />
          <ChangePasswordSection />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
