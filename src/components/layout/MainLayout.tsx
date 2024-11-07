/* eslint-disable @typescript-eslint/no-unused-vars */
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileDropdown from "../dropdown/ProfileDropdown";
import { useMyProfileQuery } from "@/redux/features/user/userApi";

const MainLayout = () => {
  const { data } = useMyProfileQuery("");

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
          {/* <Button className="bg-white" onClick={handleLogout}>Logout</Button>{" "} */}
          <ProfileDropdown data={data}/>
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
