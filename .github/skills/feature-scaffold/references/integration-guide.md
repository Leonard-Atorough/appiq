# Feature Integration Checklist

After scaffolding a new feature, follow these steps to fully integrate it.

## 1. Create Entity Types

If the feature manages a new domain (not just composing existing ones):

```bash
mkdir -p src/entities/{domain}/model
```

**src/entities/{domain}/model/types.ts**:

```typescript
export interface Application {
  id: string;
  title: string;
  company: string;
  status: "applied" | "interview" | "offer" | "rejected" | "archived";
  appliedDate: Date;
  notes?: string;
}
```

## 2. Set Up Storage/Dexie

If features need persistence:

**src/shared/storage/repositories/ApplicationRepository.ts**:

```typescript
import { db } from "../db";
import { Application } from "@/entities/application/model/types";

export class ApplicationRepository {
  async getAll(): Promise<Application[]> {
    return await db.applications.toArray();
  }

  async save(app: Application): Promise<string> {
    return await db.applications.put(app);
  }

  async delete(id: string): Promise<void> {
    await db.applications.delete(id);
  }
}
```

## 3. Wire Data Hooks

Update **features/{featureName}/data/use{FeatureName}.ts** to query storage:

```typescript
import { useEffect, useState } from "react";
import { ApplicationRepository } from "@/shared/storage/repositories/ApplicationRepository";

const repo = new ApplicationRepository();

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    repo.getAll().then(setApplications);
  }, []);

  return { applications };
}
```

## 4. Add Routes

Update **src/app/providers/RouteProvider.tsx**:

```tsx
import { ApplicationsPage } from "@/features/applications/ui/ApplicationsPage";

const routes = [
  {
    path: "/applications",
    element: <ApplicationsPage />,
  },
  // ...
];
```

## 5. Export from Features Index

Verify **src/features/index.ts** (if you have one) includes the new feature:

```typescript
export * from "./applications"; // Re-export public API
```

## 6. Test Setup

Scaffold test framework (if not done):

- Install `vitest`, `@testing-library/react`, etc.
- Create test config in root
- Add `npm test` script to `package.json`
- Run tests for new feature

## 7. Design System Integration

Check styling against `tailwind.config.js` for available extended class names. All tokens are mapped — use the named Tailwind utilities:

```typescript
// ✅ Use Tailwind extended class names from tailwind.config.js
<div className="p-md">
  {/* ❌ bg-(--color-surface) → ✅ bg-surface */}
  {/* ❌ px-(--spacing-md)    → ✅ px-md     */}
  {/* ❌ text-(--font-size-sm) → ✅ text-sm   */}
  {/* ❌ border-(--color-border) → ✅ border-base */}
</div>
```

## Validation Checklist

- [ ] Entity types defined and exported
- [ ] Storage/repository created if needed
- [ ] Data hooks query storage
- [ ] Model hooks implement business logic
- [ ] UI components use Tailwind + design tokens
- [ ] Tests pass for hooks and components
- [ ] Feature routes added to RouteProvider
- [ ] Feature exported from features/index.ts
- [ ] All TypeScript errors resolved (strict mode)
- [ ] Accessibility checked (semantic HTML, ARIA, keyboard nav)
