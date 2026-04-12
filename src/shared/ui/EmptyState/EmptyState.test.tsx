import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders default title and description", () => {
    render(<EmptyState />);
    expect(screen.getByText("No applications yet")).toBeTruthy();
    expect(screen.getByText(/track your job search/i)).toBeTruthy();
  });

  it("renders custom title and description", () => {
    render(<EmptyState title="Nothing here" description="Add something to get started." />);
    expect(screen.getByText("Nothing here")).toBeTruthy();
    expect(screen.getByText("Add something to get started.")).toBeTruthy();
  });

  it("renders action button when action prop is provided", () => {
    const onClick = vi.fn();
    render(<EmptyState action={{ label: "Add Application", onClick }} />);
    expect(screen.getByRole("button", { name: /add application/i })).toBeTruthy();
  });

  it("calls action.onClick when button is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<EmptyState action={{ label: "Add Application", onClick }} />);
    await user.click(screen.getByRole("button", { name: /add application/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not render action button when action prop is omitted", () => {
    render(<EmptyState />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders custom icon", () => {
    render(<EmptyState icon={<svg data-testid="custom-icon" />} />);
    expect(screen.getByTestId("custom-icon")).toBeTruthy();
  });

  it("has role=status for screen readers", () => {
    render(<EmptyState title="Empty" />);
    expect(screen.getByRole("status")).toBeTruthy();
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
