import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders with primary variant by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole("button", { name: /primary button/i });
    expect(button.className).toMatch(/primary|gradient/);
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button", { name: /secondary/i });
    expect(button).toBeInTheDocument();
  });

  it("renders outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button", { name: /outline/i });
    expect(button.className).toContain("border");
    expect(button.className).toContain("bg-transparent");
  });

  it("renders ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button", { name: /ghost/i });
    expect(button.className).toContain("bg-transparent");
  });

  it("renders link variant", () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole("button", { name: /link/i });
    expect(button.className).toContain("shadow-none");
  });

  it("applies small size", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button", { name: /small/i });
    expect(button.className).toContain("px-sm");
    expect(button.className).toContain("text-sm");
  });

  it("applies medium size (default)", () => {
    render(<Button size="md">Medium</Button>);
    const button = screen.getByRole("button", { name: /medium/i });
    expect(button.className).toContain("px-md");
    expect(button.className).toContain("text-base");
  });

  it("applies large size", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button", { name: /large/i });
    expect(button.className).toContain("px-lg");
    expect(button.className).toContain("py-md");
  });

  it("applies full width class", () => {
    render(<Button full>Full Width</Button>);
    const button = screen.getByRole("button", { name: /full width/i });
    expect(button.className).toContain("w-full");
  });

  it("handles disabled state correctly", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button.className).toContain("disabled:opacity-50");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("sets aria-disabled when disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("does not set aria-disabled when enabled", () => {
    render(<Button>Enabled</Button>);
    const button = screen.getByRole("button", { name: /enabled/i });
    expect(button).not.toHaveAttribute("aria-disabled");
  });

  it("handles onClick event", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    const button = screen.getByRole("button", { name: /click/i });

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders loading state with spinner", () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole("button", { name: /loading/i });
    expect(button.className).toContain("cursor-wait");
    expect(button.className).toContain("opacity-75");
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("does not set aria-busy when not loading", () => {
    render(<Button>Not Loading</Button>);
    const button = screen.getByRole("button", { name: /not loading/i });
    expect(button).not.toHaveAttribute("aria-busy");
  });

  it("blocks clicks when loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Loading
      </Button>,
    );
    const button = screen.getByRole("button", { name: /loading/i });

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders spinner with aria-hidden", () => {
    const { container } = render(<Button loading>Loading</Button>);
    const spinner = container.querySelector('[aria-hidden="true"]');
    expect(spinner).toBeInTheDocument();
    expect(spinner?.className).toContain("animate-spin");
  });

  it("hides text content when loading", () => {
    render(<Button loading>Loading Text</Button>);
    const textSpan = screen.getByRole("button", { name: /loading text/i }).querySelector("span");
    expect(textSpan?.className).toContain("opacity-0");
  });

  it("supports custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button.className).toContain("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toContain("Ref Button");
  });

  it("has focus visible styles", () => {
    render(<Button>Focus</Button>);
    const button = screen.getByRole("button", { name: /focus/i });
    expect(button.className).toContain("focus-visible:ring");
  });

  it("has transition classes for smooth interactions", () => {
    render(<Button>Transition</Button>);
    const button = screen.getByRole("button", { name: /transition/i });
    expect(button.className).toContain("transition-all");
    expect(button.className).toContain("duration-200");
  });

  it("has active scale transform", () => {
    render(<Button>Active</Button>);
    const button = screen.getByRole("button", { name: /active/i });
    expect(button.className).toContain("active:scale");
  });

  it("applies shadow effects", () => {
    render(<Button>Shadow</Button>);
    const button = screen.getByRole("button", { name: /shadow/i });
    expect(button.className).toContain("shadow-sm");
    expect(button.className).toContain("hover:shadow-md");
  });

  it("combines variant, size, and full width", () => {
    render(
      <Button variant="outline" size="lg" full>
        Complex
      </Button>,
    );
    const button = screen.getByRole("button", { name: /complex/i });
    expect(button.className).toContain("border");
    expect(button.className).toContain("px-lg");
    expect(button.className).toContain("w-full");
  });

  it("renders all variant types without error", () => {
    const variants = ["primary", "secondary", "outline", "ghost", "link"] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button", { name: variant })).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all size types without error", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>{size}</Button>);
      expect(screen.getByRole("button", { name: size })).toBeInTheDocument();
      unmount();
    });
  });
});
