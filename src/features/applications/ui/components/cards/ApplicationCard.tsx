import { Card } from "@/shared/ui/Card";
import { Tag, Dropdown, Icon } from "@/shared/ui";
import type { JobApplication, ApplicationStatus } from "@/entities";
import { formatDate, formatSalary } from "../../../lib/applicationFormatters";

interface ApplicationCardProps {
  application: JobApplication;
  onDelete: (id: string) => void;
  onEdit?: (application: JobApplication) => void;
  onNavigate?: (id: string) => void;
}

const statusCardAccent: Record<
  ApplicationStatus,
  "none" | "info" | "warning" | "success" | "error"
> = {
  saved: "none",
  applied: "info",
  interviewing: "warning",
  offer: "success",
  rejected: "error",
};

const jobTypeLabel: Record<NonNullable<JobApplication["jobType"]>, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const workingStyleLabel: Record<NonNullable<JobApplication["workingStyle"]>, string> = {
  remote: "Remote",
  "on-site": "On-site",
  hybrid: "Hybrid",
};

export function ApplicationCard({
  application,
  onDelete,
  onEdit,
  onNavigate,
}: ApplicationCardProps) {
  const {
    position,
    company,
    status,
    dateApplied,
    interviewStartDate,
    location,
    workingStyle,
    jobType,
    salaryMin,
    salaryMax,
  } = application;
  const hasSalary = salaryMin != null && salaryMax != null && (salaryMin > 0 || salaryMax > 0);
  const hasMeta = location || workingStyle || jobType || hasSalary;

  return (
    <>
      <Card
        size="sm"
        status={statusCardAccent[status]}
        dragId={application.id}
        dragType="application-card"
        data-testid="application-card"
      >
        <div className="flex flex-col gap-sm">
          {/* Title row: position + actions menu */}
          <div className="flex items-start justify-between gap-sm">
            <button
              onClick={() => onNavigate?.(application.id)}
              className="flex flex-col gap-xs min-w-0 text-left hover:opacity-80 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`View details for ${position} at ${company}`}
            >
              <p className="text-base font-semibold text-primary leading-snug line-clamp-2">
                {position}
              </p>
              <p className="text-sm font-medium text-secondary truncate">{company}</p>
              {/* location */}
              {location && <p className="text-sm text-muted truncate">{location}</p>}
            </button>
            <div className="shrink-0 -mt-xs -mr-xs">
              <Dropdown
                items={[
                  {
                    label: "Edit",
                    icon: <Icon name="edit" size="sm" />,
                    onClick: () => onEdit?.(application),
                  },
                  {
                    label: "Delete",
                    icon: <Icon name="delete" size="sm" />,
                    variant: "danger",
                    onClick: () => onDelete(application.id),
                  },
                ]}
              />
            </div>
          </div>

          {/* Date applied */}
          <p className="text-xs text-muted">Applied {formatDate(dateApplied)}</p>

          {/* Interview date or warning */}
          {status === "interviewing" && (
            interviewStartDate ? (
              <p className="text-xs text-success flex items-center gap-xs">
                <Icon name="calendar" size="xs" />
                Interview: {formatDate(interviewStartDate)}
              </p>
            ) : (
              <p className="text-xs text-error flex items-center gap-xs">
                <Icon name="alert-triangle" size="xs" />
                No interview date set
              </p>
            )
          )}

          {/* Meta tags: location, working style, job type, salary */}
          {hasMeta && (
            <div className="flex flex-wrap gap-xs pt-xs border-t border-base">
              {workingStyle && (
                <Tag color="default" size="sm" outlined rounded={false} label={workingStyleLabel[workingStyle]} />
              )}
              {jobType && (
                <Tag color="default" size="sm" outlined rounded={false} label={jobTypeLabel[jobType]} />
              )}
              {hasSalary && (
                <span className="text-xs text-muted self-center">
                  {formatSalary(salaryMin!, salaryMax!)}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
