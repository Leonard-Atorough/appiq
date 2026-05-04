import { Button, Icon } from "@/shared/ui";
import { Card } from "@/shared/ui/Card/Card";
import { formatDateParts, formatTime } from "@/features/applications/lib/applicationFormatters";
import type { JobApplication } from "@/entities";

interface UpcomingInterviewsPanelProps {
  upcomingInterviews: JobApplication[];
  onNavigate?: (id: string) => void;
}

export function UpcomingInterviewsPanel({
  upcomingInterviews,
  onNavigate,
}: UpcomingInterviewsPanelProps) {
  return (
    <Card size="md" interactive={false} className="h-full">
      <div className="flex flex-col gap-md h-full">
        <h2 className="text-lg font-semibold text-primary">Upcoming Interviews</h2>

        {upcomingInterviews.length === 0 ? (
          <p className="text-sm text-muted">
            No upcoming interviews. Apply to more jobs to see them here!
          </p>
        ) : (
          <ul className="flex flex-col gap-sm" role="list">
            {upcomingInterviews.map((interview) => {
              const parts = interview.interviewStartDate
                ? formatDateParts(interview.interviewStartDate)
                : null;
              const startTime = interview.interviewStartDate
                ? formatTime(interview.interviewStartDate)
                : null;
              const endTime = interview.interviewEndDate
                ? formatTime(interview.interviewEndDate)
                : null;

              return (
                <li key={interview.id} role="listitem">
                  <Card size="sm" interactive={false}>
                    <div className="flex items-center gap-md">
                      {/* Vertical date block */}
                      {parts ? (
                        <div className="flex flex-col items-center justify-center w-12 shrink-0 text-center">
                          <span className="text-xl font-bold text-primary leading-none">
                            {parts.day}
                          </span>
                          <span className="text-xs font-medium text-secondary uppercase">
                            {parts.month}
                          </span>
                          <span className="text-xs text-muted">{parts.year}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-12 shrink-0">
                          <Icon name="alert-triangle" size="md" variant="warning" />
                        </div>
                      )}

                      {/* Divider */}
                      <div className="w-px self-stretch bg-base shrink-0" aria-hidden="true" />

                      {/* Content */}
                      <div className="flex flex-col gap-xs min-w-0 flex-1">
                        <p className="text-sm text-secondary truncate">{interview.company}</p>
                        <p className="text-md font-semibold text-primary truncate">
                          {interview.position}
                        </p>
                        {startTime ? (
                          <p className="text-xs text-muted">
                            {startTime}
                            {endTime ? ` \u2013 ${endTime}` : ""}
                          </p>
                        ) : (
                          <p className="text-xs text-warning">No time set</p>
                        )}
                      </div>

                      {/* Navigate action */}
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => onNavigate?.(interview.id)}
                        aria-label={`View details for ${interview.position} at ${interview.company}`}
                        className="shrink-0"
                      >
                        <Icon name="chevron-right" size="md" />
                      </Button>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Card>
  );
}
