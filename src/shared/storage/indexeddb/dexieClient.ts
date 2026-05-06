import { jobiqDbClient } from "../db/schema";
import { setupMigrations } from "../db/migrations";
import { JobApplicationRepositoryImpl } from "../repositories/jobApplication.repository";
import { ApplicationEventRepositoryImpl } from "../repositories/applicationEvent.repository";

const db = new jobiqDbClient();
setupMigrations(db);

// Singleton repository instances to avoid re-instantiation on every component render
const jobApplicationRepository = new JobApplicationRepositoryImpl(db);
const applicationEventRepository = new ApplicationEventRepositoryImpl(db);

export { db, jobApplicationRepository, applicationEventRepository };
