import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Users, Wifi, WifiOff, Loader2, Globe } from "lucide-react";
import { getCurrentUserFromToken } from "@/lib/utils";
import { MessageBubble } from "./MessageBubble";
import { socketService } from "@/services";
import { getPublicMessages, getOnlineUsersCount } from "@/api/publicChatApi";

export function PublicChat({ currentUserId, currentUsername }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
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
        if (mounted) setOnlineUsers(count);
      });

      // Request initial online count from backend
      try {
        const count = await getOnlineUsersCount();
        if (mounted) setOnlineUsers(count);
      } catch (error) {
        console.error("Failed to fetch online count:", error);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // ===== AUTOSCROLL =====
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ===== HANDLE MESSAGE FROM SERVER =====
  const handleIncomingMessage = (data) => {
    const msg = {
      id: data._id,
      content: data.content,
      sender: {
        id: data?.senderId?._id,
        username: data?.senderId?.username,
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
  };

  // ===== SEND MESSAGE =====
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setIsSending(true);

    const user = getCurrentUserFromToken() || {
      id: currentUserId,
      username: currentUsername,
    };

    const messageId = `msg-${Date.now()}`;
    const tempMsg = {
      id: messageId,
      content: inputValue,
      sender: user,
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, tempMsg]);

    socketService.sendMessage("publicMessage", {
      _id: messageId,
      content: inputValue,
      senderId: user.id,
      username: user.username,
      avatar: user.avatar,
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
      {/* HEADER */}
      <div className="border-b p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            Public Chat
          </h2>

          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              {onlineUsers} online
            </div>

            <div className="flex items-center gap-1 text-sm">
              {wsConnected ? (
                <>
                  <Wifi className="w-4 h-4 text-green-600" /> Connected
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-600" /> Offline
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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
