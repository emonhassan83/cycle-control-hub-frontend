import AddABike from "../pages/sellerManagement/AddABike";
import ViewMyBikes from "../pages/sellerManagement/ViewMyBikes";
// import BulkDeleteBikes from "@/pages/sellerManagement/BulkDeleteBikes";
import ServicesManagement from "@/pages/sellerManagement/ServicesManagement";
import MyAllServicesHistory from "@/pages/sellerManagement/MyAllServicesHistory";

import {
  PlusCircleOutlined,
  EyeOutlined,
  ToolOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

export const sellerPaths = [
  {
    name: "Add a Bike",
    path: "add-a-bike",
    icon: <PlusCircleOutlined />,
    element: <AddABike />,
  },
  {
    name: "View My Bikes",
    path: "view-bikes",
    icon: <EyeOutlined />,
    element: <ViewMyBikes />,
  },
  // Uncomment if BulkDeleteBikes is added back
  // {
  //   name: "Bulk Delete Bikes",
  //   path: "bulk-delete-bikes",
  //   icon: <DeleteOutlined />,
  //   element: <BulkDeleteBikes />,
  // },
  //* service management
  {
    name: "Services Management",
    path: "services-management",
    icon: <ToolOutlined />,
    element: <ServicesManagement />,
  },
  {
    name: "Bike Services History",
    path: "bike-services-history",
    icon: <HistoryOutlined />,
    element: <MyAllServicesHistory />,
  },
];
