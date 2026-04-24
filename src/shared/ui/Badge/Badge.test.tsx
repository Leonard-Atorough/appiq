import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders as span element by default", () => {
    const { container } = render(<Badge>Default Badge</Badge>);
    const badge = container.querySelector("span");
    expect(badge).toBeInTheDocument();
    expect(screen.getByText("Default Badge")).toBeInTheDocument();
  });

  it("renders as button when onClick is provided", async () => {
    const onClick = vi.fn();
    render(<Badge onClick={onClick}>Clickable</Badge>);
    const badge = screen.getByRole("button", { name: /clickable/i });
    expect(badge).toHaveAttribute("type", "button");

    const user = userEvent.setup();
    await user.click(badge);
    expect(onClick).toHaveBeenCalled();
  });

  it("renders text content correctly", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("renders with success variant prop set", () => {
    const { container } = render(<Badge variant="success">Success Badge</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders with error variant prop set", () => {
    const { container } = render(<Badge variant="error">Error Badge</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders with warning variant prop set", () => {
    const { container } = render(<Badge variant="warning">Warning Badge</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders with info variant prop set", () => {
    const { container } = render(<Badge variant="info">Info Badge</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders with default variant prop set", () => {
    const { container } = render(<Badge variant="default">Default Badge</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("applies size small prop", () => {
    const { container } = render(<Badge size="sm">Small Badge</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("applies size medium prop", () => {
    const { container } = render(<Badge size="md">Medium Badge</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("applies size large prop", () => {
    const { container } = render(<Badge size="lg">Large Badge</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders outline variant with border", () => {
    const { container } = render(
      <Badge variant="success" outline>
        Outlined Success
      </Badge>,
    );
    const badge = container.querySelector("span");
    expect(badge?.className).toContain("bg-transparent");
    expect(badge?.className).toContain("border");
  });

  it("renders with rounded pill shape by default", () => {
    const { container } = render(<Badge variant="default">Pill Badge</Badge>);
    const badge = container.querySelector("span");
    // Rounded should default to true, which adds rounded-full
    expect(badge?.className).toContain("rounded-full");
  });

  it("renders with sharp corners when rounded=false", () => {
    const { container } = render(
      <Badge variant="default" rounded={false}>
        Sharp Badge
      </Badge>,
    );
    const badge = container.querySelector("span");
    expect(badge?.className).toContain("rounded-md");
  });

  it("renders icon when provided", () => {
    const icon = <span data-testid="badge-icon">★</span>;
    render(<Badge icon={icon}>With Icon</Badge>);
    expect(screen.getByTestId("badge-icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  it("renders dismiss button with correct label when dismissable", () => {
    render(
      <Badge dismissable onDismiss={() => {}}>
        Dismissable Badge
      </Badge>,
    );
    const dismissButton = screen.getByLabelText("Dismiss badge");
    expect(dismissButton).toBeInTheDocument();
    expect(dismissButton).toHaveTextContent("✕");
  });

  it("renders as span container when dismissable", () => {
    const { container } = render(
      <Badge dismissable onDismiss={() => {}}>
        Dismissable
      </Badge>,
    );
    const outerSpan = container.querySelector("span");
    expect(outerSpan).toBeInTheDocument();
    expect(outerSpan?.tagName).toBe("SPAN");
  });

  it("does not render dismiss button when dismissable is false", () => {
    render(<Badge dismissable={false}>Not Dismissable</Badge>);
    const dismissButton = screen.queryByLabelText("Dismiss badge");
    expect(dismissButton).not.toBeInTheDocument();
  });

  it("does not render dismiss button by default", () => {
    render(<Badge>No Dismiss</Badge>);
    const dismissButton = screen.queryByLabelText("Dismiss badge");
    expect(dismissButton).not.toBeInTheDocument();
  });

  it("calls onDismiss callback when dismiss button clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Badge dismissable onDismiss={onDismiss}>
        Dismissable Badge
      </Badge>,
    );
    const dismissButton = screen.getByLabelText("Dismiss badge");
    await user.click(dismissButton);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("prevents parent onClick when dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const onClick = vi.fn();
    render(
      <Badge dismissable onDismiss={onDismiss} onClick={onClick}>
        Dismissable Badge
      </Badge>,
    );
    const dismissButton = screen.getByLabelText("Dismiss badge");
    await user.click(dismissButton);
    expect(onDismiss).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies custom className prop", () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    const badge = container.querySelector("span");
    expect(badge?.className).toContain("custom-class");
  });

  it("forwards ref correctly to span element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Badge ref={ref}>Ref Badge</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.textContent).toContain("Ref Badge");
  });

  it("forwards ref to button when onClick is provided", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Badge ref={ref} onClick={() => {}}>
        Button Ref
      </Badge>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("has focus visible indicator for keyboard navigation", () => {
    render(<Badge onClick={() => {}}>Focusable Badge</Badge>);
    const badge = screen.getByRole("button", { name: /focusable badge/i });
    expect(badge.className).toContain("focus-visible:ring");
  });

  it("renders icon and dismiss button together", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const icon = <span data-testid="badge-icon">●</span>;

    render(
      <Badge icon={icon} dismissable onDismiss={onDismiss}>
        With Icon and Dismiss
      </Badge>,
    );

    expect(screen.getByTestId("badge-icon")).toBeInTheDocument();
    const dismissButton = screen.getByLabelText("Dismiss badge");
    await user.click(dismissButton);
    expect(onDismiss).toHaveBeenCalled();
  });

  it("combines multiple variant options", () => {
    const { container } = render(
      <Badge variant="success" outline size="lg" rounded>
        Multi-variant
      </Badge>,
    );
    const badge = container.querySelector("span");
    expect(badge).toBeInTheDocument();
    expect(badge?.className).toContain("bg-transparent");
    expect(badge?.className).toContain("border");
  });

  it("renders all variant types without error", () => {
    const variants = ["default", "success", "error", "warning", "info"] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders all size types without error", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Badge size={size}>{size}</Badge>);
      expect(screen.getByText(size)).toBeInTheDocument();
      unmount();
    });
  });

  it("has transition classes for state changes", () => {
    const { container } = render(<Badge>Hover Badge</Badge>);
    const badge = container.querySelector("span");
    expect(badge?.className).toContain("transition-all");
    expect(badge?.className).toContain("duration-200");
  });

  it("renders dismiss icon with aria-hidden", () => {
    render(
      <Badge dismissable onDismiss={() => {}}>
        With Dismiss
      </Badge>,
    );
    const dismissIcon = screen
      .getByLabelText("Dismiss badge")
      .querySelector('[aria-hidden="true"]');
    expect(dismissIcon).toBeInTheDocument();
    expect(dismissIcon).toHaveTextContent("✕");
  });

  it("responds to keyboard Enter on dismiss button", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Badge dismissable onDismiss={onDismiss}>
        Keyboard Test
      </Badge>,
    );
    const dismissButton = screen.getByLabelText("Dismiss badge");
    dismissButton.focus();
    await user.keyboard("{Enter}");
    expect(onDismiss).toHaveBeenCalled();
  });

  it("has base layout classes for flex container", () => {
    const { container } = render(<Badge>Layout Test</Badge>);
    const badge = container.querySelector("span");
    expect(badge?.className).toContain("inline-flex");
    expect(badge?.className).toContain("items-center");
  });

  it("renders multiple children properly", () => {
    const icon = <span data-testid="icon">→</span>;
    render(<Badge icon={icon}>Multi-child</Badge>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Multi-child")).toBeInTheDocument();
  });
});
