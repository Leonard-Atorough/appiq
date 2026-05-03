import { ResponsiveSankey } from "@nivo/sankey";
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

const STATUS_COLORS: Record<string, string> = {
  saved: "hsl(210 10% 52%)",
  applied: "hsl(210 88% 56%)",
  interviewing: "hsl(299 35% 55%)",
  offer: "hsl(119 43% 45%)",
  rejected: "hsl(0 84% 60%)",
};

//NOTE: Not working as expected. Only one color shows up in the chart, even though nodes are correctly receiving different colors. Suspect this is an issue with how @nivo/sankey handles the colors prop, but haven't had time to investigate further. For now, hardcoding all nodes to the same color, but leaving this here for future reference.
const LABEL_TEXT_COLOR = {
  light: "hsl(0 0% 0%)",
  dark: "hsl(210 20% 90%)",
};

export function SankeyChartPanel({ loading, data }: SankeyChartPanelProps) {
  const { theme } = useTheme();
  const hasLinks = data.links.length > 0;
  const labelColor = LABEL_TEXT_COLOR[theme];

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
            <div className="h-96 w-full">
              <ResponsiveSankey
                data={data}
                margin={{ top: 16, right: 140, bottom: 16, left: 32 }}
                align="justify"
                colors={(node) => STATUS_COLORS[node.id] ?? "hsl(210 10% 52%)"}
                nodeOpacity={1}
                nodeThickness={22}
                nodeInnerPadding={4}
                nodeSpacing={32}
                nodeBorderWidth={0}
                linkOpacity={0.35}
                enableLinkGradient={true}
                labelPosition="inside"
                labelOrientation="horizontal"
                labelPadding={14}
                labelTextColor={labelColor}
                theme={{
                  labels: {
                    text: {
                      fontSize: 14,
                      fontWeight: 600,
                    },
                  },
                  tooltip: {
                    container: {
                      color: "hsl(0 0% 0%)",
                    },
                  },
                }}
              />
            </div>

            {/* Legend */}
            <div
              className="flex flex-wrap gap-md justify-center pt-md border-t border-base mt-sm"
              role="list"
              aria-label="Status legend"
            >
              {SANKEY_NODES.map((id) => (
                <div key={id} className="flex items-center gap-xs" role="listitem">
                  <span
                    className="inline-block w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: STATUS_COLORS[id] }}
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
