export {
  ApplicationEventRepositoryImpl,
  type ApplicationEventRepository,
} from "./repositories/applicationEvent.repository";
export {
  JobApplicationRepositoryImpl,
  type JobApplicationRepository,
} from "./repositories/jobApplication.repository";
export { db, jobApplicationRepository, applicationEventRepository } from "./indexeddb/dexieClient";
