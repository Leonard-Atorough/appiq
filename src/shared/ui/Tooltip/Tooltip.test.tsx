import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders children", () => {
    render(
      <Tooltip message="Tooltip text">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "Trigger" })).toBeInTheDocument();
  });

  it("does not render the tooltip panel initially", () => {
    render(
      <Tooltip message="Tooltip text">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip panel after hover delay", () => {
    render(
      <Tooltip message="Tooltip text" delay={300}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(300); });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip text");
  });

  it("hides tooltip when mouse leaves", () => {
    render(
      <Tooltip message="Tooltip text" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(0); });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip immediately on focus (no delay)", () => {
    render(
      <Tooltip message="Focus tooltip" delay={500}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.focus(wrapper);
    // No timer advancement needed — focus should show immediately
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("hides tooltip on blur when focus leaves the wrapper", () => {
    render(
      <Tooltip message="Focus tooltip" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.focus(wrapper);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    // relatedTarget=null means focus moved outside the wrapper
    fireEvent.blur(wrapper, { relatedTarget: null });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("hides tooltip when Escape is pressed", () => {
    render(
      <Tooltip message="Tooltip text" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(0); });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("does not show tooltip when disabled", () => {
    render(
      <Tooltip message="Should not show" disabled delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(300); });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("sets aria-describedby on the trigger when tooltip is open", () => {
    render(
      <Tooltip message="Description" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button");
    const wrapper = trigger.parentElement!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(0); });
    const tooltipPanel = screen.getByRole("tooltip");
    expect(trigger).toHaveAttribute("aria-describedby", tooltipPanel.id);
  });

  it("removes aria-describedby from trigger when tooltip closes", () => {
    render(
      <Tooltip message="Description" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button");
    const wrapper = trigger.parentElement!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(0); });
    fireEvent.mouseLeave(wrapper);
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("does not set aria-describedby when disabled", () => {
    render(
      <Tooltip message="Description" disabled>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-describedby");
  });

  it("renders ReactNode message content", () => {
    render(
      <Tooltip message={<span data-testid="rich-content">Rich <strong>content</strong></span>} delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const wrapper = screen.getByRole("button").parentElement!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(0); });
    expect(screen.getByTestId("rich-content")).toBeInTheDocument();
  });
});
