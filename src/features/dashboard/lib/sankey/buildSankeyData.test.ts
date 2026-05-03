import { describe, it, expect } from "vitest";
import { buildSankeyData } from "./buildSankeyData";
import { SANKEY_NODES } from "./sankeyTypes";
import type { ApplicationEvent, ApplicationStatus } from "@/entities";

describe("buildSankeyData", () => {
  const createEvent = (
    appId: string,
    from: string,
    to: string,
    date: string = "2024-01-01T12:00:00Z",
  ): ApplicationEvent => ({
    id: `event-${Math.random()}`,
    applicationId: appId,
    type: "status_change",
    title: `Status changed to ${to}`,
    date,
    createdAt: "2024-01-01T00:00:00Z",
    fromStatus: from as ApplicationStatus,
    toStatus: to as ApplicationStatus,
  });

  describe("node structure", () => {
    it("always includes all pipeline nodes", () => {
      const data = buildSankeyData([]);
      expect(data.nodes).toHaveLength(SANKEY_NODES.length);
      expect(data.nodes.map((n) => n.id)).toEqual(SANKEY_NODES);
    });

    it("sets label for each node", () => {
      const data = buildSankeyData([]);
      for (const node of data.nodes) {
        expect(node.label).toBeTruthy();
      }
    });
  });

  describe("link deduplication", () => {
    it("returns empty links for empty events", () => {
      const data = buildSankeyData([]);
      expect(data.links).toEqual([]);
    });

    it("creates one link per valid transition", () => {
      const events: ApplicationEvent[] = [
        createEvent("app-1", "saved", "applied"),
        createEvent("app-1", "applied", "interviewing"),
      ];
      const data = buildSankeyData(events);
      expect(data.links).toHaveLength(2);
      expect(data.links.map((l) => `${l.source}→${l.target}`)).toEqual([
        "saved→applied",
        "applied→interviewing",
      ]);
    });

    it("deduplicates same edge within one application", () => {
      const events: ApplicationEvent[] = [
        createEvent("app-1", "applied", "interviewing", "2024-01-01T10:00:00Z"),
        createEvent("app-1", "applied", "interviewing", "2024-01-02T10:00:00Z"),
      ];
      const data = buildSankeyData(events);
      expect(data.links).toHaveLength(1);
      expect(data.links[0]).toEqual({
        source: "applied",
        target: "interviewing",
        value: 1,
      });
    });

    it("deduplicates bounces (A→B→A→B counts as one A→B)", () => {
      const events: ApplicationEvent[] = [
        createEvent("app-1", "applied", "interviewing", "2024-01-01T10:00:00Z"),
        createEvent("app-1", "interviewing", "applied", "2024-01-02T10:00:00Z"), // Invalid, ignored
        createEvent("app-1", "applied", "interviewing", "2024-01-03T10:00:00Z"), // Same edge, already counted
      ];
      const data = buildSankeyData(events);
      expect(data.links).toHaveLength(1);
      expect(data.links[0].value).toBe(1);
    });

    it("counts distinct applications per edge", () => {
      const events: ApplicationEvent[] = [
        createEvent("app-1", "applied", "interviewing"),
        createEvent("app-2", "applied", "interviewing"),
        createEvent("app-3", "applied", "interviewing"),
      ];
      const data = buildSankeyData(events);
      expect(data.links).toHaveLength(1);
      expect(data.links[0].value).toBe(3);
    });

    it("accumulates edge counts across multiple transitions", () => {
      const events: ApplicationEvent[] = [
        createEvent("app-1", "applied", "interviewing"),
        createEvent("app-2", "applied", "interviewing"),
        createEvent("app-3", "applied", "rejected"),
        createEvent("app-4", "applied", "rejected"),
        createEvent("app-5", "applied", "rejected"),
      ];
      const data = buildSankeyData(events);
      const interviewingLink = data.links.find(
        (l) => l.source === "applied" && l.target === "interviewing",
      );
      const rejectedLink = data.links.find(
        (l) => l.source === "applied" && l.target === "rejected",
      );

      expect(interviewingLink?.value).toBe(2);
      expect(rejectedLink?.value).toBe(3);
    });
  });

  describe("event filtering", () => {
    it("ignores non-status_change events", () => {
      const events: ApplicationEvent[] = [
        {
          id: "evt-1",
          applicationId: "app-1",
          type: "interview" as const, // Not a status_change, should be ignored
          title: "Interview scheduled",
          date: "2024-01-01T12:00:00Z",
          createdAt: "2024-01-01T00:00:00Z",
          fromStatus: "applied" as ApplicationStatus,
          toStatus: "interviewing" as ApplicationStatus,
        },
      ];
      const data = buildSankeyData(events);
      expect(data.links).toEqual([]);
    });

    it("ignores events without fromStatus", () => {
      const events: ApplicationEvent[] = [
        {
          id: "evt-1",
          applicationId: "app-1",
          type: "status_change",
          title: "Status changed",
          date: "2024-01-01T12:00:00Z",
          createdAt: "2024-01-01T00:00:00Z",
          toStatus: "interviewing",
        } as ApplicationEvent,
      ];
      const data = buildSankeyData(events);
      expect(data.links).toEqual([]);
    });

    it("ignores events without toStatus", () => {
      const events: ApplicationEvent[] = [
        {
          id: "evt-1",
          applicationId: "app-1",
          type: "status_change",
          title: "Status changed",
          date: "2024-01-01T12:00:00Z",
          createdAt: "2024-01-01T00:00:00Z",
          fromStatus: "applied",
        } as ApplicationEvent,
      ];
      const data = buildSankeyData(events);
      expect(data.links).toEqual([]);
    });

    it("ignores invalid transitions", () => {
      const events: ApplicationEvent[] = [
        createEvent("app-1", "interviewing", "applied"), // Backward, invalid
        createEvent("app-1", "offer", "rejected"), // Terminal, invalid
      ];
      const data = buildSankeyData(events);
      expect(data.links).toEqual([]);
    });
  });

  describe("chronological ordering", () => {
    it("processes events in date order within each application", () => {
      // Create events out of chronological order, but they should be reordered
      const events: ApplicationEvent[] = [
        createEvent("app-1", "applied", "interviewing", "2024-01-03T10:00:00Z"),
        createEvent("app-1", "saved", "applied", "2024-01-01T10:00:00Z"),
        createEvent("app-1", "interviewing", "offer", "2024-01-05T10:00:00Z"),
        createEvent("app-1", "applied", "interviewing", "2024-01-02T10:00:00Z"),
      ];
      const data = buildSankeyData(events);

      // Should deduplicate based on chronological processing
      // First valid edge encountered per app is saved→applied
      // Second is applied→interviewing (encountered twice, deduplicated)
      // Third is interviewing→offer
      expect(data.links).toContainEqual(
        expect.objectContaining({ source: "saved", target: "applied", value: 1 }),
      );
      expect(data.links).toContainEqual(
        expect.objectContaining({ source: "applied", target: "interviewing", value: 1 }),
      );
      expect(data.links).toContainEqual(
        expect.objectContaining({ source: "interviewing", target: "offer", value: 1 }),
      );
    });
  });

  describe("complex scenarios", () => {
    it("handles mixed valid and invalid transitions", () => {
      const events: ApplicationEvent[] = [
        createEvent("app-1", "saved", "applied"),
        createEvent("app-1", "applied", "interviewing"),
        createEvent("app-1", "interviewing", "applied"), // Invalid backward, ignored
        createEvent("app-1", "applied", "rejected"), // Same edge as a valid one, but should deduplicate
        createEvent("app-2", "applied", "interviewing"),
        createEvent("app-2", "interviewing", "offer"),
      ];
      const data = buildSankeyData(events);

      const savedToApplied = data.links.find((l) => l.source === "saved" && l.target === "applied");
      const appliedToInterviewing = data.links.find(
        (l) => l.source === "applied" && l.target === "interviewing",
      );
      const appliedToRejected = data.links.find(
        (l) => l.source === "applied" && l.target === "rejected",
      );
      const interviewingToOffer = data.links.find(
        (l) => l.source === "interviewing" && l.target === "offer",
      );

      expect(savedToApplied?.value).toBe(1);
      expect(appliedToInterviewing?.value).toBe(2);
      expect(appliedToRejected?.value).toBe(1);
      expect(interviewingToOffer?.value).toBe(1);
    });
  });
});
