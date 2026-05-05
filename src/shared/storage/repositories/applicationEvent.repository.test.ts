// Mock db client
import { db } from "@/shared/storage";
import { ApplicationEventRepositoryImpl } from "./applicationEvent.repository";
import { mapRowToApplicationEvent } from "@/shared/lib/mappers/applicationEvent.mapper";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import type { ApplicationEvent } from "@/entities";

const mockWhereClause = {
  equals: vi.fn().mockReturnThis(),
  delete: vi.fn(),
  toArray: vi.fn(),
};

vi.mock("@/shared/storage/indexeddb/dexieClient", () => ({
  db: {
    applicationEvents: {
      where: vi.fn(() => mockWhereClause),
      toArray: vi.fn(),
      add: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("ApplicationEventRepositoryImpl", () => {
  let repository: ApplicationEventRepositoryImpl;

  beforeEach(() => {
    repository = new ApplicationEventRepositoryImpl(db);
    vi.clearAllMocks();
    // Reset the whereClause mock as well
    mockWhereClause.equals.mockReturnThis();
    mockWhereClause.delete.mockResolvedValue(undefined);
  });

  describe("getByApplicationId", () => {
    it("returns mapped application events for a given application ID", async () => {
      const mockRows = [
        {
          id: "1",
          applicationId: "app1",
          type: "status_change",
          title: "Status changed",
          description: "",
          date: "2024-01-01T00:00:00Z",
          createdAt: "2024-01-01T00:00:00Z",
        },
        {
          id: "2",
          applicationId: "app1",
          type: "interview",
          title: "Interview",
          description: "",
          date: "2024-01-02T00:00:00Z",
          createdAt: "2024-01-02T00:00:00Z",
        },
      ];
      (mockWhereClause.toArray as Mock).mockResolvedValue(mockRows);

      const events = await repository.getByApplicationId("app1");
      expect(db.applicationEvents.where).toHaveBeenCalledWith("applicationId");
      expect(mockWhereClause.equals).toHaveBeenCalledWith("app1");
      expect(mockWhereClause.toArray).toHaveBeenCalled();
      expect(events).toEqual(mockRows.map((row) => mapRowToApplicationEvent(row)));
    });

    it("returns an empty array if no events found for the application ID", async () => {
      (mockWhereClause.toArray as Mock).mockResolvedValue([]);

      const events = await repository.getByApplicationId("nonexistent-app");
      expect(db.applicationEvents.where).toHaveBeenCalledWith("applicationId");
      expect(mockWhereClause.equals).toHaveBeenCalledWith("nonexistent-app");
      expect(mockWhereClause.toArray).toHaveBeenCalled();
      expect(events).toEqual([]);
    });
  });

  describe("createEvent", () => {
    it("creates a new application event and returns it", async () => {
      const newEventData: Omit<ApplicationEvent, "id" | "createdAt"> = {
        applicationId: "app1",
        type: "note",
        title: "Added a note",
        description: "This is a note.",
        date: "2024-01-03T00:00:00Z",
        fromStatus: undefined,
        toStatus: undefined,
      };
      (db.applicationEvents.add as Mock).mockResolvedValue(undefined);

      const createdEvent = await repository.createEvent(newEventData);

      expect(db.applicationEvents.add).toHaveBeenCalled();
      expect(createdEvent).toMatchObject({
        ...newEventData,
        id: expect.any(String),
        createdAt: expect.any(String),
      });
    });

    it("handles errors when creating an event", async () => {
      const newEventData: Omit<ApplicationEvent, "id" | "createdAt"> = {
        applicationId: "app1",
        type: "note",
        title: "Added a note",
        description: "This is a note.",
        date: "2024-01-03T00:00:00Z",
        fromStatus: undefined,
        toStatus: undefined,
      };
      (db.applicationEvents.add as Mock).mockRejectedValue(new Error("DB error"));

      await expect(repository.createEvent(newEventData)).rejects.toThrow("DB error");

      expect(db.applicationEvents.add).toHaveBeenCalled();
    });
  });

  describe("updateEvent", () => {
    it("updates an existing application event and returns the updated event", async () => {
      const existingRow = {
        id: "1",
        applicationId: "app1",
        type: "note",
        title: "Old title",
        description: "Old description",
        date: "2024-01-03T00:00:00Z",
        createdAt: "2024-01-03T00:00:00Z",
        fromStatus: null,
        toStatus: null,
      };
      const updatedFields: Partial<Omit<ApplicationEvent, "id" | "applicationId" | "createdAt">> = {
        title: "Updated title",
        description: "Updated description",
      };
      const updatedRow = {
        ...existingRow,
        ...updatedFields,
      };
      (db.applicationEvents.get as Mock).mockResolvedValue(existingRow);
      (db.applicationEvents.put as Mock).mockResolvedValue(undefined);

      const updatedEvent = await repository.updateEvent("1", updatedFields);

      expect(db.applicationEvents.get).toHaveBeenCalledWith("1");
      expect(db.applicationEvents.put).toHaveBeenCalledWith(updatedRow);
      expect(updatedEvent).toEqual(mapRowToApplicationEvent(updatedRow));
    });

    it("returns null if the event to update does not exist", async () => {
      (db.applicationEvents.get as Mock).mockResolvedValue(undefined);

      const updatedEvent = await repository.updateEvent("nonexistent-id", {
        title: "Updated title",
      });

      expect(db.applicationEvents.get).toHaveBeenCalledWith("nonexistent-id");
      expect(updatedEvent).toBeNull();
    });

    it("handles errors when updating an event", async () => {
      const existingRow = {
        id: "1",
        applicationId: "app1",
        type: "note",
        title: "Old title",
        description: "Old description",
        date: "2024-01-03T00:00:00Z",
        createdAt: "2024-01-03T00:00:00Z",
        fromStatus: null,
        toStatus: null,
      };
      (db.applicationEvents.get as Mock).mockResolvedValue(existingRow);
      (db.applicationEvents.put as Mock).mockRejectedValue(new Error("DB error"));

      await expect(repository.updateEvent("1", { title: "Updated title" })).rejects.toThrow(
        "DB error",
      );

      expect(db.applicationEvents.get).toHaveBeenCalledWith("1");
      expect(db.applicationEvents.put).toHaveBeenCalled();
    });
  });
  describe("deleteEvent", () => {
    it("deletes an existing application event", async () => {
      (db.applicationEvents.delete as Mock).mockResolvedValue(undefined);

      await repository.deleteEvent("1");

      expect(db.applicationEvents.delete).toHaveBeenCalledWith("1");
    });

    it("handles errors when deleting an event", async () => {
      (db.applicationEvents.delete as Mock).mockRejectedValue(new Error("DB error"));

      await expect(repository.deleteEvent("1")).rejects.toThrow("DB error");

      expect(db.applicationEvents.delete).toHaveBeenCalledWith("1");
    });
  });

  describe("deleteByApplicationId", () => {
    it("deletes all events for a given application ID", async () => {
      (mockWhereClause.delete as Mock).mockResolvedValue(undefined);

      await repository.deleteByApplicationId("app1");

      expect(db.applicationEvents.where).toHaveBeenCalledWith("applicationId");
      expect(mockWhereClause.equals).toHaveBeenCalledWith("app1");
      expect(mockWhereClause.delete).toHaveBeenCalled();
    });

    it("handles errors when deleting events by application ID", async () => {
      (mockWhereClause.delete as Mock).mockRejectedValue(new Error("DB error"));

      await expect(repository.deleteByApplicationId("app1")).rejects.toThrow("DB error");

      expect(db.applicationEvents.where).toHaveBeenCalledWith("applicationId");
      expect(mockWhereClause.equals).toHaveBeenCalledWith("app1");
      expect(mockWhereClause.delete).toHaveBeenCalled();
    });
  });

  // Additional tests for  deleteEvent, deleteByApplicationId would go here - do tomorrow
});
