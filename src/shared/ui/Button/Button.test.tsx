import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeTruthy();
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="primary" size="lg">
        Click me
      </Button>,
    );
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button.classList).toContain("bg-(--color-primary)");
    expect(button.classList).toContain("text-(--color-primary-foreground)");
    expect(button.classList).toContain("px-lg");
    expect(button.classList).toContain("py-md");
  });

  it("handles disabled state", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>,
    );
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("handles onClick event", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
