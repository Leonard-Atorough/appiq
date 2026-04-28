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
    const now = new Date().toISOString();
    const newEvent: ApplicationEvent = {
      id: crypto.randomUUID(),
      createdAt: now,
      ...event,
    };
    await this.db.applicationEvents.add(mapApplicationEventToRow(newEvent));
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
}
