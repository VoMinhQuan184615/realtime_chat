import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { authRoutes } from "./auth.routes";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        {authRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        {/* Thêm dashboard, protected routes tại đây */}
      </Routes>
    </Router>
  );
}
