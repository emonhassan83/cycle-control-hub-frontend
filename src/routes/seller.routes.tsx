import AddABike from "../pages/sellerManagement/AddABike";
import ViewMyBikes from "../pages/sellerManagement/ViewMyBikes";
// import BulkDeleteBikes from "@/pages/sellerManagement/BulkDeleteBikes";
import ServicesManagement from "@/pages/sellerManagement/ServicesManagement";
import MyAllServicesHistory from "@/pages/sellerManagement/MyAllServicesHistory";

export const sellerPaths = [
  {
    name: "Bike Management",
    children: [
      {
        name: "Add a bike",
        path: "add-a-bike",
        element: <AddABike />,
      },
      {
        name: "View my bikes",
        path: "view-bikes",
        element: <ViewMyBikes />,
      },
      // {
      //   name: "Bulk delete bikes",
      //   path: "bulk-delete-bikes",
      //   element: <BulkDeleteBikes />,
      // },
    ],
  },
  {
    name: "Maintenance and Servicing",
    children: [
      {
        name: "Services Management",
        path: "services-management",
        element: <ServicesManagement />,
      },
      {
        name: "Bike services History",
        path: "bike-services-history",
        element: <MyAllServicesHistory/>,
      }
    ],
  },
];