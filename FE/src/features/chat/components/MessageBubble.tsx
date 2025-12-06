import { ChatMessage } from "@/features/chat/types";

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const username = message.sender.username || "Anonymous";
  const firstChar = (username || "A").charAt(0).toUpperCase();

  return (
    <div className={`chat ${isOwn ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          {message.sender.avatar ? (
            <img
              alt={username}
              src={message.sender.avatar}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-gray-700">{firstChar}</span>
          )}
        </div>
      </div>

      <div className="chat-header mb-1">
        <span className="font-semibold">{username}</span>
        <time className="text-xs opacity-50 ml-2">
          {new Date(message.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>

      <div
        className={`chat-bubble ${
          isOwn ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {message.content}
      </div>

      {message.status && (
        <div className="chat-footer opacity-50 text-xs">
          {message.status === "sent" && "Sent"}
          {message.status === "delivered" && "Delivered"}
          {message.status === "read" && "Read"}
        </div>
      )}
    </div>
  );
}
