import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DetectionProvider } from "./context/DetectionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DetectionProvider>
      <App />
    </DetectionProvider>
  </React.StrictMode>
);