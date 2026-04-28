// Job application data types

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  dateApplied: string; // ISO date string
  salaryMin?: number;
  salaryMax?: number;
  location?: ApplicationLocationType;
  jobType?: ApplicationJobType;
  notes?: string;
}

export type ApplicationStatus = "saved" | "applied" | "interviewing" | "offer" | "rejected";

export type ApplicationJobType = "full-time" | "part-time" | "contract" | "internship";

export type ApplicationLocationType = "remote" | "on-site" | "hybrid";

export type ApplicationEventType = "status_change" | "interview" | "note" | "custom";

export interface ApplicationEvent {
  id: string;
  applicationId: string;
  type: ApplicationEventType;
  title: string;
  description?: string;
  date: string; // ISO
  createdAt: string; // ISO
}
