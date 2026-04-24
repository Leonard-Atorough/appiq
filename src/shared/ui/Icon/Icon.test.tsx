import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon Component", () => {
  describe("rendering", () => {
    it("renders an icon by name", () => {
      const { container } = render(<Icon name="kebab" aria-label="menu" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders all registered icons", () => {
      const icons = [
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
      ];
      icons.forEach((name) => {
        const { container } = render(<Icon name={name} />);
        expect(container.querySelector("svg")).toBeInTheDocument();
      });
    });

    it("applies size styling", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
      sizes.forEach((size) => {
        const { container } = render(<Icon name="kebab" size={size} />);
        const span = container.querySelector("span");
        expect(span).toHaveClass(`w-${size === "xs" ? "sm" : size === "sm" ? "md" : size === "md" ? "xl" : size === "lg" ? "2xl" : "3xl"}`);
      });
    });

    it("applies variant styling", () => {
      const { container: defaultContainer } = render(<Icon name="kebab" variant="default" />);
      const { container: successContainer } = render(<Icon name="kebab" variant="success" />);
      const { container: errorContainer } = render(<Icon name="kebab" variant="error" />);

      const defaultSpan = defaultContainer.querySelector("span");
      const successSpan = successContainer.querySelector("span");
      const errorSpan = errorContainer.querySelector("span");

      expect(defaultSpan?.className).toContain("text-base");
      expect(successSpan?.className).toContain("text-success");
      expect(errorSpan?.className).toContain("text-error");
    });

    it("merges custom className with variant classes", () => {
      const { container } = render(
        <Icon name="kebab" size="lg" variant="primary" className="custom-class" />,
      );
      const span = container.querySelector("span");
      expect(span?.className).toContain("custom-class");
      expect(span?.className).toContain("text-primary");
      expect(span?.className).toContain("w-2xl");
    });
  });

  describe("accessibility", () => {
    it("sets aria-hidden=true by default for decorative icons", () => {
      const { container } = render(<Icon name="kebab" />);
      const span = container.querySelector("span");
      expect(span).toHaveAttribute("aria-hidden", "true");
    });

    it("allows setting aria-hidden=false for informational icons", () => {
      const { container } = render(<Icon name="check-circle" aria-hidden={false} />);
      const span = container.querySelector("span");
      expect(span).toHaveAttribute("aria-hidden", "false");
    });

    it("wrapper has aria-hidden controlled by ariaHidden prop", () => {
      const { container: decorative } = render(<Icon name="kebab" />);
      const { container: informational } = render(<Icon name="kebab" aria-hidden={false} />);
      
      expect(decorative.querySelector("span")).toHaveAttribute("aria-hidden", "true");
      expect(informational.querySelector("span")).toHaveAttribute("aria-hidden", "false");
    });

    it("supports using icon with aria-label for informational content", () => {
      const { container } = render(
        <Icon name="check-circle" variant="success" aria-label="Task completed" aria-hidden={false} />,
      );
      const span = container.querySelector("span");
      expect(span).toHaveAttribute("aria-label", "Task completed");
      expect(span).toHaveAttribute("aria-hidden", "false");
      expect(span).toHaveAttribute("role", "img");
    });
  });

  describe("error handling", () => {
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

  describe("variants", () => {
    it("renders all color variants", () => {
      const variants = ["default", "muted", "primary", "secondary", "success", "error", "warning", "info"] as const;
      variants.forEach((variant) => {
        const { container } = render(<Icon name="bell" variant={variant} />);
        const span = container.querySelector("span");
        expect(span).toBeInTheDocument();
      });
    });

    it("renders all size variants", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
      sizes.forEach((size) => {
        const { container } = render(<Icon name="bell" size={size} />);
        const span = container.querySelector("span");
        expect(span).toBeInTheDocument();
      });
    });

    it("combines size and variant correctly", () => {
      const { container } = render(<Icon name="check-circle" size="lg" variant="success" />);
      const span = container.querySelector("span");
      expect(span?.className).toContain("w-2xl");
      expect(span?.className).toContain("text-success");
    });
  });

  describe("default props", () => {
    it("uses default size (md) when not specified", () => {
      const { container } = render(<Icon name="kebab" />);
      const span = container.querySelector("span");
      expect(span?.className).toContain("w-xl");
      expect(span?.className).toContain("h-xl");
    });

    it("uses default variant (default/text-base) when not specified", () => {
      const { container } = render(<Icon name="kebab" />);
      const span = container.querySelector("span");
      expect(span?.className).toContain("text-base");
    });
  });

  describe("snapshots", () => {
    it("matches snapshot for default icon", () => {
      const { container } = render(<Icon name="kebab" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for sized and variant icon", () => {
      const { container } = render(<Icon name="check-circle" size="lg" variant="success" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot with custom className", () => {
      const { container } = render(<Icon name="bell" className="custom-class" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
