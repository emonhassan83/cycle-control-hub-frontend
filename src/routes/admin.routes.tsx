import AdminDashboard from "@/pages/admin/AdminDashboard";
import AllServicesStatus from "@/pages/admin/AllServicesStatus";
import AllUsers from "@/pages/admin/AllUsers";
import CouponManagement from "@/pages/admin/CouponManagement";
import CreateCoupon from "@/pages/admin/CreateCoupon";
import ServiceCategories from "@/pages/admin/ServiceCategories";
import ViewAllBikes from "@/pages/buyerManagement/ViewAllBikes";
import AddABike from "@/pages/sellerManagement/AddABike";
import SalesHistory from "@/pages/sellerManagement/SalesHistory";
import ViewSalesBikes from "@/pages/sellerManagement/ViewSalesBikes";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "admin-dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Bike Management",
    children: [
      {
        name: "Add a bike",
        path: "add-a-bike",
        element: <AddABike />,
      },
      {
        name: "View sales bikes",
        path: "view-sales-bike",
        element: <ViewSalesBikes />,
      },
      {
        name: "View all bikes",
        path: "view-all-bikes",
        element: <ViewAllBikes />,
      },
      {
        name: "View seals History",
        path: "view-sales-history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "All Users",
        path: "all-users",
        element: <AllUsers />,
      }
    ],
  },
  {
    name: "Others Services Management",
    children: [
      {
        name: "Create Coupon",
        path: "create-coupon",
        element: <CreateCoupon/>,
      },
      {
        name: "Coupon management",
        path: "coupon-management",
        element: <CouponManagement/>,
      },
      {
        name: "Service Categories",
        path: "service-categories",
        element: <ServiceCategories/>,
      },
      {
        name: "All Services status",
        path: "all-services-status",
        element: <AllServicesStatus />,
      },
    ],
  },
];
