# Component Showcase

A comprehensive visual reference for all UI components in the AppIQ design system.

## Overview

The Component Showcase displays all available components with their various variants, sizes, and states. This page is perfect for:

- **Development**: Reference component implementations while building features
- **Design Review**: Verify visual consistency across the design system
- **Testing**: Ensure components render correctly across different states
- **Documentation**: Show stakeholders the current component library

## Components Included

### Button

- **Variants**: Primary, Secondary, Outline, Ghost, Link
- **Sizes**: Small, Medium, Large
- **States**: Normal, Hover, Active, Disabled
- **Props**: Full width support

### Input

- **Sizes**: Small, Medium, Large
- **States**: Default, Error, Disabled
- **Features**: Adornments support (start/end)

### Textarea

- **Variants**: Primary, Secondary, Outline, Ghost
- **Sizes**: Small, Medium, Large
- **Features**:
  - Auto-grow functionality
  - Character count display
  - Custom resize options
  - Adornments support

### Select

- **Sizes**: Small, Medium, Large
- **States**: Default, Error, Disabled
- **Features**: Adornments support

### Dialog

- **Modes**: Modal and non-modal
- **Features**:
  - Title and description
  - Customizable size
  - Button row for actions
  - Escape key to close
  - Custom focus management

## Usage

The showcase is integrated as the main application view. To access it:

1. Start the development server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. Browse all components and their variations
4. Use the **Dark/Light Mode toggle** in the top-right corner to switch between themes

### Dark Mode

The showcase supports a fully functional dark mode toggle that:
- Persists your preference in localStorage
- Respects system color scheme preference on first visit
- Works seamlessly with all components
- Demonstrates how components adapt to different themes using design tokens

## Switching Back to Original App

If you need to work on the actual application features, you can:

1. Create a new route/page component for your feature
2. Update `src/main.tsx` to render your feature instead of the showcase
3. Or implement a navigation system to switch between the showcase and your app

## Design Tokens

All components use semantic design tokens from `src/styles/tokens/`:

- **Colors**: Primary, Secondary, Error states, background, surface colors
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl)
- **Typography**: Font weights and sizes
- **Radii**: Rounded corner scales

The components automatically support dark mode through CSS variables defined in `themes.css`.

## Adding New Components

When adding new components to the showcase:

1. Create the component in `src/shared/ui/<ComponentName>/`
2. Add a new section in `src/features/componentShowcase/ComponentShowcase.tsx`
3. Document the component's variants and props

Example structure:

```tsx
<SectionTitle title="YourComponent" />
<SubsectionTitle title="Variants" />
<ComponentGrid>
  {/* Your component variations */}
</ComponentGrid>
```

## File Structure

```
src/features/componentShowcase/
├── ComponentShowcase.tsx      # Main showcase component
├── ComponentShowcasePage.tsx  # Page wrapper
└── index.ts                   # Exports
```
