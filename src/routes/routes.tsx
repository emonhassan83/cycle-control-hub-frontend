import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { bikeManagementRoutes } from "./bikeManagement.routes";
import { salesManagementRoutes } from "./salesManagement.routes";
// import { salesManagementPaths } from "./salesManagement.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/bike-management",
    element: <App />,
    children: bikeManagementRoutes,
  },
  {
    path: "/sales-management",
    element: <App />,
    children: salesManagementRoutes,
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
