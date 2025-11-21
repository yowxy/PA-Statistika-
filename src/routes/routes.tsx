import type { RouteObject } from "react-router-dom";
import Home from "../pages/landing/Home";
import DashboardHome from "../pages/Dashboard/dashboardHome";

const AppRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <DashboardHome />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];

export default AppRoutes;
