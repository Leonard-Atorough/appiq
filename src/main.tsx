import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to AppIQ</h1>
      <p className="text-lg text-muted">
        This is a placeholder home page. Use the navigation links to explore the app.
      </p>
    </div>
  </StrictMode>,
);
