import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "./Alert";

describe("Alert", () => {
  describe("Rendering", () => {
    it("renders with default props (info type)", () => {
      render(<Alert description="Test alert message" />);
      const alert = screen.getByRole("status");
      expect(alert).toBeInTheDocument();
      expect(screen.getByText("Test alert message")).toBeInTheDocument();
    });

    it("renders with a title", () => {
      render(<Alert title="Alert Title" description="Message content" />);
      expect(screen.getByText("Alert Title")).toBeInTheDocument();
      expect(screen.getByText("Message content")).toBeInTheDocument();
    });

    it("applies type variants", () => {
      const { rerender } = render(<Alert type="success" description="Success!" />);
      expect(screen.getByRole("status")).toHaveClass("text-success-text");

      rerender(<Alert type="error" description="Error!" />);
      expect(screen.getByRole("alert")).toHaveClass("text-error-text");

      rerender(<Alert type="warning" description="Warning!" />);
      expect(screen.getByRole("alert")).toHaveClass("text-warning-text");
    });

    it("renders custom className", () => {
      render(<Alert className="custom-class" description="Test" />);
      expect(screen.getByRole("status")).toHaveClass("custom-class");
    });
  });

  describe("Accessibility", () => {
    it("uses role=alert for error and warning types", () => {
      const { rerender } = render(<Alert type="error" description="Error alert" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();

      rerender(<Alert type="warning" description="Warning alert" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("uses role=status for info and success types", () => {
      const { rerender } = render(<Alert type="info" description="Info alert" />);
      expect(screen.getByRole("status")).toBeInTheDocument();

      rerender(<Alert type="success" description="Success alert" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders close button with accessible label when dismissible", () => {
      render(<Alert dismissible description="Dismissible alert" />);
      const closeButton = screen.getByLabelText("Dismiss alert");
      expect(closeButton).toBeInTheDocument();
    });

    it("does not render close button when not dismissible", () => {
      render(<Alert dismissible={false} description="Non-dismissible alert" />);
      const closeButton = screen.queryByLabelText("Dismiss alert");
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe("Dismissal", () => {
    it("dismisses alert when close button is clicked", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Alert dismissible description="Dismissible alert" />,
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
        <Alert dismissible onDismiss={onDismiss} description="Dismissible alert" />,
      );

      const closeButton = screen.getByLabelText("Dismiss alert");
      await user.click(closeButton);

      expect(onDismiss).toHaveBeenCalledOnce();
    });

    it("respects isOpen prop", () => {
      const { container, rerender } = render(
        <Alert isOpen={true} description="Visible alert" />,
      );
      expect(container.firstChild).not.toBeNull();

      rerender(<Alert isOpen={false} description="Hidden alert" />);
      expect(container.firstChild).toBeNull();
    });

    it("shows alert again when isOpen changes back to true", () => {
      const { rerender } = render(<Alert isOpen={false} description="Test alert" />);
      expect(screen.queryByText("Test alert")).not.toBeInTheDocument();

      rerender(<Alert isOpen={true} description="Test alert" />);
      expect(screen.getByText("Test alert")).toBeInTheDocument();
    });
  });

  describe("HTML Attributes", () => {
    it("forwards ref to the DOM element", () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Alert ref={ref} description="Test alert" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("passes through data attributes", () => {
      render(<Alert data-testid="custom-alert" description="Test" />);
      expect(screen.getByTestId("custom-alert")).toBeInTheDocument();
    });
  });

  describe("Icon Rendering", () => {
    it("renders appropriate icon for each alert type", () => {
      const { rerender } = render(<Alert type="success" description="Success" />);
      let svg = screen.getByRole("status").querySelector("svg");
      expect(svg).toBeInTheDocument();

      rerender(<Alert type="error" description="Error" />);
      svg = screen.getByRole("alert").querySelector("svg");
      expect(svg).toBeInTheDocument();

      rerender(<Alert type="warning" description="Warning" />);
      svg = screen.getByRole("alert").querySelector("svg");
      expect(svg).toBeInTheDocument();

      rerender(<Alert type="info" description="Info" />);
      svg = screen.getByRole("status").querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Borderless Variant", () => {
    it("renders with border and padding by default (borderless=false)", () => {
      const { container } = render(<Alert borderless={false} description="Default alert" />);
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass("border");
      expect(alert).toHaveClass("p-md");
    });

    it("renders without border and padding when borderless=true", () => {
      const { container } = render(<Alert borderless={true} description="Borderless alert" />);
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass("border-0");
      expect(alert).toHaveClass("p-0");
    });

    it("renders icon even when borderless", () => {
      render(<Alert type="error" borderless={true} description="Error without border" />);
      const svg = screen.getByRole("alert").querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders title when borderless with title", () => {
      render(
        <Alert borderless={true} title="Form Error" description="Email is required" />,
      );
      expect(screen.getByText("Form Error")).toBeInTheDocument();
    });

    it("can dismiss alert when borderless and dismissible", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      const { container } = render(
        <Alert borderless={true} dismissible onDismiss={onDismiss} description="Borderless dismissible alert" />,
      );

      const closeButton = screen.getByLabelText("Dismiss alert");
      await user.click(closeButton);

      expect(onDismiss).toHaveBeenCalledOnce();
      expect(container.firstChild).toBeNull();
    });

    it("borderless works with all alert types", () => {
      const types = ["success", "error", "warning", "info"] as const;
      const { rerender, container } = render(
        <Alert type="success" borderless={true} description="Success" />,
      );

      types.forEach((type) => {
        rerender(
          <Alert type={type} borderless={true} description={type} />,
        );
        const alert = container.firstChild as HTMLElement;
        expect(alert).toHaveClass("border-0");
        expect(alert).toHaveClass("p-0");
      });
    });
  });
});
