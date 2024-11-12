import { Image, Button, Row, Col, Card, Upload, message } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/features/user/userApi";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import uploadImageToImgbb from "@/components/ImageUploader/ImageUploader";
import UserInformation from "./components/UserInfo";
import ChangePasswordSection from "./components/ChangePasswordSection";
import ProfileUpdateModal from "@/components/dialog/ProfileUpdateModal";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useMyProfileQuery("");
  const [updateMyProfile, { isLoading: updating }] = useUpdateMyProfileMutation();

  if (isLoading) {
    return <FullPageLoading/>;
  }

  const handleFileUpload = async (file: File) => {    
    try {
      const image = await uploadImageToImgbb(file);
      console.log(image);
      
      const updatedUserData = { profilePhoto: image };

      const upload = await updateMyProfile(updatedUserData);
      if (upload?.data) {
        message.success("Profile photo updated successfully");
      }
    } catch (error) {
      message.error("Failed to upload image");
    }
  };

  return (
    <>
      <ProfileUpdateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={data} />
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col xs={24} md={8}>
          <Card
            cover={
              <Image
                src={data?.profilePhoto || "https://i.ibb.co.com/qsdyjP8/placeholder-img.png"}
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
              <Button icon={<EditOutlined />} onClick={() => setIsModalOpen(true)}>
                Edit Profile
              </Button>
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
