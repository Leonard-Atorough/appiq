import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("@/shared/storage", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/shared/storage")>();
  return {
    ...actual,
    db: { transaction: vi.fn(), applications: {}, applicationEvents: {} },
  };
});

vi.mock("@/shared/lib", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/shared/lib")>();
  return { ...actual, useToast: vi.fn() };
});

import { useApplicationActions } from "./useApplicationActions";
import { db } from "@/shared/storage";
import { useToast } from "@/shared/lib";
import type { JobApplicationRepository } from "@/shared/storage";
import type { ApplicationEventRepository } from "@/shared/storage";
import type { JobApplication } from "@/entities";

function makeMockJobRepo(): JobApplicationRepository {
  return {
    listApplications: vi.fn().mockResolvedValue([]),
    getApplicationById: vi.fn().mockResolvedValue(null),
    createApplication: vi.fn().mockResolvedValue(undefined),
    updateApplication: vi.fn().mockResolvedValue(null),
    deleteApplication: vi.fn().mockResolvedValue(undefined),
  };
}

function makeMockEventRepo(): ApplicationEventRepository {
  return {
    getByApplicationId: vi.fn().mockResolvedValue([]),
    createEvent: vi.fn().mockResolvedValue(undefined),
    updateEvent: vi.fn().mockResolvedValue(null),
    deleteEvent: vi.fn().mockResolvedValue(undefined),
    deleteByApplicationId: vi.fn().mockResolvedValue(undefined),
  };
}

describe("useApplicationActions", () => {
  let mockRepo: ReturnType<typeof makeMockJobRepo>;
  let mockEventRepo: ReturnType<typeof makeMockEventRepo>;
  let mockAddToast: ReturnType<typeof vi.fn>;
  const dbTransactionMock = db.transaction as ReturnType<typeof vi.fn>;
  const useToastMock = useToast as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepo = makeMockJobRepo();
    mockEventRepo = makeMockEventRepo();
    mockAddToast = vi.fn();
    useToastMock.mockReturnValue({ addToast: mockAddToast });
    dbTransactionMock.mockImplementation((_mode: string, ..._args: unknown[]) => {
      const callback = _args[_args.length - 1] as () => Promise<void>;
      return callback();
    });
  });

  describe("create", () => {
    it("should create application", async () => {
      const { result } = renderHook(() => useApplicationActions({}, mockRepo, mockEventRepo));
      const app: Omit<JobApplication, "id"> = {
        company: "Acme",
        position: "Engineer",
        status: "applied",
        dateApplied: "2026-05-01T10:00:00Z",
      };

      await act(async () => {
        await result.current.createAsync.execute(app);
      });

      expect(mockRepo.createApplication).toHaveBeenCalledWith(app);
    });

    it("should show success toast when enabled", async () => {
      const { result } = renderHook(() =>
        useApplicationActions({ withSuccess: true }, mockRepo, mockEventRepo),
      );

      await act(async () => {
        await result.current.createAsync.execute({
          company: "Acme",
          position: "Engineer",
          status: "applied",
          dateApplied: "2026-05-01T10:00:00Z",
        });
      });

      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Application created", variant: "success" }),
      );
    });

    it("should show error toast when enabled and fails", async () => {
      const { result } = renderHook(() =>
        useApplicationActions({ withError: true }, mockRepo, mockEventRepo),
      );
      vi.mocked(mockRepo.createApplication).mockRejectedValueOnce(new Error("DB error"));

      await act(async () => {
        await result.current.createAsync
          .execute({
            company: "Acme",
            position: "Engineer",
            status: "applied",
            dateApplied: "2026-05-01T10:00:00Z",
          })
          .catch(() => {});
      });

      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Error creating application", variant: "error" }),
      );
    });
  });

  describe("update", () => {
    it("should update application", async () => {
      const { result } = renderHook(() => useApplicationActions({}, mockRepo, mockEventRepo));

      await act(async () => {
        await result.current.updateAsync.execute("app-1", { status: "interviewing" });
      });

      expect(mockRepo.updateApplication).toHaveBeenCalledWith("app-1", { status: "interviewing" });
    });

    it("should show success toast when enabled", async () => {
      const { result } = renderHook(() =>
        useApplicationActions({ withSuccess: true }, mockRepo, mockEventRepo),
      );

      await act(async () => {
        await result.current.updateAsync.execute("app-1", { status: "offer" });
      });

      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Application updated", variant: "success" }),
      );
    });
  });

  describe("delete", () => {
    it("should delete application and events in transaction", async () => {
      const { result } = renderHook(() => useApplicationActions({}, mockRepo, mockEventRepo));

      await act(async () => {
        await result.current.deleteAsync.execute("app-1");
      });

      expect(dbTransactionMock).toHaveBeenCalled();
      expect(mockRepo.deleteApplication).toHaveBeenCalledWith("app-1");
      expect(mockEventRepo.deleteByApplicationId).toHaveBeenCalledWith("app-1");
    });

    it("should show success toast when enabled", async () => {
      const { result } = renderHook(() =>
        useApplicationActions({ withSuccess: true }, mockRepo, mockEventRepo),
      );

      await act(async () => {
        await result.current.deleteAsync.execute("app-1");
      });

      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Application deleted", variant: "success" }),
      );
    });
  });

  describe("move", () => {
    it("should update status and create event", async () => {
      const { result } = renderHook(() => useApplicationActions({}, mockRepo, mockEventRepo));
      vi.mocked(mockRepo.getApplicationById).mockResolvedValueOnce({
        id: "app-1",
        company: "Acme",
        position: "Engineer",
        status: "applied",
        dateApplied: "2026-05-01T10:00:00Z",
      });

      await act(async () => {
        await result.current.moveAsync.execute("app-1", "interviewing");
      });

      expect(mockRepo.updateApplication).toHaveBeenCalledWith("app-1", { status: "interviewing" });
      expect(mockEventRepo.createEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          applicationId: "app-1",
          type: "status_change",
          fromStatus: "applied",
          toStatus: "interviewing",
        }),
      );
    });

    it("should show success toast when enabled", async () => {
      const { result } = renderHook(() =>
        useApplicationActions({ withSuccess: true }, mockRepo, mockEventRepo),
      );
      vi.mocked(mockRepo.getApplicationById).mockResolvedValueOnce({
        id: "app-1",
        company: "Acme",
        position: "Engineer",
        status: "applied",
        dateApplied: "2026-05-01T10:00:00Z",
      });

      await act(async () => {
        await result.current.moveAsync.execute("app-1", "offer");
      });

      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Application moved", variant: "success" }),
      );
    });
  });

  describe("error handling", () => {
    it("should not expose sensitive error details in toast", async () => {
      const { result } = renderHook(() =>
        useApplicationActions({ withError: true }, mockRepo, mockEventRepo),
      );
      vi.mocked(mockRepo.createApplication).mockRejectedValueOnce(
        new Error("database lost at 192.168.1.1"),
      );

      await act(async () => {
        await result.current.createAsync
          .execute({
            company: "Acme",
            position: "Engineer",
            status: "applied",
            dateApplied: "2026-05-01T10:00:00Z",
          })
          .catch(() => {});
      });

      const description = mockAddToast.mock.calls[0][0].description;
      expect(description).not.toContain("192.168.1.1");
      expect(description).toMatch(/Failed to create application/i);
    });
  });
});
