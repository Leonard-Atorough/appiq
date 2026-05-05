import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

/**
 * Type definitions for mocks
 */
interface MockJobApplicationRepository {
  deleteApplication: ReturnType<typeof vi.fn>;
  createApplication: ReturnType<typeof vi.fn>;
  updateApplication: ReturnType<typeof vi.fn>;
  getApplicationById: ReturnType<typeof vi.fn>;
}

interface MockApplicationEventRepository {
  deleteByApplicationId: ReturnType<typeof vi.fn>;
  createEvent: ReturnType<typeof vi.fn>;
}

/**
 * PARTIAL MOCK: Shared storage module
 * Preserve real implementations (repositories) but allow test setup via
 * constructor mocks to control behavior per test.
 */
vi.mock("@/shared/storage", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/shared/storage")>();
  return {
    ...actual,
    JobApplicationRepositoryImpl: vi.fn(),
    ApplicationEventRepositoryImpl: vi.fn(),
    db: { transaction: vi.fn() },
  };
});

/**
 * PARTIAL MOCK: Shared lib
 * Preserve real implementations but mock useToast to control toast feedback.
 */
vi.mock("@/shared/lib", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/shared/lib")>();
  return {
    ...actual,
    useToast: vi.fn(),
  };
});

// Import after mocks are defined
import { useApplicationActions } from "./useApplicationActions";
import { JobApplicationRepositoryImpl, ApplicationEventRepositoryImpl, db } from "@/shared/storage";
import { useToast } from "@/shared/lib";
import type { JobApplication } from "@/entities";

describe("useApplicationActions", () => {
  let mockRepo: MockJobApplicationRepository;
  let mockEventRepo: MockApplicationEventRepository;
  let mockAddToast: ReturnType<typeof vi.fn>;
  const jobAppRepoMock = JobApplicationRepositoryImpl as ReturnType<typeof vi.fn>;
  const eventRepoMock = ApplicationEventRepositoryImpl as ReturnType<typeof vi.fn>;
  const useToastMock = useToast as ReturnType<typeof vi.fn>;
  const dbTransactionMock = db.transaction as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup repository mocks
    mockRepo = {
      deleteApplication: vi.fn().mockResolvedValue(undefined),
      createApplication: vi.fn().mockResolvedValue(undefined),
      updateApplication: vi.fn().mockResolvedValue(undefined),
      getApplicationById: vi.fn().mockResolvedValue(null),
    };

    mockEventRepo = {
      deleteByApplicationId: vi.fn().mockResolvedValue(undefined),
      createEvent: vi.fn().mockResolvedValue(undefined),
    };

    mockAddToast = vi.fn();

    // Setup constructor mocks - must return object when called with new
    jobAppRepoMock.mockImplementation(function () {
      return mockRepo;
    });
    eventRepoMock.mockImplementation(function () {
      return mockEventRepo;
    });
    useToastMock.mockReturnValue({ addToast: mockAddToast });

    // Setup db.transaction to run the callback
    dbTransactionMock.mockImplementation((_mode: string, ..._args: unknown[]) => {
      const callback = _args[_args.length - 1] as () => Promise<void>;
      return callback();
    });
  });

  describe("create", () => {
    it("should create application", async () => {
      const { result } = renderHook(() => useApplicationActions());
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
      const { result } = renderHook(() => useApplicationActions({ withSuccess: true }));

      await act(async () => {
        await result.current.createAsync.execute({
          company: "Acme",
          position: "Engineer",
          status: "applied",
          dateApplied: "2026-05-01T10:00:00Z",
        });
      });

      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Application created",
          variant: "success",
        }),
      );
    });

    it("should show error toast when enabled and fails", async () => {
      const { result } = renderHook(() => useApplicationActions({ withError: true }));
      mockRepo.createApplication.mockRejectedValueOnce(new Error("DB error"));

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
        expect.objectContaining({
          title: "Error creating application",
          variant: "error",
        }),
      );
    });
  });

  describe("update", () => {
    it("should update application", async () => {
      const { result } = renderHook(() => useApplicationActions());

      await act(async () => {
        await result.current.updateAsync.execute("app-1", { status: "interviewing" });
      });

      expect(mockRepo.updateApplication).toHaveBeenCalledWith("app-1", {
        status: "interviewing",
      });
    });

    it("should show success toast when enabled", async () => {
      const { result } = renderHook(() => useApplicationActions({ withSuccess: true }));

      await act(async () => {
        await result.current.updateAsync.execute("app-1", { status: "offer" });
      });

      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Application updated",
          variant: "success",
        }),
      );
    });
  });

  describe("delete", () => {
    it("should delete application and events in transaction", async () => {
      const { result } = renderHook(() => useApplicationActions());

      await act(async () => {
        await result.current.deleteAsync.execute("app-1");
      });

      expect(dbTransactionMock).toHaveBeenCalled();
      expect(mockRepo.deleteApplication).toHaveBeenCalledWith("app-1");
      expect(mockEventRepo.deleteByApplicationId).toHaveBeenCalledWith("app-1");
    });

    it("should show success toast when enabled", async () => {
      const { result } = renderHook(() => useApplicationActions({ withSuccess: true }));

      await act(async () => {
        await result.current.deleteAsync.execute("app-1");
      });

      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Application deleted",
          variant: "success",
        }),
      );
    });
  });

  describe("move", () => {
    it("should update status and create event", async () => {
      const { result } = renderHook(() => useApplicationActions());
      mockRepo.getApplicationById.mockResolvedValueOnce({
        id: "app-1",
        company: "Acme",
        position: "Engineer",
        status: "applied",
        dateApplied: "2026-05-01T10:00:00Z",
      });

      await act(async () => {
        await result.current.moveAsync.execute("app-1", "interviewing");
      });

      expect(mockRepo.updateApplication).toHaveBeenCalledWith("app-1", {
        status: "interviewing",
      });
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
      const { result } = renderHook(() => useApplicationActions({ withSuccess: true }));
      mockRepo.getApplicationById.mockResolvedValueOnce({
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
        expect.objectContaining({
          title: "Application moved",
          variant: "success",
        }),
      );
    });
  });

  describe("error handling", () => {
    it("should not expose sensitive error details in toast", async () => {
      const { result } = renderHook(() => useApplicationActions({ withError: true }));
      mockRepo.createApplication.mockRejectedValueOnce(new Error("database lost at 192.168.1.1"));

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
