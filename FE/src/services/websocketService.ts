import { io, Socket } from "socket.io-client";
import { getToken } from "@/utils";

type MessageHandler = (data: any) => void;

class SocketService {
  private socket: Socket | null = null;
  private url: string;
  private messageHandlers: Map<string, MessageHandler[]> = new Map();
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    url: string = import.meta.env.VITE_WS_URL || "http://localhost:3000"
  ) {
    this.url = url;
  }

  /**
   * Connect to Socket.IO server
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const token = getToken();

        this.socket = io(this.url, {
          auth: { token },
          transports: ["websocket"],
          reconnection: true,
          reconnectionAttempts: 10,
          reconnectionDelay: 2000,
        });

        this.socket.on("connect", () => {
          this.startHeartbeat();
          resolve();
        });

        this.socket.on("connect_error", (err) => {
          reject(err);
        });

        this.socket.on("disconnect", () => {
          this.stopHeartbeat();
        });

        // Handle ALL events dynamically
        this.socket.onAny((event, data) => {
          const handlers = this.messageHandlers.get(event) || [];
          handlers.forEach((h) => h(data));
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Disconnect
   */
  disconnect(): void {
    this.stopHeartbeat();
    this.socket?.disconnect();
    this.socket = null;
  }

  /**
   * Send message
   */
  sendMessage(event: string, data: any): void {
    if (!this.socket) return;
    this.socket.emit(event, data);
  }

  /**
   * Subscribe
   */
  on(event: string, handler: MessageHandler): void {
    if (!this.messageHandlers.has(event)) {
      this.messageHandlers.set(event, []);
    }
    this.messageHandlers.get(event)!.push(handler);
  }

  /**
   * Unsubscribe
   */
  off(event: string, handler: MessageHandler): void {
    const handlers = this.messageHandlers.get(event);
    if (!handlers) return;
    const index = handlers.indexOf(handler);
    if (index !== -1) handlers.splice(index, 1);
  }

  /**
   * Check connection
   */
  isConnected(): boolean {
    return !!this.socket && this.socket.connected;
  }

  /**
   * Heartbeat (optional)
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected()) {
        this.socket?.emit("ping-check", { t: Date.now() });
      }
    }, 30000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
}

export const socketService = new SocketService();
