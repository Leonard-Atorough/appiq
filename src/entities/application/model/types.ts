// Job application data types

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  appliedDate: string; // ISO date string
  salaryMin?: number;
  salaryMax?: number;
  location?: ApplicationLocationType;
  jobType?: ApplicationJobType;
  notes?: string;
}

export type ApplicationStatus = "applied" | "interviewing" | "offer" | "rejected";

export type ApplicationJobType = "full-time" | "part-time" | "contract" | "internship";

export type ApplicationLocationType = "remote" | "on-site" | "hybrid";
