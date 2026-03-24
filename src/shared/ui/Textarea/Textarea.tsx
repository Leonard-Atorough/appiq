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

    const rows = autoGrow ? minRows : props.rows ?? minRows;

    return (
      <div className={cn("relative", wrapperClassName)}>
        {startAdornment && <span className="absolute left-2 top-2">{startAdornment}</span>}
        <textarea
          ref={autoGrow ? textareaRef : ref}
          className={cn(
            textareaVariants({ size, variant, full }),
            resize !== undefined && `resize-${resize}`,
            startAdornment && "pl-8",
            endAdornment && "pr-8",
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
        {endAdornment && <span className="absolute right-2 top-2">{endAdornment}</span>}
        {showCharacterCount && (
          <span className="absolute right-2 bottom-2 text-xs text-muted-foreground">
            {value.length}
            {props.maxLength ? ` / ${props.maxLength}` : ""}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
