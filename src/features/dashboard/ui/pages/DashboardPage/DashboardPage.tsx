import React, { Suspense } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useDashboardMetrics } from "../../../data/useDashboardMetrics";
import { useDashboardApplications } from "../../../data/useDashboardApplications";
import { useSankeyData } from "../../../data/useSankeyData";
import { Card, Flex, Skeleton } from "@/shared/ui";
import { MetricsPanel } from "./components/MetricsPanel";
import { UpcomingInterviewsPanel } from "../../components/UpcomingInterviewsPanel";

// Lazy-load SankeyChartPanel to reduce main bundle size (echarts is heavy)
const SankeyChartPanel = React.lazy(() =>
  import("./components/SankeyChartPanel").then((m) => ({ default: m.SankeyChartPanel })),
);

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
    <Flex direction="column" gap="lg" justify="center" padding={{ base: "xs", lg: "lg" }} fullWidth>
      {/* Metrics Panel */}
      <MetricsPanel loading={loading} metrics={metrics} />

      {/* Upcoming Interviews and Sankey Flow Chart */}
      <Flex direction={{ base: "column" }} gap="lg" fullWidth align="stretch" className="h-auto">
        <Flex>
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <SankeyChartPanel loading={sankeyLoading} data={sankeyData} />
          </Suspense>
        </Flex>
        <Flex
          direction={{ base: "column", xxl: "row" }}
          gap="lg"
          fullWidth
          align="stretch"
          className="h-auto min-h-80 lg:max-h-96"
        >
          <Flex direction={{ base: "column", md: "row" }} gap="lg" fullWidth align="stretch">
            <UpcomingInterviewsPanel
              upcomingInterviews={upcomingInterviews}
              onNavigate={(id) => void navigate({ to: `/applications/${id}` })}
            />
            <Card size="md" className="flex-1">
              <Flex direction="column" gap="md">
                <h3 className="text-md font-semibold text-primary">Recent Activity</h3>
                <p className="text-sm text-muted">
                  No recent activity. Start applying to jobs to see your progress here!
                </p>
              </Flex>
            </Card>
          </Flex>
          <Card size="md" className="flex-1 xl:w-1/3 xl:flex-none">
            <Flex direction="column" gap="md" justify="center" align="center" className="h-48">
              <p className="text-sm text-muted">Coming soon: Job recommendations</p>
            </Flex>
          </Card>
        </Flex>
      </Flex>
      {/* Recent Activity + Placeholder Section */}
      <section aria-labelledby="activity-heading" className="w-full h-min-80">
        <h2 id="activity-heading" className="sr-only">
          Recent Activity and Upcoming
        </h2>
        <Flex direction="row" gap="lg" fullWidth align="stretch" className="flex-col md:flex-row">
          {/* Recent Activity */}
        </Flex>
      </section>
    </Flex>
  );
}
