import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calculateDashboardMetrics } from "./calculateMetrics";
import type { ApplicationStatus, JobApplication } from "@/entities";

describe("calculateMetrics", () => {
  describe("with empty applications list", () => {
    it("should return zero for all metrics", () => {
      const metrics = calculateDashboardMetrics([]);
      expect(metrics).toEqual({
        totalApplications: 0,
        applicationsThisMonth: 0,
        interviewsScheduled: 0,
        offersReceived: 0,
        rejectionRate: 0,
      });
    });
  });

  describe("with various applications", () => {
    let mockApplications: JobApplication[];

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-06-15"));

      mockApplications = [
        {
          id: "1",
          position: "Software Engineer",
          company: "Tech Corp",
          status: "applied" satisfies ApplicationStatus,
          dateApplied: new Date("2024-06-01").toISOString(),
        },
        {
          id: "2",
          position: "Frontend Developer",
          company: "Web Solutions",
          status: "interviewing" satisfies ApplicationStatus,
          dateApplied: new Date("2024-05-15").toISOString(),
        },
        {
          id: "3",
          position: "Backend Developer",
          company: "Data Systems",
          status: "offer" satisfies ApplicationStatus,
          dateApplied: new Date("2024-06-10").toISOString(),
        },
        {
          id: "4",
          position: "Full Stack Developer",
          company: "Innovatech",
          status: "rejected" satisfies ApplicationStatus,
          dateApplied: new Date("2024-04-20").toISOString(),
        },
      ];
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should calculate metrics correctly", () => {
      const metrics = calculateDashboardMetrics(mockApplications);
      expect(metrics).toEqual({
        totalApplications: 4,
        applicationsThisMonth: 2,
        interviewsScheduled: 1,
        offersReceived: 1,
        rejectionRate: 25,
      });
    });

    it("should handle all applications rejected", () => {
      const rejectedApps: JobApplication[] = mockApplications.map((app) => ({
        ...app,
        status: "rejected" satisfies ApplicationStatus,
      }));
      const metrics = calculateDashboardMetrics(rejectedApps);
      expect(metrics).toEqual({
        totalApplications: 4,
        applicationsThisMonth: 2,
        interviewsScheduled: 0,
        offersReceived: 0,
        rejectionRate: 100,
      });
    });

    it("should handle all applications accepted", () => {
      const acceptedApps: JobApplication[] = mockApplications.map((app) => ({
        ...app,
        status: "offer" satisfies ApplicationStatus,
      }));
      const metrics = calculateDashboardMetrics(acceptedApps);
      expect(metrics).toEqual({
        totalApplications: 4,
        applicationsThisMonth: 2,
        interviewsScheduled: 0,
        offersReceived: 4,
        rejectionRate: 0,
      });
    });

    it("should handle applications with future dates", () => {
      const futureApps: JobApplication[] = [
        ...mockApplications,
        {
          id: "5",
          position: "DevOps Engineer",
          company: "Cloud Services",
          status: "applied" satisfies ApplicationStatus,
          dateApplied: new Date("2024-07-01").toISOString(),
        },
      ];
      const metrics = calculateDashboardMetrics(futureApps);
      expect(metrics).toEqual({
        totalApplications: 5,
        applicationsThisMonth: 2,
        interviewsScheduled: 1,
        offersReceived: 1,
        rejectionRate: 20,
      });
    });

    it("should handle applications with invalid dates", () => {
      const invalidDateApps: JobApplication[] = [
        ...mockApplications,
        {
          id: "6",
          position: "QA Engineer",
          company: "Testing Inc",
          status: "applied" satisfies ApplicationStatus,
          dateApplied: "invalid-date",
        },
      ];
      const metrics = calculateDashboardMetrics(invalidDateApps);
      expect(metrics).toEqual({
        totalApplications: 5,
        applicationsThisMonth: 2,
        interviewsScheduled: 1,
        offersReceived: 1,
        rejectionRate: 20,
      });
    });
  });
});
