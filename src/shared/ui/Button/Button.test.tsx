import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "button");
    });
  });

  describe("Variants", () => {
    it.each(["primary", "secondary", "outline", "ghost", "link"] as const)(
      "renders %s variant",
      (variant) => {
        render(<Button variant={variant}>{variant}</Button>);
        expect(screen.getByRole("button", { name: variant })).toBeInTheDocument();
      },
    );

    it("renders outline variant with border and transparent bg", () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button", { name: /outline/i });
      expect(button.className).toContain("border");
      expect(button.className).toContain("bg-transparent");
    });

    it("renders ghost variant with transparent bg", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button", { name: /ghost/i });
      expect(button.className).toContain("bg-transparent");
    });

    it("renders link variant without shadow", () => {
      render(<Button variant="link">Link</Button>);
      const button = screen.getByRole("button", { name: /link/i });
      expect(button.className).toContain("shadow-none");
    });
  });

  describe("Sizes", () => {
    it.each(["sm", "md", "lg"] as const)(
      "renders %s size",
      (size) => {
        render(<Button size={size}>{size}</Button>);
        expect(screen.getByRole("button", { name: size })).toBeInTheDocument();
      },
    );

    it("applies correct padding and text for small size", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("px-sm");
      expect(button.className).toContain("text-sm");
    });

    it("applies correct padding and text for large size", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("px-lg");
      expect(button.className).toContain("py-md");
    });
  });

  describe("Full Width", () => {
    it("applies full width class", () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("w-full");
    });
  });

  describe("Disabled State", () => {
    it("prevents click when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          Disabled
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      await user.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it("sets aria-disabled attribute", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("does not set aria-disabled when enabled", () => {
      render(<Button>Enabled</Button>);
      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("aria-disabled");
    });

    it("applies disabled styling", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("disabled:opacity-50");
    });
  });

  describe("Loading State", () => {
    it("shows loading indicator and hides text", () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("cursor-wait");
      expect(button.className).toContain("opacity-75");
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("hides text content when loading", () => {
      render(<Button loading>Loading Text</Button>);
      const button = screen.getByRole("button");
      const textSpan = button.querySelector("span");
      expect(textSpan?.className).toContain("opacity-0");
    });

    it("prevents clicks when loading", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Loading
        </Button>,
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("renders spinner with aria-hidden", () => {
      const { container } = render(<Button loading>Loading</Button>);
      const spinner = container.querySelector('[aria-hidden="true"]');
      expect(spinner).toBeInTheDocument();
      expect(spinner?.className).toContain("animate-spin");
    });

    it("does not set aria-busy when not loading", () => {
      render(<Button>Not Loading</Button>);
      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("aria-busy");
    });
  });

  describe("Click Handling", () => {
    it("calls onClick callback", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click</Button>);
      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe("Composition", () => {
    it("combines variant, size, and full width", () => {
      render(
        <Button variant="outline" size="lg" fullWidth>
          Complex
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button.className).toContain("border");
      expect(button.className).toContain("px-lg");
      expect(button.className).toContain("w-full");
    });
  });

  describe("Accessibility & Styling", () => {
    it("has focus-visible ring for keyboard navigation", () => {
      render(<Button>Focus</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("focus-visible:ring");
    });

    it("has smooth transition classes", () => {
      render(<Button>Transition</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("transition-all");
      expect(button.className).toContain("duration-200");
    });

    it("has active scale transform effect", () => {
      render(<Button>Active</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("active:scale");
    });

    it("has shadow effects for depth", () => {
      render(<Button>Shadow</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("shadow-sm");
      expect(button.className).toContain("hover:shadow-md");
    });
  });

  describe("Props", () => {
    it("applies custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toContain("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toContain("Ref Button");
    });
  });
});
