import { SidebarLeft } from "@/components/sidebar-left";
import { PublicChat } from "@/features/chat/components/PublicChat";
import { useAuth } from "@/features/auth/hooks/useAuth";
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

  // Mock user data for testing
  const currentUser = user || {
    id: "mock-user-1",
    email: "demo@example.com",
    name: "Demo User",
  };

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
        <div className="flex-1 flex flex-col overflow-hidden">
          <PublicChat
            currentUserId={currentUser.id}
            currentUsername={currentUser.name || currentUser.email}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
