import { Skeleton, Icon, Flex } from "@/shared/ui";
import { MetricCard } from "../../../components/cards/MetricCard";
import type { DashboardMetrics } from "@/features/dashboard/lib/calculateMetrics";

export function MetricsPanel({
  loading,
  metrics,
}: {
  loading: boolean;
  metrics: DashboardMetrics;
}) {
  return (
    <section aria-labelledby="metrics-heading" className="w-full">
      <h2 id="metrics-heading" className="sr-only">
        Application Metrics
      </h2>
      {loading ? (
        <div className="flex gap-md">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="flex-1 h-28" />
            ))}
        </div>
      ) : (
        <Flex direction="row" gap="lg" fullWidth>
          <MetricCard
            label={metrics.totalApplications === 1 ? "Total Application" : "Total Applications"}
            value={metrics.totalApplications}
            icon={<Icon name="briefcase" size="md" variant="primary" />}
          />
          <MetricCard
            label={
              metrics.applicationsThisMonth === 1
                ? "Application This Month"
                : "Applications This Month"
            }
            value={metrics.applicationsThisMonth}
            icon={<Icon name="check" size="sm" variant="success" />}
          />
          <MetricCard
            label={
              metrics.interviewsScheduled === 1 ? "Interview Scheduled" : "Interviews Scheduled"
            }
            value={metrics.interviewsScheduled}
            icon={<Icon name="info" size="sm" variant="info" />}
          />
          <MetricCard
            label={metrics.offersReceived === 1 ? "Offer Received" : "Offers Received"}
            value={metrics.offersReceived}
            icon={<Icon name="check-circle" size="sm" variant="success" />}
          />
          <MetricCard
            label="Rejection Rate"
            value={`${metrics.rejectionRate.toFixed(1)}%`}
            icon={<Icon name="alert-triangle" size="sm" variant="warning" />}
          />
        </Flex>
      )}
    </section>
  );
}
