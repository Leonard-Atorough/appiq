import type { ApplicationStatus } from "@/entities";

/** Display labels for each pipeline node. */
export const SANKEY_NODE_LABELS: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

/** All pipeline nodes in left-to-right order. */
export const SANKEY_NODES: ApplicationStatus[] = [
  "saved",
  "applied",
  "interviewing",
  "offer",
  "rejected",
];

/** A single node in the Sankey graph (compatible with @nivo/sankey). */
export interface SankeyNode {
  id: string;
  label: string;
}

/** A directed link between two nodes, weighted by application count. */
export interface SankeyLink {
  source: string;
  target: string;
  /** Number of applications that took this transition. */
  value: number;
}

/** The full data structure consumed by the @nivo/sankey `<ResponsiveSankey>` component. */
export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}
