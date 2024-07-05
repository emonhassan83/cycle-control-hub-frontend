/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReusableForm from "../components/form/ReusableForm";
import ReusableInput from "../components/form/ReusableInput";
import { verifyToken } from "@/utils/verifyToken";

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
      console.log("Login User: ",res);

      const user = verifyToken(res.data.accessToken);
      
      // * set user credentials in state
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      
      const userRole = (user as any)?.role;
      
      //* Navigate user based on user role
      if (userRole === 'admin') {
        navigate(`/${userRole}/admin-dashboard`);
      }

      if (userRole === 'seller') {
        navigate(`/${userRole}/view-sales-bike`);
      }

      if (userRole === 'buyer') {
        navigate(`/${userRole}/available-bikes`);
      }

      toast.success("Login in successfully!", { id: toastId, duration: 2000 });
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
      }}
    >
      <h5 style={{ paddingTop: "18vh", fontSize: "20px" }}>Login Here</h5>
      <Row
        justify="center"
        align="middle"
        style={{marginTop: "25px"}}
      >
        <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <ReusableInput type="email" name="email" label="Email" />

          <ReusableInput type="password" name="password" label="Password" />
          <p>
            <small>
              Don't have an account? <Link to="/sign-up">Register</Link>
            </small>
          </p>
          <Button style={{ marginTop: "20px" }} htmlType="submit">Login</Button>
        </ReusableForm>
      </Row>
    </div>
  );
};

export default Login;
