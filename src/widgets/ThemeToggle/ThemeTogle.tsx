import { Button } from "@shared/ui";
import { Icon } from "@shared/ui";
import { useTheme } from "@/shared/lib/hooks";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} />
    </Button>
  );
}