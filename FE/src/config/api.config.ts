export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
  TIMEOUT: (import.meta.env.VITE_API_TIMEOUT as unknown as number) || 30000,
  ENDPOINTS: {
    AUTH: "/auth",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/users/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    USER_PROFILE: "/users/profile",
  },
} as const;
