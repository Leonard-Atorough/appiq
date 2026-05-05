import { useEffect, useMemo, useState } from "react";
import { liveQuery } from "dexie";
import { db } from "@/shared/storage";
import { mapRowToApplicationEvent } from "@/entities/application";
import { buildSankeyData } from "../lib/sankey/buildSankeyData";
import type { SankeyData } from "../lib/sankey/sankeyTypes";

/**
 * Subscribes to all application events in real time and derives Sankey flow
 * data from status_change events that carry valid fromStatus → toStatus
 * transitions.
 *
 * Returns a stable `SankeyData` object that can be passed directly to
 * `<ResponsiveSankey>` from @nivo/sankey.
 */
export function useSankeyData(): {
  data: SankeyData;
  loading: boolean;
  error: Error | null;
} {
  const [rawEvents, setRawEvents] = useState<ReturnType<typeof mapRowToApplicationEvent>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscription = liveQuery(() => db.applicationEvents.toArray()).subscribe({
      next: (rows) => {
        setRawEvents(rows.map(mapRowToApplicationEvent));
        setLoading(false);
        setError(null);
      },
      error: (err) => {
        setError(err instanceof Error ? err : new Error("Failed to load application events"));
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const data = useMemo(() => buildSankeyData(rawEvents), [rawEvents]);

  return { data, loading, error };
}
