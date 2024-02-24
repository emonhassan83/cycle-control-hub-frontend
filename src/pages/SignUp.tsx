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

const SignUp = () => {
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     username: "susan_anderson",
  //     email: "susan.anderson@example.com",
  //     password: "user123",
  //   },
  // });

  const defaultValues = {
    username: "susan_anderson",
    email: "susan.anderson@example.com",
    password: "user123",
  };

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
        role: "user",
      };

      const user = {
        name: data.name,
        email: data.email,
        role: data.role,
      };

      // Save to db and wait for the response
      const response = await saveUser(saveUserInfo).unwrap();
      dispatch(setUser({ user: user, token: response.data.token }));

      navigate("/bike-management/view-all-sales-bike");

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
