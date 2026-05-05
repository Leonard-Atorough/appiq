import { useEffect, useState } from "react";
import type { Breakpoint, ResponsiveValue } from "../types";
import { BREAKPOINTS } from "../constants";

/**
 * Type guard to narrow ResponsiveValue<T> to a responsive object.
 * Returns true if value is a responsive object (not a primitive or array).
 */
function isResponsiveObject<T>(value: ResponsiveValue<T>): value is { base: T } & Partial<Record<Exclude<Breakpoint, "base">, T>> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && "base" in value;
}

export function useResponsive<T>(responsiveValue: ResponsiveValue<T>): T {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("base");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newBreakpoint: Breakpoint = "base";
      if (width >= BREAKPOINTS.xl) {
        newBreakpoint = "xl";
      } else if (width >= BREAKPOINTS.lg) {
        newBreakpoint = "lg";
      } else if (width >= BREAKPOINTS.md) {
        newBreakpoint = "md";
      }
      setCurrentBreakpoint(newBreakpoint);
    };

    // Debounce resize events for performance
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);
    handleResize(); // Set initial breakpoint
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  if (!isResponsiveObject(responsiveValue)) {
    return responsiveValue as T;
  }

  // Fall back to 'base' if the current breakpoint value is not defined
  return responsiveValue[currentBreakpoint as keyof typeof responsiveValue] ?? responsiveValue.base;
}
