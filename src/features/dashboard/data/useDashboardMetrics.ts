import { useApplications } from "@/features/applications/data/useApplications";
import { useMemo } from "react";
import { calculateDashboardMetrics } from "../lib/calculateMetrics";

/**
 * Custom hook to compute dashboard metrics based on job applications.
 * Fetches applications using `useApplications` and calculates metrics using `calculateDashboardMetrics`.
 *
 * @returns An object containing the computed metrics, loading state, and any error encountered.
 */
export function useDashboardMetrics() {
  const { applications, loading, error } = useApplications();

  const metrics = useMemo(() => {
    return calculateDashboardMetrics(applications);
  }, [applications]);

  return { metrics, loading, error };
}
