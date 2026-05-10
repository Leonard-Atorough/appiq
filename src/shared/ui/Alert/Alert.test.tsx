import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "./Alert";

describe("Alert", () => {
  describe("Rendering", () => {
    it("renders with default props (info type)", () => {
      render(<Alert>Test alert message</Alert>);
      const alert = screen.getByRole("status");
      expect(alert).toBeInTheDocument();
      expect(screen.getByText("Test alert message")).toBeInTheDocument();
    });

    it("renders with a title", () => {
      render(<Alert title="Alert Title">Message content</Alert>);
      expect(screen.getByText("Alert Title")).toBeInTheDocument();
      expect(screen.getByText("Message content")).toBeInTheDocument();
    });

    it("applies type variants", () => {
      const { rerender } = render(<Alert type="success">Success!</Alert>);
      expect(screen.getByRole("status")).toHaveClass("text-success-text");

      rerender(<Alert type="error">Error!</Alert>);
      expect(screen.getByRole("alert")).toHaveClass("text-error-text");

      rerender(<Alert type="warning">Warning!</Alert>);
      expect(screen.getByRole("alert")).toHaveClass("text-warning-text");
    });

    it("renders custom className", () => {
      render(<Alert className="custom-class">Test</Alert>);
      expect(screen.getByRole("status")).toHaveClass("custom-class");
    });
  });

  describe("Accessibility", () => {
    it("uses role=alert for error and warning types", () => {
      const { rerender } = render(<Alert type="error">Error alert</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();

      rerender(<Alert type="warning">Warning alert</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("uses role=status for info and success types", () => {
      const { rerender } = render(<Alert type="info">Info alert</Alert>);
      expect(screen.getByRole("status")).toBeInTheDocument();

      rerender(<Alert type="success">Success alert</Alert>);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders close button with accessible label when dismissible", () => {
      render(<Alert dismissible>Dismissible alert</Alert>);
      const closeButton = screen.getByLabelText("Dismiss alert");
      expect(closeButton).toBeInTheDocument();
    });

    it("does not render close button when not dismissible", () => {
      render(<Alert dismissible={false}>Non-dismissible alert</Alert>);
      const closeButton = screen.queryByLabelText("Dismiss alert");
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe("Dismissal", () => {
    it("dismisses alert when close button is clicked", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Alert dismissible>Dismissible alert</Alert>,
      );

      const closeButton = screen.getByLabelText("Dismiss alert");
      await user.click(closeButton);

      // Alert should no longer be in the document
      expect(container.firstChild).toBeNull();
    });

    it("calls onDismiss callback when alert is dismissed", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={onDismiss}>
          Dismissible alert
        </Alert>,
      );

      const closeButton = screen.getByLabelText("Dismiss alert");
      await user.click(closeButton);

      expect(onDismiss).toHaveBeenCalledOnce();
    });

    it("respects isOpen prop", () => {
      const { container, rerender } = render(
        <Alert isOpen={true}>Visible alert</Alert>,
      );
      expect(container.firstChild).not.toBeNull();

      rerender(<Alert isOpen={false}>Hidden alert</Alert>);
      expect(container.firstChild).toBeNull();
    });

    it("shows alert again when isOpen changes back to true", () => {
      const { rerender } = render(<Alert isOpen={false}>Test alert</Alert>);
      expect(screen.queryByText("Test alert")).not.toBeInTheDocument();

      rerender(<Alert isOpen={true}>Test alert</Alert>);
      expect(screen.getByText("Test alert")).toBeInTheDocument();
    });
  });

  describe("HTML Attributes", () => {
    it("forwards ref to the DOM element", () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Alert ref={ref}>Test alert</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("passes through data attributes", () => {
      render(<Alert data-testid="custom-alert">Test</Alert>);
      expect(screen.getByTestId("custom-alert")).toBeInTheDocument();
    });
  });

  describe("Icon Rendering", () => {
    it("renders appropriate icon for each alert type", () => {
      const { rerender } = render(<Alert type="success">Success</Alert>);
      let svg = screen.getByRole("status").querySelector("svg");
      expect(svg).toBeInTheDocument();

      rerender(<Alert type="error">Error</Alert>);
      svg = screen.getByRole("alert").querySelector("svg");
      expect(svg).toBeInTheDocument();

      rerender(<Alert type="warning">Warning</Alert>);
      svg = screen.getByRole("alert").querySelector("svg");
      expect(svg).toBeInTheDocument();

      rerender(<Alert type="info">Info</Alert>);
      svg = screen.getByRole("status").querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Borderless Variant", () => {
    it("renders with border and padding by default (borderless=false)", () => {
      const { container } = render(<Alert borderless={false}>Default alert</Alert>);
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass("border");
      expect(alert).toHaveClass("p-md");
    });

    it("renders without border and padding when borderless=true", () => {
      const { container } = render(<Alert borderless={true}>Borderless alert</Alert>);
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass("border-0");
      expect(alert).toHaveClass("p-0");
    });

    it("renders icon even when borderless", () => {
      render(<Alert type="error" borderless={true}>Error without border</Alert>);
      const svg = screen.getByRole("alert").querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders title when borderless with title", () => {
      render(
        <Alert borderless={true} title="Form Error">
          Email is required
        </Alert>,
      );
      expect(screen.getByText("Form Error")).toBeInTheDocument();
    });

    it("can dismiss alert when borderless and dismissible", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      const { container } = render(
        <Alert borderless={true} dismissible onDismiss={onDismiss}>
          Borderless dismissible alert
        </Alert>,
      );

      const closeButton = screen.getByLabelText("Dismiss alert");
      await user.click(closeButton);

      expect(onDismiss).toHaveBeenCalledOnce();
      expect(container.firstChild).toBeNull();
    });

    it("borderless works with all alert types", () => {
      const types = ["success", "error", "warning", "info"] as const;
      const { rerender, container } = render(
        <Alert type="success" borderless={true}>
          Success
        </Alert>,
      );

      types.forEach((type) => {
        rerender(
          <Alert type={type} borderless={true}>
            {type}
          </Alert>,
        );
        const alert = container.firstChild as HTMLElement;
        expect(alert).toHaveClass("border-0");
        expect(alert).toHaveClass("p-0");
      });
    });
  });
});
