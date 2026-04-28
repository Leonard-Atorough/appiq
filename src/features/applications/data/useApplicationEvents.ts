import { useCallback, useEffect, useState } from "react";
import { liveQuery } from "dexie";
import { db } from "@/shared/storage/indexeddb/dexieClient";
import { ApplicationEventRepositoryImpl } from "@/shared/storage/repositories/applicationEvent.repository";
import type { ApplicationEvent } from "@/entities";
import { mapRowToApplicationEvent } from "@/shared/lib";

export function useApplicationEvents(applicationId: string) {
  const [events, setEvents] = useState<ApplicationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscription = liveQuery(() =>
      db.applicationEvents.where("applicationId").equals(applicationId).toArray(),
    ).subscribe({
      next: (rows) => {
        const mapped: ApplicationEvent[] = rows.map(mapRowToApplicationEvent);
        mapped.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setEvents(mapped);
        setLoading(false);
        setError(null);
      },
      error: (err) => {
        setError(err instanceof Error ? err : new Error("Failed to load events"));
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [applicationId]);

  const addEvent = useCallback(async (event: Omit<ApplicationEvent, "id" | "createdAt">) => {
    const repo = new ApplicationEventRepositoryImpl(db);
    await repo.createEvent(event);
  }, []);

  const updateEvent = useCallback(
    async (
      id: string,
      updatedFields: Partial<Omit<ApplicationEvent, "id" | "applicationId" | "createdAt">>,
    ) => {
      const repo = new ApplicationEventRepositoryImpl(db);
      await repo.updateEvent(id, updatedFields);
    },
    [],
  );

  const deleteEvent = useCallback(async (id: string) => {
    const repo = new ApplicationEventRepositoryImpl(db);
    await repo.deleteEvent(id);
  }, []);

  return { events, loading, error, addEvent, updateEvent, deleteEvent };
}
