import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Shell from "./components/Shell/Shell";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Shell />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
