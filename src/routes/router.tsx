import { createBrowserRouter } from "react-router-dom";
import LoginRoute from "./LoginRoute";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./DashboardRouter";
import App from "../App";
import SignInRoute from "./SignInRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignInRoute />,
  },
  {
    path: "/login",
    element: <LoginRoute />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
