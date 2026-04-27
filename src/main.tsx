import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouteProvider } from "./app/providers/RouteProvider";
import { AppHeader, AppNav, AppShell } from "./widgets";
import { ApplicationsPage } from "./features/applications";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouteProvider>
      <AppShell header={<AppHeader />} nav={<AppNav />}>
        <ApplicationsPage />
      </AppShell>
    </RouteProvider>
  </StrictMode>,
);
