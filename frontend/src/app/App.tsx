import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import store from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Theme scaling="100%" className="radix-theme">
          <Toaster position="top-right" />
          <RouterProvider router={router} />
        </Theme>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
