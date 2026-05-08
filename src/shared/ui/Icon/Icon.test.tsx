import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon Component", () => {
  describe("Rendering", () => {
    it("renders an icon by name", () => {
      const { container } = render(<Icon name="kebab" aria-label="menu" />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it.each([
      "kebab",
      "meatball",
      "bento",
      "doner",
      "hamburger",
      "chevron-left",
      "chevron-right",
      "check-circle",
      "x-circle",
      "bell",
      "check",
      "briefcase",
    ] as const)("renders %s icon", (name) => {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it.each([
      ["xs", "w-md"],
      ["sm", "w-lg"],
      ["md", "w-xl"],
      ["lg", "w-2xl"],
      ["xl", "w-3xl"],
    ] as const)("applies %s size with class %s", (size, expectedClass) => {
      const { container } = render(<Icon name="kebab" size={size} />);
      const span = container.querySelector("span");
      expect(span).toHaveClass(expectedClass);
    });

    it("uses default size (md) when not specified", () => {
      const { container } = render(<Icon name="kebab" />);
      const span = container.querySelector("span");
      expect(span).toHaveClass("w-xl", "h-xl");
    });
  });

  describe("Variants", () => {
    it.each([
      ["default", "text-base"],
      ["muted", "text-muted"],
      ["primary", "text-primary"],
      ["secondary", "text-secondary"],
      ["success", "text-success"],
      ["error", "text-error"],
      ["warning", "text-warning"],
      ["info", "text-info"],
    ] as const)("applies %s variant with class %s", (variant, expectedClass) => {
      const { container } = render(<Icon name="kebab" variant={variant} />);
      const span = container.querySelector("span");
      expect(span).toHaveClass(expectedClass);
    });

    it("uses default variant when not specified", () => {
      const { container } = render(<Icon name="kebab" />);
      const span = container.querySelector("span");
      expect(span).toHaveClass("text-base");
    });

    it("combines size and variant correctly", () => {
      const { container } = render(<Icon name="check-circle" size="lg" variant="success" />);
      const span = container.querySelector("span");
      expect(span).toHaveClass("w-2xl", "text-success");
    });
  });

  describe("Props & Styling", () => {
    it("merges custom className with variant classes", () => {
      const { container } = render(
        <Icon name="kebab" size="lg" variant="primary" className="custom-class" />,
      );
      const span = container.querySelector("span");
      expect(span).toHaveClass("custom-class", "text-primary", "w-2xl");
    });
  });

  describe("Accessibility", () => {
    it("sets aria-hidden=true by default for decorative icons", () => {
      const { container } = render(<Icon name="kebab" />);
      const span = container.querySelector("span");
      expect(span).toHaveAttribute("aria-hidden", "true");
    });

    it("allows aria-hidden=false for informational icons", () => {
      const { container } = render(<Icon name="check-circle" aria-hidden={false} />);
      const span = container.querySelector("span");
      expect(span).toHaveAttribute("aria-hidden", "false");
    });

    it("supports aria-label for informational content", () => {
      const { container } = render(
        <Icon name="check-circle" variant="success" aria-label="Task completed" aria-hidden={false} />,
      );
      const span = container.querySelector("span");
      expect(span).toHaveAttribute("aria-label", "Task completed");
      expect(span).toHaveAttribute("aria-hidden", "false");
      expect(span).toHaveAttribute("role", "img");
    });
  });

  describe("Error Handling", () => {
    it("logs warning and returns null for unknown icon names", () => {
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const { container } = render(<Icon name="unknown-icon" aria-label="test" />);
      expect(consoleWarnSpy).toHaveBeenCalledWith('Icon "unknown-icon" not found in the registry.');
      expect(container.firstChild).toBeNull();
      consoleWarnSpy.mockRestore();
    });

    it("does not render aria-hidden when icon not found", () => {
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const { container } = render(<Icon name="fake-icon" />);
      const span = container.querySelector("span");
      expect(span).not.toBeInTheDocument();
      consoleWarnSpy.mockRestore();
    });
  });
});
