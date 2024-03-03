import ConfirmPurchase from "@/pages/buyerManagement/ConfirmPurchase";
import PurchasesBike from "@/pages/buyerManagement/PurchaseBike";
import PurchasesHistory from "@/pages/buyerManagement/PurchaseHistory";
import RequestMaintenance from "@/pages/buyerManagement/RequestMaintenance";
import ServiceHistory from "@/pages/buyerManagement/ServiceHistory";
import ServiceManagement from "@/pages/buyerManagement/ServiceManagement";


export const buyerPaths = [
  {
    name: "Available bikes",
    path: "available-bikes",
    element: <PurchasesBike />,
  },
  {
    name: "Sales Management",
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
    name: "Maintenance and Servicing",
    children: [
      {
        name: "Requesting Maintenance",
        path: "requesting-management",
        element: <RequestMaintenance/>,
      },
      {
        name: "Services Management",
        path: "services-management",
        element: <ServiceManagement/>,
      },
      {
        name: "Service History",
        path: "service-history",
        element: <ServiceHistory/>,
      },
    ],
  },
];
