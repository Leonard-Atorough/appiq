import { AppHeader, AppNav, AppShell } from "@/widgets";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ToastContainer } from "@/widgets/ToastContainer";
import { ToastProvider } from "../providers/ToastProvider";

export const Route = createRootRoute({
  component: () => {
    return (
      <ToastProvider>
        <AppShell header={<AppHeader />} nav={<AppNav />}>
          <Outlet />
        </AppShell>
        <ToastContainer />
      </ToastProvider>
    );
  },
});
