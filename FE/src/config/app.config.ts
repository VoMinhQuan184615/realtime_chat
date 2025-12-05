export const APP_CONFIG = {
  APP_NAME: "Acme Inc.",
  APP_DESCRIPTION: "Professional authentication system",
  API_TIMEOUT: 30000, // 30 seconds
  DEBUG: import.meta.env.DEV,
} as const;
