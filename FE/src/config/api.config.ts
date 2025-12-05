export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 30000,
  ENDPOINTS: {
    AUTH: "/auth",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
} as const;
