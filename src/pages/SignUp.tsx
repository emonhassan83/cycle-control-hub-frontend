/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { useSaveUserMutation } from "../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReusableInput from "../components/form/ReusableInput";
import ReusableForm from "../components/form/ReusableForm";
import { verifyToken } from "@/utils/verifyToken";
import ReusableToggleInput from "@/components/form/ReusableToggleInput";

const SignUp = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
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
      const userRole = (user as any)?.role;

      if (res.success) {
        dispatch(setUser({ user: user, token: res?.data?.accessToken }));

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
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
      console.error(error.message);
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
          border: "1px solid rgb(194, 192, 192)",
          borderRadius: "8px",
          padding: "40px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h5 style={{ fontSize: "20px", textAlign: "center" }}>Sign Up</h5>
        <Row justify="center" align="middle" style={{ marginTop: "25px" }}>
          <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <ReusableInput
              type="text"
              name="name"
              label="User Name"
              width="400px"
            />
            <ReusableInput
              type="email"
              name="email"
              label="Email"
              width="400px"
            />
            <ReusableToggleInput
              type="password"
              name="password"
              label="Password"
              width="400px"
            />
            <Row gutter={16} style={{ marginTop: "20px" }}>
              <Col span={12}>
                <ReusableInput
                  type="text"
                  name="contactNumber"
                  label="Contact Number"
                  width="100%"
                />
              </Col>
              <Col span={12}>
                <ReusableInput
                  type="text"
                  name="address"
                  label="Address"
                  width="100%"
                />
              </Col>
            </Row>
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
              Register
            </Button>
            <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "underline" }}>
                Login
              </Link>
            </p>
          </ReusableForm>
        </Row>
      </div>
    </div>
  );
};

export default SignUp;
