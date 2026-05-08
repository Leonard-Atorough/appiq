import { Button, Flex, Icon } from "@/shared/ui";
import { Card } from "@/shared/ui";
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
    <Card
      size="md"
      interactive={false}
      aria-labelledby="upcoming-interviews-heading"
      className="flex-1 overflow-hidden max-h-96 lg:max-h-none"
    >
      <Flex direction="column" gap="md">
        <h2 id="upcoming-interviews-heading" className="text-lg font-semibold text-primary">
          Upcoming Interviews
        </h2>

        {upcomingInterviews.length === 0 ? (
          <p className="text-sm text-muted">
            No upcoming interviews. Apply to more jobs to see them here!
          </p>
        ) : (
          <ul className="flex flex-col gap-sm w-full overflow-y-auto" role="list">
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
                    <Flex gap="md" align="center">
                      {/* Vertical date block */}
                      {parts ? (
                        <Flex
                          direction="column"
                          align="center"
                          justify="center"
                          className="w-12 shrink-0 text-center"
                        >
                          <span className="text-xl font-bold text-primary leading-none">
                            {parts.day}
                          </span>
                          <span className="text-xs font-medium text-secondary uppercase">
                            {parts.month}
                          </span>
                          <span className="text-xs text-muted">{parts.year}</span>
                        </Flex>
                      ) : (
                        <Flex align="center" justify="center" className="w-12 shrink-0">
                          <Icon name="alert-triangle" size="md" variant="warning" />
                        </Flex>
                      )}

                      {/* Divider */}
                      <div className="w-px self-stretch bg-base shrink-0" aria-hidden="true" />

                      {/* Content */}
                      <Flex direction="column" gap="xs" className="min-w-0 flex-1">
                        <p className="text-sm text-secondary truncate">{interview.company}</p>
                        <p className="text-md font-semibold text-primary truncate">
                          {interview.position}
                        </p>
                        {startTime ? (
                          <p className="text-xs text-muted">
                            {startTime}
                            {endTime ? ` – ${endTime}` : ""}
                          </p>
                        ) : (
                          <p className="text-xs text-warning">No time set</p>
                        )}
                      </Flex>

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
                    </Flex>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </Flex>
    </Card>
  );
}
