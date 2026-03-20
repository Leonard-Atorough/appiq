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
        /* Semantic color shortcuts */
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
      },
      backgroundColor: {
        base: "var(--color-bg)",
        surface: "var(--color-surface)",
        muted: "var(--color-muted-bg)",
      },
      textColor: {
        base: "var(--color-text)",
        secondary: "var(--color-text-secondary)",
        muted: "var(--color-text-muted)",
        light: "var(--color-text-light)",
      },
      borderColor: {
        base: "var(--color-border)",
        muted: "var(--color-border-muted)",
      },
      ringColor: {
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [],
};
