import { useCallback, useEffect, useState } from "react";
import { liveQuery } from "dexie";
import { db, ApplicationEventRepositoryImpl } from "@/shared/storage";
import type { ApplicationEventRepository } from "@/shared/storage";
import type { ApplicationEvent } from "@/entities";

export function useApplicationEvents(
  applicationId: string,
  repo: ApplicationEventRepository = new ApplicationEventRepositoryImpl(db),
) {
  const [events, setEvents] = useState<ApplicationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscription = liveQuery(() => repo.getByApplicationId(applicationId)).subscribe({
      next: (fetched) => {
        const sorted = [...fetched].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setEvents(sorted);
        setLoading(false);
        setError(null);
      },
      error: (err) => {
        setError(err instanceof Error ? err : new Error("Failed to load events"));
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [applicationId, repo]);

  const addEvent = useCallback(
    (event: Omit<ApplicationEvent, "id" | "createdAt">) => repo.createEvent(event),
    [repo],
  );

  const updateEvent = useCallback(
    (
      id: string,
      updatedFields: Partial<Omit<ApplicationEvent, "id" | "applicationId" | "createdAt">>,
    ) => repo.updateEvent(id, updatedFields),
    [repo],
  );

  const deleteEvent = useCallback((id: string) => repo.deleteEvent(id), [repo]);

  return { events, loading, error, addEvent, updateEvent, deleteEvent };
}

