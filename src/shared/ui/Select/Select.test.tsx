import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
  it("renders with default props", () => {
    render(
      <Select data-testid="select">
        <option value="1">One</option>
      </Select>,
    );
    const select = screen.getByTestId("select");
    expect(select).toBeInTheDocument();
  });

  it("applies state and size classes", () => {
    render(
      <Select state="error" size="lg" data-testid="select">
        <option value="1">One</option>
      </Select>,
    );
    const select = screen.getByTestId("select");
    expect(select.classList).toContain("border-(--color-error)");
    expect(select.classList).toContain("px-4");
    expect(select.classList).toContain("py-2");
  });

  it("renders start and end adornments", () => {
    render(
      <Select
        data-testid="select"
        startAdornment={<span data-testid="start">S</span>}
        endAdornment={<span data-testid="end">E</span>}
      >
        <option value="1">One</option>
      </Select>,
    );
    const startAdornment = screen.getByTestId("start");
    const endAdornment = screen.getByTestId("end");
    expect(startAdornment).toBeInTheDocument();
    expect(endAdornment).toBeInTheDocument();

    const select = screen.getByTestId("select");
    expect(select.classList).toContain("pl-(--spacing-lg)");
    expect(select.classList).toContain("pr-(--spacing-lg)");
  });
});
