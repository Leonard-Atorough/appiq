import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DragItem } from "./DragItem";

// Helper: build a minimal dataTransfer mock compatible with jsdom's fireEvent
const makeDataTransfer = () => ({
  setData: vi.fn(),
  getData: vi.fn(),
  clearData: vi.fn(),
  effectAllowed: "none" as DataTransfer["effectAllowed"],
  types: [] as readonly string[],
});

describe("DragItem", () => {
  // --- Rendering ---

  it("renders children", () => {
    render(<DragItem id="1" type="card"><span>Drag me</span></DragItem>);
    expect(screen.getByText("Drag me")).toBeTruthy();
  });

  it("applies custom className to the wrapper", () => {
    const { container } = render(
      <DragItem id="1" type="card" className="my-custom-class">Child</DragItem>,
    );
    expect(container.firstChild).toHaveClass("my-custom-class");
  });

  // --- Draggable attribute ---

  it("is draggable by default", () => {
    const { container } = render(<DragItem id="1" type="card">Child</DragItem>);
    expect((container.firstChild as HTMLElement).draggable).toBe(true);
  });

  it("is not draggable when disabled", () => {
    const { container } = render(<DragItem id="1" type="card" disabled>Child</DragItem>);
    expect((container.firstChild as HTMLElement).draggable).toBe(false);
  });

  it("applies cursor-not-allowed class when disabled", () => {
    const { container } = render(<DragItem id="1" type="card" disabled>Child</DragItem>);
    expect(container.firstChild).toHaveClass("cursor-not-allowed");
  });

  // --- Drag events ---

  it("sets dataTransfer data on dragStart with correct type and id", () => {
    const { container } = render(<DragItem id="app-42" type="application-card">Child</DragItem>);
    const dt = makeDataTransfer();
    fireEvent.dragStart(container.firstChild as Element, { dataTransfer: dt });
    expect(dt.setData).toHaveBeenCalledWith("application-card", "app-42");
  });

  it("sets effectAllowed to 'move' on dragStart", () => {
    const { container } = render(<DragItem id="app-1" type="application-card">Child</DragItem>);
    const dt = makeDataTransfer();
    fireEvent.dragStart(container.firstChild as Element, { dataTransfer: dt });
    expect(dt.effectAllowed).toBe("move");
  });

  it("clears dataTransfer data on dragEnd", () => {
    const { container } = render(<DragItem id="app-1" type="application-card">Child</DragItem>);
    const dt = makeDataTransfer();
    fireEvent.dragEnd(container.firstChild as Element, { dataTransfer: dt });
    expect(dt.clearData).toHaveBeenCalledTimes(1);
  });

  it("falls back to 'application-card' type when type is undefined", () => {
    const { container } = render(
      <DragItem id="app-1">Child</DragItem>,
    );
    const dt = makeDataTransfer();
    fireEvent.dragStart(container.firstChild as Element, { dataTransfer: dt });
    expect(dt.setData).toHaveBeenCalledWith("application-card", "app-1");
  });

  // --- Dev warning ---

  it("logs a warning in dev when type is not provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <DragItem id="app-missing-type">Child</DragItem>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("[DragItem]"));
    warn.mockRestore();
  });

  // --- Snapshots ---

  it("matches snapshot for default draggable item", () => {
    const { container } = render(
      <DragItem id="app-1" type="application-card">
        <div>Card content</div>
      </DragItem>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for disabled item", () => {
    const { container } = render(
      <DragItem id="app-1" type="application-card" disabled>
        <div>Card content</div>
      </DragItem>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
