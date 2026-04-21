import type { IconProps } from "./icon.types";
import { cn } from "@/shared/lib";
import { iconVariants } from "./icon.variant";
import { ICON_REGISTRY } from "./Icons";

export function Icon({
  name,
  size = "md",
  variant = "default",
  className,
  "aria-hidden": ariaHidden = true,
  ...props
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
    >
      <IconComponent className="w-full h-full" aria-hidden={ariaHidden} {...props} />
    </span>
  );
}
