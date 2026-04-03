import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ComponentShowcase } from "@features/componentShowcase";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ComponentShowcase />
  </StrictMode>,
);
