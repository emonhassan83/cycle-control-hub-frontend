import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { Button, Form, Input, Modal, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgetPasswordModal = ({ open, setOpen }: TProps) => {
  const [forgotPassword] = useForgotPasswordMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    try {      
      const res = await forgotPassword(values).unwrap();
    //   console.log(res);
      
      if (res.success) {
        toast.success("Password reset link sent to your email!");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  return (
    <Modal
      title="Forgot Your Password?"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <Typography.Text type="warning">
          Info: Please enter your registered email address below. Check your email, and we will send you instructions on how to reset your password.
        </Typography.Text>
      </div>

      <Form
        onFinish={handleFormSubmit}
        layout="vertical"
        initialValues={{ email: "" }}
      >
        <Form.Item
          label="Email Address"
          name="email"
          rules={[{ required: true, message: "Please enter your email address!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{backgroundColor: "#1890ff",}} block>
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgetPasswordModal;
