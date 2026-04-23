import React from "react";
import { cn } from "@shared/lib/cn";
import { textareaVariants } from "./textarea.variants";
import type { TextareaProps } from "./textarea.types";
import { Field } from "@/shared/ui/Field";

/**
 * Textarea
 *
 * A multi-line text input with integrated `Field` wrapper for label,
 * helper text, success, and error messaging. Supports auto-growing height
 * (capped by `minRows`), configurable resize handles, and an optional
 * character count display. Manages `aria-invalid` and `aria-describedby`
 * automatically. All standard `<textarea>` attributes are forwarded.
 *
 * @example
 * <Textarea label="Cover letter" autoGrow minRows={4} showCharacterCount />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      variant = "primary",
      state = "default",
      full,
      resize = "vertical",
      autoGrow,
      minRows = 2,
      showCharacterCount,
      label,
      error,
      helperText,
      success,
      startAdornment,
      endAdornment,
      wrapperClassName,
      className,
      value: valueProp,
      onChange: onChangeProp,
      id: idProp,
      "aria-describedby": externalDescribedBy,
      ...props
    },
    ref,
  ) => {
    const getStringValue = (val: unknown) => {
      if (typeof val === "string") return val;
      if (Array.isArray(val)) return val.join("");
      if (typeof val === "number") return String(val);
      return "";
    };

    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(
      getStringValue(props.defaultValue ?? ""),
    );

    // Source of truth for features (auto-grow, character count)
    const trackingValue = isControlled ? getStringValue(valueProp) : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChangeProp?.(e);
    };

    const generatedId = React.useId();
    const resolvedId = idProp ?? generatedId;

    // Auto-grow logic
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        (textareaRef as React.RefObject<HTMLTextAreaElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.RefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref],
    );
    React.useEffect(() => {
      if (autoGrow && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [trackingValue, autoGrow]);

    const rows = autoGrow ? minRows : (props.rows ?? minRows);

    const effectiveState = error ? "error" : success ? "success" : state;

    const describedByIds =
      [
        helperText ? `${resolvedId}-helper` : null,
        success && !error ? `${resolvedId}-success` : null,
        error ? `${resolvedId}-error` : null,
        externalDescribedBy,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    const textareaEl = (
      <div className={cn("relative", wrapperClassName)}>
        {startAdornment && <span className="absolute left-sm top-sm">{startAdornment}</span>}
        <textarea
          ref={mergedRef}
          id={resolvedId}
          aria-invalid={!!error}
          aria-describedby={describedByIds}
          className={cn(
            textareaVariants({ size, variant, full, state: effectiveState }),
            resize !== undefined && `resize-${resize}`,
            startAdornment && "pl-lg",
            endAdornment && "pr-lg",
            className,
          )}
          rows={rows}
          value={isControlled ? valueProp : internalValue}
          onChange={handleChange}
          {...props}
        />
        {endAdornment && <span className="absolute right-sm top-sm">{endAdornment}</span>}
        {showCharacterCount && (
          <span className="absolute right-sm bottom-sm text-xs text-muted" aria-live="polite">
            {trackingValue.length}
            {props.maxLength ? ` / ${props.maxLength}` : ""}
          </span>
        )}
      </div>
    );

    if (label || error || helperText || success) {
      return (
        <Field
          id={resolvedId}
          label={label}
          error={error}
          helperText={helperText}
          success={success}
        >
          {textareaEl}
        </Field>
      );
    }

    return textareaEl;
  },
);

Textarea.displayName = "Textarea";
