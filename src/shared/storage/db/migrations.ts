import type { jobiqDbClient } from "./schema";

export function applyMigrations(_db: jobiqDbClient, currentVersion: number) {
  throw new Error(`No migration defined for version ${currentVersion}`);
}
