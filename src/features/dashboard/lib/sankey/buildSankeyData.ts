import type { ApplicationEvent, ApplicationStatus } from "@/entities";
import { isValidTransition } from "./validTransitions";
import { SANKEY_NODE_LABELS, SANKEY_NODES, type SankeyData, type SankeyLink } from "./sankeyTypes";

/**
 * Builds Sankey graph data from a flat list of application events.
 *
 * Each unique valid transition edge (e.g. applied→interviewing) is counted
 * at most once per application, regardless of how many times that application
 * bounced between statuses. This ensures the link weights represent the number
 * of *applications* that traversed each edge, not the number of raw events.
 *
 * Events without fromStatus/toStatus or whose transition is not in
 * VALID_TRANSITIONS are silently ignored.
 */
export function buildSankeyData(events: ApplicationEvent[]): SankeyData {
  // Group status_change events by applicationId, filtering out unusable events up front.
  const byApp = new Map<string, ApplicationEvent[]>();
  for (const event of events) {
    if (
      event.type !== "status_change" ||
      event.fromStatus == null ||
      event.toStatus == null
    ) {
      continue;
    }
    const bucket = byApp.get(event.applicationId) ?? [];
    bucket.push(event);
    byApp.set(event.applicationId, bucket);
  }

  const linkCounts = new Map<string, number>();

  for (const appEvents of byApp.values()) {
    // Process in chronological order so the first recorded transition wins.
    const sorted = [...appEvents].sort((a, b) => a.date.localeCompare(b.date));

    // Track which edges this application has already contributed to so a
    // bounce (A→B→A→B) only increments the A→B link once.
    const seenEdges = new Set<string>();

    for (const event of sorted) {
      const from = event.fromStatus as ApplicationStatus;
      const to = event.toStatus as ApplicationStatus;

      if (!isValidTransition(from, to)) {
        continue;
      }

      const key = `${from}→${to}`;
      if (!seenEdges.has(key)) {
        seenEdges.add(key);
        linkCounts.set(key, (linkCounts.get(key) ?? 0) + 1);
      }
    }
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

  const nodes = SANKEY_NODES.map((id) => ({
    id,
    label: SANKEY_NODE_LABELS[id],
  }));

  return { nodes, links };
}
