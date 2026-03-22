---
name: feature-scaffold
description: "Generate complete feature folder structure with boilerplate. Use when: starting a new feature, creating applications/cvBuilder/jobBoards modules, or scaffolding vertical-slice components."
argument-hint: "Feature name (e.g., applications, cvBuilder)"
user-invocable: true
---

# Feature Scaffold

Rapidly generate a complete AppIQ feature with proper folder structure, TypeScript types, and example hooks and components.

## When to Use

- **Starting a new feature**: Create the full applications, jobBoards, cvBuilder, etc.
- **Onboarding new developers**: Show the standard vertical-slice structure
- **Maintaining consistency**: Ensure all features follow the same conventions

## What Gets Generated

For a feature named `{featureName}`:

```
src/features/{featureName}/
  ├── index.ts              # Public API export
  ├── ui/
  │   ├── {FeatureName}Page.tsx      # Main page/container
  │   └── __tests__/
  │       └── {FeatureName}Page.test.tsx
  ├── data/
  │   ├── use{FeatureName}.ts        # Data/API hook
  │   └── __tests__/
  │       └── use{FeatureName}.test.ts
  ├── model/
  │   ├── use{FeatureName}Model.ts   # State/command hook
  │   └── __tests__/
  │       └── use{FeatureName}Model.test.ts
  └── lib/
      └── {featureName}.utils.ts     # Small helpers
```

Plus:

- TypeScript strict-mode ready, with only essential JSDoc comments. Avoid commenting the obvious, but include explanations for complex logic.
- Test file scaffolds with proper imports
- README.md with integration instructions

## Procedure

### Step 1: Identify the Feature

Determine:

- **Feature name** (kebab-case): e.g., `applications`, `job-boards`, `cv-builder`
- **PascalCase variant**: Used for component/hook names
- **Domain entity** it manages: e.g., `Application`, `JobBoard`, `CV`

### Step 2: Run the Scaffold

Ask the skill:

> Generate feature scaffold for `applications` managing `Application` entity

### Step 3: Review Generated Files

[Feature template details](./references/feature-template.md) describe:

- Export patterns in `index.ts`
- Hook typing conventions
- Component prop interfaces
- Test setup and aliases

### Step 4: Customize for Your Feature

1. **Add domain logic** to hooks (queries, mutations, side effects)
2. **Build presentational components** in `ui/` using your domain model
3. **Wire localStorage/Dexie** persistence in `data/` hooks
4. **Add feature-specific utilities** in `lib/`

### Step 5: Integrate with App Router

Add the feature to your router in `src/app/providers/RouteProvider.tsx`:

```tsx
import { ApplicationsPage } from '@/features/applications/ui/ApplicationsPage';

// In your route definitions:
{
  path: '/applications',
  element: <ApplicationsPage />,
}
```

## Output Format

When generating a scaffold, the skill:

1. Creates all folder structure and files
2. Provides the generated file paths
3. Suggests next steps: "Now add your entity types to `src/entities/application/`"
4. Links to [integration guide](./references/integration-guide.md)

## References

- [Feature template details](./references/feature-template.md)
- [Integration checklist](./references/integration-guide.md)
- [AppIQ Architecture](../../../docs/Architecture.md)
