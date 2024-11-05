/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Divider, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReusableForm from "../components/form/ReusableForm";
import ReusableInput from "../components/form/ReusableInput";
import { verifyToken } from "@/utils/verifyToken";
import ShowCredentialButton from "@/components/buttons/ShowCredentialsButton";
import ReusableToggleInput from "@/components/form/ReusableToggleInput";
import { useState } from "react";
import ForgetPasswordModal from "@/components/dialog/ForgotPasswordDialog";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
  };

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Login in!");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      // * Login user here
      const res = await login(userInfo).unwrap();
      console.log("Login User: ", res);

      const user = verifyToken(res.data.accessToken);
      const userRole = (user as any)?.role;

      if (res.success) {
        // * set user credentials in state
        dispatch(setUser({ user: user, token: res?.data?.accessToken }));

        //* Navigate user based on user role
        if (userRole === "admin") {
          navigate(`/${userRole}/all-users`);
        }

        if (userRole === "seller") {
          navigate(`/${userRole}/view-bikes`);
        }

        if (userRole === "buyer") {
          navigate(`/${userRole}/available-bikes`);
        }

        toast.success("Login in successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <>
    <ForgetPasswordModal open={isModalOpen} setOpen={setIsModalOpen} />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('https://i.ibb.co.com/FKJ5GY8/photo-1518057014654-ba829c396280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          borderRadius: "8px",
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.137)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <h2 style={{ fontSize: "24px", textAlign: "center", color: "#fff" }}>
          Welcome Back!
        </h2>
        <p style={{ fontSize: "14px", textAlign: "center", color: "#fff" }}>
          Sign in to continue to your account
        </p>
        <Row justify="center" align="middle" style={{ marginTop: "25px" }}>
          <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <ReusableInput color="#fff" width="400px" type="email" name="email" label="Email" />
            <Row gutter={16} style={{ marginBottom: "10px" }}>
              <Col span={24} style={{ textAlign: "end", marginBottom: "-50px" }}>
                <Button onClick={() => setIsModalOpen(true)} type="link" style={{ fontSize: "12px", color: "#fff" }}>
                  Forgot Password?
                </Button>
              </Col>
            </Row>
            <ReusableToggleInput type="password" name="password" label="Password" />
            <Button
              style={{
                marginTop: "20px",
                width: "100%",
                borderRadius: "4px",
                backgroundColor: "rgba(255, 255, 255, 0.137)",
                color: "#fff",
                fontWeight: "bold",
              }}
              htmlType="submit"
            >
              Login
            </Button>
            <Divider style={{ borderColor: "#fff", color: "#fff" }}>OR</Divider>
            <ShowCredentialButton />
            <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                marginTop: "10px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Don't have an account?{" "}
              <Link to="/sign-up" style={{ color: "#fff", textDecoration: "underline" }}>
                Register
              </Link>
            </p>
          </ReusableForm>
        </Row>
      </div>
    </div>
  </>
  );
};

export default Login;
