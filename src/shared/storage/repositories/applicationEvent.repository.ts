import type { ApplicationEvent } from "@entities";
import type { JobiqDbClient } from "../db/schema";
import {
  mapRowToApplicationEvent,
  mapApplicationEventToRow,
  mapUpdatedApplicationEventToRow,
} from "@/shared/lib";

export class ApplicationEventRepositoryImpl {
  private db: JobiqDbClient;

  constructor(db: JobiqDbClient) {
    this.db = db;
  }

  async getByApplicationId(applicationId: string): Promise<ApplicationEvent[]> {
    const rows = await this.db.applicationEvents
      .where("applicationId")
      .equals(applicationId)
      .toArray();
    return rows.map(mapRowToApplicationEvent);
  }

  async createEvent(event: Omit<ApplicationEvent, "id" | "createdAt">): Promise<ApplicationEvent> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const newEvent: ApplicationEvent = {
      id,
      createdAt: now,
      ...event,
    };
    const row = mapApplicationEventToRow(newEvent);
    await this.db.applicationEvents.add({ ...row, id });
    return newEvent;
  }

  async updateEvent(
    id: string,
    updatedFields: Partial<Omit<ApplicationEvent, "id" | "applicationId" | "createdAt">>,
  ): Promise<ApplicationEvent | null> {
    const existingRow = await this.db.applicationEvents.get(id);
    if (!existingRow) {
      return null;
    }
    const updatedRow = mapUpdatedApplicationEventToRow(existingRow, updatedFields);
    await this.db.applicationEvents.put(updatedRow);
    return mapRowToApplicationEvent(updatedRow);
  }

  async deleteEvent(id: string): Promise<void> {
    await this.db.applicationEvents.delete(id);
  }

  async deleteByApplicationId(applicationId: string): Promise<void> {
    await this.db.applicationEvents.where("applicationId").equals(applicationId).delete();
  }
}
