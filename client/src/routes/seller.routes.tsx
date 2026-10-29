import AddABike from "../pages/sellerManagement/AddABike";
import ViewMyBikes from "../pages/sellerManagement/ViewMyBikes";
// import BulkDeleteBikes from "@/pages/sellerManagement/BulkDeleteBikes";
import ServicesManagement from "@/pages/sellerManagement/ServicesManagement";
import MyAllServicesHistory from "@/pages/sellerManagement/MyAllServicesHistory";

import {
  PlusCircleOutlined,
  EyeOutlined,
  ToolOutlined,
  HistoryOutlined,
  ProfileOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import SellerDashboard from "@/pages/sellerManagement/SellerDashboard";

export const sellerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <ProductOutlined />,
    element: <SellerDashboard />,
  },
  {
    name: "Add a Bike",
    path: "add-a-bike",
    icon: <PlusCircleOutlined />,
    element: <AddABike />,
  },
  {
    name: "View My Bikes",
    path: "view-bikes",
    icon: <EyeOutlined />,
    element: <ViewMyBikes />,
  },
  //* service management
  {
    name: "Services Management",
    path: "services-management",
    icon: <ToolOutlined />,
    element: <ServicesManagement />,
  },
  {
    name: "Bike Services History",
    path: "bike-services-history",
    icon: <HistoryOutlined />,
    element: <MyAllServicesHistory />,
  },
  {
    name: "My Profile",
    path: "profile",
    icon: <ProfileOutlined />,
    element: <ProfilePage />,
  },
];
