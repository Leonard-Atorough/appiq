# Feature Template Details

## index.ts (Public API)

```typescript
export * from "./ui/ApplicationsPage";
export * from "./data/useApplications";
export * from "./model/useApplicationsModel";
export * from "./lib/applications.utils";
```

Export only what other features need. Keep implementation details internal.

## ui/{FeatureName}Page.tsx

Main container/page component that composes data hooks and presentational components.

```typescript
import React from 'react';
import { useApplicationsModel } from '../model/useApplicationsModel';
import { ApplicationsList } from './ApplicationsList';

export function ApplicationsPage() {
  const {
    applications,
    filter,
    setFilter,
    loading,
    archive,
  } = useApplicationsModel();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Applications</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <FilterBar filter={filter} onChange={setFilter} />
          <ApplicationsList
            applications={applications}
            onArchive={archive}
          />
        </>
      )}
    </div>
  );
}
```

## data/use{FeatureName}.ts

Handles data fetching, sync, and local storage queries.

```typescript
import React from "react";
import { Application } from "@/entities/application/model/types";

export function useApplications() {
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    // 1. Load from Dexie/localStorage
    // 2. Set up subscriptions if real-time
    // 3. Handle offline state
    setLoading(false);
  }, []);

  return { applications, loading, error };
}
```

## model/use{FeatureName}Model.ts

Stateful domain logic: filtering, sorting, commands (create, update, delete).

```typescript
import React from "react";
import { Application } from "@/entities/application/model/types";
import { useApplications } from "../data/useApplications";

export interface ApplicationsModel {
  applications: Application[];
  filter: ApplicationFilter;
  setFilter: (filter: ApplicationFilter) => void;
  canArchive: (app: Application) => boolean;
  archive: (appId: string) => Promise<void>;
}

export function useApplicationsModel(): ApplicationsModel {
  const { applications } = useApplications();
  const [filter, setFilter] = React.useState<ApplicationFilter>({});

  const filtered = React.useMemo(
    () => filterApplications(applications, filter),
    [applications, filter],
  );

  const archive = React.useCallback(async (appId: string) => {
    // Update Dexie, trigger sync
  }, []);

  return {
    applications: filtered,
    filter,
    setFilter,
    canArchive: (app) => !isArchived(app),
    archive,
  };
}
```

## lib/{featureName}.utils.ts

Small, testable helpers: formatters, validators, selectors.

```typescript
import { Application } from "@/entities/application/model/types";

export function isArchived(app: Application): boolean {
  return app.status === "archived";
}

export function filterApplications(apps: Application[], filter: ApplicationFilter): Application[] {
  return apps.filter((app) => {
    if (filter.status && app.status !== filter.status) return false;
    if (filter.search && !app.title.toLowerCase().includes(filter.search.toLowerCase()))
      return false;
    return true;
  });
}
```

## Test Files (**tests**)

Use vitest or Jest patterns:

```typescript
// ui/__tests__/ApplicationsPage.test.tsx
import { render, screen } from '@testing-library/react';
import { ApplicationsPage } from '../ApplicationsPage';

vi.mock('../../data/useApplications', () => ({
  useApplications: vi.fn(() => ({
    applications: [],
    loading: false,
  })),
}));

describe('ApplicationsPage', () => {
  it('renders the heading', () => {
    render(<ApplicationsPage />);
    expect(screen.getByText(/Applications/i)).toBeInTheDocument();
  });
});
```

```typescript
// model/__tests__/useApplicationsModel.test.ts
import { renderHook, act } from '@testing-library/react';
import { useApplicationsModel } from '../useApplicationsModel';

vi.mock('../../data/useApplications', () => ({
  useApplications: vi.fn((/* ... */)),
}));

describe('useApplicationsModel', () => {
  it('filters by status', () => {
    const { result } = renderHook(() => useApplicationsModel());

    act(() => {
      result.current.setFilter({ status: 'interview' });
    });

    expect(result.current.applications).toHaveLength(1);
  });
});
```

## Checklist

- [ ] Feature folder created at `src/features/{featureName}/`
- [ ] Subfolders created: `ui/`, `data/`, `model/`, `lib/`
- [ ] Entity types defined in `src/entities/{domain}/model/types.ts`
- [ ] `index.ts` exports public API
- [ ] All hooks and components have JSDoc comments
- [ ] Test files scaffold with proper mocks
- [ ] README added with feature description
