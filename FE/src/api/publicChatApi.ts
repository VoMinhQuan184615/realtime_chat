import apiClient from "@/api/apiClient";
import { API_CONFIG } from "@/config";
import { ChatMessage } from "@/features/chat/types";

export interface PublicMessagesResponse {
  messages: ChatMessage[];
  total: number;
  limit: number;
  skip: number;
  hasMore: boolean;
}

/**
 * Get public messages with pagination (skip/limit pattern)
 * @param limit - Number of messages to fetch (default: 50)
 * @param skip - Number of messages to skip (default: 0)
 */
export async function getPublicMessages(limit: number = 50, skip: number = 0) {
  try {
    const response = await apiClient.get("/messages/public/history", {
      params: { limit, skip },
    });

    // Handle nested response structure from backend
    const data = response.data?.data || response.data;

    // Transform message structure to match frontend ChatMessage
    const messages = (data.messages || []).map((msg: any) => {
      return {
        id: msg._id,
        content: msg.content,
        sender: {
          id: msg.senderId?._id || "unknown",
          username: msg.senderId?.username || "Anonymous",
          email: msg.senderId?.email,
          avatar: msg.senderId?.avatarImage,
        },
        timestamp: new Date(msg.timestamp),
        status: "read" as const,
      };
    });

    return {
      messages,
      total: data.total || 0,
      limit: data.limit || 50,
      skip: data.skip || 0,
      hasMore: data.hasMore || false,
    } as PublicMessagesResponse;
  } catch (error) {
    throw error;
  }
}

/**
 * Send a message to public chat
 * @param content - Message content
 */
export async function sendPublicMessage(content: string) {
  try {
    const response = await apiClient.post("/messages/public", {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Failed to send public message:", error);
    throw error;
  }
}

/**
 * Get current online users count
 */
export async function getOnlineUsersCount() {
  try {
    const response = await apiClient.get("/messages/online-count");
    return response.data?.data?.onlineUsers || 0;
  } catch (error) {
    console.error("❌ Failed to fetch online count:", error);
    throw error;
  }
}

/**
 * Get list of online users
 */
export async function getOnlineUsersList() {
  try {
    const response = await apiClient.get("/messages/online-users");

    // Backend returns: { success, message, data: { onlineUsers: [...], count: N } }
    const data = response.data?.data || response.data;

    const users = (data.onlineUsers || []).map((user: any) => ({
      userId: user.userId,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      socketId: user.socketId,
    }));

    return {
      users,
      count: data.count || 0,
    };
  } catch (error) {
    throw error;
  }
}
