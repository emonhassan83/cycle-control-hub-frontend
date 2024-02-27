/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
// import { bikeManagementSidebarItems } from "../../routes/bikeManagement.routes";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { sellerPaths } from "@/routes/bikeManagement.routes";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    toast.success("User logged out successfully!");
    dispatch(logout());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "12px",
            textAlign: "center",
            height: "3rem",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <h1>CYCLE CONTROL HUB</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItemsGenerator(sellerPaths, "seller")}
        />
      </Sider>
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
