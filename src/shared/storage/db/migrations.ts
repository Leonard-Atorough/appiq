import type { jobiqDbClient } from "./schema";

/**
 * Set up all database migrations and schema versions.
 * Called once when the database is initialized.
 */
export function setupMigrations(db: jobiqDbClient): void {
  // Version 1: Initial schema
  db.version(1).stores({
    applications: "id, company, status, appliedDate, [status+appliedDate]",
  });

  // Version 2: Added application events
  db.version(2).stores({
    applications: "id, company, status, appliedDate, [status+appliedDate]",
    applicationEvents: "id, applicationId, date",
  });

  // Version 3: Updated schema for new fields (location as string, workingStyle)
  // No data migration needed - fields are optional
  db.version(3).stores({
    applications: "id, company, status, appliedDate, [status+appliedDate]",
    applicationEvents: "id, applicationId, date",
  });
}

