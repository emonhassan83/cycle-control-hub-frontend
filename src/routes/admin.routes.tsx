import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateCoupon from "@/pages/admin/CreateCoupon";
import ConfirmPurchase from "@/pages/buyerManagement/ConfirmPurchase";
import PurchasesHistory from "@/pages/buyerManagement/PurchaseHistory";
import RequestMaintenance from "@/pages/buyerManagement/RequestMaintenance";
import ServiceHistory from "@/pages/buyerManagement/ServiceHistory";

//! TODO: Add related components in admin dashboard
export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Bike Management",
    children: [
      {
        name: "Confirmed Purchase Bike",
        path: "confirmed-purchase-bike",
        element: <ConfirmPurchase/>,
      },
      {
        name: "Purchase History",
        path: "purchase-history",
        element: <PurchasesHistory/>,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "All Users",
        path: "all-users",
        element: <RequestMaintenance/>,
      },
      {
        name: "Service History",
        path: "service-history",
        element: <ServiceHistory/>,
      },
    ],
  },
  {
    name: "Others",
    children: [
      {
        name: "Create Coupon",
        path: "create-coupon",
        element: <CreateCoupon/>,
      },
      {
        name: "Service History",
        path: "service-history",
        element: <ServiceHistory/>,
      },
    ],
  },
];
