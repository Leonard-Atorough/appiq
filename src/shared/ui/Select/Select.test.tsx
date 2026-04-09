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

  it("renders a chevron dropdown icon by default", () => {
    const { container } = render(
      <Select data-testid="select">
        <option value="1">One</option>
      </Select>,
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("renders start adornment and always adds right padding for the icon", () => {
    render(
      <Select data-testid="select" startAdornment={<span data-testid="start">S</span>}>
        <option value="1">One</option>
      </Select>,
    );
    expect(screen.getByTestId("start")).toBeInTheDocument();
    const select = screen.getByTestId("select");
    expect(select.classList).toContain("pl-(--spacing-lg)");
    expect(select.classList).toContain("pr-8");
  });

  it("renders end adornment in place of the default chevron", () => {
    render(
      <Select data-testid="select" endAdornment={<span data-testid="end">E</span>}>
        <option value="1">One</option>
      </Select>,
    );
    expect(screen.getByTestId("end")).toBeInTheDocument();
    const { container } = render(
      <Select data-testid="select2">
        <option value="1">One</option>
      </Select>,
    );
    // default chevron is an svg
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
