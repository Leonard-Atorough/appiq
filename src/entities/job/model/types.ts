export interface Job {
  id: string;
  title: string;
  company: string;
  location: JobLocationType;
  jobType: JobType;
  salaryMin?: number;
  salaryMax?: number;
  description?: string;
}

export type JobLocationType = "remote" | "onsite" | "hybrid";
export type JobType = "full-time" | "part-time" | "contract" | "internship";
