/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { useSaveUserMutation } from "../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReusableInput from "../components/form/ReusableInput";
import ReusableForm from "../components/form/ReusableForm";
import { verifyToken } from "@/utils/verifyToken";

const SignUp = () => {
  const defaultValues = {
    name: "susan_anderson",
    email: "susan.anderson@example.com",
    password: "user123",
    contactNumber: "+123-567-382-5678",
    address: "123 Main St, Anytown, USA"
  };

  const [saveUser] = useSaveUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("User sign in!");

    try {
      //* Save to db and wait for the response
      const res = await saveUser(data).unwrap();
      console.log("register user: ", res);

      const user = verifyToken(res.data.accessToken);

      dispatch(setUser({ user: user, token: res?.data?.accessToken }));

      const userRole = (user as any)?.role;

      //* Navigate user based on user role
      if (userRole === "seller") {
        navigate(`/${userRole}/view-sales-bike`);
      }

      if (userRole === "buyer") {
        navigate(`/${userRole}/available-bikes`);
      }

      toast.success("User sign up successfully!", {
        id: toastId,
        duration: 2000,
      });
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
      <h5 style={{ paddingTop: "6vh", fontSize: "20px" }}>SignUp page</h5>
      <Row
        justify="center"
        align="middle"
        style={{width: "100%", marginTop: "25px" }}
      >
        <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <ReusableInput type="text" name="name" label="User Name" />
          <ReusableInput type="email" name="email" label="Email" />
          <ReusableInput type="password" name="password" label="Password" />
          <ReusableInput type="text" name="contactNumber" label="Contact Number" />
          <ReusableInput type="text" name="address" label="Address" />
          <p>
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </p>
          <Button style={{ marginTop: "20px" }} htmlType="submit">
            Register
          </Button>
        </ReusableForm>
      </Row>
    </div>
  );
};

export default SignUp;
