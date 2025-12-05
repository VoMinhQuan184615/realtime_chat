/**
 * Notification Service - Quản lý notifications (Toast, Alert, etc)
 * Có thể tích hợp với Toastify, Sonner, Chakra UI, etc
 */
export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationOptions {
  message: string;
  type: NotificationType;
  duration?: number;
}

export const notificationService = {
  /**
   * Show success notification
   */
  success(message: string, duration?: number): void {
    // TODO: Tích hợp thư viện toast
    console.log(`[SUCCESS] ${message}`);
  },

  /**
   * Show error notification
   */
  error(message: string, duration?: number): void {
    // TODO: Tích hợp thư viện toast
    console.error(`[ERROR] ${message}`);
  },

  /**
   * Show warning notification
   */
  warning(message: string, duration?: number): void {
    // TODO: Tích hợp thư viện toast
    console.warn(`[WARNING] ${message}`);
  },

  /**
   * Show info notification
   */
  info(message: string, duration?: number): void {
    // TODO: Tích hợp thư viện toast
    console.info(`[INFO] ${message}`);
  },

  /**
   * Generic show notification
   */
  show(options: NotificationOptions): void {
    console.log(`[${options.type.toUpperCase()}] ${options.message}`);
  },
};
