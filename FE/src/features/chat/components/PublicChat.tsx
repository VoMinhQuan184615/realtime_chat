import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Users, Wifi, WifiOff, Loader2, Globe } from "lucide-react";
import { getCurrentUserFromToken } from "@/lib/utils";
import { MessageBubble } from "./MessageBubble";
import { socketService } from "@/services";
import { getPublicMessages, getOnlineUsersCount } from "@/api/publicChatApi";

export function PublicChat({
  currentUserId,
  currentUsername,
  onOnlineUsersChange,
}) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [userCache, setUserCache] = useState({}); // userId -> username mapping
  const endRef = useRef(null);

  // ===== LOAD HISTORY + REGISTER LISTENERS =====
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const history = await getPublicMessages();
      if (Array.isArray(history)) setMessages(history);

      setWsConnected(socketService.isConnected());
      socketService.on("publicMessage", handleIncomingMessage);
      socketService.on("online-users", (count) => {
        if (mounted) {
          setOnlineUsers(count);
          onOnlineUsersChange?.(count);
        }
      });

      // Request initial online count from backend
      try {
        const count = await getOnlineUsersCount();
        if (mounted) {
          setOnlineUsers(count);
          onOnlineUsersChange?.(count);
        }
      } catch (error) {
        // Ignore error
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [onOnlineUsersChange]);

  // ===== AUTOSCROLL =====
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ===== HANDLE MESSAGE FROM SERVER =====
  const handleIncomingMessage = (data) => {
    const senderId = data?.senderId?._id || data?.senderId || "unknown";
    // Try to get username from cache first, then from data, then fallback
    const username =
      userCache[senderId] ||
      data?.senderId?.username ||
      data?.senderName ||
      data?.username ||
      "Anonymous";

    const msg = {
      id: data._id,
      content: data.content,
      sender: {
        id: senderId,
        username: username,
        avatar: data?.senderId?.avatarImage,
      },
      timestamp: new Date(data.timestamp),
      status: "read",
    };

    setMessages((prev) => {
      // Check if message already exists (dedup)
      const exists = prev.some((m) => m.id === msg.id);
      if (exists) return prev; // Already have this message

      return [...prev, msg];
    });
  }; // ===== SEND MESSAGE =====
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setIsSending(true);

    // Get user info from token first, then fallback to props
    const tokenUser = getCurrentUserFromToken();
    const userId = tokenUser?.id || currentUserId || "unknown";
    const usernameToSend =
      tokenUser?.username || currentUsername || "Anonymous";

    // Debug log
    if (typeof window !== "undefined") {
      console.log("📤 PublicChat Send Message Debug:", {
        tokenUser,
        currentUserId,
        currentUsername,
        userId,
        usernameToSend,
      });
    }

    // Cache this user's username for future lookups
    setUserCache((prev) => ({
      ...prev,
      [userId]: usernameToSend,
    }));

    const messageId = `msg-${Date.now()}`;
    const tempMsg = {
      id: messageId,
      content: inputValue,
      sender: {
        id: userId,
        username: usernameToSend,
        avatar: tokenUser?.avatar,
      },
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, tempMsg]);

    socketService.sendMessage("publicMessage", {
      _id: messageId,
      content: inputValue,
      senderId: userId,
      username: usernameToSend,
      avatar: tokenUser?.avatar,
    });

    setInputValue("");

    // Fake delivery state
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, status: "delivered" } : m
        )
      );
    }, 400);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, status: "read" } : m))
      );
    }, 800);

    setIsSending(false);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.sender.id === currentUserId}
          />
        ))}
        <div ref={endRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={isSending}>
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
