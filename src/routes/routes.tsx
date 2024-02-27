import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { routeGenerator } from "@/utils/routesGenerator";
import { sellerPaths } from "./bikeManagement.routes";
import { buyerPaths } from "./salesManagement.routes";
// import { bikeManagementRoutes } from "./bikeManagement.routes";
// import { salesManagementRoutes } from "./salesManagement.routes";
// import { salesManagementPaths } from "./salesManagement.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/seller",
    element: <App />,
    children: routeGenerator(sellerPaths),
  },
  {
    path: "/buyer",
    element: <App />,
    children: routeGenerator(buyerPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default router;
