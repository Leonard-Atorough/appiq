import type { ApplicationEvent, ApplicationEventType } from "@/entities";
import type { ApplicationEventRow } from "@/shared/storage/db/schema";

export function mapRowToApplicationEvent(row: ApplicationEventRow): ApplicationEvent {
  return {
    id: row.id,
    applicationId: row.applicationId,
    type: row.type as ApplicationEventType,
    title: row.title,
    description: row.description || undefined,
    date: row.date,
    createdAt: row.createdAt,
  };
}

export function mapApplicationEventToRow(
  event: Omit<ApplicationEvent, "id" | "createdAt">,
): Omit<ApplicationEventRow, "id"> {
    return {
    applicationId: event.applicationId,
    type: event.type,
    title: event.title,
    description: event.description || "",
    date: new Date(event.date).toISOString(),
    createdAt: new Date().toISOString(),
  };
}

export function mapUpdatedApplicationEventToRow(
  existingRow: ApplicationEventRow,
  updatedFields: Partial<Omit<ApplicationEvent, "id" | "applicationId" | "createdAt">>,
): ApplicationEventRow {
  return {
    ...existingRow,
    type: updatedFields.type ?? existingRow.type,
    title: updatedFields.title ?? existingRow.title,
    description: updatedFields.description ?? existingRow.description,
    date: updatedFields.date
      ? new Date(updatedFields.date).toISOString()
      : existingRow.date,
  };
}