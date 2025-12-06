import { useEffect } from "react";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/app/store";
import { AppRoutes } from "@/routes";
import { useSocketConnection } from "@/hooks/useSocketConnection";

function AppContent() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Hook to manage socket connection
  useSocketConnection();

  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" theme="light" richColors />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
