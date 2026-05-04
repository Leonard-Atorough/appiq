import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Skeleton } from "@/shared/ui";
import { Card } from "@/shared/ui/Card/Card";
import { useTheme } from "@/shared/lib";
import {
  SANKEY_NODE_LABELS,
  SANKEY_NODES,
  type SankeyData,
} from "@/features/dashboard/lib/sankey/sankeyTypes";

interface SankeyChartPanelProps {
  loading: boolean;
  data: SankeyData;
}

const STATUS_COLORS = {
  light: {
    saved: "#6B7280",
    applied: "#2563EB",
    interviewing: "#A855F7",
    offer: "#16A34A",
    rejected: "#DC2626",
  },
  dark: {
    saved: "#9CA3AF",
    applied: "#60A5FA",
    interviewing: "#D8B4FE",
    offer: "#4ADE80",
    rejected: "#F87171",
  },
};

export function SankeyChartPanel({ loading, data }: SankeyChartPanelProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const hasLinks = data.links.length > 0;

  useEffect(() => {
    if (!containerRef.current || !hasLinks) return;

    // Initialize chart if not already initialized
    if (!chartRef.current) {
      chartRef.current = echarts.init(containerRef.current, theme);
    }

    // Update theme if it changed
    if (chartRef.current.getOption()?.series) {
      // Theme already set on init, but we need to re-render on theme change
      chartRef.current.dispose();
      chartRef.current = echarts.init(containerRef.current, theme);
    }

    const colors = STATUS_COLORS[theme];

    // Transform data to echarts format
    const nodeColors = data.nodes.map((node) => ({
      name: node.id,
      itemStyle: {
        color: colors[node.id as keyof typeof colors] || colors.saved,
      },
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const option: any = {
      backgroundColor: "transparent",
      series: [
        {
          type: "sankey",
          data: nodeColors,
          links: data.links,
          focusNodeAdjacency: true,
          levels: [
            { depth: 0, label: { position: "right" } },
            { depth: 1, label: { position: "right" } },
            { depth: 2, label: { position: "right" } },
            { depth: 3, label: { position: "right" } },
            { depth: 4, label: { position: "right" } },
          ],
          label: {
            position: "left",
            fontSize: 16,
            fontWeight: "bold",
            color: "#6B7B8F", // neutral gray-500: works on both light and dark surfaces
          },
          lineStyle: {
            color: "source",
            curveness: 0.5,
            opacity: 0.4,
          },
          itemStyle: {
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
          },
        },
      ],
      grid: {
        top: 16,
        right: 160,
        bottom: 16,
        left: 32,
        containLabel: true,
      },
    };

    chartRef.current.setOption(option);

    // Handle resize
    const handleResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [theme, hasLinks, data]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  return (
    <section aria-labelledby="sankey-heading">
      <h2 id="sankey-heading" className="text-lg font-semibold text-primary mb-md">
        Application Flow
      </h2>
      <Card size="md" interactive={false}>
        {loading ? (
          <Skeleton className="w-full h-96" />
        ) : !hasLinks ? (
          <div className="flex items-center justify-center h-96 text-muted text-sm">
            Move applications through statuses to see your pipeline flow here.
          </div>
        ) : (
          <>
            <div ref={containerRef} className="h-150 w-full" />

            {/* Legend */}
            <div
              className="flex flex-wrap gap-md justify-center pt-md border-t border-base mt-sm"
              role="list"
              aria-label="Status legend"
            >
              {SANKEY_NODES.map((id) => (
                <div key={id} className="flex items-center gap-xs" role="listitem">
                  <span
                    className="inline-block w-md h-md rounded-sm shrink-0"
                    style={{
                      backgroundColor: STATUS_COLORS[theme][id as keyof typeof STATUS_COLORS.light],
                    }}
                    aria-hidden="true"
                  />
                  <span className="text-md text-secondary">{SANKEY_NODE_LABELS[id]}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </section>
  );
}
