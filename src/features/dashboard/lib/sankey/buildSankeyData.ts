import type { ApplicationEvent, ApplicationStatus } from "@/entities";
import { isValidTransition } from "./validTransitions";
import { SANKEY_NODE_LABELS, SANKEY_NODES, type SankeyData, type SankeyLink } from "./sankeyTypes";

/**
 * Builds Sankey graph data from a flat list of application events.
 *
 * Only `status_change` events that carry both `fromStatus` and `toStatus` are
 * processed. Events whose transition is not in VALID_TRANSITIONS are silently
 * ignored — they represent data inconsistencies or direct edits and should not
 * pollute the pipeline flow.
 *
 * Applications that have never been moved (no qualifying events) do not
 * generate any links and will not appear as a flow in the chart.
 */
export function buildSankeyData(events: ApplicationEvent[]): SankeyData {
  const linkCounts = new Map<string, number>();

  for (const event of events) {
    if (
      event.type !== "status_change" ||
      event.fromStatus == null ||
      event.toStatus == null
    ) {
      continue;
    }

    const from = event.fromStatus as ApplicationStatus;
    const to = event.toStatus as ApplicationStatus;

    if (!isValidTransition(from, to)) {
      continue;
    }

    const key = `${from}→${to}`;
    linkCounts.set(key, (linkCounts.get(key) ?? 0) + 1);
  }

  const links: SankeyLink[] = [];
  for (const [key, value] of linkCounts) {
    const separatorIndex = key.indexOf("→");
    links.push({
      source: key.slice(0, separatorIndex),
      target: key.slice(separatorIndex + "→".length),
      value,
    });
  }

  // Include all pipeline nodes regardless of whether they appear in links so
  // the chart structure is stable even with sparse data.
  const nodes = SANKEY_NODES.map((id) => ({
    id,
    label: SANKEY_NODE_LABELS[id],
  }));

  return { nodes, links };
}
