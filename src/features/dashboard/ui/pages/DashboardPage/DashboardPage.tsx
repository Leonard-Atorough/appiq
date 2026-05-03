import { useDashboardMetrics } from "../../../data/useDashboardMetrics";
import { useSankeyData } from "../../../data/useSankeyData";
import { Card } from "@/shared/ui";
import { MetricsPanel } from "./components/MetricsPanel";
import { SankeyChartPanel } from "./components/SankeyChartPanel";

export default function DashboardPage() {
  const { metrics, loading, error } = useDashboardMetrics();
  const { data: sankeyData, loading: sankeyLoading } = useSankeyData();

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
    <div className="flex flex-col gap-lg p-md justify-center">
      {/* Metrics Panel */}
      <MetricsPanel loading={loading} metrics={metrics} />

      {/* Sankey Flow Chart */}
      <SankeyChartPanel loading={sankeyLoading} data={sankeyData} />

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
