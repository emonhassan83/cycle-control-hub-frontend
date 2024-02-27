/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Layout } from "antd";
const { Header, Content, Footer } = Layout;
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    toast.success("User logged out successfully!");
    dispatch(logout());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar/>
      <Layout>
        <Header
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button className="bg-white" onClick={handleLogout}>Logout</Button>{" "}
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Cycle Control Hub ©{new Date().getFullYear()} Created by Emon Hassan
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
