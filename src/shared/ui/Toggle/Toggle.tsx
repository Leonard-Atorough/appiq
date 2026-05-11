import React from "react";
import { cn } from "@/shared/lib/cn";
import { useResponsive } from "@/shared/lib";
import type { ToggleProps } from "./toggle.types";
import {
  checkboxBoxVariants,
  checkboxIconVariants,
  checkboxLabelVariants,
  switchTrackVariants,
  switchThumbVariants,
} from "./toggle.variants";
import { Icon } from "../Icon";

/**
 * Toggle
 *
 * An accessible control supporting both checkbox and switch appearance modes.
 *
 * **Checkbox mode (default):** Square box with check/minus icon. Supports indeterminate state.
 * **Switch mode:** Track with sliding thumb for binary on/off selection.
 *
 * Controlled/uncontrolled modes, with native `<input>` visually hidden and a styled sibling
 * responding to `:checked` and `:focus-visible` via Tailwind `peer-*` modifiers.
 * The `indeterminate` prop is set imperatively via `useEffect` (checkbox mode only).
 *
 * @example
 * // Checkbox appearance (default)
 * <Toggle
 *   label="Accept terms"
 *   checked={accepted}
 *   onChange={(e) => setAccepted(e.target.checked)}
 * />
 *
 * // Switch appearance
 * <Toggle
 *   type="switch"
 *   label="Enable notifications"
 *   checked={enabled}
 *   onChange={(e) => setEnabled(e.target.checked)}
 * />
 */
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      description,
      errorMessage,
      state,
      size = "md",
      indeterminate = false,
      type = "checkbox",
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
    const resolvedSize = useResponsive(size ?? "md");
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

    const innerRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref ?? innerRef) as React.RefObject<HTMLInputElement>;

    // Set indeterminate imperatively — not a native HTML attribute
    // Only applies to checkbox mode, switch mode ignores indeterminate prop
    React.useEffect(() => {
      if (resolvedRef.current && type === "checkbox") {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef, type]);

    const showCheck = isChecked && !indeterminate;
    const showMinus = indeterminate;

    const control = (
      // Wrapper keeps input + visual box/track as siblings so peer-* works
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
        {type === "checkbox" ? (
          /* Checkbox appearance: Visual box with check/minus icon */
          <span
            className={cn(
              checkboxBoxVariants({ size: resolvedSize, state: hasError ? "error" : state }),
              className,
            )}
            aria-hidden="true"
            onClick={() => resolvedRef.current?.click()}
          >
            {showCheck && <Icon name="check" className={checkboxIconVariants({ size: resolvedSize })} />}
            {showMinus && <Icon name="minus" className={checkboxIconVariants({ size: resolvedSize })} />}
          </span>
        ) : (
          /* Switch appearance: Track with sliding thumb */
          <span
            className={cn(
              switchTrackVariants({ size: resolvedSize, state: hasError ? "error" : state }),
              className,
            )}
            aria-hidden="true"
            onClick={() => resolvedRef.current?.click()}
          >
            <span className={switchThumbVariants({ size: resolvedSize })} />
          </span>
        )}
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
                className={checkboxLabelVariants({ size: resolvedSize, disabled: disabled ?? false })}
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
        {/* Bare toggle (no label) with an error message */}
        {!label && errorMessage && (
          <span id={errorId} role="alert" className="text-sm text-error-text">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

Toggle.displayName = "Toggle";
