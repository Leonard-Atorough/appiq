import type { ApplicationEvent, ApplicationEventType } from "@entities";
import type { ApplicationEventRow, JobiqDbClient } from "../db/schema";

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
    return rows.map(mapRowToEvent);
  }

  async createEvent(
    event: Omit<ApplicationEvent, "id" | "createdAt">,
  ): Promise<ApplicationEvent> {
    const now = new Date().toISOString();
    const newEvent: ApplicationEvent = {
      id: crypto.randomUUID(),
      createdAt: now,
      ...event,
    };
    await this.db.applicationEvents.add(mapEventToRow(newEvent));
    return newEvent;
  }

  async deleteEvent(id: string): Promise<void> {
    await this.db.applicationEvents.delete(id);
  }
}

function mapRowToEvent(row: ApplicationEventRow): ApplicationEvent {
  return {
    id: row.id,
    applicationId: row.applicationId,
    type: row.type as ApplicationEventType,
    title: row.title,
    description: row.description || undefined,
    date: row.date,
    createdAt: row.createdAt,
  };
}

function mapEventToRow(event: ApplicationEvent): ApplicationEventRow {
  return {
    id: event.id,
    applicationId: event.applicationId,
    type: event.type,
    title: event.title,
    description: event.description ?? "",
    date: event.date,
    createdAt: event.createdAt,
  };
}
