/**
 * Helper to generate responsive Tailwind classes from object notation.
 * 
 * Converts breakpoint-to-class mappings into prefixed class strings for use
 * with the `className` prop. Useful for overriding static component variants
 * at different breakpoints.
 * 
 * @example
 * // Simple usage
 * responsive({ lg: 'flex-row lg:gap-lg' })
 * // Returns: 'lg:flex-row lg:gap-lg'
 * 
 * // With component
 * <Flex direction="column" gap="sm" className={responsive({ lg: 'flex-row' })} />
 * 
 * @param overrides - Object mapping breakpoint names to class strings
 * @returns Space-separated class string with breakpoint prefixes
 */
export function responsive(overrides: Record<string, string>): string {
  return Object.entries(overrides)
    .map(([breakpoint, classes]) => {
      // If breakpoint is 'base', don't add prefix
      if (breakpoint === 'base') return classes;
      // For other breakpoints, prefix each class
      return classes
        .split(' ')
        .map((cls) => (cls.startsWith(`${breakpoint}:`) ? cls : `${breakpoint}:${cls}`))
        .join(' ');
    })
    .join(' ');
}
