import type React from "react";

export interface RadioGroupOption {
  /** The value of the radio option */
  value: string;
  
  /** Label displayed next to the radio */
  label: React.ReactNode;
  
  /** Optional description text */
  description?: React.ReactNode;
  
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  /** Unique name for the radio group */
  name: string;
  
  /** Current selected value */
  value?: string;
  
  /** Default value when uncontrolled */
  defaultValue?: string;
  
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  
  /** Array of radio options */
  options: RadioGroupOption[];
  
  /** Label/legend for the group */
  label?: React.ReactNode;
  
  /** Size variant for all radios in the group */
  size?: "sm" | "md" | "lg";
  
  /** Whether all radios are disabled */
  disabled?: boolean;
  
  /** Whether all radios are required */
  required?: boolean;
  
  /** Error message to display for the entire group */
  error?: React.ReactNode;
  
  /** Layout direction */
  direction?: "vertical" | "horizontal";
  
  /** Optional description text for the group */
  description?: React.ReactNode;
}
