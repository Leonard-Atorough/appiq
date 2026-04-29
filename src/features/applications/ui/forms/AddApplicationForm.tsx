import { useEffect, useState } from "react";
import { Dialog, Button, Input, Select, Textarea } from "@/shared/ui";
import type {
  ApplicationJobType,
  ApplicationLocationType,
  ApplicationStatus,
  JobApplication,
} from "@/entities/application/model/types";

interface AddApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateApplication: (data: Omit<JobApplication, "id">) => Promise<void> | void;
  onUpdateApplication?: (data: Partial<Omit<JobApplication, "id">>) => Promise<void> | void;
  data: JobApplication | null;
}

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "saved", label: "Saved" },
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const LOCATION_OPTIONS: { value: ApplicationLocationType | ""; label: string }[] = [
  { value: "", label: "Not specified" },
  { value: "remote", label: "Remote" },
  { value: "on-site", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
];

const JOB_TYPE_OPTIONS: { value: ApplicationJobType | ""; label: string }[] = [
  { value: "", label: "Not specified" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const EMPTY_FORM = {
  company: "",
  position: "",
  status: "saved" as ApplicationStatus,
  location: "",
  workingStyle: "" as ApplicationLocationType | "",
  jobType: "" as ApplicationJobType | "",
  salaryMin: "",
  salaryMax: "",
  notes: "",
};

function toFormState(app: JobApplication | null): typeof EMPTY_FORM {
  if (!app) return EMPTY_FORM;
  return {
    company: app.company,
    position: app.position,
    status: app.status,
    location: app.location ?? "",
    workingStyle: app.workingStyle ?? "",
    jobType: app.jobType ?? "",
    salaryMin: app.salaryMin != null ? String(app.salaryMin) : "",
    salaryMax: app.salaryMax != null ? String(app.salaryMax) : "",
    notes: app.notes ?? "",
  };
}

export function AddApplicationForm({
  open,
  onOpenChange,
  onCreateApplication,
  onUpdateApplication,
  data,
}: AddApplicationFormProps) {
  const [formData, setFormData] = useState(() => toFormState(data));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) setFormData(toFormState(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, data?.id]);

  const set = <K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!formData.company.trim() || !formData.position.trim()) return;

    const payload = {
      company: formData.company.trim(),
      position: formData.position.trim(),
      status: formData.status,
      location: formData.location || undefined,
      workingStyle: formData.workingStyle || undefined,
      jobType: formData.jobType || undefined,
      salaryMin: formData.salaryMin ? Number(formData.salaryMin) : undefined,
      salaryMax: formData.salaryMax ? Number(formData.salaryMax) : undefined,
      notes: formData.notes.trim() || undefined,
    };

    setIsSubmitting(true);
    try {
      if (data && onUpdateApplication) {
        await onUpdateApplication(payload);
      } else {
        await onCreateApplication({ ...payload, dateApplied: new Date().toISOString() });
      }
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = formData.company.trim().length > 0 && formData.position.trim().length > 0;

  return (
    <Dialog
      size="lg"
      modal
      open={open}
      onOpenChange={onOpenChange}
      title={data ? "Edit Application" : "Add Application"}
      buttonRow={
        <div className="flex gap-sm">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !isValid}>
            {isSubmitting
              ? data
                ? "Saving..."
                : "Creating..."
              : data
                ? "Save Changes"
                : "Create Application"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-md p-md">
        {/* Required fields */}
        <div className="flex gap-md">
          <div className="flex-1 min-w-0">
            <Input
              label="Company"
              placeholder="Acme Corp"
              value={formData.company}
              onChange={(e) => set("company", e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="flex-1 min-w-0">
            <Input
              label="Position"
              placeholder="Senior Engineer"
              value={formData.position}
              onChange={(e) => set("position", e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex gap-md">
          <div className="flex-1 min-w-0">
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) =>
                set(
                  "status",
                  (e as React.ChangeEvent<HTMLSelectElement>).target.value as ApplicationStatus,
                )
              }
              disabled={isSubmitting}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Location + Working Style + Job type */}
        <div className="flex gap-md">
          <div className="flex-1 min-w-0">
            <Input
              label="Location"
              placeholder="e.g. San Francisco, CA"
              value={formData.location}
              onChange={(e) => set("location", e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex-1 min-w-0">
            <Select
              label="Working Style"
              value={formData.workingStyle}
              onChange={(e) =>
                set(
                  "workingStyle",
                  (e as React.ChangeEvent<HTMLSelectElement>).target.value as
                    | ApplicationLocationType
                    | "",
                )
              }
              disabled={isSubmitting}
            >
              {LOCATION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex-1 min-w-0">
            <Select
              label="Job type"
              value={formData.jobType}
              onChange={(e) =>
                set(
                  "jobType",
                  (e as React.ChangeEvent<HTMLSelectElement>).target.value as
                    | ApplicationJobType
                    | "",
                )
              }
              disabled={isSubmitting}
            >
              {JOB_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Salary range */}
        <div className="flex gap-md">
          <div className="flex-1 min-w-0">
            <Input
              label="Salary min"
              placeholder="e.g. 80000"
              type="number"
              min={0}
              value={formData.salaryMin}
              onChange={(e) => set("salaryMin", e.target.value)}
              disabled={isSubmitting}
              startAdornment={<span className="text-sm text-muted">$</span>}
            />
          </div>
          <div className="flex-1 min-w-0">
            <Input
              label="Salary max"
              placeholder="e.g. 120000"
              type="number"
              min={0}
              value={formData.salaryMax}
              onChange={(e) => set("salaryMax", e.target.value)}
              disabled={isSubmitting}
              startAdornment={<span className="text-sm text-muted">$</span>}
            />
          </div>
        </div>

        {/* Notes */}
        <Textarea
          label="Notes"
          placeholder="Any additional context, recruiter name, referral, etc."
          value={formData.notes}
          onChange={(e) => set("notes", e.target.value)}
          disabled={isSubmitting}
          minRows={3}
          autoGrow
          full
        />
      </div>
    </Dialog>
  );
}
