import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/app/store";
import { AppRoutes } from "@/routes";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <Toaster position="top-right" theme="light" richColors />
    </Provider>
  );
}

export default App;
