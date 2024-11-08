import { Button, Col, Row, Typography } from "antd";
import ReusableForm from "@/components/form/ReusableForm";
import { FieldValues } from "react-hook-form";
import ReusableToggleInput from "@/components/form/ReusableToggleInput";
// import { useChangePasswordMutation } from '@/redux/api/authApi';

const { Title } = Typography;

const ChangePasswordSection = () => {
  //   const [passwordData, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    // try {
    //   const res = await passwordData(values);
    //   if (res?.data?.message) {
    //     toast.success(res.data.message);
    //   }
    // } catch (error: any) {
    //   toast.error(error.message);
    //   console.error(error.message);
    // }
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
              name="password"
              label="Current Password"
              color="#000"
            />
          </Col>
          <Col xs={24} sm={12}>
            <ReusableToggleInput
              type="password"
              name="newPass"
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
