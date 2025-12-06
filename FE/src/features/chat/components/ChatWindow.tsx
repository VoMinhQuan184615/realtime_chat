import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatMessage, ChatRoom } from "@/features/chat/types";

interface ChatWindowProps {
  room: ChatRoom;
  currentUserId: string;
}

export function ChatWindow({ room, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(room.messages || []);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: {
        id: currentUserId,
        username: "You", // Should come from Redux auth state
        avatar: undefined,
      },
      timestamp: new Date(),
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // TODO: Send to backend via API
    // TODO: Update backend
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b p-4 sticky top-0">
        <h2 className="text-lg font-bold">{room.name}</h2>
        <p className="text-sm text-muted-foreground">{room.description}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.sender.id === currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-background sticky bottom-0">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="px-6"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
