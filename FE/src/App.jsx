import { useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/app/store";
import { AppRoutes } from "@/routes";
import { socketService } from "@/services";

function App() {
  useEffect(() => {
    console.log("🔌 Initializing socket connection once...");
    socketService.connect();

    return () => {
      console.log("🔌 Cleaning socket connection...");
      socketService.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <AppRoutes />
      <Toaster position="top-right" theme="light" richColors />
    </Provider>
  );
}

export default App;
