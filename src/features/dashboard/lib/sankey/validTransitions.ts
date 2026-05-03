import type { ApplicationStatus } from "@/entities";

/**
 * Defines the only permitted forward directions in the application pipeline.
 * Any status_change event that does not follow these edges is ignored when
 * building Sankey link data.
 */
export const VALID_TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  saved: ["applied"],
  applied: ["interviewing", "rejected"],
  interviewing: ["offer", "rejected"],
  offer: [],
  rejected: [],
};

export function isValidTransition(from: ApplicationStatus, to: ApplicationStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}
