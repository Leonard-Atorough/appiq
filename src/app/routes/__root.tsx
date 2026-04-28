import { AppHeader, AppNav, AppShell } from "@/widgets";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <AppShell header={<AppHeader />} nav={<AppNav />}>
        <Outlet />
      </AppShell>
    );
  },
});
