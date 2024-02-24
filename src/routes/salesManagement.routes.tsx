// import { NavLink } from "react-router-dom";
import BuyBikes from "../pages/salesManagement/BuyBikes";
import PurchaseBikes from "../pages/salesManagement/PurchaseBikes";
import SalesManagementDashboard from "../pages/salesManagement/SalesManagementDashboard";
import { ReactNode } from "react";

type TRoute = {
  path: string;
  element: ReactNode;
};

export const salesManagementPaths = [
    {
        name: "Sales Management",
        path: "view-all-bike",
        element: <SalesManagementDashboard />,
      },
  {
    name: "Sales Management",
    children: [
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

// export const bikeManagementSidebarItems = salesManagementPaths?.reduce(
//   (acc: TSidebarItem[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: (
//           <NavLink to={`/bike-management/${item?.path}`}>{item?.name}</NavLink>
//         ),
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: (
//             <NavLink to={`/bike-management/${child?.path}`}>
//               {child?.name}
//             </NavLink>
//           ),
//         })),
//       });
//     }

//     return acc;
//   },
//   []
// );

export const salesManagementRoutes = salesManagementPaths?.reduce(
  (acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path,
          element: child.element,
        });
      });
    }

    return acc;
  },
  []
);

// export const salesManagementPaths = [
//   { index: true, element: <SalesManagementDashboard /> },
//   { path: "dashboard", element: <SalesManagementDashboard /> },
//   { path: "buy-bikes", element: <BuyBikes /> },
//   { path: "purchase-history", element: <PurchaseBikes /> },
// ];
