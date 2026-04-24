import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Tabs } from "./Tabs";

const tabs = [
  { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
  { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
  { id: "tab3", label: "Tab 3", content: <div>Content 3</div>, disabled: true },
];

describe("Tabs", () => {
  it("renders all tab labels", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
  });

  it("selects the first enabled tab by default", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "false");
  });

  it("respects defaultTab prop", () => {
    render(<Tabs tabs={tabs} defaultTab="tab2" />);
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
  });

  it("shows the active panel and hides others", () => {
    const { container } = render(<Tabs tabs={tabs} />);
    const panels = container.querySelectorAll("[role=tabpanel]");
    // First panel (Tab 1) should be visible
    expect(panels[0]).not.toHaveAttribute("hidden");
    // Second panel (Tab 2) should be hidden
    expect(panels[1]).toHaveAttribute("hidden");
  });

  it("switches active tab on click", async () => {
    const user = userEvent.setup();
    const { container } = render(<Tabs tabs={tabs} />);
    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
    // Check that the second panel is now visible
    const panels = container.querySelectorAll("[role=tabpanel]");
    expect(panels[1]).not.toHaveAttribute("hidden");
  });

  it("calls onChange when switching tabs", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} onChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(onChange).toHaveBeenCalledWith("tab2");
  });

  it("does not select disabled tabs", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    const disabledTab = screen.getByRole("tab", { name: "Tab 3" });
    expect(disabledTab).toBeDisabled();
    await user.click(disabledTab);
    expect(disabledTab).toHaveAttribute("aria-selected", "false");
  });

  it("navigates with ArrowRight, skipping disabled tabs", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    screen.getByRole("tab", { name: "Tab 1" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
    // ArrowRight again wraps around past disabled Tab 3 back to Tab 1
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("aria-selected", "true");
  });

  it("navigates to first/last tab with Home/End", async () => {
    const user = userEvent.setup();
    const simpleTabs = [
      { id: "a", label: "A", content: <div>A</div> },
      { id: "b", label: "B", content: <div>B</div> },
      { id: "c", label: "C", content: <div>C</div> },
    ];
    render(<Tabs tabs={simpleTabs} />);
    screen.getByRole("tab", { name: "A" }).focus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "C" })).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("aria-selected", "true");
  });

  it("respects controlled activeTab", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Tabs tabs={tabs} activeTab="tab2" onChange={onChange} />);
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("tab", { name: "Tab 1" }));
    // onChange called but state not changed (controlled)
    expect(onChange).toHaveBeenCalledWith("tab1");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
    rerender(<Tabs tabs={tabs} activeTab="tab1" onChange={onChange} />);
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("aria-selected", "true");
  });

  it("uses roving tabindex — only active tab has tabIndex 0", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("tabindex", "-1");
  });

  it("renders tablist with correct aria role", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  describe("Variants", () => {
    it("renders underline variant by default", () => {
      const { container } = render(<Tabs tabs={tabs} variant="underline" />);
      expect(container.querySelector("[role=tablist]")).toBeInTheDocument();
    });

    it("renders pill variant", () => {
      const { container } = render(<Tabs tabs={tabs} variant="pill" />);
      const tabList = container.querySelector("[role=tablist]");
      expect(tabList).toHaveClass("bg-muted");
    });

    it("renders boxed variant", () => {
      const { container } = render(<Tabs tabs={tabs} variant="boxed" />);
      const tabList = container.querySelector("[role=tablist]");
      expect(tabList).toHaveClass("border");
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      render(<Tabs tabs={tabs} size="sm" />);
      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveClass("text-sm");
    });

    it("renders medium size (default)", () => {
      render(<Tabs tabs={tabs} size="md" />);
      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveClass("text-md");
    });

    it("renders large size", () => {
      render(<Tabs tabs={tabs} size="lg" />);
      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveClass("text-lg");
    });
  });

  describe("Orientation", () => {
    it("renders horizontal orientation by default", () => {
      render(<Tabs tabs={tabs} orientation="horizontal" />);
      const tabList = screen.getByRole("tablist");
      expect(tabList).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("renders vertical orientation", () => {
      render(<Tabs tabs={tabs} orientation="vertical" />);
      const tabList = screen.getByRole("tablist");
      expect(tabList).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("Full Width", () => {
    it("stretches tabs when fullWidth is true", () => {
      render(<Tabs tabs={tabs} fullWidth />);
      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveClass("flex-1");
    });
  });

  describe("Accessibility", () => {
    it("links tab panels to triggers via aria-labelledby", () => {
      render(<Tabs tabs={tabs} />);
      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const panel1 = screen.getByRole("tabpanel", { name: "Tab 1" });
      expect(panel1).toHaveAttribute("aria-labelledby", tab1.getAttribute("id"));
    });

    it("links tab triggers to panels via aria-controls", () => {
      render(<Tabs tabs={tabs} />);
      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const panel1 = screen.getByRole("tabpanel", { name: "Tab 1" });
      expect(tab1).toHaveAttribute("aria-controls", panel1.getAttribute("id"));
    });

    it("has focus-visible ring on tab triggers", () => {
      render(<Tabs tabs={tabs} />);
      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveClass("focus-visible:ring-2");
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates with ArrowLeft in horizontal orientation", async () => {
      const user = userEvent.setup();
      const simpleTabs = [
        { id: "a", label: "A", content: <div>A</div> },
        { id: "b", label: "B", content: <div>B</div> },
        { id: "c", label: "C", content: <div>C</div> },
      ];
      render(<Tabs tabs={simpleTabs} orientation="horizontal" />);
      screen.getByRole("tab", { name: "B" }).focus();
      await user.keyboard("{ArrowLeft}");
      expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("aria-selected", "true");
    });

    it("navigates with ArrowDown in vertical orientation", async () => {
      const user = userEvent.setup();
      const simpleTabs = [
        { id: "a", label: "A", content: <div>A</div> },
        { id: "b", label: "B", content: <div>B</div> },
        { id: "c", label: "C", content: <div>C</div> },
      ];
      render(<Tabs tabs={simpleTabs} orientation="vertical" />);
      screen.getByRole("tab", { name: "A" }).focus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute("aria-selected", "true");
    });

    it("navigates with ArrowUp in vertical orientation", async () => {
      const user = userEvent.setup();
      const simpleTabs = [
        { id: "a", label: "A", content: <div>A</div> },
        { id: "b", label: "B", content: <div>B</div> },
        { id: "c", label: "C", content: <div>C</div> },
      ];
      render(<Tabs tabs={simpleTabs} orientation="vertical" />);
      screen.getByRole("tab", { name: "C" }).focus();
      await user.keyboard("{ArrowUp}");
      expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default tabs", () => {
      const { container } = render(<Tabs tabs={tabs} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for pill variant", () => {
      const { container } = render(<Tabs tabs={tabs} variant="pill" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for boxed variant", () => {
      const { container } = render(<Tabs tabs={tabs} variant="boxed" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
