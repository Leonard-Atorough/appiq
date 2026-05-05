import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Flex, Skeleton } from "@/shared/ui";
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

/** Visual patterns to distinguish status colors for colorblind users */
const STATUS_PATTERNS: Record<string, string> = {
  saved:
    "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,.2) 4px, rgba(0,0,0,.2) 6px)",
  applied: "radial-gradient(circle, rgba(0,0,0,.25) 2px, transparent 2px)",
  interviewing:
    "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,.2) 4px, rgba(0,0,0,.2) 6px)",
  offer: "none",
  rejected:
    "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,.2) 4px, rgba(0,0,0,.2) 6px), repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(0,0,0,.2) 4px, rgba(0,0,0,.2) 6px)",
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

    // Transform data to echarts format with colorblind-friendly node styling
    const nodeColors = data.nodes.map((node) => ({
      name: node.id,
      itemStyle: {
        color: colors[node.id as keyof typeof colors] || colors.saved,
        // Apply visual distinction for colorblind users using varying border thickness
        ...getNodeStyle(node.id as string),
      },
    }));

    // Helper function to provide visual distinction per node type for colorblind accessibility
    function getNodeStyle(nodeId: string) {
      switch (nodeId) {
        case "saved":
          // Thin border for Saved (Gray)
          return {
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.2)",
          };
        case "applied":
          // Medium border for Applied (Blue)
          return {
            borderWidth: 2,
            borderColor: "rgba(0, 0, 0, 0.25)",
          };
        case "interviewing":
          // Thick border for Interviewing (Purple)
          return {
            borderWidth: 3,
            borderColor: "rgba(0, 0, 0, 0.3)",
          };
        case "offer":
          // Subtle border for Offer (Green) - baseline
          return {
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.15)",
          };
        case "rejected":
          // Extra-thick border for Rejected (Red) - highest visual weight
          return {
            borderWidth: 4,
            borderColor: "rgba(0, 0, 0, 0.35)",
          };
        default:
          return {
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
          };
      }
    }

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
    <Card size="md" interactive={false} className="flex-1 h-full" data-testid="sankey-chart-panel">
      <h2 id="sankey-heading" className="text-lg font-semibold text-primary mb-md">
        Application Flow
      </h2>
      {loading ? (
        <Skeleton className="w-full h-96" />
      ) : !hasLinks ? (
        <Flex justify="center" align="center" className="h-96 text-muted text-sm">
          Move applications through statuses to see your pipeline flow here.
        </Flex>
      ) : (
        <>
          {/* Screen reader description */}
          <p id="sankey-description" className="sr-only">
            Sankey flow diagram showing how applications progress through different stages:{" "}
            {data.nodes
              .map((n) => SANKEY_NODE_LABELS[n.id as keyof typeof SANKEY_NODE_LABELS])
              .join(", ")}
            .
          </p>

          <Flex
            ref={containerRef}
            className="h-150 w-full"
            role="img"
            aria-labelledby="sankey-heading"
            aria-describedby="sankey-description"
            tabIndex={0}
          />

          {/* Legend */}
          <Flex
            justify="center"
            gap="md"
            paddingY="md"
            wrap
            className="border-t border-base mt-sm"
            role="list"
            aria-label="Status legend"
          >
            {SANKEY_NODES.map((id) => (
              <Flex justify="center" align="center" gap="xs" key={id} role="listitem">
                <span
                  className="inline-block w-md h-md rounded-sm shrink-0 border border-muted-light"
                  style={{
                    backgroundColor: STATUS_COLORS[theme][id as keyof typeof STATUS_COLORS.light],
                    backgroundImage: STATUS_PATTERNS[id],
                    backgroundSize: "8px 8px",
                  }}
                  aria-hidden="true"
                />
                <span className="text-md text-secondary font-medium">{SANKEY_NODE_LABELS[id]}</span>
              </Flex>
            ))}
          </Flex>
        </>
      )}
    </Card>
  );
}
