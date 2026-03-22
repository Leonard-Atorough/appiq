---
description: "Generate TypeScript entity types with validation skeletons. Create domain models for Application, Company, Job, etc."
argument-hint: "Entity name and properties (e.g., Application with id, title, status)"
---

# Entity Type Generator

Create strongly-typed domain models for AppIQ entities with validation support.

## What You Provide

- **Entity name** (PascalCase): e.g., `Application`, `Company`, `Job`
- **Properties**: List with types and required/optional status
- **Domain logic**: Any enum values, relationships, constraints
- **Validation rules**: Which fields are required, ranges, formats

## What You Get

1. **types.ts** — TypeScript interfaces
2. **validators.ts** — Validation skeletons (using `zod` or similar)
3. **Example usage** — How to use in components

## Example

**Input:**

```
Entity: Application
Properties:
  - id: string (required, unique UUID)
  - title: string (required, 1-100 chars)
  - company: string (required)
  - status: enum applied|interview|offer|rejected|archived (required)
  - appliedDate: Date (required)
  - interviewDate: Date (optional)
  - notes: string (optional, but consider max length)
```

**Output:**

### src/entities/application/model/types.ts

```typescript
/**
 * Application - Represents a job application entry.
 * Core domain model for the applications feature.
 */
export interface Application {
  /** Unique identifier (UUID). */
  id: string;

  /** Job title or position name. */
  title: string;

  /** Company name. */
  company: string;

  /** Current status of the application. */
  status: ApplicationStatus;

  /** Date when application was submitted. */
  appliedDate: Date;

  /** Expected or scheduled interview date (if applicable). */
  interviewDate?: Date;

  /** Optional notes or observations about the application. */
  notes?: string;

  /** Timestamp of when record was created. */
  createdAt: Date;

  /** Timestamp of last update. */
  updatedAt: Date;
}

/** Status values for an Application. */
export type ApplicationStatus = "applied" | "interview" | "offer" | "rejected" | "archived";

/** Input shape for creating a new application. */
export interface CreateApplicationInput extends Omit<
  Application,
  "id" | "createdAt" | "updatedAt"
> {}

/** Input shape for updating an application. */
export interface UpdateApplicationInput extends Partial<
  Omit<Application, "id" | "createdAt" | "updatedAt">
> {}

/** Sort order for applications. */
export type ApplicationSortBy = "date" | "company" | "title";

/** Filters for querying applications. */
export interface ApplicationFilter {
  status?: ApplicationStatus | ApplicationStatus[];
  company?: string;
  search?: string;
  sortBy?: ApplicationSortBy;
  limit?: number;
  offset?: number;
}
```

### src/entities/application/model/validators.ts

```typescript
import { z } from "zod";
import { Application, CreateApplicationInput, ApplicationStatus } from "./types";

/** Zod schema for Application validation. */
export const ApplicationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  status: z.enum(["applied", "interview", "offer", "rejected", "archived"] as const),
  appliedDate: z.date(),
  interviewDate: z.date().optional(),
  notes: z.string().max(500).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateApplicationSchema = z.object({
  title: z.string().min(1, "Title required").max(100, "Max 100 chars"),
  company: z.string().min(1, "Company required").max(100),
  status: z.enum(["applied", "interview", "offer", "rejected", "archived"] as const),
  appliedDate: z
    .date()
    .refine((date) => date <= new Date(), "Applied date cannot be in the future"),
  interviewDate: z.date().optional(),
  notes: z.string().max(500, "Max 500 chars").optional(),
});

/** Validates an Application object. */
export function validateApplication(data: unknown): Application {
  return ApplicationSchema.parse(data);
}

/** Validates CreateApplicationInput. */
export function validateCreateApplication(data: unknown): CreateApplicationInput {
  return CreateApplicationSchema.parse(data);
}

/** Safe validation that returns error or valid data. */
export function safeValidateApplication(
  data: unknown,
): { success: true; data: Application } | { success: false; error: string } {
  try {
    return { success: true, data: validateApplication(data) };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Validation failed";
    return { success: false, error: message };
  }
}

/** Type guards. */
export function isApplication(value: unknown): value is Application {
  try {
    validateApplication(value);
    return true;
  } catch {
    return false;
  }
}

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return ["applied", "interview", "offer", "rejected", "archived"].includes(value);
}
```

### Usage Examples

```typescript
// Creating a new application
import { validateCreateApplication } from '@/entities/application/model/validators';

const newApp = validateCreateApplication({
  title: 'Frontend Engineer',
  company: 'Acme Corp',
  status: 'applied',
  appliedDate: new Date('2026-03-22'),
});

// Type is now Application
const appId: string = newApp.id; // ✅ Works

// In a data hook
import { useApplications } from '@/features/applications/data/useApplications';

export function useApplications() {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    fetchApps().then((data) => {
      // Validate before storing
      const validated = data.map(validateApplication);
      setApps(validated);
    });
  }, []);
}

// In a component
import { ApplicationStatus } from '@/entities/application/model/types';

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const statusLabels: Record<ApplicationStatus, string> = {
    applied: 'Applied',
    interview: 'Interview',
    offer: 'Offer',
    rejected: 'Rejected',
    archived: 'Archived',
  };

  return <badge>{statusLabels[application.status]}</badge>;
}
```

## What's Included

✅ TypeScript interfaces (strict types)
✅ Input shapes for create/update operations
✅ Enum types for status/categories
✅ Zod validation schemas
✅ Type guard functions
✅ JSDoc comments explaining each field
✅ Example usage in components and hooks

## Directory Structure

```
src/entities/{domain}/
  ├── model/
  │   ├── types.ts        # ← Your generated interface
  │   ├── validators.ts   # ← Your generated validators
  │   └── __tests__/
  │       └── validators.test.ts
  └── index.ts            # Export public API
```

## Next Steps

1. Create `src/entities/{domain}/model/types.ts` with generated code
2. Create `src/entities/{domain}/model/validators.ts` with validation
3. Update storage repository to use the type
4. Use in feature data hooks
5. Write tests for validators

## Advanced: Add Business Methods

For entities with behavior, add helper functions:

```typescript
// In types.ts

export namespace Application {
  /**
   * Check if application is still active (not rejected or archived).
   */
  export function isActive(app: Application): boolean {
    return !["rejected", "archived"].includes(app.status);
  }

  /**
   * Days since application was submitted.
   */
  export function daysSinceApplied(app: Application): number {
    return Math.floor((Date.now() - app.appliedDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  /**
   * Can this application transition to a new status?
   */
  export function canTransitionTo(current: ApplicationStatus, next: ApplicationStatus): boolean {
    const allowed: Record<ApplicationStatus, ApplicationStatus[]> = {
      applied: ["interview", "rejected", "archived"],
      interview: ["offer", "rejected", "archived"],
      offer: ["rejected", "archived"],
      rejected: ["archived"],
      archived: [], // Can't transition from archived
    };
    return allowed[current]?.includes(next) ?? false;
  }
}

// Usage:
const active = Application.isActive(app);
const days = Application.daysSinceApplied(app);
```

---

**Related**: [Feature Scaffold skill](../skills/feature-scaffold/) for full feature setup
