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
    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeTruthy();
    expect(screen.getByRole("tab", { name: "Tab 3" })).toBeTruthy();
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
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole("tabpanel", { name: "Tab 1" })).not.toHaveAttribute("hidden");
    expect(screen.getByRole("tabpanel", { name: "Tab 2", hidden: true })).toHaveAttribute(
      "hidden",
    );
  });

  it("switches active tab on click", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Tab 2" })).not.toHaveAttribute("hidden");
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
    expect(screen.getByRole("tablist")).toBeTruthy();
  });

  it("matches snapshot", () => {
    const { container } = render(<Tabs tabs={tabs} />);
    expect(container).toMatchSnapshot();
  });
});
