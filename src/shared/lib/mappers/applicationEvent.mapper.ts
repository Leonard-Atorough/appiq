import type { ApplicationEvent, ApplicationEventType, ApplicationStatus } from "@/entities";
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
    fromStatus: (row.fromStatus as ApplicationStatus) || undefined,
    toStatus: (row.toStatus as ApplicationStatus) || undefined,
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
    fromStatus: event.fromStatus ?? null,
    toStatus: event.toStatus ?? null,
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
    date: updatedFields.date ? new Date(updatedFields.date).toISOString() : existingRow.date,
    fromStatus: updatedFields.fromStatus ?? existingRow.fromStatus,
    toStatus: updatedFields.toStatus ?? existingRow.toStatus,
  };
}
