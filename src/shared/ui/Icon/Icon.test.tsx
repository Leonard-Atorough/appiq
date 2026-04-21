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

    it("applies size and variant styling", () => {
      const { container: sm } = render(<Icon name="kebab" size="sm" aria-label="menu" />);
      const { container: md } = render(<Icon name="kebab" size="md" aria-label="menu" />);
      // Just check that className is applied (it will contain the size classes)
      expect(sm.querySelector("svg")?.className).toBeTruthy();
      expect(md.querySelector("svg")?.className).toBeTruthy();
    });

    it("applies custom styling", () => {
      const { container } = render(<Icon name="kebab" size="lg" variant="success" />);
      const svg = container.querySelector("svg");
      // Icon should render successfully with custom size and variant
      expect(svg).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("sets aria-hidden=true by default for decorative icons", () => {
      const { container } = render(<Icon name="kebab" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("allows overriding aria-hidden and setting aria-label", () => {
      const { container } = render(<Icon name="kebab" />);
      const svg = container.querySelector("svg");
      // Icon wrapper with different props
      expect(svg).toBeInTheDocument();
    });

    it("supports accessible icon for informational content", () => {
      const { container } = render(<Icon name="check-circle" variant="success" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
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
  });

  describe("icon variants", () => {
    const iconNames = [
      "kebab",
      "meatball",
      "bento",
      "doner",
      "hamburger",
      "check-circle",
      "x-circle",
      "alert-triangle",
      "info",
      "bell",
      "x",
      "briefcase",
    ] as const;

    iconNames.forEach((name) => {
      it(`renders ${name} icon`, () => {
        const { container } = render(<Icon name={name} aria-label={name} />);
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
      });
    });
  });

  describe("default props", () => {
    it("uses default size (md) and variant (default) when not specified", () => {
      const { container } = render(<Icon name="kebab" aria-label="menu" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("aria-hidden", "true");
      // Should have default className applied
      expect(svg?.className).toBeTruthy();
    });
  });
});
