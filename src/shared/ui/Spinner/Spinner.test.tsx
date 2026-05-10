import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      const { container } = render(<Spinner />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies size variants", () => {
      const { rerender, container } = render(<Spinner size="sm" data-testid="spinner" />);
      expect(container.firstChild).toHaveClass("h-lg", "w-lg");

      rerender(<Spinner size="lg" data-testid="spinner" />);
      expect(container.firstChild).toHaveClass("h-2xl", "w-2xl");
    });

    it("applies custom className", () => {
      const { container } = render(<Spinner className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Accessibility", () => {
    it("sets aria-busy by default", () => {
      const { container } = render(<Spinner />);
      expect(container.firstChild).toHaveAttribute("aria-busy", "true");
    });

    it("sets aria-label to custom label", () => {
      const { container } = render(<Spinner label="Saving changes..." />);
      expect(container.firstChild).toHaveAttribute("aria-label", "Saving changes...");
    });

    it("sets default aria-label to Loading", () => {
      const { container } = render(<Spinner />);
      expect(container.firstChild).toHaveAttribute("aria-label", "Loading");
    });

    it("sets role to status for screen readers", () => {
      const { container } = render(<Spinner />);
      expect(container.firstChild).toHaveAttribute("role", "status");
    });

    it("allows aria-busy to be controlled", () => {
      const { rerender, container } = render(<Spinner busy={true} />);
      expect(container.firstChild).toHaveAttribute("aria-busy", "true");

      rerender(<Spinner busy={false} />);
      expect(container.firstChild).toHaveAttribute("aria-busy", "false");
    });
  });

  describe("HTML Attributes", () => {
    it("forwards ref to the DOM element", () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("passes through data attributes", () => {
      const { container } = render(<Spinner data-testid="test-spinner" />);
      expect(container.firstChild).toHaveAttribute("data-testid", "test-spinner");
    });
  });

  describe("Visual Styles", () => {
    it("has spin animation", () => {
      const { container } = render(<Spinner />);
      expect(container.firstChild).toHaveClass("animate-spin");
    });

    it("has rounded shape", () => {
      const { container } = render(<Spinner />);
      expect(container.firstChild).toHaveClass("rounded-full");
    });

    it("uses current text color for the border", () => {
      const { container } = render(<Spinner />);
      expect(container.firstChild).toHaveClass("border-current");
    });

    it("has transparent top border for animation effect", () => {
      const { container } = render(<Spinner />);
      expect(container.firstChild).toHaveClass("border-t-transparent");
    });
  });
});
