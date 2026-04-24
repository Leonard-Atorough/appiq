import type { IconProps } from "./icon.types";
import { cn } from "@/shared/lib";
import { iconVariants } from "./icon.variant";
import { ICON_REGISTRY } from "./Icons";

/**
 * Icon
 *
 * Renders an SVG icon from the centralized `ICON_REGISTRY` by name.
 * Defaults to `aria-hidden="true"` since icons are typically decorative;
 * pass `aria-hidden={false}` and an `aria-label` on the parent when the
 * icon is the sole conveyor of meaning.
 * Logs a console warning if the requested icon name is not registered.
 *
 * @example
 * <Icon name="check-circle" variant="success" />
 * <Icon name="briefcase" size="lg" aria-hidden={false} aria-label="Job applications" />
 */
export function Icon({
  name,
  size = "md",
  variant = "default",
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: IconProps) {
  const IconComponent = ICON_REGISTRY[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in the registry.`);
    return null;
  }

  return (
    <span
      className={cn("flex items-center justify-center", iconVariants({ size, variant }), className)}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      <IconComponent className="w-full h-full" />
    </span>
  );
}
