import { useCallback, useState } from "react";
import { AppHeader, AppNav, AppShell } from "@/widgets";
import { Outlet } from "@tanstack/react-router";
import { ToastContainer } from "@/widgets/ToastContainer";
import { ToastProvider } from "../providers/ToastProvider";

export function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = useCallback((open: boolean) => {
    setIsMenuOpen(open);
  }, []);

  return (
    <ToastProvider>
      <AppShell
        header={<AppHeader isMenuOpen={isMenuOpen} onMenuOpen={handleMenuOpen} />}
        nav={<AppNav isMenuOpen={isMenuOpen} onMenuOpenChange={handleMenuOpen} />}
      >
        <Outlet />
      </AppShell>
      <ToastContainer />
    </ToastProvider>
  );
}
