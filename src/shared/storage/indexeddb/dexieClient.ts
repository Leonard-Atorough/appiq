import { jobiqDbClient } from "../db/schema";
import { setupMigrations } from "../db/migrations";

const db = new jobiqDbClient();
setupMigrations(db);

export { db };

