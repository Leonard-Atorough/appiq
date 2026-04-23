import { cn } from "@/shared/lib";
import React from "react";

import { labelVariants } from "./label.variants";
import type { LabelProps } from "./label.types";

/**
 * Label
 *
 * A styled `<label>` element for associating descriptive text with a form control.
 * When `required` is true, appends a visual asterisk indicator styled via
 * the `required` variant in `labelVariants`.
 * Use `htmlFor` to explicitly link to the control's `id`.
 *
 * @example
 * <Label htmlFor="email" required>Email address</Label>
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, htmlFor, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ required }), className)}
        htmlFor={htmlFor}
        {...props}
      >
        {children}
      </label>
    );
  },
);

Label.displayName = "Label";
