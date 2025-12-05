import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {dashboardRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}
