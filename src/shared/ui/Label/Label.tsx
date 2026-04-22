import { cn } from "@/shared/lib";
import React from "react";

import { labelVariants } from "./label.variants";
import type { LabelProps } from "./label.types";

export const Label: React.FC<LabelProps> = React.forwardRef<HTMLLabelElement, LabelProps>(
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
