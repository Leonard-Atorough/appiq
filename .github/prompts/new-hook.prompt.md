---
description: "Generate a data or model hook with TypeScript types, error handling, and test scaffold."
argument-hint: "Hook name and type (e.g., useApplications data, useApplicationsModel model)"
---

# New Hook Generator

Generate a custom hook for data fetching, state management, or utility logic.

## What You Provide

- **Hook name** (camelCase): e.g., `useApplications`, `useApplicationsModel`
- **Hook type**:
  - `data`: Fetches from API/storage
  - `model`: Manages feature-level state, filtering, commands
  - `util`: Pure helper logic
- **Feature path**: Where it goes (e.g., `features/applications/data/`)
- **Dependencies**: Other hooks, services, or queries it needs

## What You Get

1. **Hook file** (`.ts`) with:
   - Strict TypeScript types & interfaces
   - JSDoc with @param and @returns documentation
   - Error handling (try/catch, error states)
   - React dependency array best practices
   - Clear return shape

2. **Test file** (`.test.ts`) with:
   - `renderHook` test setup
   - Mock external dependencies
   - Example test cases for success/error scenarios

## Example: Data Hook

**Input:**

```
Hook: useApplications
Type: data
Path: features/applications/data/
Fetches: All applications from Dexie storage
```

**Output:**

### useApplications.ts

```typescript
import { useEffect, useState, useCallback } from "react";
import { Application } from "@/entities/application/model/types";
import { ApplicationRepository } from "@/shared/storage/repositories/ApplicationRepository";

interface UseApplicationsResult {
  applications: Application[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches all applications from local storage.
 * Handles loading state and errors gracefully.
 *
 * @returns {UseApplicationsResult} Applications, loading state, error, and refetch function
 *
 * @example
 * const { applications, loading, error } = useApplications();
 * if (loading) return <div>Loading...</div>;
 * return <div>{applications.length} applications</div>;
 */
export function useApplications(): UseApplicationsResult {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const repo = new ApplicationRepository();

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await repo.getAll();
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch applications"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { applications, loading, error, refetch };
}
```

### useApplications.test.ts

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { useApplications } from "../useApplications";
import { ApplicationRepository } from "@/shared/storage/repositories/ApplicationRepository";

vi.mock("@/shared/storage/repositories/ApplicationRepository");

describe("useApplications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches applications on mount", async () => {
    const mockApps = [{ id: "1", title: "App 1", company: "Acme", status: "applied" as const }];

    vi.mocked(ApplicationRepository).prototype.getAll.mockResolvedValue(mockApps);

    const { result } = renderHook(() => useApplications());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.applications).toEqual(mockApps);
  });

  it("handles errors from repository", async () => {
    const error = new Error("Database error");
    vi.mocked(ApplicationRepository).prototype.getAll.mockRejectedValue(error);

    const { result } = renderHook(() => useApplications());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toContain("Database");
  });

  it("provides refetch function", async () => {
    const mockApps = [{ id: "1", title: "App 1", company: "Acme", status: "applied" as const }];
    vi.mocked(ApplicationRepository).prototype.getAll.mockResolvedValue(mockApps);

    const { result } = renderHook(() => useApplications());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.applications).toEqual(mockApps);

    // Call refetch
    await result.current.refetch();

    expect(result.current.applications).toEqual(mockApps);
  });
});
```

## Example: Model Hook

**Input:**

```
Hook: useApplicationsModel
Type: model
Path: features/applications/model/
State: Filter, sorting, archive command
Uses: useApplications data hook
```

**Output:**

### useApplicationsModel.ts

```typescript
import { useMemo, useState, useCallback } from "react";
import { Application } from "@/entities/application/model/types";
import { useApplications } from "../data/useApplications";

export interface ApplicationFilter {
  status?: Application["status"];
  search?: string;
  sortBy?: "date" | "company";
}

interface UseApplicationsModelResult {
  applications: Application[];
  filter: ApplicationFilter;
  setFilter: (filter: ApplicationFilter) => void;
  loading: boolean;
  archive: (appId: string) => Promise<void>;
  canArchive: (app: Application) => boolean;
}

/**
 * Feature-level state hook for applications.
 * Manages filtering, sorting, and commands.
 *
 * @returns {UseApplicationsModelResult} Filtered applications, filter state, and commands
 *
 * @example
 * const { applications, filter, setFilter, archive } = useApplicationsModel();
 */
export function useApplicationsModel(): UseApplicationsModelResult {
  const { applications, loading } = useApplications();
  const [filter, setFilter] = useState<ApplicationFilter>({});

  const filtered = useMemo(() => {
    let result = applications;

    if (filter.status) {
      result = result.filter((app) => app.status === filter.status);
    }

    if (filter.search) {
      const query = filter.search.toLowerCase();
      result = result.filter(
        (app) =>
          app.title.toLowerCase().includes(query) || app.company.toLowerCase().includes(query),
      );
    }

    if (filter.sortBy === "date") {
      result.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
    } else if (filter.sortBy === "company") {
      result.sort((a, b) => a.company.localeCompare(b.company));
    }

    return result;
  }, [applications, filter]);

  const archive = useCallback(async (appId: string) => {
    // TODO: Update repository to set status = 'archived'
  }, []);

  const canArchive = useCallback((app: Application) => {
    return app.status !== "archived";
  }, []);

  return {
    applications: filtered,
    filter,
    setFilter,
    loading,
    archive,
    canArchive,
  };
}
```

### useApplicationsModel.test.ts

```typescript
import { renderHook, act } from "@testing-library/react";
import { useApplicationsModel } from "../useApplicationsModel";
import { useApplications } from "../../data/useApplications";

vi.mock("../../data/useApplications");

describe("useApplicationsModel", () => {
  const mockApps = [
    { id: "1", title: "Frontend Dev", company: "Acme", status: "interview" as const },
    { id: "2", title: "Backend Dev", company: "Zenith", status: "applied" as const },
  ];

  beforeEach(() => {
    vi.mocked(useApplications).mockReturnValue({
      applications: mockApps,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it("returns all applications initially", () => {
    const { result } = renderHook(() => useApplicationsModel());
    expect(result.current.applications).toEqual(mockApps);
  });

  it("filters by status", () => {
    const { result } = renderHook(() => useApplicationsModel());

    act(() => {
      result.current.setFilter({ status: "interview" });
    });

    expect(result.current.applications).toHaveLength(1);
    expect(result.current.applications[0].status).toBe("interview");
  });

  it("filters by search term", () => {
    const { result } = renderHook(() => useApplicationsModel());

    act(() => {
      result.current.setFilter({ search: "Frontend" });
    });

    expect(result.current.applications).toHaveLength(1);
    expect(result.current.applications[0].title).toContain("Frontend");
  });
});
```

## Features

✅ Strict TypeScript with explicit return types
✅ JSDoc documentation with @param, @returns, @example
✅ Error handling with try/catch
✅ Clean dependency arrays
✅ Callback stability (useCallback for functions)
✅ Test setup with mocks
✅ Example test cases

## Next Steps

1. Save both files to your feature folder
2. Implement actual logic (database calls, state updates)
3. Run tests: `npm test`
4. Export from feature `index.ts`
5. Use in components via feature hooks

---

**Related**: [Feature Scaffold skill](../skills/feature-scaffold/) for full feature setup
