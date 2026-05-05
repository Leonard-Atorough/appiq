import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";

/**
 * Only liveQuery needs to be mocked — the repo is injected directly as a
 * parameter, so no @/shared/storage mocking is needed.
 */
vi.mock("dexie", async (importOriginal) => {
  const actual = await importOriginal<typeof import("dexie")>();
  return { ...actual, liveQuery: vi.fn() };
});

import { useApplicationEvents } from "./useApplicationEvents";
import { liveQuery } from "dexie";
import type { ApplicationEvent } from "@/entities";
import type { ApplicationEventRepository } from "@/shared/storage";

function makeMockRepo(events: ApplicationEvent[] = []): ApplicationEventRepository {
  return {
    getByApplicationId: vi.fn().mockResolvedValue(events),
    createEvent: vi.fn().mockResolvedValue(undefined),
    updateEvent: vi.fn().mockResolvedValue(undefined),
    deleteEvent: vi.fn().mockResolvedValue(undefined),
    deleteByApplicationId: vi.fn().mockResolvedValue(undefined),
  };
}

function setupLiveQuery(events: ApplicationEvent[]) {
  (liveQuery as ReturnType<typeof vi.fn>).mockReturnValue({
    subscribe: ({ next }: { next: (data: ApplicationEvent[]) => void }) => {
      next(events);
      return { unsubscribe: vi.fn() };
    },
  });
}

describe("useApplicationEvents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should subscribe to application events and update state on new data", async () => {
    const mockEvents: ApplicationEvent[] = [
      {
        id: "1",
        applicationId: "app1",
        type: "status_change",
        title: "Status changed",
        description: "",
        date: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
      },
    ];
    const repo = makeMockRepo(mockEvents);
    setupLiveQuery(mockEvents);

    const { result } = renderHook(() => useApplicationEvents("app1", repo));

    await waitFor(() => {
      expect(result.current.events).toEqual(mockEvents);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
    expect(liveQuery).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should pass applicationId to the repository query", async () => {
    const repo = makeMockRepo([]);
    (liveQuery as ReturnType<typeof vi.fn>).mockImplementation(
      (fn: () => Promise<ApplicationEvent[]>) => ({
        subscribe: ({ next }: { next: (data: ApplicationEvent[]) => void }) => {
          fn().then(next);
          return { unsubscribe: vi.fn() };
        },
      }),
    );

    renderHook(() => useApplicationEvents("app1", repo));

    await waitFor(() => {
      expect(repo.getByApplicationId).toHaveBeenCalledWith("app1");
    });
  });

  it("should handle errors from liveQuery", async () => {
    const mockError = new Error("Live query failed");
    const repo = makeMockRepo([]);
    (liveQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      subscribe: ({ error }: { error: (err: unknown) => void }) => {
        error(mockError);
        return { unsubscribe: vi.fn() };
      },
    });

    const { result } = renderHook(() => useApplicationEvents("app1", repo));

    await waitFor(() => {
      expect(result.current.error).toBe(mockError);
      expect(result.current.loading).toBe(false);
    });
  });

  describe("addEvent", () => {
    it("should call createEvent on the repository", async () => {
      const repo = makeMockRepo([]);
      setupLiveQuery([]);

      const { result } = renderHook(() => useApplicationEvents("app1", repo));
      const newEvent: Omit<ApplicationEvent, "id" | "createdAt"> = {
        applicationId: "app1",
        type: "status_change",
        title: "Status changed",
        description: "",
        date: "2024-01-03T00:00:00Z",
      };

      await act(async () => {
        await result.current.addEvent(newEvent);
      });

      expect(repo.createEvent).toHaveBeenCalledWith(newEvent);
    });
  });

  describe("updateEvent", () => {
    it("should call updateEvent on the repository", async () => {
      const repo = makeMockRepo([]);
      setupLiveQuery([]);

      const { result } = renderHook(() => useApplicationEvents("app1", repo));

      await act(async () => {
        await result.current.updateEvent("event1", { title: "Updated title" });
      });

      expect(repo.updateEvent).toHaveBeenCalledWith("event1", { title: "Updated title" });
    });
  });

  describe("deleteEvent", () => {
    it("should call deleteEvent on the repository", async () => {
      const repo = makeMockRepo([]);
      setupLiveQuery([]);

      const { result } = renderHook(() => useApplicationEvents("app1", repo));

      await act(async () => {
        await result.current.deleteEvent("event1");
      });

      expect(repo.deleteEvent).toHaveBeenCalledWith("event1");
    });
  });

  it("should sort events by createdAt in descending order", async () => {
    const mockEvents: ApplicationEvent[] = [
      {
        id: "1",
        applicationId: "app1",
        type: "status_change",
        title: "First event",
        description: "",
        date: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T10:00:00Z",
      },
      {
        id: "2",
        applicationId: "app1",
        type: "interview",
        title: "Second event",
        description: "",
        date: "2024-01-02T00:00:00Z",
        createdAt: "2024-01-02T10:00:00Z",
      },
      {
        id: "3",
        applicationId: "app1",
        type: "note",
        title: "Third event",
        description: "",
        date: "2024-01-03T00:00:00Z",
        createdAt: "2024-01-03T10:00:00Z",
      },
    ];
    const repo = makeMockRepo(mockEvents);
    setupLiveQuery([mockEvents[0], mockEvents[2], mockEvents[1]]);

    const { result } = renderHook(() => useApplicationEvents("app1", repo));

    await waitFor(() => {
      expect(result.current.events).toHaveLength(3);
      expect(result.current.events[0].id).toBe("3");
      expect(result.current.events[1].id).toBe("2");
      expect(result.current.events[2].id).toBe("1");
    });
  });

  it("should re-subscribe when applicationId changes", async () => {
    let callCount = 0;
    (liveQuery as ReturnType<typeof vi.fn>).mockImplementation(() => {
      callCount++;
      const appId = callCount === 1 ? "app1" : "app2";
      return {
        subscribe: ({ next }: { next: (data: ApplicationEvent[]) => void }) => {
          next([
            {
              id: String(callCount),
              applicationId: appId,
              type: "note",
              title: "Event",
              description: "",
              date: "2024-01-01T00:00:00Z",
              createdAt: "2024-01-01T00:00:00Z",
            },
          ]);
          return { unsubscribe: vi.fn() };
        },
      };
    });

    const repo = makeMockRepo([]);
    const { result, rerender } = renderHook(
      ({ appId }: { appId: string }) => useApplicationEvents(appId, repo),
      { initialProps: { appId: "app1" } },
    );

    await waitFor(() => {
      expect(result.current.events[0].applicationId).toBe("app1");
    });

    rerender({ appId: "app2" });

    await waitFor(() => {
      expect(result.current.events[0].applicationId).toBe("app2");
    });
    expect(liveQuery).toHaveBeenCalledTimes(2);
  });

  it("should unsubscribe on cleanup", async () => {
    const unsubscribeMock = vi.fn();
    const repo = makeMockRepo([]);
    (liveQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      subscribe: ({ next }: { next: (data: ApplicationEvent[]) => void }) => {
        next([]);
        return { unsubscribe: unsubscribeMock };
      },
    });

    const { unmount } = renderHook(() => useApplicationEvents("app1", repo));
    unmount();

    expect(unsubscribeMock).toHaveBeenCalled();
  });

  it("should start loading and clear error after receiving data", async () => {
    const repo = makeMockRepo([]);
    setupLiveQuery([]);

    const { result } = renderHook(() => useApplicationEvents("app1", repo));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });
});
