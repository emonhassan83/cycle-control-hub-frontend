// import { NavLink } from "react-router-dom";
import AddABike from "../pages/sellerManagement/AddABike";
import BikeManagementDashboard from "../pages/sellerManagement/ViewSalesBikes";
import SalesHistory from "../pages/sellerManagement/SalesHistory";
import ViewBikes from "../pages/sellerManagement/ViewBikes";
// import { ReactNode } from "react";
import BuyBikes from "../pages/buyerManagement/BuyBikes";
import PurchaseBikes from "../pages/buyerManagement/PurchaseBikes";
import ViewAllBikes from "@/pages/sellerManagement/ViewAllBikes";
import BulkDeleteBikes from "@/pages/sellerManagement/BulkDeleteBikes";

// type TRoute = {
//   path: string;
//   element: ReactNode;
// };

// type TSidebarItem = {
//   key: string;
//   label: ReactNode;
//   children?: TSidebarItem[];
// };

export const sellerPaths = [
  {
    name: "View all sales bikes",
    path: "view-all-sales-bike",
    element: <BikeManagementDashboard />,
  },
  {
    name: "Bike Seller Management",
    children: [
      {
        name: "Add a bike",
        path: "add-a-bike",
        element: <AddABike />,
      },
      {
        name: "View my bikes",
        path: "view-bikes",
        element: <ViewBikes />,
      },
      {
        name: "Bulk delete bikes",
        path: "bulk-delete-bikes",
        element: <BulkDeleteBikes />,
      },
      {
        name: "Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    name: "Bike Buyer Management",
    children: [
      {
        name: "Purchase bikes",
        path: "purchase-bikes",
        element: <ViewAllBikes/>,
      },
      {
        name: "Confirmed Purchase Bike",
        path: "confirmed-purchase-bike",
        element: <BuyBikes />,
      },
      {
        name: "Purchase History",
        path: "purchase-history",
        element: <PurchaseBikes />,
      },
    ],
  },
];

// export const bikeManagementRoutes = bikeManagementPaths?.reduce(
//   (acc: TRoute[], item) => {
//     if (item.path && item.element) {
//       acc.push({
//         path: item.path,
//         element: item.element,
//       });
//     }

//     if (item.children) {
//       item.children.forEach((child) => {
//         acc.push({
//           path: child.path,
//           element: child.element,
//         });
//       });
//     }

//     return acc;
//   },
//   []
// );