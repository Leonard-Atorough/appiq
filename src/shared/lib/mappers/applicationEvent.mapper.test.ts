import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import type { ApplicationEventRow } from "@/shared/storage/db/schema";
import type { ApplicationEvent } from "@/entities";
import {
  mapRowToApplicationEvent,
  mapApplicationEventToRow,
  mapUpdatedApplicationEventToRow,
} from "./applicationEvent.mapper";

describe("ApplicationEvent Mappers", () => {
  const now = "2026-04-29T12:00:00.000Z";
  const eventDate = "2026-04-20T14:30:00.000Z";

  // Helper factories to reduce repetition
  const createRow = (overrides?: Partial<ApplicationEventRow>): ApplicationEventRow => ({
    id: "event-1",
    applicationId: "app-1",
    type: "status_change",
    title: "Application Submitted",
    description: "Successfully submitted to Acme Corp",
    date: eventDate,
    createdAt: now,
    ...overrides,
  });

  const createEvent = (
    overrides?: Partial<Omit<ApplicationEvent, "id" | "createdAt">>,
  ): Omit<ApplicationEvent, "id" | "createdAt"> => ({
    applicationId: "app-1",
    type: "status_change",
    title: "Application Submitted",
    description: "Successfully submitted to Acme Corp",
    date: eventDate,
    ...overrides,
  });

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(now));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("mapRowToApplicationEvent", () => {
    it("should map all fields from database row", () => {
      const row = createRow();
      const result = mapRowToApplicationEvent(row);

      expect(result).toEqual({
        id: "event-1",
        applicationId: "app-1",
        type: "status_change",
        title: "Application Submitted",
        description: "Successfully submitted to Acme Corp",
        date: eventDate,
        createdAt: now,
      });
    });

    it("should convert empty description to undefined", () => {
      const row = createRow({ description: "" });
      const result = mapRowToApplicationEvent(row);

      expect(result.description).toBeUndefined();
    });

    it("should preserve non-empty description", () => {
      const row = createRow({ description: "Interview scheduled" });
      const result = mapRowToApplicationEvent(row);

      expect(result.description).toBe("Interview scheduled");
    });

    it("should map all event types", () => {
      const eventTypes = ["status_change", "interview", "note", "custom"] as const;

      eventTypes.forEach((eventType) => {
        const row = createRow({ type: eventType });
        const result = mapRowToApplicationEvent(row);
        expect(result.type).toBe(eventType);
      });
    });

    it("should preserve id and applicationId", () => {
      const row = createRow({
        id: "event-999",
        applicationId: "app-888",
      });
      const result = mapRowToApplicationEvent(row);

      expect(result.id).toBe("event-999");
      expect(result.applicationId).toBe("app-888");
    });

    it("should preserve date and createdAt fields", () => {
      const row = createRow({
        date: "2026-05-15T10:00:00.000Z",
        createdAt: "2026-04-15T08:30:00.000Z",
      });
      const result = mapRowToApplicationEvent(row);

      expect(result.date).toBe("2026-05-15T10:00:00.000Z");
      expect(result.createdAt).toBe("2026-04-15T08:30:00.000Z");
    });
  });

  describe("mapApplicationEventToRow", () => {
    it("should map all fields to database row", () => {
      const event = createEvent();
      const result = mapApplicationEventToRow(event);

      expect(result).toEqual({
        applicationId: "app-1",
        type: "status_change",
        title: "Application Submitted",
        description: "Successfully submitted to Acme Corp",
        date: eventDate,
        createdAt: now,
      });
    });

    it("should convert undefined description to empty string", () => {
      const event = createEvent({ description: undefined });
      const result = mapApplicationEventToRow(event);

      expect(result.description).toBe("");
    });

    it("should preserve non-empty description", () => {
      const event = createEvent({ description: "Phone screening tomorrow" });
      const result = mapApplicationEventToRow(event);

      expect(result.description).toBe("Phone screening tomorrow");
    });

    it("should set createdAt to current time", () => {
      const event = createEvent();
      const result = mapApplicationEventToRow(event);

      expect(result.createdAt).toBe(now);
    });

    it("should convert date to ISO string", () => {
      const event = createEvent({ date: "2026-05-10T15:00:00.000Z" });
      const result = mapApplicationEventToRow(event);

      expect(result.date).toBe("2026-05-10T15:00:00.000Z");
    });

    it("should map all event types", () => {
      const eventTypes = ["status_change", "interview", "note", "custom"] as const;

      eventTypes.forEach((eventType) => {
        const event = createEvent({ type: eventType });
        const result = mapApplicationEventToRow(event);
        expect(result.type).toBe(eventType);
      });
    });

    it("should preserve applicationId and title", () => {
      const event = createEvent({
        applicationId: "app-555",
        title: "Interview Round 2",
      });
      const result = mapApplicationEventToRow(event);

      expect(result.applicationId).toBe("app-555");
      expect(result.title).toBe("Interview Round 2");
    });
  });

  describe("mapUpdatedApplicationEventToRow", () => {
    it("should update single field while preserving others", () => {
      const row = createRow();
      const result = mapUpdatedApplicationEventToRow(row, { title: "Rejected" });

      expect(result.title).toBe("Rejected");
      expect(result.type).toBe("status_change");
      expect(result.description).toBe("Successfully submitted to Acme Corp");
      expect(result.applicationId).toBe("app-1");
    });

    it("should update multiple fields at once", () => {
      const row = createRow();
      const result = mapUpdatedApplicationEventToRow(row, {
        type: "interview",
        title: "Phone Interview Scheduled",
        description: "10am EST with hiring manager",
      });

      expect(result.type).toBe("interview");
      expect(result.title).toBe("Phone Interview Scheduled");
      expect(result.description).toBe("10am EST with hiring manager");
      expect(result.date).toBe(row.date);
    });

    it("should preserve id, applicationId, and createdAt", () => {
      const createdAt = "2026-04-15T08:00:00.000Z";
      const row = createRow({
        id: "event-999",
        applicationId: "app-888",
        createdAt,
      });
      const result = mapUpdatedApplicationEventToRow(row, { title: "Updated" });

      expect(result.id).toBe("event-999");
      expect(result.applicationId).toBe("app-888");
      expect(result.createdAt).toBe(createdAt);
    });

    it("should update date and preserve when not updating", () => {
      const row = createRow({ date: eventDate });
      const result1 = mapUpdatedApplicationEventToRow(row, {
        date: "2026-06-01T12:00:00.000Z",
      });
      expect(result1.date).toBe("2026-06-01T12:00:00.000Z");

      const result2 = mapUpdatedApplicationEventToRow(row, { title: "Updated" });
      expect(result2.date).toBe(eventDate);
    });

    it("should handle empty updates (preserves all fields)", () => {
      const row = createRow();
      const result = mapUpdatedApplicationEventToRow(row, {});

      expect(result).toEqual(row);
    });

    it("should clear description when set to empty string", () => {
      const row = createRow({ description: "Original description" });
      const result = mapUpdatedApplicationEventToRow(row, { description: "" });

      expect(result.description).toBe("");
    });

    it("should support successive updates", () => {
      let row = createRow();

      row = mapUpdatedApplicationEventToRow(row, { type: "interview" });
      expect(row.type).toBe("interview");

      row = mapUpdatedApplicationEventToRow(row, { title: "First Round" });
      expect(row.title).toBe("First Round");

      row = mapUpdatedApplicationEventToRow(row, { description: "Passed!" });
      expect(row.description).toBe("Passed!");
      expect(row.type).toBe("interview");
    });

    it("should handle all event types in updates", () => {
      const eventTypes = ["status_change", "interview", "note", "custom"] as const;
      const row = createRow();

      eventTypes.forEach((eventType) => {
        const result = mapUpdatedApplicationEventToRow(row, { type: eventType });
        expect(result.type).toBe(eventType);
        expect(result.id).toBe(row.id);
      });
    });
  });

  describe("round-trip mapping", () => {
    it("should maintain data integrity row -> event -> row", () => {
      const originalRow = createRow();
      const event = mapRowToApplicationEvent(originalRow);
      const reconstructed = mapApplicationEventToRow({
        applicationId: event.applicationId,
        type: event.type,
        title: event.title,
        description: event.description,
        date: event.date,
      });

      // Should match original (createdAt matches because we set it to 'now')
      expect(reconstructed).toEqual({
        applicationId: originalRow.applicationId,
        type: originalRow.type,
        title: originalRow.title,
        description: originalRow.description,
        date: originalRow.date,
        createdAt: now,
      });
    });

    it("should handle undefined description -> empty string -> undefined round-trip", () => {
      // Start with row that has empty description
      const rowWithEmpty = createRow({ description: "" });
      const event = mapRowToApplicationEvent(rowWithEmpty);
      expect(event.description).toBeUndefined();

      // Convert back with undefined
      const reconstructed = mapApplicationEventToRow({
        applicationId: event.applicationId,
        type: event.type,
        title: event.title,
        description: event.description,
        date: event.date,
      });
      expect(reconstructed.description).toBe("");

      // Convert back to event (should be undefined again)
      const finalEvent = mapRowToApplicationEvent({
        ...reconstructed,
        id: "event-2",
        createdAt: now,
      });
      expect(finalEvent.description).toBeUndefined();
    });

    it("should preserve description through round-trip", () => {
      const description = "Offer received: $150k + equity";
      const row = createRow({ description });
      const event = mapRowToApplicationEvent(row);
      const reconstructed = mapApplicationEventToRow({
        applicationId: event.applicationId,
        type: event.type,
        title: event.title,
        description: event.description,
        date: event.date,
      });

      expect(reconstructed.description).toBe(description);
    });
  });
});
