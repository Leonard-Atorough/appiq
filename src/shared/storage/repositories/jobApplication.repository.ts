import type { JobApplication } from "@/entities";
import type { JobiqDbClient } from "../db/schema";
import {
  mapJobApplicationToRow,
  mapRowToJobApplication,
  mapUpdatedApplicationToRow,
} from "@/shared/lib";

export interface JobApplicationRepository {
  listApplications(): Promise<JobApplication[]>;
  getApplicationById(id: string): Promise<JobApplication | null>;
  createApplication(application: Omit<JobApplication, "id">): Promise<JobApplication>;
  updateApplication(
    id: string,
    application: Partial<Omit<JobApplication, "id">>,
  ): Promise<JobApplication | null>;
  deleteApplication(id: string): Promise<void>;
}

export class JobApplicationRepositoryImpl implements JobApplicationRepository {
  private dbClient: JobiqDbClient;

  constructor(dbClient: JobiqDbClient) {
    this.dbClient = dbClient;
  }

  async listApplications(): Promise<JobApplication[]> {
    const rows = await this.dbClient.applications.toArray();
    return rows.map(mapRowToJobApplication);
  }

  async getApplicationById(id: string): Promise<JobApplication | null> {
    const row = await this.dbClient.applications.get(id);
    return row ? mapRowToJobApplication(row) : null;
  }

  async createApplication(application: Omit<JobApplication, "id">): Promise<JobApplication> {
    const id = crypto.randomUUID();
    const newRow = {
      id,
      ...mapJobApplicationToRow(application),
    };
    await this.dbClient.applications.add(newRow);
    return { id, ...application };
  }

  async updateApplication(
    id: string,
    application: Partial<Omit<JobApplication, "id">>,
  ): Promise<JobApplication | null> {
    const existingRow = await this.dbClient.applications.get(id);
    if (!existingRow) {
      return null;
    }
    const updatedRow = mapUpdatedApplicationToRow(existingRow, application);

    await this.dbClient.applications.put(updatedRow);
    return mapRowToJobApplication(updatedRow);
  }

  async deleteApplication(id: string): Promise<void> {
    await this.dbClient.applications.delete(id);
  }
}
