import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";

describe("EmptyState", () => {
  it("renders default title and description", () => {
    render(<EmptyState />);
    expect(screen.getByText("No applications yet")).toBeInTheDocument();
    expect(screen.getByText(/track your job search/i)).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(<EmptyState title="Nothing here" description="Add something to get started." />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Add something to get started.")).toBeInTheDocument();
  });

  it("renders action button with object form (label + onClick)", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<EmptyState action={{ label: "Add Application", onClick }} />);

    const button = screen.getByRole("button", { name: /add application/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders action as React node (Button component)", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<EmptyState action={<Button onClick={onClick}>Custom Action</Button>} />);

    const button = screen.getByRole("button", { name: /custom action/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not render action when action prop is omitted", () => {
    render(<EmptyState />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders custom icon", () => {
    render(<EmptyState icon={<svg data-testid="custom-icon" />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("has role=status for screen readers", () => {
    render(<EmptyState title="Empty" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has aria-label matching title", () => {
    render(<EmptyState title="Custom Title" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Custom Title");
  });

  it("renders all size variants", () => {
    const { rerender, container } = render(<EmptyState size="sm" />);
    expect(container.firstChild).toHaveClass("gap-sm");

    rerender(<EmptyState size="md" />);
    expect(container.firstChild).toHaveClass("gap-md");

    rerender(<EmptyState size="lg" />);
    expect(container.firstChild).toHaveClass("gap-lg");
  });

  it("renders all background variants", () => {
    const { rerender, container } = render(<EmptyState variant="default" />);
    expect(container.firstChild).toHaveClass("bg-surface");

    rerender(<EmptyState variant="muted" />);
    expect(container.firstChild).toHaveClass("bg-muted");
  });

  it("applies custom className", () => {
    const { container } = render(<EmptyState className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("matches snapshot with all props", () => {
    const { container } = render(
      <EmptyState
        title="No applications yet"
        description="Start tracking your job search."
        action={{ label: "Add Application", onClick: vi.fn() }}
        variant="default"
        size="md"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
