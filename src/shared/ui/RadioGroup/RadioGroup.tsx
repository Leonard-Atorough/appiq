import React, { useState } from "react";
import { cn } from "@shared/lib/cn";
import { Radio } from "./Radio";
import {
  radioGroupVariants,
  radioGroupLegendVariants,
  radioGroupDescriptionVariants,
  radioGroupErrorVariants,
} from "./radioGroup.variants";
import type { RadioGroupProps, RadioGroupOption } from "./radioGroup.types";
import { useResponsive } from "@/shared/lib";

/**
 * RadioGroup
 *
 * Accessible group of radio buttons for single selection.
 * Manages state, keyboard navigation, and accessibility for multiple radios.
 *
 * Can be used controlled or uncontrolled.
 *
 * Accessibility:
 * - Uses <fieldset> and <legend> for semantic grouping
 * - Keyboard navigation with arrow keys (future implementation)
 * - Proper ARIA labels and descriptions
 * - Integrates with Radio component for consistency
 *
 * @example
 * // Uncontrolled
 * <RadioGroup
 *   name="options"
 *   label="Choose one"
 *   options={[
 *     { value: "a", label: "Option A" },
 *     { value: "b", label: "Option B" },
 *   ]}
 * />
 *
 * // Controlled
 * const [value, setValue] = useState("a");
 * <RadioGroup
 *   name="options"
 *   label="Choose one"
 *   value={value}
 *   onChange={setValue}
 *   options={[...]}
 * />
 */
export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      name,
      value,
      defaultValue,
      onChange,
      options,
      label,
      size = "md",
      disabled = false,
      required = false,
      error,
      direction = "vertical",
      description,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : internalValue;

    const resolvedSize = useResponsive(size);
    const resolvedDirection = useResponsive(direction);

    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <fieldset ref={ref} disabled={disabled} className={cn("space-y-md", className)} {...props}>
        {label && (
          <legend className={radioGroupLegendVariants()}>
            {label}
            {required && <span className="ml-xs text-error">*</span>}
          </legend>
        )}

        {description && <div className={radioGroupDescriptionVariants()}>{description}</div>}

        <div className={radioGroupVariants({ direction: resolvedDirection, disabled })}>
          {options.map((option: RadioGroupOption) => (
            <Radio
              key={option.value}
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              label={option.label}
              description={option.description}
              size={resolvedSize}
              disabled={disabled || option.disabled}
              required={required}
              checked={selectedValue === option.value}
              onChange={(e) => {
                if (e.target.checked) {
                  handleChange(option.value);
                }
              }}
            />
          ))}
        </div>

        {error && <div className={radioGroupErrorVariants()}>{error}</div>}
      </fieldset>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
