export const APP_CONFIG = {
  APP_DESCRIPTION: "Professional authentication system",
  API_TIMEOUT: 30000, // 30 seconds
  DEBUG: (import.meta as any).env.DEV,
} as const;
