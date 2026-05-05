/**Mobile-first breakpoints */
export type Breakpoint = "base" | "md" | "lg" | "xl";

/** A value that can be either a single value or an object mapping breakpoints to values.
 *  When using an object, `base` is required; other breakpoints are optional (fallback to `base`).
 *  @example
 *  size="md"  // static
 *  size={{ base: "sm", md: "md", lg: "lg" }}  // partial responsive (xl falls back to base: "sm")
 *  size={{ base: "sm", md: "md", lg: "lg", xl: "lg" }}  // full responsive */
export type ResponsiveValue<T> =
  | T
  | ({ base: T } & Partial<Record<Exclude<Breakpoint, "base">, T>>);
