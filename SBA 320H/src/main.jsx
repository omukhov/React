import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    // Router for routing application
    <Router>
      // Context for Loader
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </Router>
  </StrictMode>,
);
