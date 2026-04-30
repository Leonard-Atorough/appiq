import { useEffect, useState } from "react";
import { liveQuery } from "dexie";
import { mapRowToJobApplication } from "@/shared/lib";
import { db } from "@/shared/storage/indexeddb/dexieClient";
import type { JobApplication } from "@/entities";

export function useApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // liveQuery uses Dexie's DBCore middleware to track which index ranges
    // are read during the query. Any write that touches those ranges — from
    // any hook instance or component — will re-run this subscriber automatically.
    const subscription = liveQuery(() => db.applications.toArray()).subscribe({
      next: (rows) => {
        setApplications(rows.map(mapRowToJobApplication));
        setLoading(false);
        setError(null);
      },
      error: (err) => {
        setError(err instanceof Error ? err : new Error("Failed to load applications"));
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    applications,
    loading,
    error,
  };
}
