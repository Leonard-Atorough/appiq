import { useDashboardMetrics } from "../../../data/useDashboardMetrics";
import { Card } from "@/shared/ui";
import { MetricsPanel } from "./components/MetricsPanel";

export default function DashboardPage() {
  const { metrics, loading, error } = useDashboardMetrics();

  if (error) {
    return (
      <div className="flex flex-col gap-lg p-md">
        <div className="rounded-lg border border-error bg-error-light p-md">
          <p className="text-sm font-medium text-error">Error loading dashboard</p>
          <p className="text-xs text-muted">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-lg p-md">
      {/* Metrics Panel */}
      <MetricsPanel loading={loading} metrics={metrics} />

      {/* Funnel Chart */}
      <section aria-labelledby="funnel-heading">
        <h2 id="funnel-heading" className="text-lg font-semibold text-primary mb-md">
          Application Progress
        </h2>
        <div className="bg-surface border border-base rounded-lg p-lg flex items-center justify-center h-48 text-muted text-sm">
          Funnel chart coming soon
        </div>
      </section>

      {/* Recent Activity + Placeholder Section */}
      <section aria-labelledby="activity-heading">
        <h2 id="activity-heading" className="sr-only">
          Recent Activity and Upcoming
        </h2>
        <div className="flex gap-md">
          {/* Recent Activity */}
          <Card size="md" interactive={false} className="flex-1">
            <div className="flex flex-col gap-md">
              <h3 className="text-md font-semibold text-primary">Recent Activity</h3>
              <p className="text-sm text-muted">
                No recent activity. Start applying to jobs to see your progress here!
              </p>
            </div>
          </Card>

          {/* Placeholder Card */}
          <Card size="md" interactive={false} className="flex-1">
            <div className="flex flex-col gap-md items-center justify-center h-48">
              <p className="text-sm text-muted">Coming soon</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
