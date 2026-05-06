import type { Breakpoint, ResponsiveValue } from "../types";
import { BREAKPOINTS } from "../constants";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Type guard to narrow ResponsiveValue<T> to a responsive object.
 * Returns true if value is a responsive object (not a primitive or array).
 *
 * @internal
 */
function isResponsiveObject<T>(
  value: ResponsiveValue<T>,
): value is { base: T } & Partial<Record<Exclude<Breakpoint, "base">, T>> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && "base" in value;
}

const breakpointQueries: Record<Exclude<Breakpoint, "base">, string> = {
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
};

/**
 * Hook that resolves responsive values to the current breakpoint.
 * @template T - The type of value at each breakpoint.
 * @param responsiveValue - Primitive, array, or object with `base` (required) and optional `md`, `lg`, `xl` keys.
 * @returns Resolved value for current breakpoint, falls back to `base` if higher breakpoint undefined.
 * @example
 * ```tsx
 * const padding = useResponsive({ base: "sm", md: "md", lg: "lg" });
 * const showSidebar = useResponsive({ base: false, lg: true });
 * ```
 */
export function useResponsive<T>(responsiveValue: ResponsiveValue<T>): T {
  // Each useMediaQuery manages its own listener — results are reactive booleans
  const mediaQueryMatches: Record<Exclude<Breakpoint, "base">, boolean> = {
    md: useMediaQuery(breakpointQueries.md),
    lg: useMediaQuery(breakpointQueries.lg),
    xl: useMediaQuery(breakpointQueries.xl),
  };

  if (!isResponsiveObject(responsiveValue)) {
    return responsiveValue as T;
  }

  // Derive current breakpoint synchronously — iterate md→lg→xl so last match wins (mobile-first)
  let currentBreakpoint: Breakpoint = "base";
  for (const [bp, matched] of Object.entries(mediaQueryMatches) as [
    Exclude<Breakpoint, "base">,
    boolean,
  ][]) {
    if (matched) currentBreakpoint = bp;
  }

  // Fall back to 'base' if the current breakpoint value is not defined
  return responsiveValue[currentBreakpoint as keyof typeof responsiveValue] ?? responsiveValue.base;
}
