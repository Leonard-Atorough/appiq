import React from "react";
import { cn } from "@shared/lib/cn";
import {
  radioBoxVariants,
  radioIconVariants,
  radioDescriptionVariants,
  radioErrorVariants,
} from "./radio.variants";
import type { RadioProps } from "./radio.types";
import { Icon } from "../../Icon";

/**
 * Radio
 *
 * An accessible radio button supporting controlled/uncontrolled modes and optional label,
 * description, and error message. The native `<input type="radio">` is visually hidden;
 * a styled sibling `<span>` responds to `:checked` and `:focus-visible` via Tailwind `peer-*`
 * modifiers. A centered dot icon appears when checked.
 *
 * @internal This component is intended for use within RadioGroup only.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      size = "md",
      disabled = false,
      required = false,
      error,
      id,
      checked,
      defaultChecked,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;
    const descriptionId = description ? `${resolvedId}-description` : undefined;
    const errorId = error ? `${resolvedId}-error` : undefined;

    const hasError = !!error;

    // Track checked state to drive icon visibility (peer-* can't reach into box children)
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    // Use ref for imperative control instead of manual DOM manipulation
    const innerRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref ?? innerRef) as React.RefObject<HTMLInputElement>;

    const control = (
      // Wrapper keeps input + visual box as siblings so peer-* works
      <span className="relative inline-flex items-center justify-center">
        <input
          ref={resolvedRef}
          id={resolvedId}
          type="radio"
          className="peer sr-only"
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          required={required}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
          aria-invalid={hasError || undefined}
          onChange={handleChange}
          {...props}
        />
        {/* Visual box — peer-* modifiers respond to the hidden input above */}
        <span
          className={cn(
            radioBoxVariants({ size, state: hasError ? "error" : "default" }),
            className,
          )}
          aria-hidden="true"
          onClick={() => resolvedRef.current?.click()}
        >
          {/* Centered dot icon when checked */}
          {isChecked && <Icon name="circle-fill" className={radioIconVariants({ size })} />}
        </span>
      </span>
    );

    if (!label && !description && !error) {
      return control;
    }

    return (
      <div className="flex flex-col gap-xs">
        <div className="flex items-start gap-sm">
          {control}
          <div className="flex flex-col gap-xs">
            {label && (
              <label htmlFor={resolvedId} className="text-sm font-medium text-secondary">
                {label}
                {required && <span className="ml-xs text-error">*</span>}
              </label>
            )}
            {description && (
              <span id={descriptionId} className={radioDescriptionVariants()}>
                {description}
              </span>
            )}
            {error && (
              <span id={errorId} role="alert" className={radioErrorVariants()}>
                {error}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Radio.displayName = "Radio";
