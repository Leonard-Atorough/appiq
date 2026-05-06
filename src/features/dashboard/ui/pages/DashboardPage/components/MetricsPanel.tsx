import { Skeleton, Icon } from "@/shared/ui";
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-lg">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="w-full h-24" />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-sm md:gap-md">
          <MetricCard
            label={metrics.totalApplications === 1 ? "Total Application" : "Total Applications"}
            value={metrics.totalApplications}
            icon={<Icon name="briefcase" size={{ base: "sm", md: "md" }} variant="primary" />}
          />
          <MetricCard
            label={
              metrics.applicationsThisMonth === 1
                ? "Application This Month"
                : "Applications This Month"
            }
            value={metrics.applicationsThisMonth}
            icon={<Icon name="check" size={{ base: "sm", md: "md" }} variant="success" />}
          />
          <MetricCard
            label={
              metrics.interviewsScheduled === 1 ? "Interview Scheduled" : "Interviews Scheduled"
            }
            value={metrics.interviewsScheduled}
            icon={<Icon name="info" size={{ base: "sm", md: "md" }} variant="info" />}
          />
          <MetricCard
            label={metrics.offersReceived === 1 ? "Offer Received" : "Offers Received"}
            value={metrics.offersReceived}
            icon={<Icon name="check-circle" size={{ base: "sm", md: "md" }} variant="success" />}
          />
          <MetricCard
            label="Rejection Rate"
            value={`${metrics.rejectionRate.toFixed(1)}%`}
            icon={<Icon name="alert-triangle" size={{ base: "sm", md: "md" }} variant="warning" />}
            className="col-span-2 md:col-auto w-full md:w-auto justify-self-center md:justify-self-auto"
          />
        </div>
      )}
    </section>
  );
}
