import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { fetchOnlineUsersStart } from "@/features/chat/redux/chatSlice";
import { useCallback } from "react";

export function useOnlineUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { onlineUsers, onlineUsersCount, isLoading, error } = useSelector(
    (state: RootState) => state.chat
  );

  const fetchOnlineUsers = useCallback(() => {
    console.log("🔄 [useOnlineUsers] Dispatching fetchOnlineUsersStart action");
    dispatch(fetchOnlineUsersStart());
  }, [dispatch]);

  return {
    onlineUsers,
    onlineUsersCount,
    isLoading,
    error,
    fetchOnlineUsers,
  };
}
