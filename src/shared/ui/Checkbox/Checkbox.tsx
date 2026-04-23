import React from "react";
import { cn } from "@/shared/lib/cn";
import type { CheckboxProps } from "./checkbox.types";
import {
  checkboxBoxVariants,
  checkboxIconVariants,
  checkboxLabelVariants,
} from "./checkbox.variants";
import { Icon } from "../Icon";

/**
 * Checkbox
 *
 * An accessible checkbox supporting controlled/uncontrolled modes,
 * indeterminate state, and optional label, description, and error message.
 * The native `<input>` is visually hidden; a styled sibling `<span>` responds
 * to `:checked` and `:focus-visible` via Tailwind `peer-*` modifiers.
 * The `indeterminate` prop is set imperatively via `useEffect` since it is
 * not a valid HTML attribute.
 *
 * @example
 * <Checkbox
 *   label="Accept terms"
 *   checked={accepted}
 *   onChange={(e) => setAccepted(e.target.checked)}
 * />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      errorMessage,
      state,
      size = "md",
      indeterminate = false,
      className,
      disabled,
      id,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;
    const descriptionId = description ? `${resolvedId}-description` : undefined;
    const errorId = errorMessage ? `${resolvedId}-error` : undefined;

    const hasError = state === "error" || Boolean(errorMessage);

    // Track checked state to drive icon visibility (peer-* can't reach into box children)
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalChecked(e.target.checked);
      onChange?.(e);
    };

    // Set indeterminate imperatively — not a native HTML attribute
    const innerRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref ?? innerRef) as React.RefObject<HTMLInputElement>;
    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    const showCheck = isChecked && !indeterminate;
    const showMinus = indeterminate;

    const control = (
      // Wrapper keeps input + visual box as siblings so peer-* works
      <span className="relative inline-flex items-center justify-center">
        <input
          ref={resolvedRef}
          id={resolvedId}
          type="checkbox"
          className="peer sr-only"
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          aria-describedby={cn(descriptionId, errorId) || undefined}
          aria-invalid={hasError || undefined}
          onChange={handleChange}
          {...props}
        />
        {/* Visual box — peer-* modifiers respond to the hidden input above */}
        <span
          className={cn(
            checkboxBoxVariants({ size, state: hasError ? "error" : state }),
            className,
          )}
          aria-hidden="true"
          onClick={() => resolvedRef.current?.click()}
        >
          {showCheck && <Icon name="check" className={checkboxIconVariants({ size })} />}
          {showMinus && <Icon name="minus" className={checkboxIconVariants({ size })} />}
        </span>
      </span>
    );

    if (!label && !description && !errorMessage) {
      return control;
    }

    return (
      <div className="flex flex-col gap-xs">
        <div className="flex items-start gap-sm">
          {control}
          <div className="flex flex-col gap-xs">
            {label && (
              <label
                htmlFor={resolvedId}
                className={checkboxLabelVariants({ size, disabled: disabled ?? false })}
              >
                {label}
              </label>
            )}
            {description && (
              <span id={descriptionId} className="text-sm text-muted">
                {description}
              </span>
            )}
            {errorMessage && (
              <span id={errorId} role="alert" className="text-sm text-error-text">
                {errorMessage}
              </span>
            )}
          </div>
        </div>
        {/* Bare checkbox (no label) with an error message */}
        {!label && errorMessage && (
          <span id={errorId} role="alert" className="text-sm text-error-text">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
