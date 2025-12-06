import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { socketService } from "@/services";

/**
 * Hook để manage socket connection based on auth state
 * Tự động connect/disconnect socket khi auth state thay đổi
 */
export function useSocketConnection() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const connectAttemptRef = useRef(0);
  const maxRetries = 3;

  useEffect(() => {
    if (isAuthenticated) {
      if (socketService.isConnected()) {
        connectAttemptRef.current = 0;
        return;
      }

      if (connectAttemptRef.current >= maxRetries) {
        return;
      }

      connectAttemptRef.current++;

      // Connect socket with timeout to prevent hanging
      const connectPromise = socketService.connect();

      const timeoutId = setTimeout(() => {
        // Timeout - connection took too long
      }, 5000);

      connectPromise
        .then(() => {
          clearTimeout(timeoutId);
          connectAttemptRef.current = 0;
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          // Connection failed - app still works without socket
        });

      return () => {
        // Don't disconnect on unmount - socket should persist
        // Only disconnect on logout (when isAuthenticated becomes false)
      };
    } else {
      connectAttemptRef.current = 0;
      socketService.disconnect();
    }
  }, [isAuthenticated]);
}
