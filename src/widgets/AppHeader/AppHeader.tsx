import { Navbar } from "@shared/ui";
import { ThemeToggle } from "@widgets/ThemeToggle/ThemeTogle";
import type { AppHeaderProps } from "./appHeader.types";

export function AppHeader({ menuEnd, className }: AppHeaderProps) {
  return (
    <Navbar
      position="sticky"
      size="sm"
      title={<span className="font-semibold text-lg tracking-tight">AppIQ</span>}
      menu={<div />}
      menuEnd={
        <>
          <ThemeToggle />
          {menuEnd}
        </>
      }
      className={className}
    />
  );
}
