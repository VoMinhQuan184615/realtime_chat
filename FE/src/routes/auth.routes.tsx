import { RouteObject } from "react-router-dom";
import { LoginPage, ForgotPasswordPage, SignupPage } from "@/features/auth";
import { AUTH_ROUTES } from "@/features/auth/constants";

export const authRoutes: RouteObject[] = [
  {
    path: AUTH_ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: AUTH_ROUTES.HOME,
    element: <LoginPage />,
  },
  {
    path: AUTH_ROUTES.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: AUTH_ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
];
