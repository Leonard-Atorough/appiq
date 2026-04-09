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
      startAdornment,
      endAdornment,
      wrapperClassName,
      className,
      ...props
    },
    ref,
  ) => {
    // Always treat value as string for length
    const getStringValue = (val: unknown) => {
      if (typeof val === "string") return val;
      if (Array.isArray(val)) return val.join("");
      if (typeof val === "number") return String(val);
      return "";
    };
    const initialValue = getStringValue(props.value ?? props.defaultValue ?? "");
    const [value, setValue] = React.useState<string>(initialValue);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      props.onChange?.(e);
    };

    // Auto-grow logic
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    React.useEffect(() => {
      if (autoGrow && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value, autoGrow]);

    const rows = autoGrow ? minRows : (props.rows ?? minRows);

    return (
      <div className={cn("relative", wrapperClassName)}>
        {startAdornment && <span className="absolute left-sm top-sm">{startAdornment}</span>}
        <textarea
          ref={autoGrow ? textareaRef : ref}
          className={cn(
            textareaVariants({ size, variant, full }),
            resize !== undefined && `resize-${resize}`,
            startAdornment && "pl-lg",
            endAdornment && "pr-lg",
            className,
          )}
          rows={rows}
          maxLength={props.maxLength}
          value={value}
          onChange={handleChange}
          aria-label={props["aria-label"]}
          aria-describedby={props["aria-describedby"]}
          {...props}
        />
        {endAdornment && <span className="absolute right-sm top-sm">{endAdornment}</span>}
        {showCharacterCount && (
          <span className="absolute right-sm bottom-sm text-xs text-muted">
            {value.length}
            {props.maxLength ? ` / ${props.maxLength}` : ""}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
