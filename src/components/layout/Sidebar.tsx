import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminPaths } from "@/routes/admin.routes";
import { buyerPaths } from "@/routes/buyer.routes";
import { sellerPaths } from "@/routes/seller.routes";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { verifyToken } from "@/utils/verifyToken";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  SELLER: "seller",
  BUYER: "buyer",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    case userRole.SELLER:
      sidebarItems = sidebarItemsGenerator(sellerPaths, userRole.SELLER);
      break;

    case userRole.BUYER:
      sidebarItems = sidebarItemsGenerator(buyerPaths, userRole.BUYER);
      break;

    default:
      break;
  }

  return (
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
        <h1 className="ml-2">CYCLE CONTROL HUB</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
