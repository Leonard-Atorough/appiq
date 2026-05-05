import { useEffect, useState } from "react";
import { liveQuery } from "dexie";
import { db, JobApplicationRepositoryImpl } from "@/shared/storage";
import type { JobApplicationRepository } from "@/shared/storage";
import type { JobApplication } from "@/entities";

export function useApplications(
  repo: JobApplicationRepository = new JobApplicationRepositoryImpl(db),
) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // liveQuery uses Dexie's DBCore middleware to track which index ranges
    // are read during the query. Any write that touches those ranges — from
    // any hook instance or component — will re-run this subscriber automatically.
    const subscription = liveQuery(() => repo.listApplications()).subscribe({
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
  }, [repo]);

  return {
    applications,
    loading,
    error,
  };
}
