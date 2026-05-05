import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import type { ApplicationRow } from "@/shared/storage/db/schema";
import type { JobApplication } from "@/entities";
import {
  mapRowToJobApplication,
  mapJobApplicationToRow,
  mapUpdatedApplicationToRow,
} from "./application.mapper";

describe("Application Mappers", () => {
  const now = "2026-04-29T12:00:00.000Z";

  // Helper factories to reduce repetition
  const createRow = (overrides?: Partial<ApplicationRow>): ApplicationRow => ({
    id: "app-1",
    company: "Acme Corp",
    position: "Senior Engineer",
    status: "applied",
    dateApplied: "2026-04-15T10:00:00.000Z",
    salaryMin: 80000,
    salaryMax: 120000,
    location: "San Francisco, CA",
    workingStyle: "hybrid",
    jobType: "full-time",
    notes: "Great company",
    dateCreated: "2026-04-15T10:00:00.000Z",
    dateUpdated: "2026-04-20T14:30:00.000Z",
    version: 1,
    ...overrides,
  });

  const createApp = (
    overrides?: Partial<Omit<JobApplication, "id">>,
  ): Omit<JobApplication, "id"> => ({
    company: "Acme Corp",
    position: "Senior Engineer",
    status: "applied",
    dateApplied: "2026-04-15T10:00:00.000Z",
    salaryMin: 80000,
    salaryMax: 120000,
    location: "San Francisco, CA",
    workingStyle: "hybrid",
    jobType: "full-time",
    notes: "Great company",
    ...overrides,
  });

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(now));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("mapRowToJobApplication", () => {
    it("should map all fields from database row", () => {
      const row = createRow();
      const result = mapRowToJobApplication(row);

      expect(result).toEqual({
        id: "app-1",
        company: "Acme Corp",
        position: "Senior Engineer",
        status: "applied",
        dateApplied: "2026-04-15T10:00:00.000Z",
        salaryMin: 80000,
        salaryMax: 120000,
        location: "San Francisco, CA",
        workingStyle: "hybrid",
        jobType: "full-time",
        notes: "Great company",
      });
    });

    it("should provide default status when null", () => {
      const result = mapRowToJobApplication(createRow({ status: null }));
      expect(result.status).toBe("applied");
    });

    it("should convert null optional fields to undefined", () => {
      const result = mapRowToJobApplication(
        createRow({
          location: null,
          workingStyle: null,
          jobType: null,
        }),
      );

      expect(result.location).toBeUndefined();
      expect(result.workingStyle).toBeUndefined();
      expect(result.jobType).toBeUndefined();
    });

    it("should preserve zero salary values", () => {
      const result = mapRowToJobApplication(
        createRow({ salaryMin: 0, salaryMax: 0 }),
      );
      expect(result.salaryMin).toBe(0);
      expect(result.salaryMax).toBe(0);
    });

    it.each([
      "saved",
      "applied",
      "interviewing",
      "offer",
      "rejected",
    ] as const)("should map status '%s'", (status) => {
      const result = mapRowToJobApplication(createRow({ status }));
      expect(result.status).toBe(status);
    });

    it.each(["remote", "on-site", "hybrid"] as const)(
      "should map working style '%s'",
      (style) => {
        const result = mapRowToJobApplication(
          createRow({ workingStyle: style }),
        );
        expect(result.workingStyle).toBe(style);
      },
    );
  });

  describe("mapJobApplicationToRow", () => {
    it("should map all fields to database row", () => {
      const app = createApp();
      const result = mapJobApplicationToRow(app);

      expect(result.company).toBe("Acme Corp");
      expect(result.position).toBe("Senior Engineer");
      expect(result.status).toBe("applied");
      expect(result.salaryMin).toBe(80000);
      expect(result.salaryMax).toBe(120000);
      expect(result.location).toBe("San Francisco, CA");
      expect(result.workingStyle).toBe("hybrid");
      expect(result.jobType).toBe("full-time");
      expect(result.notes).toBe("Great company");
    });

    it("should convert undefined salaries to 0", () => {
      const result = mapJobApplicationToRow(
        createApp({ salaryMin: undefined, salaryMax: undefined }),
      );
      expect(result.salaryMin).toBe(0);
      expect(result.salaryMax).toBe(0);
    });

    it("should convert undefined optional fields to null", () => {
      const result = mapJobApplicationToRow(
        createApp({
          location: undefined,
          workingStyle: undefined,
          jobType: undefined,
        }),
      );

      expect(result.location).toBeNull();
      expect(result.workingStyle).toBeNull();
      expect(result.jobType).toBeNull();
    });

    it("should convert undefined notes to empty string", () => {
      const result = mapJobApplicationToRow(createApp({ notes: undefined }));
      expect(result.notes).toBe("");
    });

    it("should set version=1 and current timestamps", () => {
      const result = mapJobApplicationToRow(createApp());
      expect(result.version).toBe(1);
      expect(result.dateCreated).toBe(now);
      expect(result.dateUpdated).toBe(now);
    });

    it.each([
      "full-time",
      "part-time",
      "contract",
      "internship",
    ] as const)("should map job type '%s'", (jobType) => {
      const result = mapJobApplicationToRow(createApp({ jobType }));
      expect(result.jobType).toBe(jobType);
    });
  });

  describe("mapUpdatedApplicationToRow", () => {
    it("should update single field while preserving others", () => {
      const row = createRow();
      const result = mapUpdatedApplicationToRow(row, { status: "interviewing" });

      expect(result.status).toBe("interviewing");
      expect(result.company).toBe("Acme Corp");
      expect(result.position).toBe("Senior Engineer");
    });

    it("should update multiple fields at once", () => {
      const row = createRow();
      const result = mapUpdatedApplicationToRow(row, {
        status: "offer",
        position: "Staff Engineer",
        salaryMin: 120000,
      });

      expect(result.status).toBe("offer");
      expect(result.position).toBe("Staff Engineer");
      expect(result.salaryMin).toBe(120000);
      expect(result.company).toBe("Acme Corp"); // unchanged
    });

    it("should increment version and update dateUpdated", () => {
      const row = createRow({ version: 2 });
      const result = mapUpdatedApplicationToRow(row, { status: "offer" });

      expect(result.version).toBe(3);
      expect(result.dateUpdated).toBe(now);
      expect(result.dateCreated).toBe(row.dateCreated); // preserved
    });

    it("should preserve id and metadata fields", () => {
      const row = createRow({
        id: "app-999",
        dateCreated: "2026-01-01T00:00:00.000Z",
      });
      const result = mapUpdatedApplicationToRow(row, {
        company: "New Company",
      });

      expect(result.id).toBe("app-999");
      expect(result.dateCreated).toBe("2026-01-01T00:00:00.000Z");
    });

    it("should handle empty updates (only version and timestamp change)", () => {
      const row = createRow({ version: 5 });
      const result = mapUpdatedApplicationToRow(row, {});

      expect(result.version).toBe(6);
      expect(result.dateUpdated).toBe(now);
      // Other fields should remain unchanged
      expect(result.company).toBe(row.company);
      expect(result.position).toBe(row.position);
      expect(result.status).toBe(row.status);
      expect(result.id).toBe(row.id);
      expect(result.dateCreated).toBe(row.dateCreated);
    });

    it("should convert dateApplied when updating", () => {
      const row = createRow();
      const newDate = "2026-05-01T12:00:00.000Z";
      const result = mapUpdatedApplicationToRow(row, { dateApplied: newDate });

      expect(result.dateApplied).toBe(newDate);
    });

    it("should support successive updates with version tracking", () => {
      let row = createRow({ version: 1 });

      row = mapUpdatedApplicationToRow(row, { status: "interviewing" });
      expect(row.version).toBe(2);

      row = mapUpdatedApplicationToRow(row, { status: "offer" });
      expect(row.version).toBe(3);

      row = mapUpdatedApplicationToRow(row, { status: "rejected" });
      expect(row.version).toBe(4);
    });
  });

  describe("round-trip mapping", () => {
    it("should maintain data integrity row -> app -> row", () => {
      const originalRow: ApplicationRow = {
        id: "app-1",
        company: "Acme Corp",
        position: "Senior Engineer",
        status: "interviewing",
        dateApplied: "2026-04-15T10:00:00.000Z",
        salaryMin: 90000,
        salaryMax: 130000,
        location: "San Francisco, CA",
        workingStyle: "hybrid",
        jobType: "full-time",
        notes: "Test notes",
        dateCreated: "2026-04-15T10:00:00.000Z",
        dateUpdated: "2026-04-20T14:30:00.000Z",
        version: 2,
      };

      const app = mapRowToJobApplication(originalRow);
      const newRow = mapJobApplicationToRow(app);

      expect(newRow.company).toBe(originalRow.company);
      expect(newRow.position).toBe(originalRow.position);
      expect(newRow.status).toBe(originalRow.status);
      expect(newRow.dateApplied).toBe(originalRow.dateApplied);
      expect(newRow.salaryMin).toBe(originalRow.salaryMin);
      expect(newRow.salaryMax).toBe(originalRow.salaryMax);
      expect(newRow.location).toBe(originalRow.location);
      expect(newRow.workingStyle).toBe(originalRow.workingStyle);
      expect(newRow.jobType).toBe(originalRow.jobType);
      expect(newRow.notes).toBe(originalRow.notes);
    });

    it("should handle null -> undefined -> null conversions correctly", () => {
      const rowWithNulls: ApplicationRow = {
        id: "app-1",
        company: "Test",
        position: "Dev",
        status: "applied",
        dateApplied: "2026-04-15T10:00:00.000Z",
        salaryMin: 0,
        salaryMax: 0,
        location: null,
        workingStyle: null,
        jobType: null,
        notes: "",
        dateCreated: "2026-04-15T10:00:00.000Z",
        dateUpdated: "2026-04-15T10:00:00.000Z",
        version: 1,
      };

      const app = mapRowToJobApplication(rowWithNulls);
      expect(app.location).toBeUndefined();
      expect(app.workingStyle).toBeUndefined();
      expect(app.jobType).toBeUndefined();

      const newRow = mapJobApplicationToRow(app);
      expect(newRow.location).toBeNull();
      expect(newRow.workingStyle).toBeNull();
      expect(newRow.jobType).toBeNull();
    });
  });
});
