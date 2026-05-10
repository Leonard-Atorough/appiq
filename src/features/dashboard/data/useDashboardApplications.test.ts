import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDashboardApplications } from "./useDashboardApplications";
import { useApplications } from "@/features/applications/data/useApplications";
import { renderHook } from "@testing-library/react";

vi.mock("@/features/applications/data/useApplications");

const mockApplications = [
  { id: "1", status: "interviewing", interviewStartDate: "2024-07-01T10:00:00Z" },
  { id: "2", status: "interviewing", interviewStartDate: "2024-07-02T10:00:00Z" },
  { id: "3", status: "applied" },
  { id: "4", status: "interviewing", interviewStartDate: "2024-07-03T10:00:00Z" },
  { id: "5", status: "interviewing" },
  { id: "6", status: "interviewing", interviewStartDate: "2024-07-04T10:00:00Z" },
  { id: "7", status: "offer" },
  {id: "8", status: "rejected" },
  { id: "9", status: "interviewing" },
];

const mockUseApplications = vi.fn().mockReturnValue({
  applications: mockApplications,
  loading: false,
  error: null,
});

describe("useDashboardApplications", () => {
    beforeEach(() => {
        vi.mocked(useApplications).mockImplementation(mockUseApplications);
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });
  it("returns applications and upcoming interviews and sorts them by date", () => {
    const { result } = renderHook(() => useDashboardApplications());

    expect(result.current.applications).toEqual(mockApplications);
    expect(result.current.upcomingInterviews).toEqual([
      { id: "1", status: "interviewing", interviewStartDate: "2024-07-01T10:00:00Z" },
      { id: "2", status: "interviewing", interviewStartDate: "2024-07-02T10:00:00Z" },
      { id: "4", status: "interviewing", interviewStartDate: "2024-07-03T10:00:00Z" },
      { id: "6", status: "interviewing", interviewStartDate: "2024-07-04T10:00:00Z" },
      { id: "5", status: "interviewing" },
    ]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

});
