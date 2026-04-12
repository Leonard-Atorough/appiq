import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Popover } from "./Popover";

const defaultProps = {
  trigger: <span>Open</span>,
  children: <p>Popover content</p>,
};

describe("Popover", () => {
  // --- Rendering ---

  it("renders the trigger", () => {
    render(<Popover {...defaultProps} />);
    expect(screen.getByRole("button", { name: /open/i })).toBeTruthy();
  });

  it("does not render the panel by default", () => {
    render(<Popover {...defaultProps} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders the panel after trigger click", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("Popover content")).toBeTruthy();
  });

  it("renders open when defaultOpen=true", () => {
    render(<Popover {...defaultProps} defaultOpen />);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  // --- Toggle ---

  it("closes the panel on second trigger click", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeTruthy();
    await user.click(screen.getByRole("button"));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  // --- Controlled mode ---

  it("respects controlled open=true", () => {
    render(<Popover {...defaultProps} open={true} onOpenChange={vi.fn()} />);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("respects controlled open=false", () => {
    render(<Popover {...defaultProps} open={false} onOpenChange={vi.fn()} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("calls onOpenChange when trigger is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Popover {...defaultProps} open={false} onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // --- Accessibility ---

  it("sets aria-expanded=false when closed", () => {
    render(<Popover {...defaultProps} />);
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toBe("false");
  });

  it("sets aria-expanded=true when open", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button").getAttribute("aria-expanded")).toBe("true");
  });

  it("sets aria-controls on trigger pointing to panel id when open", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    const trigger = screen.getByRole("button");
    const panel = screen.getByRole("dialog");
    expect(trigger.getAttribute("aria-controls")).toBe(panel.id);
  });

  it("does not set aria-controls when closed", () => {
    render(<Popover {...defaultProps} />);
    expect(screen.getByRole("button").getAttribute("aria-controls")).toBeNull();
  });

  // --- Escape key ---

  it("closes the panel on Escape key", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog")).toBeTruthy();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not close on Escape when closeOnEscape=false", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} closeOnEscape={false} />);
    await user.click(screen.getByRole("button"));
    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  // --- Outside click ---

  it("closes on outside click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover {...defaultProps} />
        <button>Outside</button>
      </div>,
    );
    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByRole("dialog")).toBeTruthy();
    await user.pointer({
      target: screen.getByRole("button", { name: /outside/i }),
      keys: "[MouseLeft]",
    });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
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
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  // --- Modal mode ---

  it("renders an overlay in modal mode", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} modal />);
    await user.click(screen.getByRole("button"));
    expect(document.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it("sets aria-modal on the panel in modal mode", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} modal />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog").getAttribute("aria-modal")).toBe("true");
  });

  it("does not set aria-modal in non-modal mode", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog").getAttribute("aria-modal")).toBeNull();
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

  // --- Hover mode ---

  it("opens on mouse enter and closes on mouse leave in hover mode", async () => {
    render(<Popover {...defaultProps} openOn="hover" />);
    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);
    expect(screen.getByRole("dialog")).toBeTruthy();
    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  // --- Customisation ---

  it("applies triggerClassName to the trigger button", () => {
    render(<Popover {...defaultProps} triggerClassName="custom-trigger" />);
    expect(screen.getByRole("button").className).toContain("custom-trigger");
  });

  it("applies contentClassName to the panel", async () => {
    const user = userEvent.setup();
    render(<Popover {...defaultProps} contentClassName="custom-panel" />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("dialog").className).toContain("custom-panel");
  });

  // --- Snapshot ---

  it("matches snapshot when open", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Popover trigger={<span>Open</span>} side="bottom" align="start" size="md">
        <p>Panel content</p>
      </Popover>,
    );
    await user.click(screen.getByRole("button"));
    expect(container.firstChild).toMatchSnapshot();
  });
});
