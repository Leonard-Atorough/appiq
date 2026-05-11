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
  describe("Rendering", () => {
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
      expect(panels[0]).not.toHaveAttribute("hidden");
      expect(panels[1]).toHaveAttribute("hidden");
    });

    it("renders tablist with correct aria role", () => {
      render(<Tabs tabs={tabs} />);
      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });
  });

  describe("Switching Tabs", () => {
    it("switches active tab on click", async () => {
      const user = userEvent.setup();
      const { container } = render(<Tabs tabs={tabs} />);
      await user.click(screen.getByRole("tab", { name: "Tab 2" }));
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
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

    it("respects controlled activeTab", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { rerender } = render(<Tabs tabs={tabs} activeTab="tab2" onChange={onChange} />);
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
      await user.click(screen.getByRole("tab", { name: "Tab 1" }));
      expect(onChange).toHaveBeenCalledWith("tab1");
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
      rerender(<Tabs tabs={tabs} activeTab="tab1" onChange={onChange} />);
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Variants", () => {
    it.each([
      ["underline", ""],
      ["pill", "bg-muted"],
      ["boxed", "border"],
    ] as const)("renders %s variant with proper classes", (variant, className) => {
      const { container } = render(<Tabs tabs={tabs} variant={variant} />);
      const tabList = container.querySelector("[role=tablist]");
      expect(tabList).toBeInTheDocument();
      if (className) {
        expect(tabList).toHaveClass(className);
      }
    });
  });

  describe("Sizes", () => {
    it.each([
      ["sm", "text-sm"],
      ["md", "text-base"],
      ["lg", "text-lg"],
    ] as const)("renders %s size with %s class", (size, textClass) => {
      render(<Tabs tabs={tabs} size={size} />);
      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveClass(textClass);
    });
  });

  describe("Orientation", () => {
    it.each([["horizontal"], ["vertical"]] as const)(
      "renders %s orientation with correct aria attribute",
      (orientation) => {
        render(<Tabs tabs={tabs} orientation={orientation} />);
        const tabList = screen.getByRole("tablist");
        expect(tabList).toHaveAttribute("aria-orientation", orientation);
      },
    );
  });

  describe("Full Width", () => {
    it("stretches tabs when fullWidth is true", () => {
      render(<Tabs tabs={tabs} fullWidth />);
      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveClass("flex-1");
    });
  });

  describe("Tabindex & Roving Index", () => {
    it("uses roving tabindex — only active tab has tabIndex 0", () => {
      render(<Tabs tabs={tabs} />);
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("tabindex", "0");
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("tabindex", "-1");
    });

    it("has focus-visible ring on tab triggers", () => {
      render(<Tabs tabs={tabs} />);
      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab).toHaveClass("focus-visible:ring-2");
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates with ArrowRight, skipping disabled tabs", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={tabs} />);
      screen.getByRole("tab", { name: "Tab 1" }).focus();
      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
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
  });
});
