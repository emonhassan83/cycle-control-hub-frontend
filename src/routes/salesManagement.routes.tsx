import BuyBikes from "../pages/buyerManagement/BuyBikes";
import PurchaseBikes from "../pages/buyerManagement/PurchaseBikes";
import SalesManagementDashboard from "../pages/buyerManagement/SalesManagementDashboard";

export const buyerPaths = [
    {
        name: "Buyer Dashboard",
        path: "buyer-dashboard",
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
