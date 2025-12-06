import { RouteObject } from "react-router-dom";
import { ChatPage } from "@/features/chat";
import { ProtectedRoute } from "./ProtectedRoute";

export const chatRoutes: RouteObject[] = [
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat/:roomId",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
];
