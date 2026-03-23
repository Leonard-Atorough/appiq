import type { JobApplication } from "@/entities";
import type { ApplicationRow } from "@/shared/storage/db/schema";

export function mapRowToJobApplication(row: ApplicationRow): JobApplication {
  return {
    id: row.id,
    company: row.company,
    position: row.position,
    status: row.status ?? "applied",
    dateApplied: row.dateApplied,
    salaryMin: row.salaryMin,
    salaryMax: row.salaryMax,
    location: row.location ?? undefined,
    jobType: row.jobType ?? undefined,
    notes: row.notes ?? "",
  };
}

export function mapJobApplicationToRow(
  application: Omit<JobApplication, "id">,
): Omit<ApplicationRow, "id"> {
  return {
    company: application.company,
    position: application.position,
    status: application.status,
    dateApplied: new Date(application.dateApplied).toISOString(),
    salaryMin: application.salaryMin ?? 0,
    salaryMax: application.salaryMax ?? 0,
    location: application.location ?? null,
    jobType: application.jobType ?? null,
    notes: application.notes ?? "",
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    version: 1,
  };
}

export function mapUpdatedApplicationToRow(
  existingRow: ApplicationRow,
  updatedFields: Partial<Omit<JobApplication, "id">>,
): ApplicationRow {
  return {
    ...existingRow,
    company: updatedFields.company ?? existingRow.company,
    position: updatedFields.position ?? existingRow.position,
    status: updatedFields.status ?? existingRow.status,
    dateApplied: updatedFields.dateApplied
      ? new Date(updatedFields.dateApplied).toISOString()
      : existingRow.dateApplied,
    salaryMin: updatedFields.salaryMin ?? existingRow.salaryMin,
    salaryMax: updatedFields.salaryMax ?? existingRow.salaryMax,
    location: updatedFields.location ?? existingRow.location,
    jobType: updatedFields.jobType ?? existingRow.jobType,
    notes: updatedFields.notes ?? existingRow.notes,
    dateUpdated: new Date().toISOString(),
    version: existingRow.version + 1,
  };
}
