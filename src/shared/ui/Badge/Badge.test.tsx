import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children with badge overlay", () => {
    const { container } = render(
      <Badge value={5}>
        <div>Content</div>
      </Badge>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
    const badgeSpan = container.querySelector("span");
    expect(badgeSpan?.textContent).toBe("5");
  });

  it("renders string value", () => {
    const { container } = render(
      <Badge value="new">
        <div>Item</div>
      </Badge>
    );
    const badgeSpan = container.querySelector("span");
    expect(badgeSpan?.textContent).toBe("new");
  });

  it("displays max+ when numeric value exceeds max", () => {
    const { container } = render(
      <Badge value={15} max={10}>
        <div>Item</div>
      </Badge>
    );
    const badgeSpan = container.querySelector("span");
    expect(badgeSpan?.textContent).toBe("10+");
  });

  it("renders exact value when below max", () => {
    const { container } = render(
      <Badge value={5} max={10}>
        <div>Item</div>
      </Badge>
    );
    const badgeSpan = container.querySelector("span");
    expect(badgeSpan?.textContent).toBe("5");
  });

  it("hides badge when isVisible={false}", () => {
    const { container } = render(
      <Badge value={5} isVisible={false}>
        <div>Content</div>
      </Badge>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(container.querySelector("span")).not.toBeInTheDocument();
  });

  it("shows badge when isVisible={true}", () => {
    const { container } = render(
      <Badge value={5} isVisible={true}>
        <div>Content</div>
      </Badge>
    );
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("applies color variant success", () => {
    const { container } = render(
      <Badge value={5} color="success">
        <div>Content</div>
      </Badge>
    );
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("bg-success-light");
    expect(badge).toHaveClass("text-success");
  });

  it("applies size variant sm", () => {
    const { container } = render(
      <Badge value={5} size="sm">
        <div>Content</div>
      </Badge>
    );
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("text-xs");
  });

  it("applies size variant lg", () => {
    const { container } = render(
      <Badge value={5} size="lg">
        <div>Content</div>
      </Badge>
    );
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("text-md");
  });

  it("applies dot variant", () => {
    const { container } = render(
      <Badge value="" style="dot">
        <div>Content</div>
      </Badge>
    );
    const badge = container.querySelector("span");
    // Default size is md, so dot should be w-3 h-3
    expect(badge).toHaveClass("w-3");
    expect(badge).toHaveClass("h-3");
  });

  it("applies shape square", () => {
    const { container } = render(
      <Badge value={5} shape="square">
        <div>Content</div>
      </Badge>
    );
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("rounded-md");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Badge value={5} className="custom-class">
        <div>Content</div>
      </Badge>
    );
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("custom-class");
  });

  it("positions badge absolutely top-right", () => {
    const { container } = render(
      <Badge value={5}>
        <div>Content</div>
      </Badge>
    );
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("absolute");
    expect(badge).toHaveClass("top-0");
    expect(badge).toHaveClass("right-0");
  });

  it("wraps children in relative inline-block container", () => {
    const { container } = render(
      <Badge value={5}>
        <div>Content</div>
      </Badge>
    );
    const wrapper = container.querySelector("div.relative.inline-block");
    expect(wrapper).toBeInTheDocument();
  });

  it("preserves children element structure", () => {
    render(
      <Badge value={5}>
        <button>Click me</button>
      </Badge>
    );
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies default variants when none specified", () => {
    const { container } = render(
      <Badge value={5}>
        <div>Content</div>
      </Badge>
    );
    const badge = container.querySelector("span");
    expect(badge).toHaveClass("bg-primary-100");
    expect(badge).toHaveClass("text-primary-700");
    expect(badge).toHaveClass("text-sm");
    expect(badge).toHaveClass("rounded-full");
  });
});
