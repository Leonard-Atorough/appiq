import { useCallback, useEffect, useState } from "react";
import { liveQuery } from "dexie";
import { JobApplicationRepositoryImpl } from "@/shared/storage/repositories/jobApplication.repository";
import { ApplicationEventRepositoryImpl } from "@/shared/storage/repositories/applicationEvent.repository";
import { mapRowToJobApplication } from "@/shared/lib";
import { db } from "@/shared/storage/indexeddb/dexieClient";
import type { ApplicationStatus, JobApplication } from "@/entities";

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

  const moveApplication = useCallback(async (id: string, newStatus: ApplicationStatus) => {
    const repo = new JobApplicationRepositoryImpl(db);
    const eventRepo = new ApplicationEventRepositoryImpl(db);
    await repo.updateApplication(id, { status: newStatus });
    await eventRepo.createEvent({
      applicationId: id,
      type: "status_change",
      title: `Status changed to ${newStatus}`,
      date: new Date().toISOString(),
    });
  }, []);

  const deleteApplication = useCallback(async (id: string) => {
    const repo = new JobApplicationRepositoryImpl(db);
    await repo.deleteApplication(id);
  }, []);

  const createApplication = useCallback(async (application: Omit<JobApplication, "id">) => {
    const repo = new JobApplicationRepositoryImpl(db);
    await repo.createApplication(application);
  }, []);

  const updateApplication = useCallback(async (id: string, updates: Partial<Omit<JobApplication, "id">>) => {
    const repo = new JobApplicationRepositoryImpl(db);
    await repo.updateApplication(id, updates);
  }, []);

  return {
    applications,
    loading,
    error,
    moveApplication,
    deleteApplication,
    createApplication,
    updateApplication,
  };
}

export function useApplicationActions() {
  const { moveApplication, deleteApplication, createApplication, updateApplication } = useApplications();
  return { moveApplication, deleteApplication, createApplication, updateApplication };
}
