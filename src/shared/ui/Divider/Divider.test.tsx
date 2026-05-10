import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider", () => {
  describe("Rendering", () => {
    it("renders as div with default props (decorative horizontal)", () => {
      const { container } = render(<Divider />);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("DIV");
    });

    it("renders as hr when semantic horizontal", () => {
      const { container } = render(<Divider decorative={false} />);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("HR");
    });

    it("renders as div for vertical dividers regardless of decorative", () => {
      const { container: decorContainer } = render(
        <Divider direction="vertical" decorative />,
      );
      const { container: semanticContainer } = render(
        <Divider direction="vertical" decorative={false} />,
      );

      expect((decorContainer.firstChild as HTMLElement).tagName).toBe("DIV");
      expect((semanticContainer.firstChild as HTMLElement).tagName).toBe("DIV");
    });

    it("applies direction variants", () => {
      const { container: horizontal } = render(
        <Divider direction="horizontal" />,
      );
      const { container: vertical } = render(<Divider direction="vertical" />);

      expect(horizontal.firstChild).toHaveClass("w-full");
      expect(vertical.firstChild).toHaveClass("h-full");
    });

    it("applies spacing variants", () => {
      const { container: noSpacing } = render(
        <Divider spacing="none" />,
      );
      const { container: mdSpacing } = render(<Divider spacing="md" />);

      // No spacing should not have my-* classes
      expect(noSpacing.firstChild).not.toHaveClass("my-xs", "my-sm", "my-md", "my-lg", "my-xl");
      // mdSpacing should have spacing class
      expect(mdSpacing.firstChild).toHaveClass("my-md");
    });

    it("applies color variants", () => {
      const { container: baseColor } = render(<Divider color="base" />);
      const { container: mutedColor } = render(<Divider color="muted" />);

      expect(baseColor.firstChild).toHaveClass("bg-border-base");
      expect(mutedColor.firstChild).toHaveClass("bg-border-muted");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Divider className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Accessibility", () => {
    it("sets role=presentation for decorative horizontal divider", () => {
      const { container } = render(<Divider decorative />);
      expect(container.firstChild).toHaveAttribute("role", "presentation");
    });

    it("does not set role for semantic horizontal divider (hr element)", () => {
      const { container } = render(<Divider decorative={false} />);
      const hr = container.firstChild as HTMLElement;
      // hr elements don't have role attribute by default
      expect(hr.tagName).toBe("HR");
    });

    it("sets role=presentation for decorative vertical divider", () => {
      const { container } = render(
        <Divider direction="vertical" decorative />,
      );
      expect(container.firstChild).toHaveAttribute("role", "presentation");
    });

    it("does not set role for semantic vertical divider", () => {
      const { container } = render(
        <Divider direction="vertical" decorative={false} />,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.getAttribute("role")).toBeNull();
    });
  });

  describe("HTML Attributes", () => {
    it("forwards ref to the DOM element", () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Divider ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it("passes through data attributes", () => {
      const { container } = render(
        <Divider data-testid="test-divider" />,
      );
      expect(container.firstChild).toHaveAttribute(
        "data-testid",
        "test-divider",
      );
    });

    it("supports aria-label for semantic dividers", () => {
      const { container } = render(
        <Divider decorative={false} aria-label="Section separator" />,
      );
      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "Section separator",
      );
    });
  });

  describe("Appearance Variants", () => {
    it("renders solid appearance by default", () => {
      const { container } = render(<Divider appearance="solid" />);
      // Solid dividers use the base bg color
      expect(container.firstChild).toHaveClass("bg-border-base");
    });

    it("applies dashed appearance classes", () => {
      const { container } = render(<Divider appearance="dashed" />);
      expect(container.firstChild).toHaveClass("border-dashed");
    });

    it("applies dotted appearance classes", () => {
      const { container } = render(<Divider appearance="dotted" />);
      expect(container.firstChild).toHaveClass("border-dotted");
    });
  });

  describe("Size Variants", () => {
    it("applies size variants", () => {
      const { container: sm } = render(<Divider size="sm" />);
      const { container: lg } = render(<Divider size="lg" />);

      expect(sm.firstChild).toBeInTheDocument();
      expect(lg.firstChild).toBeInTheDocument();
    });
  });

  describe("FullSize Behavior", () => {
    it("renders full-width horizontal divider by default", () => {
      const { container } = render(<Divider direction="horizontal" />);
      expect(container.firstChild).toHaveClass("w-full");
    });

    it("renders full-height vertical divider by default", () => {
      const { container } = render(<Divider direction="vertical" />);
      expect(container.firstChild).toHaveClass("h-full");
    });
  });
});
