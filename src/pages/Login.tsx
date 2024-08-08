/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Row } from "antd";
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

const Login = () => {
  const defaultValues = {
    email: "john.doe@example.com",
    password: "user123",
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid #5e5e5e",
          borderRadius: "8px",
          padding: "40px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h5 style={{ fontSize: "20px", textAlign: "center" }}>Login Here</h5>
        <Row justify="center" align="middle" style={{ marginTop: "25px" }}>
          <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <ReusableInput
              width="400px"
              type="email"
              name="email"
              label="Email"
            />
            <ReusableInput type="password" name="password" label="Password" />
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
              Login
            </Button>
            <Divider style={{ borderColor: "#5e5e5e" }}>OR</Divider>
            
            <ShowCredentialButton />
            <p style={{fontSize: '12px', textAlign: 'center', marginTop: '10px'}}>
              Don't have an account? <Link to="/sign-up">Register</Link>
            </p>
          </ReusableForm>
        </Row>
      </div>
    </div>
  );
};

export default Login;
