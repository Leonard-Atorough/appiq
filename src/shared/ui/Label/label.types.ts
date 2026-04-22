import type { VariantProps } from "class-variance-authority";
import type { labelVariants } from "./label.variants";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
  /** Label content. Accepts any ReactNode for complex structures (e.g. text + badge). */
  children: React.ReactNode | string;
  /** id of the associated form control. Required for a11y when used standalone; `Field` handles this automatically. */
  htmlFor?: string;
  /** Shows a `*` indicator via CSS `after:`. Visual only — does not enforce validation. */
  required?: boolean;
  /** Extra classes on the `<label>` element. */
  className?: string;
}
