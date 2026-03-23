import { cn } from "../../lib/cn";
import { buttonVariants } from "./button.variants";
import type { ButtonProps } from "./button.types";

export function Button({ variant, size, full, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
          full,
        }),
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
}
