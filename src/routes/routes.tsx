import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { routeGenerator } from "@/utils/routesGenerator";
import { sellerPaths } from "./seller.routes";
import { buyerPaths } from "./buyer.routes";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/seller",
    element: (
      <ProtectedRoute role="seller">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(sellerPaths),
  },
  {
    path: "/buyer",
    element: (
      <ProtectedRoute role="buyer">
        <App />
      </ProtectedRoute>
    ),
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
