import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSankeyData } from "./useSankeyData";
import type { ApplicationEvent } from "@/entities";

const mockDb = {
  applicationEvents: {
    toArray: vi.fn(),
  },
};

// Mock the Dexie module
vi.mock("@/shared/storage/indexeddb/dexieClient", () => ({
  db: mockDb,
}));

// Mock the mappers
vi.mock("@/shared/lib", async () => {
  const actual = await vi.importActual("@/shared/lib");
  return {
    ...actual,
    mapRowToApplicationEvent: vi.fn((row) => row),
  };
});

// Mock Dexie liveQuery
vi.mock("dexie", () => ({
  liveQuery: (fn: () => unknown) => ({
    subscribe: (handlers: { next: (value: unknown) => void; error: (err: unknown) => void }) => {
      // Simulate subscription
      const result = fn();
      if (result instanceof Promise) {
        result.then(handlers.next).catch(handlers.error);
      } else {
        handlers.next(result);
      }
      return { unsubscribe: vi.fn() };
    },
  }),
}));

describe("useSankeyData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock: empty array
    mockDb.applicationEvents.toArray.mockResolvedValue([]);
  });

  it("initializes with loading state", async () => {
    const { result } = renderHook(() => useSankeyData());
    // Initially loading is true
    expect(result.current.loading).toBe(true);

    // Wait for the subscription to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("returns empty links and all nodes when no events", async () => {
    mockDb.applicationEvents.toArray.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useSankeyData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data.nodes).toHaveLength(5); // All 5 pipeline statuses
    expect(result.current.data.links).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("builds sankey data from events", async () => {
    const mockEvents: ApplicationEvent[] = [
      {
        id: "evt-1",
        applicationId: "app-1",
        type: "status_change",
        title: "Status changed",
        date: "2024-01-01T12:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        fromStatus: "saved",
        toStatus: "applied",
      },
      {
        id: "evt-2",
        applicationId: "app-1",
        type: "status_change",
        title: "Status changed",
        date: "2024-01-02T12:00:00Z",
        createdAt: "2024-01-02T00:00:00Z",
        fromStatus: "applied",
        toStatus: "interviewing",
      },
    ];
    mockDb.applicationEvents.toArray.mockResolvedValueOnce(mockEvents as unknown);

    const { result } = renderHook(() => useSankeyData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data.links).toHaveLength(2);
    expect(result.current.data.links[0]).toEqual({
      source: "saved",
      target: "applied",
      value: 1,
    });
    expect(result.current.data.links[1]).toEqual({
      source: "applied",
      target: "interviewing",
      value: 1,
    });
  });

  it("handles errors from database", async () => {
    const testError = new Error("Database error");
    mockDb.applicationEvents.toArray.mockRejectedValueOnce(testError);

    const { result } = renderHook(() => useSankeyData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(testError);
    expect(result.current.data.links).toEqual([]);
  });

  it("handles non-Error exceptions", async () => {
    mockDb.applicationEvents.toArray.mockRejectedValueOnce("String error");

    const { result } = renderHook(() => useSankeyData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Failed to load application events");
  });
});
