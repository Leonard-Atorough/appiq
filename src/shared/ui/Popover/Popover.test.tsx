import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Popover } from "./Popover";

const defaultProps = {
  trigger: (props: object) => <button {...props}>Open</button>,
  children: <p>Popover content</p>,
};

describe("Popover", () => {
  // --- Rendering & Basic State ---

  it("renders the trigger", () => {
    render(<Popover {...defaultProps} />);
    expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
  });

  it("does not render the panel by default", () => {
    render(<Popover {...defaultProps} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the panel after trigger click", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("renders open when defaultOpen=true", () => {
    render(<Popover {...defaultProps} defaultOpen />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes the panel on second trigger click", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // --- Controlled Mode ---

  it("respects controlled open=true", () => {
    render(<Popover {...defaultProps} open={true} onOpenChange={vi.fn()} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("respects controlled open=false", () => {
    render(<Popover {...defaultProps} open={false} onOpenChange={vi.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange when trigger is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Popover {...defaultProps} open={false} onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("updates controlled popover when open prop changes", () => {
    const { rerender } = render(<Popover {...defaultProps} open={false} onOpenChange={vi.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    rerender(<Popover {...defaultProps} open={true} onOpenChange={vi.fn()} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // --- Size Variants ---

  it("applies size variant sm to panel", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} size="sm" />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("p-sm", "min-w-[10rem]");
  });

  it("applies size variant md to panel", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} size="md" />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("p-md", "min-w-[14rem]");
  });

  it("applies size variant lg to panel", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} size="lg" />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("p-lg", "min-w-[20rem]");
  });

  // --- Side & Align Positioning ---

  it("applies bottom side positioning (default)", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} side="bottom" align="start" />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("top-full", "left-0");
  });

  it("applies top side positioning", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} side="top" align="start" />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("bottom-full", "left-0");
  });

  it("applies right side positioning", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} side="right" align="center" />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("left-full", "top-1/2", "-translate-y-1/2");
  });

  it("applies left side positioning", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} side="left" align="end" />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("right-full", "bottom-0");
  });

  it("applies center align positioning", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} side="bottom" align="center" />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("left-1/2", "-translate-x-1/2");
  });

  // --- Accessibility ---

  it("sets aria-expanded=false when closed", () => {
    render(<Popover {...defaultProps} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  it("sets aria-expanded=true when open", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("sets aria-controls on trigger pointing to panel id when open", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    const trigger = screen.getByRole("button");
    const panel = screen.getByRole("dialog");
    expect(trigger).toHaveAttribute("aria-controls", panel.id);
  });

  it("does not set aria-controls when closed", () => {
    render(<Popover {...defaultProps} />);
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-controls");
  });

  it("sets aria-haspopup=true on trigger for non-modal popover", () => {
    render(<Popover {...defaultProps} modal={false} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "true");
  });

  it("sets aria-haspopup=dialog on trigger for modal popover", () => {
    render(<Popover {...defaultProps} modal={true} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "dialog");
  });

  // --- Escape Key ---

  it("closes the panel on Escape key", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not close on Escape when closeOnEscape=false", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} closeOnEscape={false} />);
    await user.click(screen.getByRole("button"));
    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // --- Outside Click ---

  it("closes on outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover {...defaultProps} />
        <button>Outside</button>
      </div>,
    );
    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.pointer({
      target: screen.getByRole("button", { name: /outside/i }),
      keys: "[MouseLeft]",
    });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("does not close on outside click when closeOnOutsideClick=false", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover {...defaultProps} closeOnOutsideClick={false} />
        <button>Outside</button>
      </div>,
    );
    await user.click(screen.getByRole("button", { name: /open/i }));
    fireEvent.pointerDown(screen.getByRole("button", { name: /outside/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // --- Modal Mode ---

  it("renders an overlay in modal mode", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} modal />);
    await user.click(screen.getByRole("button"));
    const overlay = document.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass("bg-black/50");
  });

  it("sets aria-modal on the panel in modal mode", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} modal />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("does not set aria-modal in non-modal mode", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-modal");
  });

  it("locks scroll in modal mode when open", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} modal />);
    await user.click(screen.getByRole("button"));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores scroll when modal popover closes", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} modal />);
    await user.click(screen.getByRole("button"));
    await user.keyboard("{Escape}");
    expect(document.body.style.overflow).toBe("");
  });

  // --- Hover Mode ---

  it("opens on mouse enter and closes on mouse leave in hover mode", () => {
    render(<Popover {...defaultProps} openOn="hover" />);
    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // --- Focus Mode ---

  it("opens on trigger focus in focus mode", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} openOn="focus" />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  // --- Focus Management ---

  it("returns focus to trigger after popover closes", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    const trigger = screen.getByRole("button");

    // Open popover
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close via Escape
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Focus should return to trigger
    expect(trigger).toHaveFocus();
  });

  // --- CSS & Layout ---

  it("applies base popover classes to panel", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("z-50", "bg-surface", "border", "border-base", "rounded-lg");
    expect(panel).toHaveClass("shadow-md", "transition-all", "duration-200", "ease-out");
  });

  it("applies triggerClassName to the trigger button", () => {
    render(<Popover {...defaultProps} triggerClassName="custom-trigger" />);
    expect(screen.getByRole("button")).toHaveClass("custom-trigger");
  });

  it("applies contentClassName to the panel", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} contentClassName="custom-panel" />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toHaveClass("custom-panel");
  });

  it("merges custom className with variant classes", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} size="lg" contentClassName="custom-class" />);
    await user.click(screen.getByRole("button"));
    const panel = screen.getByRole("dialog");
    expect(panel).toHaveClass("p-lg", "min-w-[20rem]", "custom-class");
  });

  it("applies wrapper relative inline-block layout", () => {
    const { container } = render(<Popover {...defaultProps} />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("relative", "inline-block");
  });

  // --- Snapshots ---

  it("matches snapshot when open with default props", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Popover trigger={(props) => <button {...props}>Open</button>} size="md">
        <p>Panel content</p>
      </Popover>,
    );
    await user.click(screen.getByRole("button"));
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with modal mode", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Popover trigger={(props) => <button {...props}>Open Modal</button>} modal size="md">
        <p>Modal content</p>
      </Popover>,
    );
    await user.click(screen.getByRole("button"));
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with side positioning", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Popover
        trigger={(props) => <button {...props}>Open</button>}
        side="right"
        align="center"
        size="lg"
      >
        <p>Right-aligned content</p>
      </Popover>,
    );
    await user.click(screen.getByRole("button"));
    expect(container.firstChild).toMatchSnapshot();
  });
});
