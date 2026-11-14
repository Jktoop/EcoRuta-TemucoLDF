import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";          // ←
import "./index.css";
import "./clima.js";
import App from "./App.jsx";
 
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>                                     {/* ← */}
      <App />
    </HashRouter>
  </StrictMode>,
);
