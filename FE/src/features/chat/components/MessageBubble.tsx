import { ChatMessage } from "@/features/chat/types";

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`chat ${isOwn ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          {message.sender.avatar ? (
            <img
              alt={message.sender.username}
              src={message.sender.avatar}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-gray-700">
              {message.sender.username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="chat-header mb-1">
        <span className="font-semibold">{message.sender.username}</span>
        <time className="text-xs opacity-50 ml-2">
          {new Date(message.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>

      <div className={`chat-bubble ${isOwn ? "chat-bubble-primary" : ""}`}>
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
