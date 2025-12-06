export interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    username: string;
    avatar?: string;
  };
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

export interface PublicChatResponse {
  success: boolean;
  data?: ChatMessage[];
  message?: string;
  error?: string;
}
