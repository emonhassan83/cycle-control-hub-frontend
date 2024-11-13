import AdminDashboard from "@/pages/admin/AdminDashboard";
import AllMyBikesManagement from "@/pages/admin/AllBikesManagement";
import AllServicesManagement from "@/pages/admin/AllServicesManagement";
import AllUsers from "@/pages/admin/AllUsers";
import CouponManagement from "@/pages/admin/CouponManagement";
import CreateCoupon from "@/pages/admin/CreateCoupon";
import CreateServiceCategory from "@/pages/admin/CreateServiceCategory";
import SalesHistory from "@/pages/admin/SalesHistory";
import ServiceCategories from "@/pages/admin/ServiceCategories";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import AddABike from "@/pages/sellerManagement/AddABike";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  TagOutlined,
  TagsOutlined,
  AppstoreAddOutlined,
  DatabaseOutlined,
  SettingOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  ProductOutlined,
} from "@ant-design/icons";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <ProductOutlined />,
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    path: "all-users",
    icon: <UserOutlined />,
    element: <AllUsers />,
  },
  //* bike management
  {
    name: "Add a Bike",
    path: "add-a-bike",
    icon: <ShoppingCartOutlined />,
    element: <AddABike />,
  },
  {
    name: "All Bikes Management",
    path: "all-bikes-management",
    icon: <DatabaseOutlined />,
    element: <AllMyBikesManagement />,
  },
  {
    name: "View Sales History",
    path: "view-sales-history",
    icon: <HistoryOutlined />,
    element: <SalesHistory />,
  },
  //* coupon management
  {
    name: "Create Coupon",
    path: "create-coupon",
    icon: <TagOutlined />,
    element: <CreateCoupon />,
  },
  {
    name: "Coupon Management",
    path: "coupon-management",
    icon: <TagsOutlined />,
    element: <CouponManagement />,
  },
  //* service management
  {
    name: "Create Service Category",
    path: "create-service-category",
    icon: <AppstoreAddOutlined />,
    element: <CreateServiceCategory />,
  },
  {
    name: "All Services Category",
    path: "all-services-category",
    icon: <SettingOutlined />,
    element: <ServiceCategories />,
  },
  {
    name: "All Services Management",
    path: "all-services-management",
    icon: <AppstoreOutlined />,
    element: <AllServicesManagement />,
  },
  {
    name: "My Profile",
    path: "profile",
    icon: <ProfileOutlined />,
    element: <ProfilePage />,
  },
];
