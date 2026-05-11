import { Tag, Button, Icon } from "@/shared/ui";
import type { JobApplication, ApplicationStatus } from "@/entities";
import { formatDate, formatTime, formatSalary } from "../../../../lib/applicationFormatters";

const STATUS_VARIANT: Record<
  ApplicationStatus,
  "default" | "info" | "warning" | "success" | "error"
> = {
  saved: "default",
  applied: "info",
  interviewing: "warning",
  offer: "success",
  rejected: "error",
};

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

interface ApplicationInfoZoneProps {
  application: JobApplication;
  onEdit: () => void;
}

export function ApplicationInfoZone({ application, onEdit }: ApplicationInfoZoneProps) {
  const {
    position,
    company,
    status,
    dateApplied,
    interviewStartDate,
    interviewEndDate,
    location,
    workingStyle,
    jobType,
    salaryMin,
    salaryMax,
  } = application;
  const hasSalary = salaryMin != null && salaryMax != null && (salaryMin > 0 || salaryMax > 0);

  return (
    <div className="bg-surface border border-base rounded-xl p-lg shadow-sm hover:shadow-md transition-shadow duration-normal flex flex-col gap-md">
      <div className="flex items-start justify-between gap-md">
        <div className="flex flex-col gap-xs min-w-0">
          <h1 className="text-xl font-bold text-primary leading-tight">{position}</h1>
          <p className="text-base font-medium">{company}</p>
        </div>
        <div className="flex items-center gap-sm shrink-0">
          <Tag color={STATUS_VARIANT[status]} size="md" rounded label={STATUS_LABEL[status]} />
          <Button variant="outline" size="sm" onClick={onEdit}>
            <span className="flex items-center gap-xs">
              <Icon name="edit" size="sm" />
              Edit
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-sm pt-xs border-t border-base">
        <div className="flex items-center gap-xs text-sm text-secondary">
          <Icon name="check-circle" size="sm" variant="muted" />
          Applied {formatDate(dateApplied)}
        </div>
        {status === "interviewing" &&
          (interviewStartDate ? (
            <div className="flex items-center gap-xs text-sm text-success">
              <Icon name="calendar" size="sm" variant="success" />
              Interview: {formatDate(interviewStartDate)}
              {interviewEndDate ? ` – ${formatTime(interviewEndDate)}` : ""}
            </div>
          ) : (
            <div className="flex items-center gap-xs text-sm text-warning">
              <Icon name="alert-triangle" size="sm" variant="warning" />
              No interview date set
            </div>
          ))}
        {location && (
          <Tag color="default" size="sm" outlined rounded={false} label={location} />
        )}
        {workingStyle && (
          <Tag color="default" size="sm" outlined rounded={false} label={workingStyle} />
        )}
        {jobType && (
          <Tag color="default" size="sm" outlined rounded={false} label={jobType} />
        )}
        {hasSalary && (
          <span className="text-sm text-muted">{formatSalary(salaryMin!, salaryMax!)}</span>
        )}
      </div>
    </div>
  );
}
