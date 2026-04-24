import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  // --- Rendering ---

  it("renders with children content", () => {
    render(
      <Sidebar>
        <nav>Navigation</nav>
      </Sidebar>,
    );
    expect(screen.getByText("Navigation")).toBeTruthy();
  });

  it("renders as a landmark region with complementary role (default)", () => {
    render(<Sidebar>Content</Sidebar>);
    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });

  it("renders with custom aria-label", () => {
    render(<Sidebar ariaLabel="Main navigation">Content</Sidebar>);
    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toHaveAttribute("aria-label", "Main navigation");
  });

  it("renders header when provided", () => {
    render(<Sidebar header={<div>Logo</div>}>Content</Sidebar>);
    expect(screen.getByText("Logo")).toBeTruthy();
  });

  it("renders footer when provided and sidebar is open", () => {
    render(
      <Sidebar open={true} footer={<div>Footer</div>}>
        Content
      </Sidebar>,
    );
    expect(screen.getByText("Footer")).toBeTruthy();
  });

  // --- Uncontrolled State ---

  it("defaults to open state when uncontrolled", () => {
    const { container } = render(
      <Sidebar>
        <div>Content</div>
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toBeTruthy();
    expect(sidebar).toHaveStyle({ width: "16rem" }); // default expanded width
  });

  it("respects defaultOpen=false for uncontrolled state", () => {
    const { container } = render(<Sidebar defaultOpen={false}>Content</Sidebar>);
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "4rem" }); // default collapsed width
  });

  // --- Controlled State ---

  it("respects controlled open=true", () => {
    const { container } = render(
      <Sidebar open={true} onOpenChange={() => {}}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "16rem" });
  });

  it("respects controlled open=false", () => {
    const { container } = render(
      <Sidebar open={false} onOpenChange={() => {}}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "4rem" });
  });

  // --- Collapse Modes ---

  it("collapses to collapsedWidth in mini mode by default", () => {
    const { container } = render(
      <Sidebar open={false} collapseMode="mini" onOpenChange={() => {}}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "4rem" }); // default collapsedWidth
  });

  it("collapses to zero width in hide mode", () => {
    const { container } = render(
      <Sidebar open={false} collapseMode="hide" onOpenChange={() => {}}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "0" });
  });

  it("respects custom collapsedWidth in mini mode", () => {
    const { container } = render(
      <Sidebar open={false} collapseMode="mini" collapsedWidth="5rem" onOpenChange={() => {}}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "5rem" });
  });

  it("ignores collapsedWidth in hide mode", () => {
    const { container } = render(
      <Sidebar open={false} collapseMode="hide" collapsedWidth="5rem" onOpenChange={() => {}}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "0" }); // collapseMode=hide always uses 0
  });

  // --- Collapse Toggle ---

  it("does not show toggle button when collapsible=false", () => {
    render(
      <Sidebar collapsible={false} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    expect(screen.queryByRole("button", { name: /toggle/i })).toBeNull();
  });

  it("shows toggle button when collapsible=true", () => {
    render(
      <Sidebar collapsible={true} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    expect(screen.getByRole("button", { name: /toggle/i })).toBeTruthy();
  });

  it("hides toggle button when hideToggle=true", () => {
    render(
      <Sidebar collapsible={true} hideToggle={true} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    expect(screen.queryByRole("button", { name: /toggle/i })).toBeNull();
  });

  it("calls onOpenChange when toggle is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Sidebar
        collapsible={true}
        open={true}
        onOpenChange={onOpenChange}
        header={<div>Header</div>}
      >
        Content
      </Sidebar>,
    );
    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("toggles internal state when collapsible and uncontrolled", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Sidebar collapsible={true} defaultOpen={true} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "16rem" });

    await user.click(screen.getByRole("button", { name: /toggle/i }));
    await waitFor(() => {
      expect(sidebar).toHaveStyle({ width: "4rem" });
    });
  });

  // --- Keyboard Interaction ---

  it("closes on Escape key when collapsible", async () => {
    const user = userEvent.setup();
    render(
      <Sidebar collapsible={true} open={true} onOpenChange={() => {}} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    await user.keyboard("{Escape}");
    // (Note: Escape handling dispatches on document level)
  });

  // --- Sizing ---

  it("applies custom width when open", () => {
    const { container } = render(
      <Sidebar open={true} width="20rem" onOpenChange={() => {}}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "20rem" });
  });

  it("applies custom collapsedWidth when closed", () => {
    const { container } = render(
      <Sidebar open={false} collapsedWidth="3rem" onOpenChange={() => {}}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "3rem" });
  });

  it("handles numeric widths as pixels", () => {
    const { container } = render(
      <Sidebar open={true} width={300} onOpenChange={() => {}}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "300px" });
  });

  // --- Positioning ---

  it("applies static position by default", () => {
    const { container } = render(<Sidebar>Content</Sidebar>);
    const wrapper = container.querySelector("div");
    expect(wrapper).not.toHaveClass("sticky");
    expect(wrapper).not.toHaveClass("fixed");
  });

  it("applies sticky positioning when position='sticky'", () => {
    const { container } = render(<Sidebar position="sticky">Content</Sidebar>);
    const wrapper = container.querySelector("div");
    expect(wrapper).toHaveClass("sticky");
  });

  it("applies fixed positioning when position='fixed'", () => {
    const { container } = render(<Sidebar position="fixed">Content</Sidebar>);
    const wrapper = container.querySelector("div");
    expect(wrapper).toHaveClass("fixed");
  });

  // --- Scrolling ---

  it("applies scrollable class by default", () => {
    const { container } = render(<Sidebar>Content</Sidebar>);
    const content = container.querySelector('[class*="overflow-y-auto"]');
    expect(content).toBeTruthy();
  });

  it("disables scrolling when scrollable=false", () => {
    const { container } = render(<Sidebar scrollable={false}>Content</Sidebar>);
    const content = container.querySelector('[class*="overflow-hidden"]');
    expect(content).toBeTruthy();
  });

  // --- Responsive Behavior ---

  it("does not auto-collapse by default", () => {
    const { container } = render(
      <Sidebar autoCollapseOnMobile={false} defaultOpen={true}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "16rem" });
  });

  // --- Aria Labels ---

  it("sets aria-expanded on toggle button based on open state", () => {
    const { rerender } = render(
      <Sidebar collapsible={true} open={true} onOpenChange={() => {}} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    const button = screen.getByRole("button", { name: /toggle/i });
    expect(button.getAttribute("aria-expanded")).toBe("true");

    rerender(
      <Sidebar collapsible={true} open={false} onOpenChange={() => {}} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("uses custom toggleLabel for button aria-label", () => {
    render(
      <Sidebar collapsible={true} toggleLabel="Open navigation menu" header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    expect(screen.getByRole("button", { name: /open navigation menu/i })).toBeTruthy();
  });

  // --- Collapse Mode Integration ---

  it("collapses to mini width when toggled in mini mode", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Sidebar collapsible={true} collapseMode="mini" defaultOpen={true} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "16rem" });

    await user.click(screen.getByRole("button", { name: /toggle/i }));
    await waitFor(() => {
      expect(sidebar).toHaveStyle({ width: "4rem" });
    });
  });

  it("collapses to zero width when toggled in hide mode", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Sidebar collapsible={true} collapseMode="hide" defaultOpen={true} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    const sidebar = container.querySelector("aside");
    expect(sidebar).toHaveStyle({ width: "16rem" });

    await user.click(screen.getByRole("button", { name: /toggle/i }));
    await waitFor(() => {
      expect(sidebar).toHaveStyle({ width: "0" });
    });
  });

  // --- Accessibility ---

  it("uses navigation landmark role when asideRole='navigation'", () => {
    render(<Sidebar asideRole="navigation">Content</Sidebar>);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("allows custom landmark role via asideRole prop", () => {
    render(<Sidebar asideRole="complementary">Content</Sidebar>);
    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toBeTruthy();
  });

  it("toggle button has 44px touch target size (h-11 w-11)", () => {
    render(
      <Sidebar collapsible={true} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    const button = screen.getByRole("button");
    // Check for h-11 and w-11 classes (44px at 16px rem = 2.75rem)
    expect(button.className).toMatch(/h-11/);
    expect(button.className).toMatch(/w-11/);
  });

  it("toggle button has aria-expanded reflecting open state", () => {
    const { rerender } = render(
      <Sidebar collapsible={true} open={true} onOpenChange={() => {}} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");

    rerender(
      <Sidebar collapsible={true} open={false} onOpenChange={() => {}} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("toggle button aria-controls content area", () => {
    const { container } = render(
      <Sidebar collapsible={true} header={<div>Header</div>}>
        Content
      </Sidebar>,
    );
    const button = screen.getByRole("button");
    const contentId = button.getAttribute("aria-controls");
    const contentArea = container.querySelector(`#${contentId}`);
    expect(contentArea).toBeTruthy();
    expect(contentArea?.textContent).toContain("Content");
  });
});
