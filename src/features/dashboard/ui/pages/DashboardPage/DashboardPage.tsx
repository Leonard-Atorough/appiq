import { useNavigate } from "@tanstack/react-router";
import { useDashboardMetrics } from "../../../data/useDashboardMetrics";
import { useDashboardApplications } from "../../../data/useDashboardApplications";
import { useSankeyData } from "../../../data/useSankeyData";
import { Card, Flex } from "@/shared/ui";
import { MetricsPanel } from "./components/MetricsPanel";
import { SankeyChartPanel } from "./components/SankeyChartPanel";
import { UpcomingInterviewsPanel } from "../../components/UpcomingInterviewsPanel";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { metrics, loading, error } = useDashboardMetrics();
  const { upcomingInterviews } = useDashboardApplications();
  const { data: sankeyData, loading: sankeyLoading } = useSankeyData();

  if (error) {
    return (
      <Flex direction="column" gap="lg" padding="md" className="p-md md:p-lg">
        <div className="rounded-lg border border-error bg-error-light p-md">
          <p className="text-sm font-medium text-error">Error loading dashboard</p>
          <p className="text-xs text-muted">{error.message}</p>
        </div>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="lg" justify="center" className="p-xs lg:p-lg" fullWidth>
      {/* Metrics Panel */}
      <MetricsPanel loading={loading} metrics={metrics} />

      {/* Upcoming Interviews and Sankey Flow Chart */}
      <Flex
        direction="row"
        gap="lg"
        fullWidth
        align="stretch"
        className="flex-col-reverse h-auto md:flex-row lg:h-180"
      >
        <Flex
          className="w-full md:shrink-0 lg:w-1/4 lg:shrink-0 lg:h-full"
        >
          <UpcomingInterviewsPanel
            upcomingInterviews={upcomingInterviews}
            onNavigate={(id) => void navigate({ to: `/applications/${id}` })}
          />
        </Flex>
        <Flex className="md:flex-1 lg:h-full">
          <SankeyChartPanel loading={sankeyLoading} data={sankeyData} />
        </Flex>
      </Flex>
      {/* Recent Activity + Placeholder Section */}
      <section aria-labelledby="activity-heading" className="w-full h-min-80">
        <h2 id="activity-heading" className="sr-only">
          Recent Activity and Upcoming
        </h2>
        <Flex
          direction="row"
          gap="lg"
          fullWidth
          align="stretch"
          className="flex-col md:flex-row"
        >
          {/* Recent Activity */}
          <Card size="md" interactive={false} className="flex-1">
            <Flex direction="column" gap="md">
              <h3 className="text-md font-semibold text-primary">Recent Activity</h3>
              <p className="text-sm text-muted">
                No recent activity. Start applying to jobs to see your progress here!
              </p>
            </Flex>
          </Card>

          {/* Placeholder Card */}
          <Card size="md" interactive={false} className="flex-1">
            <Flex direction="column" gap="md" justify="center" align="center" className="h-48">
              <p className="text-sm text-muted">Coming soon</p>
            </Flex>
          </Card>
        </Flex>
      </section>
    </Flex>
  );
}
