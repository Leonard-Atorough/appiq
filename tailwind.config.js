/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* Primary green ramp */
        primary: {
          50: "var(--green-50)",
          100: "var(--green-100)",
          200: "var(--green-200)",
          300: "var(--green-300)",
          400: "var(--green-400)",
          500: "var(--green-500)",
          600: "var(--green-600)",
          700: "var(--green-700)",
          800: "var(--green-800)",
          900: "var(--green-900)",
        },
        /* Secondary purple ramp */
        secondary: {
          50: "var(--purple-50)",
          100: "var(--purple-100)",
          200: "var(--purple-200)",
          300: "var(--purple-300)",
          500: "var(--purple-500)",
          600: "var(--purple-600)",
          700: "var(--purple-700)",
        },
        /* Semantic feedback colors */
        success: "var(--color-success)",
        "success-light": "var(--color-success-light)",
        warning: "var(--color-warning)",
        "warning-light": "var(--color-warning-light)",
        error: "var(--color-error)",
        "error-light": "var(--color-error-light)",
        info: "var(--color-info)",
        "info-light": "var(--color-info-light)",
      },
      backgroundColor: {
        base: "var(--color-bg)",
        secondary: "var(--color-secondary-bg)",
        surface: "var(--color-surface)",
        muted: "var(--color-muted-bg)",
        skeleton: "var(--color-skeleton)",
      },
      textColor: {
        base: "var(--color-text)",
        secondary: "var(--color-text-secondary)",
        muted: "var(--color-text-muted)",
        light: "var(--color-text-light)",
        /* Accessible primary text — use for link/inline text on page backgrounds (≥4.5:1 contrast) */
        "primary-text": "var(--color-primary-text)",
        /* Accessible feedback text — use on light/white backgrounds (≥4.5:1 contrast) */
        "success-text": "var(--color-success-text)",
        "warning-text": "var(--color-warning-text)",
        "error-text": "var(--color-error-text)",
        "info-text": "var(--color-info-text)",
      },
      borderColor: {
        base: "var(--color-border)",
        muted: "var(--color-border-muted)",
      },
      ringColor: {
        primary: "var(--color-primary)",
      },
      /* Semantic spacing tokens — extend Tailwind's default numeric scale */
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
        "4xl": "var(--spacing-4xl)",
        "5xl": "var(--spacing-5xl)",
      },
      /* Border radius tokens */
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      /* Font size tokens */
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
      },
      /* Font weight tokens */
      fontWeight: {
        normal: "var(--font-weight-normal)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      /* Line height tokens */
      lineHeight: {
        tight: "var(--line-height-tight)",
        snug: "var(--line-height-snug)",
        normal: "var(--line-height-normal)",
        relaxed: "var(--line-height-relaxed)",
        loose: "var(--line-height-loose)",
      },
      /* Letter spacing tokens */
      letterSpacing: {
        tight: "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide: "var(--tracking-wide)",
      },
      /* Font families */
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
        mono: ["var(--font-mono)"],
      },
      /* Custom animations */
      animation: {
        /* Toast timer drain bar — duration set via --timer-duration CSS var on the element */
        "timer-drain": "timer-drain var(--timer-duration, 5000ms) linear forwards",
      },
      keyframes: {
        "timer-drain": {
          from: { transform: "scaleX(1)" },
          to: { transform: "scaleX(0)" },
        },
      },
    },
  },
  plugins: [],
};
