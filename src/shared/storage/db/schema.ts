import Dexie, { type EntityTable } from "dexie";
import type { ApplicationJobType, ApplicationLocationType, ApplicationStatus } from "@entities";

export type ApplicationRow = {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus | null;
  dateApplied: string; // ISO date string
  salaryMin: number;
  salaryMax: number;
  location: string | null; // Address (e.g. "San Francisco, CA")
  workingStyle: ApplicationLocationType | null; // remote, on-site, hybrid
  jobType: ApplicationJobType | null;
  notes: string;
  dateCreated: string; // ISO date string
  dateUpdated: string; // ISO date string
  version: number;
};

export type ApplicationEventRow = {
  id: string;
  applicationId: string;
  type: string;
  title: string;
  description: string;
  date: string; // ISO
  createdAt: string; // ISO
};

export class jobiqDbClient extends Dexie {
  applications!: EntityTable<ApplicationRow, "id">;
  applicationEvents!: EntityTable<ApplicationEventRow, "id">;

  constructor() {
    super("jobiqDbClient");
  }
}

export type JobiqDbClient = InstanceType<typeof jobiqDbClient>;