import { Button } from "@shared/ui";
import { Icon } from "@shared/ui";
import { useTheme } from "@/shared/lib/hooks";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Icon size="md" name={theme === "dark" ? "sun" : "moon"} />
    </Button>
  );
}