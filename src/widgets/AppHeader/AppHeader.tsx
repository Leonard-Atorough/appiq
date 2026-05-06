import { Button, Icon, Navbar } from "@shared/ui";
import { ThemeToggle } from "@widgets/ThemeToggle/ThemeTogle";
import type { AppHeaderProps } from "./appHeader.types";

export function AppHeader({ menuEnd, className, isMenuOpen, onMenuOpen }: AppHeaderProps) {
  return (
    <Navbar
      position="sticky"
      size={{base: "md", md: "lg", lg: "lg"}}
      title={<span className="font-semibold text-xl tracking-tight">AppIQ</span>}
      menu={<div />}
      menuEnd={
        <>
          <ThemeToggle />
          {menuEnd}
        </>
      }
      menuIcon={
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => onMenuOpen?.(!isMenuOpen)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <Icon name="hamburger" size="lg" />
        </Button>
      }
      className={className}
    />
  );
}
