import { describe, it, expect } from "vitest";
import { isValidTransition, VALID_TRANSITIONS } from "./validTransitions";
import type { ApplicationStatus } from "@/entities";

describe("validTransitions", () => {
  describe("VALID_TRANSITIONS map", () => {
    it("defines transitions for all statuses", () => {
      const statuses: ApplicationStatus[] = ["saved", "applied", "interviewing", "offer", "rejected"];
      for (const status of statuses) {
        expect(VALID_TRANSITIONS).toHaveProperty(status);
        expect(Array.isArray(VALID_TRANSITIONS[status])).toBe(true);
      }
    });

    it("defines forward-only edges", () => {
      expect(VALID_TRANSITIONS.saved).toEqual(["applied"]);
      expect(VALID_TRANSITIONS.applied).toEqual(["interviewing", "rejected"]);
      expect(VALID_TRANSITIONS.interviewing).toEqual(["offer", "rejected"]);
      expect(VALID_TRANSITIONS.offer).toEqual([]);
      expect(VALID_TRANSITIONS.rejected).toEqual([]);
    });
  });

  describe("isValidTransition", () => {
    it("accepts forward transitions", () => {
      expect(isValidTransition("saved", "applied")).toBe(true);
      expect(isValidTransition("applied", "interviewing")).toBe(true);
      expect(isValidTransition("applied", "rejected")).toBe(true);
      expect(isValidTransition("interviewing", "offer")).toBe(true);
      expect(isValidTransition("interviewing", "rejected")).toBe(true);
    });

    it("rejects terminal state transitions", () => {
      expect(isValidTransition("offer", "applied")).toBe(false);
      expect(isValidTransition("offer", "rejected")).toBe(false);
      expect(isValidTransition("rejected", "applied")).toBe(false);
      expect(isValidTransition("rejected", "offer")).toBe(false);
    });

    it("rejects backward transitions", () => {
      expect(isValidTransition("applied", "saved")).toBe(false);
      expect(isValidTransition("interviewing", "applied")).toBe(false);
      expect(isValidTransition("offer", "interviewing")).toBe(false);
    });

    it("rejects lateral transitions", () => {
      expect(isValidTransition("applied", "applied")).toBe(false);
      expect(isValidTransition("rejected", "rejected")).toBe(false);
    });
  });
});
