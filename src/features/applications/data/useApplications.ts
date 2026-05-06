import { useEffect, useState, useMemo } from "react";
import { liveQuery } from "dexie";
import { jobApplicationRepository } from "@/shared/storage";
import type { JobApplicationRepository } from "@/shared/storage";
import type { JobApplication } from "@/entities";

export function useApplications(
  repo: JobApplicationRepository = jobApplicationRepository,
) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize the repository to prevent unnecessary re-subscriptions
  const memoizedRepo = useMemo(() => repo, [repo]);

  useEffect(() => {
    // liveQuery uses Dexie's DBCore middleware to track which index ranges
    // are read during the query. Any write that touches those ranges — from
    // any hook instance or component — will re-run this subscriber automatically.
    const subscription = liveQuery(() => memoizedRepo.listApplications()).subscribe({
      next: (apps) => {
        setApplications(apps);
        setLoading(false);
        setError(null);
      },
      error: (err) => {
        setError(err instanceof Error ? err : new Error("Failed to load applications"));
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [memoizedRepo]);

  return {
    applications,
    loading,
    error,
  };
}
