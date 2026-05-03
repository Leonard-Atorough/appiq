import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDashboardMetrics } from "./useDashboardMetrics";
import { useApplications } from "@/features/applications/data/useApplications";
import type { ApplicationStatus, JobApplication } from "@/entities";

vi.mock("@/features/applications/data/useApplications");

describe("useDashboardMetrics", () => {
  const mockError = new Error("Failed to load applications");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-15"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("should pass through loading state", () => {
    vi.mocked(useApplications).mockReturnValue({
      applications: [],
      loading: true,
      error: null,
    } as ReturnType<typeof useApplications>);

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.loading).toBe(true);
  });

  it("should pass through error state", () => {
    vi.mocked(useApplications).mockReturnValue({
      applications: [],
      loading: false,
      error: mockError,
    } as ReturnType<typeof useApplications>);

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.error).toBe(mockError);
  });

  it("should compute metrics from applications", () => {
    const mockApplications: JobApplication[] = [
      {
        id: "1",
        status: "applied" satisfies ApplicationStatus,
        dateApplied: new Date("2024-06-10").toISOString(),
      },
      {
        id: "2",
        status: "interviewing" satisfies ApplicationStatus,
        dateApplied: new Date("2024-06-05").toISOString(),
      },
      {
        id: "3",
        status: "rejected" satisfies ApplicationStatus,
        dateApplied: new Date("2024-05-01").toISOString(),
      },
    ] as JobApplication[];

    vi.mocked(useApplications).mockReturnValue({
      applications: mockApplications,
      loading: false,
      error: null,
    } as ReturnType<typeof useApplications>);

    const { result } = renderHook(() => useDashboardMetrics());

    expect(result.current.metrics).toEqual({
      totalApplications: 3,
      applicationsThisMonth: 2,
      interviewsScheduled: 1,
      offersReceived: 0,
      rejectionRate: 33.33333333333333,
    });
  });

  it("should memoize metrics and not recompute on same applications", () => {
    const mockApplications = [
      {
        id: "1",
        status: "applied" satisfies ApplicationStatus,
        dateApplied: new Date("2024-06-10").toISOString(),
      },
    ] as JobApplication[];

    vi.mocked(useApplications).mockReturnValue({
      applications: mockApplications,
      loading: false,
      error: null,
    } as ReturnType<typeof useApplications>);

    const { result, rerender } = renderHook(() => useDashboardMetrics());

    const firstMetrics = result.current.metrics;
    rerender();
    const secondMetrics = result.current.metrics;

    expect(firstMetrics).toBe(secondMetrics);
  });

  it("should recompute metrics when applications change", () => {
    const apps1 = [
      {
        id: "1",
        status: "applied" satisfies ApplicationStatus,
        dateApplied: new Date("2024-06-10").toISOString(),
      },
    ] as JobApplication[];

    const apps2 = [
      ...apps1,
      {
        id: "2",
        status: "offer" satisfies ApplicationStatus,
        dateApplied: new Date("2024-06-12").toISOString(),
      },
    ] as JobApplication[];

    vi.mocked(useApplications).mockReturnValue({
      applications: apps1,
      loading: false,
      error: null,
    } as ReturnType<typeof useApplications>);

    const { result, rerender } = renderHook(() => useDashboardMetrics());

    const metricsV1 = result.current.metrics;
    const countV1 = metricsV1.totalApplications;

    vi.mocked(useApplications).mockReturnValue({
      applications: apps2,
      loading: false,
      error: null,
    } as ReturnType<typeof useApplications>);

    rerender();
    const metricsV2 = result.current.metrics;
    const countV2 = metricsV2.totalApplications;

    expect(countV1).toBe(1);
    expect(countV2).toBe(2);
    expect(metricsV1).not.toBe(metricsV2);
  });
});
