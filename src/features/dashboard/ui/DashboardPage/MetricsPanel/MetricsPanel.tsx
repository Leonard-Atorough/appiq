import { Skeleton, Icon } from "@/shared/ui";
import { MetricCard } from "../..";
import type { DashboardMetrics } from "@/features/dashboard/model/calculateMetrics";

export function MetricsPanel({loading, metrics}: {loading: boolean, metrics: DashboardMetrics}) {

    return (
        <section aria-labelledby="metrics-heading">
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
                  <div className="flex gap-md">
                    <MetricCard
                      label="Total Applications"
                      value={metrics.totalApplications}
                      icon={<Icon name="briefcase" size="md" variant="primary" />}
                    />
                    <MetricCard
                      label="Applied This Month"
                      value={metrics.applicationsThisMonth}
                      icon={<Icon name="check" size="md" variant="success" />}
                    />
                    <MetricCard
                      label="Interviews Scheduled"
                      value={metrics.interviewsScheduled}
                      icon={<Icon name="info" size="md" variant="info" />}
                    />
                    <MetricCard
                      label="Offers Received"
                      value={metrics.offersReceived}
                      icon={<Icon name="check-circle" size="md" variant="success" />}
                    />
                    <MetricCard
                      label="Rejection Rate"
                      value={`${metrics.rejectionRate.toFixed(1)}%`}
                      icon={<Icon name="alert-triangle" size="md" variant="warning" />}
                    />
                  </div>
                )}
              </section>
    )
};