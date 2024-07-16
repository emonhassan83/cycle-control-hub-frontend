import AllUsers from "@/pages/admin/AllUsers";
import CouponManagement from "@/pages/admin/CouponManagement";
import CreateCoupon from "@/pages/admin/CreateCoupon";
import ServiceCategories from "@/pages/admin/ServiceCategories";
import SalesHistory from "@/pages/admin/SalesHistory";
import CreateServiceCategory from "@/pages/admin/CreateServiceCategory";
import AllServicesManagement from "@/pages/admin/AllServicesManagement";
import AllBikesManagement from "@/pages/admin/AllBikesManagement";
import AddABike from "@/pages/sellerManagement/AddABike";

export const adminPaths = [
  // {
  //   name: "Dashboard",
  //   path: "admin-dashboard",
  //   element: <AdminDashboard />,
  // },
  {
    name: "User Management",
    path: "all-users",
    element: <AllUsers />,
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
        name: "All Bikes Management",
        path: "all-bikes-management",
        element: <AllBikesManagement />,
      },
      {
        name: "View seals History",
        path: "view-sales-history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    name: "Coupon Management",
    children: [
      {
        name: "Create Coupon",
        path: "create-coupon",
        element: <CreateCoupon />,
      },
      {
        name: "Coupon management",
        path: "coupon-management",
        element: <CouponManagement />,
      },
    ],
  },
  {
    name: "Service Management",
    children: [
      {
        name: "Create service category",
        path: "create-service-category",
        element: <CreateServiceCategory />,
      },
      {
        name: "All Services category",
        path: "all-services-category",
        element: <ServiceCategories />,
      },
      {
        name: "All Services management",
        path: "all-services-management",
        element: <AllServicesManagement />,
      },
    ],
  },
];
