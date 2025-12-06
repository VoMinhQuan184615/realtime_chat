import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SidebarLeft } from "@/components/sidebar-left";
import { PublicChat } from "@/features/chat/components/PublicChat";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useOnlineUsers } from "@/features/chat/hooks/useOnlineUsers";
import { getCurrentUserFromToken } from "@/lib/utils";
import { Users } from "lucide-react";
import { socketService } from "@/services";
import { updateOnlineUsers } from "@/features/chat/redux/chatSlice";
import { AppDispatch } from "@/app/store";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashBoardPage() {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { onlineUsers, onlineUsersCount, isLoading, fetchOnlineUsers } =
    useOnlineUsers();

  // Fetch online users on component mount (only if not already cached)
  useEffect(() => {
    // Fetch immediately on first load
    fetchOnlineUsers();

    // Listen for socket updates
    const handleOnlineUsersList = (users: any[]) => {
      dispatch(updateOnlineUsers(users));
    };

    socketService.on("online-users-list", handleOnlineUsersList);

    // Cleanup: remove socket listener when component unmounts
    return () => {
      socketService.off("online-users-list", handleOnlineUsersList);
    };
  }, [dispatch, fetchOnlineUsers]);

  // Mock user data for testing
  const tokenUser = getCurrentUserFromToken();
  const currentUser = user || {
    id: "mock-user-1",
    email: "demo@example.com",
    name: "Demo User",
  };

  // Get username: prefer token username, then user.name, then email
  const currentUsername =
    tokenUser?.username || currentUser.name || currentUser.email;

  // Debug
  if (typeof window !== "undefined") {
    console.log("🔍 DashboardPage Debug:", {
      tokenUser,
      currentUser,
      currentUsername,
    });
  }

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b z-10">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Public Chat
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex flex-1 overflow-hidden gap-0">
          {/* Chat Messages */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <PublicChat
              currentUserId={currentUser.id}
              currentUsername={currentUsername}
              onOnlineUsersChange={() => {}}
            />
          </div>

          {/* Right Sidebar - Info Panel */}
          <div className="w-64 border-l bg-gray-50 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Online Count */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Online Users
                </h3>
                <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-gray-900">
                    {onlineUsersCount} Online
                  </span>
                </div>

                {/* Online Users List */}
                <div className="space-y-2">
                  {isLoading ? (
                    <p className="text-xs text-gray-500 py-2">
                      Loading users...
                    </p>
                  ) : onlineUsers.length > 0 ? (
                    onlineUsers.map((user) => (
                      <div
                        key={user.socketId}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden flex-shrink-0">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.username}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{user.username.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-700 truncate">
                          {user.username}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 py-2">
                      No users online
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
