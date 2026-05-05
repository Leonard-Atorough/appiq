import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SankeyChartPanel } from "./SankeyChartPanel";
import type { SankeyData } from "@/features/dashboard/lib/sankey/sankeyTypes";

// Hoisted mocks
const { mockSetOption, mockDispose, mockInit } = vi.hoisted(() => {
  const setOpt = vi.fn();
  const disp = vi.fn();
  const init = vi.fn(() => ({
    setOption: setOpt,
    dispose: disp,
    resize: vi.fn(),
    getOption: vi.fn(() => ({})),
  }));
  return { mockSetOption: setOpt, mockDispose: disp, mockInit: init };
});

vi.mock("echarts", () => {
  return {
    init: mockInit,
  };
});

// Mock useTheme
vi.mock("@/shared/lib", async () => {
  const actual = await vi.importActual("@/shared/lib");
  return {
    ...actual,
    useTheme: () => ({ theme: "light" }),
  };
});

describe("SankeyChartPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
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

      expect(screen.getByText(/move applications through statuses/i)).toBeInTheDocument();
    });

    it("does not render skeleton in empty state", () => {
      const data: SankeyData = { nodes: [], links: [] };
      render(<SankeyChartPanel loading={false} data={data} />);

      const skeletons = document.querySelectorAll(".bg-skeleton");
      expect(skeletons).toHaveLength(0);
    });
  });

  describe("chart rendering", () => {
    it("renders chart container when data has links", () => {
      const data: SankeyData = {
        nodes: [
          { id: "saved", label: "Saved" },
          { id: "applied", label: "Applied" },
        ],
        links: [{ source: "saved", target: "applied", value: 1 }],
      };
      render(<SankeyChartPanel loading={false} data={data} />);

      // Chart container should be in the DOM
      const container = document.querySelector("div.h-150");
      expect(container).toBeInTheDocument();
    });

    it("calls echarts.init with theme", () => {
      const data: SankeyData = {
        nodes: [{ id: "saved", label: "Saved" }],
        links: [{ source: "saved", target: "applied", value: 1 }],
      };
      render(<SankeyChartPanel loading={false} data={data} />);

      // echarts.init should have been called with 'light' theme
      expect(mockInit).toHaveBeenCalledWith(expect.any(HTMLElement), "light");
    });

    it("calls setOption with sankey data", () => {
      const data: SankeyData = {
        nodes: [
          { id: "saved", label: "Saved" },
          { id: "applied", label: "Applied" },
        ],
        links: [{ source: "saved", target: "applied", value: 2 }],
      };
      render(<SankeyChartPanel loading={false} data={data} />);

      expect(mockSetOption).toHaveBeenCalledWith(
        expect.objectContaining({
          series: expect.arrayContaining([
            expect.objectContaining({
              type: "sankey",
              links: data.links,
            }),
          ]),
        }),
      );
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

      const legendItems = document.querySelectorAll('[role="listitem"]');
      expect(legendItems.length).toBeGreaterThan(0);

      // Each legend item should have a color indicator
      legendItems.forEach((item) => {
        const colorSpan = item.querySelector(".w-md.h-md");
        expect(colorSpan).toBeInTheDocument();
      });
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

    it("heading is rendered inside the panel", () => {
      const data: SankeyData = { nodes: [], links: [] };
      const { getByTestId } = render(<SankeyChartPanel loading={false} data={data} />);

      const panel = getByTestId("sankey-chart-panel");
      const heading = screen.getByText("Application Flow");
      expect(panel).toContainElement(heading);
      expect(heading).toHaveAttribute("id", "sankey-heading");
    });
  });

  describe("cleanup", () => {
    it("disposes chart on unmount", () => {
      const data: SankeyData = {
        nodes: [{ id: "saved", label: "Saved" }],
        links: [{ source: "saved", target: "applied", value: 1 }],
      };
      const { unmount } = render(<SankeyChartPanel loading={false} data={data} />);

      unmount();

      expect(mockDispose).toHaveBeenCalled();
    });
  });
});
