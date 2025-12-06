import { RouteObject } from "react-router-dom";
import { DashboardPage } from "@/features/dashboard";
import { ProtectedRoute } from "./ProtectedRoute";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
];
