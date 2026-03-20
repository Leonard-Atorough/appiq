# AppIQ – Job Application Tracker

A calm, visually harmonious job application tracking app built with React, TypeScript, Vite, and Tailwind CSS.

## Design System & Color Palette

### Philosophy

AppIQ uses a **psychology-first color system** designed to reduce user stress while tracking job applications:

- **Monochromatic green ramp** (base: `#50bb4e`): Calming, natural, and growth-oriented
- **Soft complementary purple** (accent): Non-dominant, adds visual interest without overwhelming
- **Semantic colors**: Clear feedback for warnings, errors, success, and info states

### Color Token Structure

All colors are defined as CSS variables in [`src/styles/tokens.css`](src/styles/tokens.css) using HSL format for easy customization and dark mode support.

#### Primary Green Monochromatic Ramp

```css
--green-50 to --green-900  /* Lightest to darkest */
```

Use `primary-{50,100,200,...,900}` Tailwind classes for backgrounds, borders, and accents.

#### Semantic Colors

```css
--color-success: #50bb4e (green) --color-warning: #ffb81c (amber) --color-error: #e74c3c (red/rose)
  --color-info: #3b82f6 (blue);
```

#### Text & Background

```css
--color-text:
  Dark text in light mode,
  light text in dark mode --color-bg: Page background --color-surface: Card/surface background
    --color-border: Border color with muted variant;
```

### Using Colors in Components

**Tailwind Classes:**

```jsx
// Primary green
<div className="bg-primary-500 text-white">...</div>
<button className="bg-primary hover:bg-primary-600">Apply</button>

// Semantic
<div className="badge badge-success">Applied</div>
<div className="alert alert-error">Application rejected</div>

// Text utilities
<p className="text-muted">Archived application</p>
<p className="text-secondary">Secondary information</p>
```

**CSS Variables (for custom styles):**

```css
button {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}

/* Dark mode automatically handled */
```

### Component Classes

Predefined component classes in [`src/index.css`](src/index.css):

| Class                                 | Purpose                        |
| ------------------------------------- | ------------------------------ |
| `.btn`                                | Primary action button          |
| `.btn-secondary`                      | Secondary button (outlined)    |
| `.btn-sm`, `.btn-lg`                  | Button size variants           |
| `.card`                               | Content card with hover shadow |
| `.badge`                              | Primary badge / tag            |
| `.badge-{success,warning,error,info}` | Semantic badges                |
| `.alert`                              | Alert box (info by default)    |
| `.alert-{success,warning,error}`      | Alert variants                 |
| `.text-muted`, `.text-secondary`      | Text color utilities           |

### Dark Mode

Dark mode is enabled via Tailwind's `class` strategy. Toggle with:

```js
document.documentElement.classList.toggle("dark");
```

All colors automatically adapt in dark mode (lighter greens, inverted text, etc.).

---

## Setup

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## Tech Stack

- **React 19** + TypeScript for UI
- **Vite 8** for fast bundling
- **Tailwind CSS 4** with custom color tokens
- **ESLint 9** for code quality

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
