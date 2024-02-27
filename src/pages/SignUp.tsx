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
import ReusableSelect from "@/components/form/ReusableSelect";

const SignUp = () => {
  const defaultValues = {
    username: "susan_anderson",
    email: "susan.anderson@example.com",
    password: "user123",
    role: "seller"
  };

  const userRoleOptions = [
    {
      value: "seller",
      label: "seller",
    },
    {
      value: "buyer",
      label: "buyer",
    },
  ]

  const [saveUser] = useSaveUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("User sign in!");

    try {
      const saveUserInfo = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      const user = {
        name: data.name,
        email: data.email,
        role: data.role,
      };

      //* Save to db and wait for the response
      const res = await saveUser(saveUserInfo).unwrap();
      dispatch(setUser({ user: user, token: res.data.token }));

      const userRole = res?.data?.user?.role;

      //* Navigate user based on user role
      if (userRole === 'seller') {
        navigate(`/${userRole}/view-sales-bike`);
      }

      if (userRole === 'buyer') {
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
      <h5 style={{ paddingTop: "18vh", fontSize: "20px" }}>SignUp page</h5>
      <Row
        justify="center"
        align="middle"
        style={{ height: "100vh", marginTop: "-25vh" }}
      >
        <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <ReusableInput type="text" name="username" label="User Name" />
          <ReusableInput type="email" name="email" label="Email" />
          <ReusableInput type="password" name="password" label="Password" />
          <ReusableSelect name="role" options={userRoleOptions} label="Choose Role" />
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
