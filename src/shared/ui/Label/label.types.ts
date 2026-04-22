import type { VariantProps } from "class-variance-authority";
import type { labelVariants } from "./label.variants";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
  /**
   * The content of the label. This can be a string or any React node, allowing for complex label structures if needed.
   */
  children: React.ReactNode | string;

  /**
   * The id of the form control that this label is associated with. This is important for accessibility, as it allows screen readers to correctly associate the label with the corresponding input element. The value of this prop should match the id of the form control (e.g., input, select, textarea) that the label is describing.
   */
  htmlFor?: string;

  /**
   * Indicates whether the associated form control is required. If true, an asterisk (*) will be displayed next to the label text to visually indicate that the field is required. This is purely a visual indicator and does not enforce any validation on its own; you should still implement validation logic to ensure that required fields are filled out appropriately.
   */
  required?: boolean;

  /**
   * Additional CSS classes to apply to the label element. This allows for custom styling of the label, such as adjusting font size, color, spacing, etc.
   */
  className?: string;
}
