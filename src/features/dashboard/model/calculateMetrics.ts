import type { JobApplication } from "@/entities";

export interface DashboardMetrics {
  totalApplications: number;
  applicationsThisMonth: number;
  interviewsScheduled: number;
  offersReceived: number;
  rejectionRate: number; // percentage of rejected applications out of total applications
}

export function calculateDashboardMetrics(applications: JobApplication[]): DashboardMetrics {
  const now = new Date();

  const thisMonth = applications.filter((app) => {
    const dateApplied = new Date(app.dateApplied);
    return (
      dateApplied.getMonth() === now.getMonth() && dateApplied.getFullYear() === now.getFullYear()
    );
  }).length;

  const interviews = applications.filter((app) => app.status === "interviewing").length;
  const offers = applications.filter((app) => app.status === "offer").length;
  const rejections = applications.filter((app) => app.status === "rejected").length;
  const total = applications.length;
  const rejectionRate = total > 0 ? (rejections / total) * 100 : 0;

  return {
    totalApplications: total,
    applicationsThisMonth: thisMonth,
    interviewsScheduled: interviews,
    offersReceived: offers,
    rejectionRate,
  };
}
