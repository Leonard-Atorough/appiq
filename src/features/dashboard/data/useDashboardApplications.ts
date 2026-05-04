import { useApplications } from "@/features/applications";

export function useDashboardApplications() {
  const { applications, loading, error } = useApplications();

  const upcomingInterviews = applications
    .filter((app) => app.status === "interviewing")
    .sort((a, b) => {
      const dateA = a.interviewStartDate ? new Date(a.interviewStartDate) : null;
      const dateB = b.interviewStartDate ? new Date(b.interviewStartDate) : null;
      if (dateA && dateB) {
        return dateA.getTime() - dateB.getTime();
      } else if (dateA) {
        return -1;
      } else if (dateB) {
        return 1;
      } else {
        return 0;
      }
    })
    .slice(0, 5); // Get next 5 interviews
  return { applications, upcomingInterviews, loading, error };
}
