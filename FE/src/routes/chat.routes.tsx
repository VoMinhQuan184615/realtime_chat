import { RouteObject } from "react-router-dom";
import { ChatPage } from "@/features/chat";

export const chatRoutes: RouteObject[] = [
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/chat/:roomId",
    element: <ChatPage />,
  },
];
