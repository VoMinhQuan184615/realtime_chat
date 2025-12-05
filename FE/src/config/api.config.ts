export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 30000,
  ENDPOINTS: {
    AUTH: "/auth",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/users/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
} as const;
