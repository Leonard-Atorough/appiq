import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Flex component variants using CVA for static layout props.
 * Responsive overrides use className + responsive() helper for consistency with other components.
 */
export const flexVariants = cva('flex transition-all duration-200', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    gap: {
      xs: 'gap-xs',
      sm: 'gap-sm',
      md: 'gap-md',
      lg: 'gap-lg',
      xl: 'gap-xl',
      '2xl': 'gap-2xl',
      '3xl': 'gap-3xl',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    padding: {
      xs: 'p-xs',
      sm: 'p-sm',
      md: 'p-md',
      lg: 'p-lg',
      xl: 'p-xl',
      '2xl': 'p-2xl',
      '3xl': 'p-3xl',
    },
    paddingX: {
      xs: 'px-xs',
      sm: 'px-sm',
      md: 'px-md',
      lg: 'px-lg',
      xl: 'px-xl',
      '2xl': 'px-2xl',
      '3xl': 'px-3xl',
    },
    paddingY: {
      xs: 'py-xs',
      sm: 'py-sm',
      md: 'py-md',
      lg: 'py-lg',
      xl: 'py-xl',
      '2xl': 'py-2xl',
      '3xl': 'py-3xl',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'row',
    gap: 'md',
    justify: 'start',
    align: 'start',
    wrap: false,
    fullWidth: false,
  },
});

export type FlexVariants = VariantProps<typeof flexVariants>;
