import type { RouteObject } from "react-router-dom";
import Home from "../pages/landing/Home";
import DashboardHome from "../pages/Dashboard/dashboardHome";
import DataKemiskinan from "../pages/Dashboard/pages/dataKemiskinan";
import UjiHipotesis from "../pages/Dashboard/pages/ujiHipotesis";
import HasilUji from "../pages/Dashboard/pages/hasilUji";
import Interpretasi from "../pages/Dashboard/pages/interpretasi";

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
    path: "/dashboard/data-kemiskinan",
    element: <DataKemiskinan />,
  },
  {
    path: "/dashboard/uji-hipotesis",
    element: <UjiHipotesis />,
  },
  {
    path: "/dashboard/hasil-uji",
    element: <HasilUji/>,
  },
  {
    path: "/dashboard/intrepretasi",
    element: <Interpretasi/>,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];

export default AppRoutes;
