export const AUTH_ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const;

export const AUTH_VALIDATION = {
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
  IDENTIFIER_REQUIRED: "Email or username is required",
  USERNAME_REQUIRED: "Username is required",
  USERNAME_MIN_LENGTH: "Username must be at least 3 characters",
  PHONE_REQUIRED: "Phone number is required",
  PHONE_INVALID: "Please enter a valid phone number",
  CONFIRM_PASSWORD_REQUIRED: "Please confirm your password",
  CONFIRM_PASSWORD_MISMATCH: "Passwords do not match",
} as const;

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  LOGIN_FAILED: "Login failed",
  LOGOUT_SUCCESS: "Logout successful",
  PASSWORD_RESET_SENT: "Password reset link sent to your email",
} as const;
