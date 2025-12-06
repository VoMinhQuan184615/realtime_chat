import { ChatWindow } from "@/features/chat/components/ChatWindow";
import { ChatRoom } from "@/features/chat/types";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Mock data - sẽ replace bằng real data từ backend sau
const MOCK_PUBLIC_CHAT: ChatRoom = {
  id: "public-chat-1",
  name: "General",
  description: "General discussion for everyone",
  type: "public",
  members: [
    {
      id: "user-1",
      username: "John Doe",
      avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
    },
    {
      id: "user-2",
      username: "Jane Smith",
      avatar: "https://img.daisyui.com/images/profile/demo/luke@192.webp",
    },
  ],
  messages: [
    {
      id: "msg-1",
      content: "Hey everyone! 👋",
      sender: {
        id: "user-1",
        username: "John Doe",
        avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
      },
      timestamp: new Date(Date.now() - 5 * 60000),
      status: "read",
    },
    {
      id: "msg-2",
      content: "Hi John! How's it going?",
      sender: {
        id: "user-2",
        username: "Jane Smith",
        avatar: "https://img.daisyui.com/images/profile/demo/luke@192.webp",
      },
      timestamp: new Date(Date.now() - 3 * 60000),
      status: "read",
    },
    {
      id: "msg-3",
      content: "All good! Just working on a new project",
      sender: {
        id: "user-1",
        username: "John Doe",
        avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
      },
      timestamp: new Date(Date.now() - 1 * 60000),
      status: "delivered",
    },
  ],
};

export function ChatPage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-4">Please login to access chat</div>;
  }

  return (
    <div className="h-full">
      <ChatWindow room={MOCK_PUBLIC_CHAT} currentUserId={user.id} />
    </div>
  );
}
