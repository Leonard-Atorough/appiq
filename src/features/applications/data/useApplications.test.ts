import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("dexie", async (importOriginal) => {
  const actual = await importOriginal<typeof import("dexie")>();
  return { ...actual, liveQuery: vi.fn() };
});

import { useApplications } from "./useApplications";
import { liveQuery } from "dexie";
import type { ApplicationStatus, JobApplication } from "@/entities";
import type { JobApplicationRepository } from "@/shared/storage";

function makeMockRepo(applications: JobApplication[] = []): JobApplicationRepository {
  return {
    listApplications: vi.fn().mockResolvedValue(applications),
    getApplicationById: vi.fn().mockResolvedValue(null),
    createApplication: vi.fn().mockResolvedValue(undefined),
    updateApplication: vi.fn().mockResolvedValue(null),
    deleteApplication: vi.fn().mockResolvedValue(undefined),
  };
}

function setupLiveQuery(applications: JobApplication[], unsubscribe = vi.fn()) {
  (liveQuery as ReturnType<typeof vi.fn>).mockReturnValue({
    subscribe: ({ next }: { next: (data: JobApplication[]) => void }) => {
      next(applications);
      return { unsubscribe };
    },
  });
}

describe("useApplications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty applications on initial load", async () => {
    const repo = makeMockRepo([]);
    setupLiveQuery([]);

    const { result } = renderHook(() => useApplications(repo));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.applications).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("returns applications from the repository", async () => {
    const apps: JobApplication[] = [
      {
        id: "1",
        company: "Acme",
        position: "Engineer",
        status: "applied" satisfies ApplicationStatus,
        dateApplied: "2026-01-01T00:00:00Z",
      },
      {
        id: "2",
        company: "Globex",
        position: "Developer",
        status: "interviewing" satisfies ApplicationStatus,
        dateApplied: "2026-01-02T00:00:00Z",
      },
    ];
    const repo = makeMockRepo(apps);
    setupLiveQuery(apps);

    const { result } = renderHook(() => useApplications(repo));

    await waitFor(() => expect(result.current.applications).toEqual(apps));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("starts with loading=true before first emission", () => {
    const repo = makeMockRepo([]);
    (liveQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      subscribe: () => ({ unsubscribe: vi.fn() }),
    });

    const { result } = renderHook(() => useApplications(repo));

    expect(result.current.loading).toBe(true);
    expect(result.current.applications).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("sets error and clears loading on liveQuery error", async () => {
    const repo = makeMockRepo([]);
    const mockError = new Error("Database error");
    (liveQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      subscribe: ({ error }: { error: (err: unknown) => void }) => {
        error(mockError);
        return { unsubscribe: vi.fn() };
      },
    });

    const { result } = renderHook(() => useApplications(repo));

    await waitFor(() => expect(result.current.error).toBe(mockError));
    expect(result.current.loading).toBe(false);
    expect(result.current.applications).toEqual([]);
  });

  it("wraps non-Error objects in a generic Error", async () => {
    const repo = makeMockRepo([]);
    (liveQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      subscribe: ({ error }: { error: (err: unknown) => void }) => {
        error("String error");
        return { unsubscribe: vi.fn() };
      },
    });

    const { result } = renderHook(() => useApplications(repo));

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error));
    expect(result.current.error?.message).toBe("Failed to load applications");
  });

  it("reactively updates when liveQuery emits new data", async () => {
    const initial: JobApplication[] = [
      {
        id: "1",
        company: "Acme",
        position: "Engineer",
        status: "applied" satisfies ApplicationStatus,
        dateApplied: "2026-01-01T00:00:00Z",
      },
    ];
    const updated: JobApplication[] = [
      ...initial,
      {
        id: "2",
        company: "Globex",
        position: "Developer",
        status: "interviewing" satisfies ApplicationStatus,
        dateApplied: "2026-01-02T00:00:00Z",
      },
    ];
    const repo = makeMockRepo();

    let emitNext: ((data: JobApplication[]) => void) | undefined;
    (liveQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      subscribe: ({ next }: { next: (data: JobApplication[]) => void }) => {
        emitNext = next;
        setTimeout(() => next(initial), 0);
        return { unsubscribe: vi.fn() };
      },
    });

    const { result } = renderHook(() => useApplications(repo));

    await waitFor(() => expect(result.current.applications).toHaveLength(1));

    emitNext!(updated);

    await waitFor(() => expect(result.current.applications).toHaveLength(2));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("unsubscribes on unmount", () => {
    const unsubscribe = vi.fn();
    const repo = makeMockRepo([]);
    setupLiveQuery([], unsubscribe);

    const { unmount } = renderHook(() => useApplications(repo));
    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
