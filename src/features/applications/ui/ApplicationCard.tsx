import { Card } from "@/shared/ui/Card";
import { Badge, Dropdown, Icon } from "@/shared/ui";
import type { JobApplication, ApplicationStatus } from "@/entities";

interface ApplicationCardProps {
  application: JobApplication;
  onDelete: (id: string) => void;
  onEdit?: (application: JobApplication) => void;
}

const statusCardAccent: Record<ApplicationStatus, "none" | "info" | "warning" | "success" | "error"> = {
  saved: "none",
  applied: "info",
  interviewing: "warning",
  offer: "success",
  rejected: "error",
};

const jobTypeLabel: Record<NonNullable<JobApplication["jobType"]>, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "contract": "Contract",
  "internship": "Internship",
};

const locationLabel: Record<NonNullable<JobApplication["location"]>, string> = {
  "remote": "Remote",
  "on-site": "On-site",
  "hybrid": "Hybrid",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatSalary(min: number, max: number) {
  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
  return `${fmt(min)} – ${fmt(max)}`;
}

export function ApplicationCard({ application, onDelete, onEdit }: ApplicationCardProps) {
  const { position, company, status, dateApplied, location, jobType, salaryMin, salaryMax } = application;
  const hasSalary = salaryMin != null && salaryMax != null && (salaryMin > 0 || salaryMax > 0);
  const hasMeta = location || jobType || hasSalary;

  return (
    <Card size="sm" interactive={false} status={statusCardAccent[status]} dragId={application.id} dragType="application-card">
        <div className="flex flex-col gap-sm">

          {/* Title row: position + actions menu */}
          <div className="flex items-start justify-between gap-sm">
            <div className="flex flex-col gap-xs min-w-0">
              <p className="text-sm font-semibold text-primary leading-snug line-clamp-2">
                {position}
              </p>
              <p className="text-xs font-medium text-secondary truncate">
                {company}
              </p>
            </div>
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
          <p className="text-xs text-muted">
            Applied {formatDate(dateApplied)}
          </p>

          {/* Meta tags: location, job type, salary */}
          {hasMeta && (
            <div className="flex flex-wrap gap-xs pt-xs border-t border-base">
              {location && (
                <Badge variant="default" size="sm" outline rounded={false}>
                  {locationLabel[location]}
                </Badge>
              )}
              {jobType && (
                <Badge variant="default" size="sm" outline rounded={false}>
                  {jobTypeLabel[jobType]}
                </Badge>
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
  );
}
