import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  // --- Rendering ---

  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeTruthy();
  });

  it("renders header when provided", () => {
    render(<Card header="Software Engineer">Content</Card>);
    expect(screen.getByText("Software Engineer")).toBeTruthy();
  });

  it("renders footer when provided", () => {
    render(<Card footer="Applied via LinkedIn">Content</Card>);
    expect(screen.getByText("Applied via LinkedIn")).toBeTruthy();
  });

  it("renders thumbnail with alt text when provided", () => {
    render(
      <Card thumbnail="https://example.com/img.png" thumbnailAlt="Company banner">
        Content
      </Card>,
    );
    const img = screen.getByRole("img", { name: "Company banner" });
    expect(img).toBeTruthy();
    expect(img.getAttribute("src")).toBe("https://example.com/img.png");
  });

  // --- Role ---

  it("uses role='button' when onClick is provided", () => {
    render(<Card onClick={() => {}}>Clickable</Card>);
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("uses role='group' when no onClick is provided", () => {
    render(<Card interactive={false}>Static</Card>);
    expect(screen.getByRole("group")).toBeTruthy();
  });

  it("associates header with aria-labelledby", () => {
    render(<Card header="My Card">Content</Card>);
    const group = screen.getByRole("group");
    const labelledBy = group.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy!)).toBeTruthy();
  });

  // --- Keyboard interaction ---

  it("fires onClick on Enter key", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Card onClick={onClick}>Clickable</Card>);
    const card = screen.getByRole("button");
    card.focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick on Space key", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Card onClick={onClick}>Clickable</Card>);
    const card = screen.getByRole("button");
    card.focus();
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // --- Disabled state ---

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Card disabled onClick={onClick}>
        Disabled
      </Card>,
    );
    // onClick provided → role is 'button' even when disabled
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets aria-disabled when disabled", () => {
    render(<Card disabled>Disabled</Card>);
    const card = screen.getByRole("group");
    expect(card.getAttribute("aria-disabled")).toBe("true");
  });

  // --- Loading state ---

  it("sets aria-busy when loading", () => {
    render(<Card loading>Content</Card>);
    expect(screen.getByRole("group").getAttribute("aria-busy")).toBe("true");
  });

  it("renders loading spinner when loading", () => {
    const { container } = render(<Card loading>Content</Card>);
    expect(container.querySelector(".animate-spin")).toBeTruthy();
  });

  it("does not fire onClick when loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Card loading onClick={onClick}>
        Loading
      </Card>,
    );
    // onClick provided → role is 'button' even when loading
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  // --- Selected state ---

  it("sets data-selected when selected", () => {
    render(<Card selected>Selected</Card>);
    expect(screen.getByRole("group").getAttribute("data-selected")).toBe("true");
  });

  // --- DragItem wrapping ---

  it("wraps in DragItem container when dragId is provided", () => {
    const { container } = render(
      <Card dragId="app-1" dragType="application-card">
        Draggable
      </Card>,
    );
    // DragItem renders a draggable div wrapping the card
    const draggable = container.querySelector("[draggable='true']");
    expect(draggable).toBeTruthy();
  });

  it("inner card div is not draggable when dragId is provided", () => {
    const { container } = render(
      <Card dragId="app-1" dragType="application-card">
        Draggable
      </Card>,
    );
    const allDraggable = container.querySelectorAll("[draggable='true']");
    // Only the DragItem wrapper should be draggable, not the inner card div
    expect(allDraggable).toHaveLength(1);
  });

  it("does not render DragItem wrapper when dragId is absent", () => {
    const { container } = render(<Card>Static</Card>);
    // Without dragId, the card element is the direct first child (no unstyled wrapper div)
    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild.classList.contains("bg-surface")).toBe(true);
  });

  // --- Snapshots ---

  it("matches snapshot for default card", () => {
    const { container } = render(
      <Card header="Software Engineer" footer="Applied via LinkedIn">
        Acme Corp — Remote
      </Card>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for status variants", () => {
    const { container } = render(
      <div>
        <Card status="success" header="Offer">
          Success
        </Card>
        <Card status="warning" header="Awaiting">
          Warning
        </Card>
        <Card status="error" header="Rejected">
          Error
        </Card>
        <Card status="info" header="Interview">
          Info
        </Card>
      </div>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for loading state", () => {
    const { container } = render(
      <Card header="Loading" loading>
        Content
      </Card>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for draggable card with dragId", () => {
    const { container } = render(
      <Card header="Draggable" dragId="app-1" dragType="application-card">
        Content
      </Card>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
