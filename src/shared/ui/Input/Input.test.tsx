import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("applies state and size classes", () => {
    render(<Input state="error" size="lg" placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input.classList).toContain("border-(--color-error)");
    expect(input.classList).toContain("px-(--spacing-md)");
    expect(input.classList).toContain("py-(--spacing-sm)");
  });

  it("renders start and end adornments", () => {
    render(
      <Input
        placeholder="Enter text"
        startAdornment={<span data-testid="start">S</span>}
        endAdornment={<span data-testid="end">E</span>}
      />,
    );
    const startAdornment = screen.getByTestId("start");
    const endAdornment = screen.getByTestId("end");
    expect(startAdornment).toBeInTheDocument();
    expect(endAdornment).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Enter text");
    expect(input.classList).toContain("pl-(--spacing-lg)");
    expect(input.classList).toContain("pr-(--spacing-lg)");
  });
});
