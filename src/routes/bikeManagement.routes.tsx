import { NavLink } from "react-router-dom";
import AddABike from "../pages/bikeManagement/AddABike";
import BikeManagementDashboard from "../pages/bikeManagement/ViewSalesBikes";
import SalesHistory from "../pages/bikeManagement/SalesHistory";
import ViewBikes from "../pages/bikeManagement/ViewBikes";
import { ReactNode } from "react";
import BuyBikes from "../pages/salesManagement/BuyBikes";
import PurchaseBikes from "../pages/salesManagement/PurchaseBikes";
import ViewAllBikes from "@/pages/bikeManagement/ViewAllBikes";
import BulkDeleteBikes from "@/pages/bikeManagement/BulkDeleteBikes";

type TRoute = {
  path: string;
  element: ReactNode;
};

type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export const bikeManagementPaths = [
  {
    name: "View all sales bikes",
    path: "view-all-sales-bike",
    element: <BikeManagementDashboard />,
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
        name: "View all bikes",
        path: "view-all-bikes",
        element: <ViewAllBikes/>,
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

export const bikeManagementSidebarItems = bikeManagementPaths?.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink
            to={`/bike-management/${
              item?.path
            }`}
          >
            {item?.name}
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: (
            <NavLink to={`/bike-management/${child?.path}`}>
              {child?.name}
            </NavLink>
          ),
        })),
      });
    }

    return acc;
  },
  []
);

export const bikeManagementRoutes = bikeManagementPaths?.reduce(
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

// export const bikeManagementPaths = [
//   { index: true, element: <BikeManagementDashboard /> },
//   { path: "dashboard", element: <BikeManagementDashboard /> },
//   { path: "add-a-bike", element: <AddABike /> },
//   { path: "view-bikes", element: <ViewBikes /> },
//   { path: "sales-history", element: <SalesHistory /> },
// ];
