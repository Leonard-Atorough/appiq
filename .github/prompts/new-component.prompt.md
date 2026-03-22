---
description: "Generate a single presentational React component with TypeScript types, Tailwind styling, and test scaffold."
argument-hint: "Component name and props (e.g., ApplicationCard with id, title, status)"
---

# New Component Generator

Generate a new presentational component ready for use in AppIQ features.

## What You Provide

- **Component name** (PascalCase): e.g., `ApplicationCard`, `JobBoardHeader`
- **Props**: List of properties and their types
- **Feature path**: Where the component goes (e.g., `features/applications/ui/`)
- **Styling guidance**: Color tokens, Tailwind classes, dark mode needs

## What You Get

1. **Component file** (`.tsx`) with:
   - Strict TypeScript interfaces
   - JSDoc comments
   - Semantic HTML
   - Tailwind + design tokens styling
   - Accessibility (ARIA, focus states, semantics)

2. **Test file** (`.test.tsx`) with:
   - Setup with React Testing Library
   - Example test cases
   - Mocking patterns

## Example

**Input:**
```
Component: ApplicationCard
Props:
  - application: Application (with id, title, company, status)
  - onUpdate?: (app: Application) => void
  - variant?: 'compact' | 'full'
Feature path: features/applications/ui/
Styling: Status colors (success/warning/error), Tailwind cards
```

**Output:**

### ApplicationCard.tsx
```typescript
import React from 'react';
import { Application } from '@/entities/application/model/types';

interface ApplicationCardProps {
  application: Application;
  onUpdate?: (app: Application) => void;
  variant?: 'compact' | 'full';
}

/**
 * ApplicationCard - Displays a single job application with status badge.
 * Supports compact and full view modes.
 */
export function ApplicationCard({
  application,
  onUpdate,
  variant = 'full',
}: ApplicationCardProps) {
  const statusColors = {
    applied: 'bg-[var(--color-info)]',
    interview: 'bg-[var(--color-primary)]',
    offer: 'bg-[var(--color-success)]',
    rejected: 'bg-[var(--color-error)]',
    archived: 'bg-[var(--color-text-muted)]',
  };

  return (
    <article
      className={`
        rounded-lg border border-[var(--color-border)]
        bg-[var(--color-surface)] p-4
        hover:shadow-md transition-shadow
        ${variant === 'compact' ? 'py-3' : 'py-6'}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            {application.title}
          </h3>
          <p className="text-[var(--color-text-muted)]">
            {application.company}
          </p>
        </div>

        <span
          className={`
            px-2 py-1 rounded text-sm font-semibold text-white
            ${statusColors[application.status]}
          `}
          role="status"
          aria-label={`Status: ${application.status}`}
        >
          {application.status}
        </span>
      </div>

      {variant === 'full' && application.notes && (
        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text)]">
            {application.notes}
          </p>
        </div>
      )}

      {onUpdate && (
        <button
          onClick={() => onUpdate(application)}
          className="mt-4 px-3 py-2 text-sm font-semibold rounded
            bg-[var(--color-primary)] text-white
            hover:opacity-90 focus:outline-2 focus:outline-offset-2
            focus:outline-[var(--color-primary)]"
        >
          Edit
        </button>
      )}
    </article>
  );
}
```

### ApplicationCard.test.tsx
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationCard } from '../ApplicationCard';
import { Application } from '@/entities/application/model/types';

describe('ApplicationCard', () => {
  const mockApp: Application = {
    id: '1',
    title: 'Frontend Engineer',
    company: 'Acme Corp',
    status: 'interview',
    appliedDate: new Date('2026-03-01'),
    notes: 'Great company, good fit',
  };

  it('renders application title and company', () => {
    render(<ApplicationCard application={mockApp} />);
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('displays status badge with correct label', () => {
    render(<ApplicationCard application={mockApp} />);
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('interview');
  });

  it('calls onUpdate when edit button clicked', async () => {
    const onUpdate = vi.fn();
    render(<ApplicationCard application={mockApp} onUpdate={onUpdate} />);
    
    await userEvent.click(screen.getByText('Edit'));
    expect(onUpdate).toHaveBeenCalledWith(mockApp);
  });

  it('shows compact variant without notes', () => {
    const { container } = render(
      <ApplicationCard application={mockApp} variant="compact" />
    );
    expect(container.querySelector('article')).toHaveClass('py-3');
  });
});
```

## Features

✅ Semantic HTML (`<article>`, `<h3>`, `<button>`)
✅ Design tokens (colors, spacing)
✅ Tailwind utilities for layout
✅ Accessibility (roles, aria-labels, focus states)
✅ Dark mode support (inherited from tokens)
✅ TypeScript strict mode
✅ JSDoc comments
✅ Comprehensive tests with mocks

## Next Steps

1. Save both files to your feature folder
2. Customize business logic as needed
3. Run tests: `npm test`
4. Add to feature `index.ts` export

---

**Related**: [A11y Audit skill](../skills/a11y-audit/) for accessibility review
