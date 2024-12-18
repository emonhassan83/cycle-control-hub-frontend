import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { routeGenerator } from "@/utils/routesGenerator";
import { sellerPaths } from "./seller.routes";
import { buyerPaths } from "./buyer.routes";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { adminPaths } from "./admin.routes";
import BikeDetails from "@/pages/BikeDetails/BikeDetails";
import PaymentPage from "@/pages/Payment/PaymentPage";
import ErrorPage from "@/pages/ErrorPge/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
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
    path: "/bike-details/:id",
    element: (
      <ProtectedRoute role="buyer">
        <BikeDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment/success",
    element: <PaymentPage />,
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
