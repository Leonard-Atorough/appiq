import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DropTarget } from "./DropTarget";

// Render helper: renders DropTarget with a child that reflects drag state as text
const renderDropTarget = (props: Partial<React.ComponentProps<typeof DropTarget>> = {}) =>
  render(
    <DropTarget droppableId="test-zone" onDrop={vi.fn()} {...props}>
      {({ isDragOver, isDragAccepted }) => (
        <div>
          <span data-testid="status">
            {isDragOver ? (isDragAccepted ? "accepted" : "over") : "idle"}
          </span>
          <span data-testid="content">Drop zone</span>
        </div>
      )}
    </DropTarget>,
  );

const makeDataTransfer = (type = "application-card") => ({
  types: [type],
  getData: vi.fn().mockReturnValue("dragged-item-id"),
  setData: vi.fn(),
  clearData: vi.fn(),
  dropEffect: "none" as DataTransfer["dropEffect"],
  effectAllowed: "move" as DataTransfer["effectAllowed"],
});

describe("DropTarget", () => {
  // --- Rendering ---

  it("renders children via render prop", () => {
    renderDropTarget();
    expect(screen.getByTestId("content")).toBeTruthy();
    expect(screen.getByTestId("status").textContent).toBe("idle");
  });

  it("sets data-droppable-id on the container", () => {
    const { container } = renderDropTarget({ droppableId: "my-zone" });
    expect((container.firstChild as HTMLElement).getAttribute("data-droppable-id")).toBe("my-zone");
  });

  it("applies className to the container", () => {
    const { container } = renderDropTarget({ className: "custom-class" });
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("sets aria-label on the container", () => {
    const { container } = renderDropTarget({ ariaLabel: "Drop applications here" });
    expect((container.firstChild as HTMLElement).getAttribute("aria-label")).toBe(
      "Drop applications here",
    );
  });

  // --- Drag enter / leave state ---

  it("sets isDragOver=true on dragenter", () => {
    const { container } = renderDropTarget({ accept: "application-card" });
    fireEvent.dragEnter(container.firstChild as Element, {
      dataTransfer: makeDataTransfer("application-card"),
    });
    expect(screen.getByTestId("status").textContent).not.toBe("idle");
  });

  it("clears isDragOver on dragleave when counter reaches zero", () => {
    const { container } = renderDropTarget({ accept: "application-card" });
    const zone = container.firstChild as Element;
    const dt = makeDataTransfer("application-card");
    fireEvent.dragEnter(zone, { dataTransfer: dt });
    fireEvent.dragLeave(zone, { dataTransfer: dt });
    expect(screen.getByTestId("status").textContent).toBe("idle");
  });

  it("does not clear isDragOver on dragleave if child also entered (counter > 0)", () => {
    const { container } = renderDropTarget({ accept: "application-card" });
    const zone = container.firstChild as Element;
    const child = screen.getByTestId("content");
    const dt = makeDataTransfer("application-card");

    // Enter the zone (counter=1), then enter a child (counter=2)
    fireEvent.dragEnter(zone, { dataTransfer: dt });
    fireEvent.dragEnter(child, { dataTransfer: dt });
    // Leave the zone background (counter=1) — should still be over
    fireEvent.dragLeave(zone, { dataTransfer: dt });
    expect(screen.getByTestId("status").textContent).not.toBe("idle");
  });

  it("clears state when fully leaving after child traversal", () => {
    const { container } = renderDropTarget({ accept: "application-card" });
    const zone = container.firstChild as Element;
    const child = screen.getByTestId("content");
    const dt = makeDataTransfer("application-card");

    // Simulate: enter zone, enter child, leave child, leave zone
    fireEvent.dragEnter(zone, { dataTransfer: dt });
    fireEvent.dragEnter(child, { dataTransfer: dt });
    fireEvent.dragLeave(child, { dataTransfer: dt });
    fireEvent.dragLeave(zone, { dataTransfer: dt });
    expect(screen.getByTestId("status").textContent).toBe("idle");
  });

  // --- Drag over ---

  it("calls preventDefault on dragover (required for drop to work)", () => {
    const { container } = renderDropTarget();
    const dt = makeDataTransfer();
    // fireEvent.dragOver dispatches a cancelable event; if preventDefault is called, defaultPrevented is true
    const prevented = fireEvent.dragOver(container.firstChild as Element, { dataTransfer: dt });
    // fireEvent returns false when preventDefault was called
    expect(prevented).toBe(false);
  });

  // --- Drop ---

  it("calls onDrop with dragged id on drop", () => {
    const onDrop = vi.fn();
    const { container } = renderDropTarget({ accept: "application-card", onDrop });
    const zone = container.firstChild as Element;
    const dt = makeDataTransfer("application-card");

    // Must dragenter first so isDragAccepted is set
    fireEvent.dragEnter(zone, { dataTransfer: dt });
    fireEvent.drop(zone, { dataTransfer: dt });

    expect(onDrop).toHaveBeenCalledWith("dragged-item-id");
  });

  it("resets isDragOver to idle after drop", () => {
    const { container } = renderDropTarget({ accept: "application-card" });
    const zone = container.firstChild as Element;
    const dt = makeDataTransfer("application-card");

    fireEvent.dragEnter(zone, { dataTransfer: dt });
    fireEvent.drop(zone, { dataTransfer: dt });

    expect(screen.getByTestId("status").textContent).toBe("idle");
  });

  it("does not call onDrop when disabled", () => {
    const onDrop = vi.fn();
    const { container } = renderDropTarget({ disabled: true, onDrop });
    const zone = container.firstChild as Element;
    const dt = makeDataTransfer("application-card");

    fireEvent.dragEnter(zone, { dataTransfer: dt });
    fireEvent.drop(zone, { dataTransfer: dt });

    expect(onDrop).not.toHaveBeenCalled();
  });

  it("does not set isDragOver when disabled", () => {
    const { container } = renderDropTarget({ disabled: true, accept: "application-card" });
    fireEvent.dragEnter(container.firstChild as Element, {
      dataTransfer: makeDataTransfer("application-card"),
    });
    expect(screen.getByTestId("status").textContent).toBe("idle");
  });

  // --- Accept validation ---

  it("shows 'over' (not accepted) when dragged type does not match accept", () => {
    const { container } = renderDropTarget({ accept: "application-card" });
    fireEvent.dragEnter(container.firstChild as Element, {
      dataTransfer: makeDataTransfer("unknown-type"),
    });
    expect(screen.getByTestId("status").textContent).toBe("over");
  });

  it("does not call onDrop when dragged type does not match accept", () => {
    const onDrop = vi.fn();
    const { container } = renderDropTarget({ accept: "application-card", onDrop });
    const zone = container.firstChild as Element;
    const dt = makeDataTransfer("unknown-type");

    fireEvent.dragEnter(zone, { dataTransfer: dt });
    fireEvent.drop(zone, { dataTransfer: dt });

    expect(onDrop).not.toHaveBeenCalled();
  });

  it("accepts array of types and uses correct getData key for non-first type", () => {
    const onDrop = vi.fn();
    const { container } = renderDropTarget({
      accept: ["application-card", "task-card"],
      onDrop,
    });
    const zone = container.firstChild as Element;
    // Simulate a task-card drag (second type in the accept array)
    const dt = makeDataTransfer("task-card");

    fireEvent.dragEnter(zone, { dataTransfer: dt });
    fireEvent.drop(zone, { dataTransfer: dt });

    // getData should have been called with "task-card" (the actual drag type),
    // not "application-card" (accept[0])
    expect(dt.getData).toHaveBeenCalledWith("task-card");
    expect(onDrop).toHaveBeenCalledWith("dragged-item-id");
  });

  // --- Snapshot ---

  it("matches snapshot in idle state", () => {
    const { container } = renderDropTarget({ droppableId: "snap-zone" });
    expect(container.firstChild).toMatchSnapshot();
  });
});
