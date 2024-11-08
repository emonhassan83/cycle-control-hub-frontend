import ConfirmPurchase from "@/pages/buyerManagement/ConfirmPurchase";
import PurchasesBike from "@/pages/buyerManagement/PurchaseBike";
import PurchasesHistory from "@/pages/buyerManagement/PurchaseHistory";
import RequestMaintenance from "@/pages/buyerManagement/RequestMaintenance";
import ServiceHistory from "@/pages/buyerManagement/ServiceHistory";
import ServiceManagement from "@/pages/buyerManagement/ServiceManagement";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";

import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  ToolOutlined,
  FileDoneOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export const buyerPaths = [
  {
    name: "Available Bikes",
    path: "available-bikes",
    icon: <AppstoreOutlined />,
    element: <PurchasesBike />,
  },
  {
    name: "Confirmed Purchase Bike",
    path: "confirmed-purchase-bike",
    icon: <ShoppingCartOutlined />,
    element: <ConfirmPurchase />,
  },
  {
    name: "Purchase History",
    path: "purchase-history",
    icon: <HistoryOutlined />,
    element: <PurchasesHistory />,
  },

  //* request and maintenance
  {
    name: "Requesting Maintenance",
    path: "requesting-management",
    icon: <ToolOutlined />,
    element: <RequestMaintenance />,
  },
  {
    name: "Services Management",
    path: "services-management",
    icon: <FileDoneOutlined />,
    element: <ServiceManagement />,
  },
  {
    name: "Service History",
    path: "service-history",
    icon: <FileTextOutlined />,
    element: <ServiceHistory />,
  },
  {
    name: "My Profile",
    path: "profile",
    icon: <FileTextOutlined />,
    element: <ProfilePage />,
  },
];
