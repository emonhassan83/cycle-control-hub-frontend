import { Button, Col, Row, Typography } from "antd";
import ReusableForm from "@/components/form/ReusableForm";
import { FieldValues } from "react-hook-form";
import ReusableToggleInput from "@/components/form/ReusableToggleInput";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const { Title } = Typography;

const ChangePasswordSection = () => {
    const [passwordData] = useChangePasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await passwordData(data).unwrap();
      if (res?.success) {
        toast.success("Password updated successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  return (
    <div>
      <Title level={4} style={{ color: "#1890ff", marginTop: 24 }}>
        Change Password
      </Title>

      <ReusableForm onSubmit={onSubmit}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <ReusableToggleInput
              type="password"
              name="oldPassword"
              label="Current Password"
              color="#000"
            />
          </Col>
          <Col xs={24} sm={12}>
            <ReusableToggleInput
              type="password"
              name="newPassword"
              label="New Password"
              color="#000"
            />
          </Col>
        </Row>
        <Button
          style={{
            marginTop: "20px",
            width: "100%",
            borderRadius: "4px",
            backgroundColor: '#1890ff',
            color: "#fff",
            fontWeight: "bold",
          }}
          htmlType="submit"
        >
          Change Password
        </Button>
      </ReusableForm>
    </div>
  );
};

export default ChangePasswordSection;
