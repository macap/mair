import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./Views/Main";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div></div>
      <Main />
    </QueryClientProvider>
  );
}

export default App;
