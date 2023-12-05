import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import Main from "./Views/Main";
import store from "./store";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

function AppWithProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWithProvider;
