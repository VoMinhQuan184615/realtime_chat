import { useState } from "react";
import { MessageSquare, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatRoom } from "@/features/chat/types";

interface ChatForumProps {
  rooms: ChatRoom[];
  selectedRoomId?: string;
  onSelectRoom: (roomId: string) => void;
  onCreateRoom?: () => void;
}

export function ChatForum({
  rooms,
  selectedRoomId,
  onSelectRoom,
  onCreateRoom,
}: ChatForumProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white border-r">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5" />
          <h2 className="text-lg font-bold">Chats</h2>
        </div>

        {onCreateRoom && (
          <Button
            onClick={onCreateRoom}
            size="sm"
            className="w-full gap-2"
            variant="default"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Rooms List */}
      <div className="flex-1 overflow-y-auto">
        {filteredRooms.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-sm">No chats found</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedRoomId === room.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <div>
                  <p className="font-medium truncate">{room.name}</p>
                  <p className="text-xs opacity-70 truncate">
                    {room.description}
                  </p>
                </div>
                {room.type === "public" && (
                  <span className="text-xs opacity-50 mt-1 block">
                    Public • {room.members.length} members
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
