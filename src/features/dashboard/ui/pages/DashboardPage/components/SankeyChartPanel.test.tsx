import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SankeyChartPanel } from "./SankeyChartPanel";
import type { SankeyData } from "@/features/dashboard/lib/sankey/sankeyTypes";

// Mock @nivo/sankey
vi.mock("@nivo/sankey", () => ({
  ResponsiveSankey: ({ data, labelTextColor }: { data: SankeyData; labelTextColor: string }) => (
    <div data-testid="sankey-chart" data-label-color={labelTextColor}>
      Sankey Chart - {data.links.length} links
    </div>
  ),
}));

// Mock useTheme
vi.mock("@/shared/lib", async () => {
  const actual = await vi.importActual("@/shared/lib");
  return {
    ...actual,
    useTheme: () => ({ theme: "light" }),
  };
});

describe("SankeyChartPanel", () => {
  describe("loading state", () => {
    it("renders skeleton when loading is true", () => {
      const data: SankeyData = { nodes: [], links: [] };
      render(<SankeyChartPanel loading={true} data={data} />);

      const skeleton = document.querySelector(".bg-skeleton");
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    it("renders empty state message when no links", () => {
      const data: SankeyData = {
        nodes: [
          { id: "saved", label: "Saved" },
          { id: "applied", label: "Applied" },
        ],
        links: [],
      };
      render(<SankeyChartPanel loading={false} data={data} />);

      expect(
        screen.getByText(/move applications through statuses/i),
      ).toBeInTheDocument();
    });

    it("does not render skeleton in empty state", () => {
      const data: SankeyData = { nodes: [], links: [] };
      render(<SankeyChartPanel loading={false} data={data} />);

      const skeletons = document.querySelectorAll(".bg-skeleton");
      expect(skeletons).toHaveLength(0);
    });
  });

  describe("chart rendering", () => {
    it("renders Sankey chart when data has links", () => {
      const data: SankeyData = {
        nodes: [
          { id: "saved", label: "Saved" },
          { id: "applied", label: "Applied" },
        ],
        links: [
          { source: "saved", target: "applied", value: 5 },
        ],
      };
      render(<SankeyChartPanel loading={false} data={data} />);

      expect(screen.getByTestId("sankey-chart")).toBeInTheDocument();
      expect(screen.getByText(/1 links/)).toBeInTheDocument();
    });

    it("does not render empty state when data has links", () => {
      const data: SankeyData = {
        nodes: [{ id: "saved", label: "Saved" }],
        links: [{ source: "saved", target: "applied", value: 1 }],
      };
      render(<SankeyChartPanel loading={false} data={data} />);

      expect(screen.queryByText(/move applications through statuses/i)).not.toBeInTheDocument();
    });
  });

  describe("legend rendering", () => {
    it("renders legend only when data has links", () => {
      const dataWithLinks: SankeyData = {
        nodes: [{ id: "saved", label: "Saved" }],
        links: [{ source: "saved", target: "applied", value: 1 }],
      };
      const { rerender } = render(<SankeyChartPanel loading={false} data={dataWithLinks} />);

      const legend = screen.getByLabelText("Status legend");
      expect(legend).toBeInTheDocument();

      // Re-render with no links
      const dataNoLinks: SankeyData = {
        nodes: [{ id: "saved", label: "Saved" }],
        links: [],
      };
      rerender(<SankeyChartPanel loading={false} data={dataNoLinks} />);

      // Legend should be gone
      expect(screen.queryByLabelText("Status legend")).not.toBeInTheDocument();
    });

    it("displays all status nodes in legend", () => {
      const data: SankeyData = {
        nodes: [
          { id: "saved", label: "Saved" },
          { id: "applied", label: "Applied" },
          { id: "interviewing", label: "Interviewing" },
          { id: "offer", label: "Offer" },
          { id: "rejected", label: "Rejected" },
        ],
        links: [{ source: "saved", target: "applied", value: 1 }],
      };
      render(<SankeyChartPanel loading={false} data={data} />);

      expect(screen.getByText("Saved")).toBeInTheDocument();
      expect(screen.getByText("Applied")).toBeInTheDocument();
      expect(screen.getByText("Interviewing")).toBeInTheDocument();
      expect(screen.getByText("Offer")).toBeInTheDocument();
      expect(screen.getByText("Rejected")).toBeInTheDocument();
    });

    it("legend items have correct styling", () => {
      const data: SankeyData = {
        nodes: [{ id: "saved", label: "Saved" }],
        links: [{ source: "saved", target: "applied", value: 1 }],
      };
      render(<SankeyChartPanel loading={false} data={data} />);

      const legend = screen.getByLabelText("Status legend");
      expect(legend).toHaveClass("flex", "flex-wrap", "gap-md", "justify-center");
    });
  });

  describe("heading and structure", () => {
    it("renders section with correct heading", () => {
      const data: SankeyData = { nodes: [], links: [] };
      render(<SankeyChartPanel loading={false} data={data} />);

      const heading = screen.getByText("Application Flow");
      expect(heading).toHaveAttribute("id", "sankey-heading");
      expect(heading).toHaveClass("text-lg", "font-semibold", "text-primary");
    });

    it("section has aria-labelledby pointing to heading", () => {
      const data: SankeyData = { nodes: [], links: [] };
      const { container } = render(<SankeyChartPanel loading={false} data={data} />);

      const section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby", "sankey-heading");
    });
  });

  describe("theme integration", () => {
    it("receives labelTextColor from useTheme hook", () => {
      const data: SankeyData = {
        nodes: [{ id: "saved", label: "Saved" }],
        links: [{ source: "saved", target: "applied", value: 1 }],
      };
      render(<SankeyChartPanel loading={false} data={data} />);

      const chart = screen.getByTestId("sankey-chart");
      // In light mode, text color should be black
      expect(chart).toHaveAttribute("data-label-color", "hsl(0 0% 0%)");
    });
  });
});
