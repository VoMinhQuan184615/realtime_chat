export const APP_NAME = "Acme Inc.";
export const APP_DESCRIPTION = "Professional authentication system";

export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
};

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
};

export const API_TIMEOUT = 30000; // 30 seconds
