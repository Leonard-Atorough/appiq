import Dexie, { type EntityTable } from "dexie";
import type { ApplicationJobType, ApplicationLocationType, ApplicationStatus } from "@entities";

export type ApplicationRow = {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus | null;
  appliedDate: string; // ISO date string
  salaryMin: number;
  salaryMax: number;
  location: ApplicationLocationType | null;
  jobType: ApplicationJobType | null;
  notes: string;
  dateCreated: string; // ISO date string
  dateUpdated: string; // ISO date string
  version: number;
};

export class jobiqDbClient extends Dexie {
  applications!: EntityTable<ApplicationRow, "id">;

  constructor() {
    super("jobiqDbClient");
    this.version(1).stores({
      applications: "id, company, status, appliedDate, [status+appliedDate]",
    });
  }
}