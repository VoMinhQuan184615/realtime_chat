import { RouteObject } from "react-router-dom";
import { DashboardPage } from "@/features/dashboard";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
];
