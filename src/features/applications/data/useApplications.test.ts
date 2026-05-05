import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useApplications } from "./useApplications";
import * as mappers from "@/entities/application";
import { liveQuery } from "dexie";
import type { ApplicationStatus } from "@/entities";

/**
 * PARTIAL MOCK: dexie module
 * We use importOriginal to preserve non-mocked exports (like Table, Db classes)
 * while only mocking liveQuery for testing. This prevents errors from trying to
 * instantiate real Dexie objects in tests.
 */
vi.mock("dexie", async (importOriginal) => {
  const actual = await importOriginal<typeof import("dexie")>();
  return {
    ...actual,
    liveQuery: vi.fn(),
  };
});

/**
 * MOCK: Dexie client instance
 * Prevents real IndexedDB access during tests
 */
vi.mock("@/shared/storage/indexeddb/dexieClient");

/**
 * PARTIAL MOCK: Shared library (mappers)
 * We preserve the real implementations of most exports but mock
 * mapRowToJobApplication so we can control the transformation behavior
 * in individual tests. This allows testing the hook's integration with mappers.
 */
vi.mock("@entities/application", async () => {
  const actual = await vi.importActual("@entities/application");
  return {
    ...actual,
    mapRowToJobApplication: vi.fn(),
  };
});

function createMockRows(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    position: `Position ${i + 1}`,
    company: `Company ${i + 1}`,
    status: "applied" as ApplicationStatus,
    dateApplied: new Date().toISOString(),
  }));
}

function createMockTransformedApps(
  rows: {
    id: string;
    position: string;
    company: string;
    status: ApplicationStatus;
    dateApplied: string;
  }[],
) {
  return rows.map((row) => ({
    id: row.id,
    position: row.position,
    company: row.company,
    status: row.status,
    dateApplied: row.dateApplied,
  }));
}

/**
 * Setup the mapper mock to transform rows to applications
 * @param transformedApps - The expected transformed applications
 */
function setupMapperMock(transformedApps: ReturnType<typeof createMockTransformedApps>) {
  vi.mocked(mappers.mapRowToJobApplication).mockImplementation((row) => {
    const transformed = transformedApps.find((app) => app.id === row.id);
    return (
      transformed || {
        id: row.id,
        position: "",
        company: "",
        status: "applied" as ApplicationStatus,
        dateApplied: new Date().toISOString(),
      }
    );
  });
}

describe("useApplications", () => {
  let mockUnsubscribe: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    vi.clearAllMocks();
    mockUnsubscribe = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Returns empty applications on initial load", async () => {
    // SETUP: Mock liveQuery with async empty array emission
    const mockSubscribe = vi.fn(
      (observer: { next: (data: unknown) => void; error: (err: unknown) => void }) => {
        setTimeout(() => {
          observer.next([]);
        }, 0);
        return { unsubscribe: mockUnsubscribe };
      },
    );

    const mockLiveQueryResult = { subscribe: mockSubscribe };
    vi.mocked(liveQuery).mockReturnValue(mockLiveQueryResult as never);

    // VERIFY: Hook state transitions from loading=true to loading=false
    const { result } = renderHook(() => useApplications());
    expect(result.current.applications).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.applications).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("Transforms database rows via mapRowToJobApplication", async () => {
    // SETUP: Mock rows and their transformed output
    const mockRows = createMockRows(2);
    const mockSubscribe = vi.fn(
      (observer: { next: (data: unknown) => void; error: (err: unknown) => void }) => {
        setTimeout(() => {
          observer.next(mockRows);
        }, 0);
        return { unsubscribe: mockUnsubscribe };
      },
    );

    vi.mocked(liveQuery).mockReturnValue({ subscribe: mockSubscribe } as never);
    const mockTransformedApps = createMockTransformedApps(mockRows);
    setupMapperMock(mockTransformedApps);

    // VERIFY: Mapper called for each row and applications list is transformed
    const { result } = renderHook(() => useApplications());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mappers.mapRowToJobApplication).toHaveBeenCalledTimes(2);
    expect(result.current.applications).toEqual(mockTransformedApps);
  });

  it("Manages loading state correctly", async () => {
    // SETUP: Delayed emission to observe loading state transition
    const mockRows = createMockRows(3);
    const mockSubscribe = vi.fn(
      (observer: { next: (data: unknown) => void; error: (err: unknown) => void }) => {
        setTimeout(() => {
          observer.next(mockRows);
        }, 100);
        return { unsubscribe: mockUnsubscribe };
      },
    );

    vi.mocked(liveQuery).mockReturnValue({ subscribe: mockSubscribe } as never);
    const mockTransformedApps = createMockTransformedApps(mockRows);
    setupMapperMock(mockTransformedApps);

    // VERIFY: loading starts true and becomes false after data loads
    const { result } = renderHook(() => useApplications());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.applications).toEqual(mockTransformedApps);
  });

  it("Captures and exposes database errors", async () => {
    // SETUP: Mock error emission via observer.error callback
    const mockError = new Error("Database error");
    const mockSubscribe = vi.fn(
      (observer: { next: (data: unknown) => void; error: (err: unknown) => void }) => {
        setTimeout(() => {
          observer.error(mockError);
        }, 0);
        return { unsubscribe: mockUnsubscribe };
      },
    );

    vi.mocked(liveQuery).mockReturnValue({ subscribe: mockSubscribe } as never);

    // VERIFY: Hook captures error, sets loading=false, keeps applications empty
    const { result } = renderHook(() => useApplications());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.applications).toEqual([]);
  });

  it("Reactively updates when database changes", async () => {
    // SETUP: Create initial and updated data sets
    const initialRows = createMockRows(2);
    const updatedRows = [
      ...initialRows,
      {
        id: "3",
        position: "Position 3",
        company: "Company 3",
        status: "applied" as ApplicationStatus,
        dateApplied: new Date().toISOString(),
      },
    ];

    const mockTransformedInitialApps = createMockTransformedApps(initialRows);
    const mockTransformedUpdatedApps = createMockTransformedApps(updatedRows);
    setupMapperMock(mockTransformedUpdatedApps);

    // SETUP: Mock liveQuery to emit data twice (simulating reactive updates)
    const mockSubscribe = vi.fn(
      (observer: { next: (data: unknown) => void; error: (err: unknown) => void }) => {
        setTimeout(() => {
          observer.next(initialRows);
        }, 0);
        setTimeout(() => {
          observer.next(updatedRows);
        }, 100);
        return { unsubscribe: mockUnsubscribe };
      },
    );

    vi.mocked(liveQuery).mockReturnValue({ subscribe: mockSubscribe } as never);

    // VERIFY: First emission - initial state
    const { result } = renderHook(() => useApplications());
    await waitFor(() => {
      expect(result.current.applications.length).toBe(2);
    });
    expect(result.current.applications).toEqual(mockTransformedInitialApps);

    // VERIFY: Second emission - updated state with new item
    await waitFor(() => {
      expect(result.current.applications.length).toBe(3);
    });

    expect(result.current.applications).toEqual(mockTransformedUpdatedApps);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("Unsubscribes from liveQuery on unmount", async () => {
    // SETUP: Mock subscription that emits data
    const mockSubscribe = vi.fn(
      (observer: { next: (data: unknown) => void; error: (err: unknown) => void }) => {
        setTimeout(() => {
          observer.next(createMockRows(1));
        }, 0);
        return { unsubscribe: mockUnsubscribe };
      },
    );

    vi.mocked(liveQuery).mockReturnValue({ subscribe: mockSubscribe } as never);

    // VERIFY: Cleanup - unsubscribe called exactly once on unmount
    const { unmount } = renderHook(() => useApplications());
    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    expect(mockSubscribe).toHaveBeenCalledTimes(1);
  });

  it("Handles error from non-Error object", async () => {
    // SETUP: Mock error emission with a string (not an Error instance)
    const mockSubscribe = vi.fn(
      (observer: { next: (data: unknown) => void; error: (err: unknown) => void }) => {
        setTimeout(() => {
          observer.error("String error");
        }, 0);
        return { unsubscribe: mockUnsubscribe };
      },
    );

    vi.mocked(liveQuery).mockReturnValue({ subscribe: mockSubscribe } as never);

    // VERIFY: Hook wraps non-Error objects as Error("Failed to load applications")
    const { result } = renderHook(() => useApplications());
    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });

    expect(result.current.error?.message).toBe("Failed to load applications");
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("Clears error on successful recovery", async () => {
    // SETUP: Mock error then successful recovery with valid data
    const mockError = new Error("Initial database error");
    const mockRows = createMockRows(2);
    const mockTransformedApps = createMockTransformedApps(mockRows);

    const mockSubscribe = vi.fn(
      (observer: { next: (data: unknown) => void; error: (err: unknown) => void }) => {
        setTimeout(() => {
          observer.error(mockError);
        }, 0);
        setTimeout(() => {
          observer.next(mockRows);
        }, 100);
        return { unsubscribe: mockUnsubscribe };
      },
    );

    setupMapperMock(mockTransformedApps);
    vi.mocked(liveQuery).mockReturnValue({ subscribe: mockSubscribe } as never);

    // VERIFY: Error is captured initially
    const { result } = renderHook(() => useApplications());
    await waitFor(() => {
      expect(result.current.error).toBe(mockError);
    });

    // VERIFY: Error cleared and data loaded after recovery
    await waitFor(() => {
      expect(result.current.applications.length).toBe(2);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.applications).toEqual(mockTransformedApps);
  });
});
