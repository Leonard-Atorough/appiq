import React from "react";
import { cn } from "@shared/lib/cn";
import { textareaVariants } from "./textarea.variants";
import type { TextareaProps } from "./textarea.types";

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      variant = "primary",
      full,
      resize = "vertical",
      autoGrow,
      minRows = 2,
      showCharacterCount,
      label,
      startAdornment,
      endAdornment,
      wrapperClassName,
      className,
      value: valueProp,
      onChange: onChangeProp,
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
    const resolvedId = props.id ?? generatedId;

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

    const textareaEl = (
      <div className={cn("relative", wrapperClassName)}>
        {startAdornment && <span className="absolute left-sm top-sm">{startAdornment}</span>}
        <textarea
          ref={mergedRef}
          id={resolvedId}
          className={cn(
            textareaVariants({ size, variant, full }),
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

    if (label) {
      return (
        <label htmlFor={resolvedId} className="flex flex-col gap-xs">
          <span className="text-sm font-medium text-secondary">{label}</span>
          {textareaEl}
        </label>
      );
    }

    return textareaEl;
  },
);

Textarea.displayName = "Textarea";
