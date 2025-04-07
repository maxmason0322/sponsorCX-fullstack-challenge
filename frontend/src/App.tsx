import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Organizations from "./pages/Organizations";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Organizations />
    </QueryClientProvider>
  );
}

export default App;
