import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Mock } from "vitest";
import { db } from "@/shared/storage";
import { JobApplicationRepositoryImpl } from "./jobApplication.repository";
import { mapRowToJobApplication } from "@/entities/application";

vi.mock("@/shared/storage/indexeddb/dexieClient", () => ({
  db: {
    applications: {
      toArray: vi.fn(),
      get: vi.fn(),
      add: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("JobApplicationRepositoryImpl", () => {
  let repository: JobApplicationRepositoryImpl;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new JobApplicationRepositoryImpl(db);
  });

  describe("listApplications", () => {
    it("returns all job applications mapped from rows", async () => {
      const mockRows = [
        {
          id: "1",
          company: "Acme Corp",
          position: "Engineer",
          status: "applied" as const,
          dateApplied: "2024-01-01T00:00:00Z",
          notes: "",
          interviewStartDate: null,
          interviewEndDate: null,
          salaryMin: 0,
          salaryMax: 0,
          location: null,
          workingStyle: null,
          jobType: null,
          dateCreated: "2024-01-01T00:00:00Z",
          dateUpdated: "2024-01-01T00:00:00Z",
          version: 1,
        },
        {
          id: "2",
          company: "Tech Inc",
          position: "Manager",
          status: "interviewing" as const,
          dateApplied: "2024-01-02T00:00:00Z",
          notes: "Follow up",
          interviewStartDate: "2024-01-10T10:00:00Z",
          interviewEndDate: null,
          salaryMin: 0,
          salaryMax: 0,
          location: null,
          workingStyle: null,
          jobType: null,
          dateCreated: "2024-01-02T00:00:00Z",
          dateUpdated: "2024-01-02T00:00:00Z",
          version: 1,
        },
      ];
      (db.applications.toArray as Mock).mockResolvedValue(mockRows);

      const result = await repository.listApplications();

      expect(db.applications.toArray).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockRows.map((row) => mapRowToJobApplication(row)));
    });

    it("returns an empty array if no applications exist", async () => {
      (db.applications.toArray as Mock).mockResolvedValue([]);

      const result = await repository.listApplications();

      expect(result).toEqual([]);
    });
  });

  describe("getApplicationById", () => {
    it("returns a mapped job application for a given ID", async () => {
      const mockRow = {
        id: "app-1",
        company: "Tech Corp",
        position: "Senior Engineer",
        status: "interviewing" as const,
        dateApplied: "2024-01-01T00:00:00Z",
        notes: "Pending feedback",
        interviewStartDate: "2024-01-15T10:00:00Z",
        interviewEndDate: null,
        salaryMin: 100000,
        salaryMax: 150000,
        location: "San Francisco, CA",
        workingStyle: "hybrid" as const,
        jobType: "full-time" as const,
        dateCreated: "2024-01-01T00:00:00Z",
        dateUpdated: "2024-01-01T00:00:00Z",
        version: 1,
      };
      (db.applications.get as Mock).mockResolvedValue(mockRow);

      const result = await repository.getApplicationById("app-1");

      expect(db.applications.get).toHaveBeenCalledWith("app-1");
      expect(result).toEqual(mapRowToJobApplication(mockRow));
    });

    it("returns null if the application does not exist", async () => {
      (db.applications.get as Mock).mockResolvedValue(null);

      const result = await repository.getApplicationById("non-existent");

      expect(result).toBeNull();
    });

    it("handles errors when fetching an application", async () => {
      const error = new Error("Database error");
      (db.applications.get as Mock).mockRejectedValue(error);

      await expect(repository.getApplicationById("app-1")).rejects.toThrow("Database error");
    });
  });

  describe("createApplication", () => {
    it("creates a new job application and returns it with generated ID", async () => {
      const newAppData = {
        company: "StartUp Inc",
        position: "Frontend Developer",
        status: "applied" as const,
        dateApplied: "2024-01-15T00:00:00Z",
        notes: "Initial application",
      };
      (db.applications.add as Mock).mockResolvedValue(undefined);

      const result = await repository.createApplication(newAppData);

      expect(db.applications.add).toHaveBeenCalled();
      expect(result.id).toBeDefined();
      expect(result.company).toBe("StartUp Inc");
      expect(result.position).toBe("Frontend Developer");
    });

    it("handles errors when creating an application", async () => {
      const newAppData = {
        company: "Failed Corp",
        position: "Developer",
        status: "applied" as const,
        dateApplied: "2024-01-15T00:00:00Z",
        notes: "",
      };
      const error = new Error("Add failed");
      (db.applications.add as Mock).mockRejectedValue(error);

      await expect(repository.createApplication(newAppData)).rejects.toThrow("Add failed");
    });
  });

  describe("updateApplication", () => {
    it("updates an existing job application and returns the updated application", async () => {
      const existingRow = {
        id: "app-1",
        company: "Tech Corp",
        position: "Engineer",
        status: "applied" as const,
        dateApplied: "2024-01-01T00:00:00Z",
        notes: "Initial notes",
        interviewStartDate: null,
        interviewEndDate: null,
        salaryMin: 0,
        salaryMax: 0,
        location: null,
        workingStyle: null,
        jobType: null,
        dateCreated: "2024-01-01T00:00:00Z",
        dateUpdated: "2024-01-01T00:00:00Z",
        version: 1,
      };
      const updates = { status: "interviewing" as const, notes: "Interview scheduled" };

      (db.applications.get as Mock).mockResolvedValue(existingRow);
      (db.applications.put as Mock).mockResolvedValue(undefined);

      const result = await repository.updateApplication("app-1", updates);

      expect(db.applications.get).toHaveBeenCalledWith("app-1");
      expect(db.applications.put).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "app-1",
          status: "interviewing",
          notes: "Interview scheduled",
          version: 2,
        }),
      );
      expect(result).toMatchObject({
        id: "app-1",
        status: "interviewing",
        notes: "Interview scheduled",
      });
    });

    it("returns null if the application to update does not exist", async () => {
      (db.applications.get as Mock).mockResolvedValue(null);

      const result = await repository.updateApplication("non-existent", { notes: "Updated" });

      expect(result).toBeNull();
      expect(db.applications.put).not.toHaveBeenCalled();
    });

    it("handles errors when updating an application", async () => {
      const existingRow = {
        id: "app-1",
        company: "Tech Corp",
        position: "Engineer",
        status: "applied" as const,
        dateApplied: "2024-01-01T00:00:00Z",
        notes: "Notes",
        interviewStartDate: null,
        interviewEndDate: null,
        salaryMin: 0,
        salaryMax: 0,
        location: null,
        workingStyle: null,
        jobType: undefined,
        dateCreated: "2024-01-01T00:00:00Z",
        dateUpdated: "2024-01-01T00:00:00Z",
        version: 1,
      };
      (db.applications.get as Mock).mockResolvedValue(existingRow);
      const error = new Error("Update failed");
      (db.applications.put as Mock).mockRejectedValue(error);

      await expect(repository.updateApplication("app-1", { status: "rejected" })).rejects.toThrow(
        "Update failed",
      );
    });
  });

  describe("deleteApplication", () => {
    it("deletes an existing job application", async () => {
      (db.applications.delete as Mock).mockResolvedValue(undefined);

      await repository.deleteApplication("app-1");

      expect(db.applications.delete).toHaveBeenCalledWith("app-1");
    });

    it("handles errors when deleting an application", async () => {
      const error = new Error("Delete failed");
      (db.applications.delete as Mock).mockRejectedValue(error);

      await expect(repository.deleteApplication("app-1")).rejects.toThrow("Delete failed");
    });
  });
});
