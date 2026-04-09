import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders with default props", () => {
    render(<Badge>Default Badge</Badge>);
    expect(screen.getByRole("button", { name: /default badge/i })).toBeTruthy();
  });

  it("renders with text content", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    render(<Badge variant="success">Success Badge</Badge>);
    const badge = screen.getByRole("button");
    expect(badge.className).toContain("bg-(--color-success)");
  });

  it("applies size classes correctly", () => {
    render(
      <Badge size="lg" variant="default">
        Large Badge
      </Badge>,
    );
    const badge = screen.getByRole("button");
    expect(badge.className).toContain("px-(--spacing-md)");
    expect(badge.className).toContain("py-(--spacing-sm)");
  });

  it("applies outline variant classes", () => {
    render(
      <Badge variant="error" outline>
        Outlined Error
      </Badge>,
    );
    const badge = screen.getByRole("button");
    expect(badge.className).toContain("bg-transparent");
    expect(badge.className).toContain("border");
  });

  it("applies rounded variant classes", () => {
    render(
      <Badge rounded variant="default">
        Rounded Badge
      </Badge>,
    );
    const badge = screen.getByRole("button");
    expect(badge.className).toContain("rounded-(--radius-full)");
  });

  it("renders icon when provided", () => {
    const icon = <span data-testid="badge-icon">★</span>;
    render(<Badge icon={icon}>With Icon</Badge>);
    expect(screen.getByTestId("badge-icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });

  it("renders dismiss button when dismissable is true", () => {
    render(<Badge dismissable>Dismissable Badge</Badge>);
    const dismissButton = screen.getByLabelText("Dismiss badge");
    expect(dismissButton).toBeInTheDocument();
    expect(dismissButton).toHaveTextContent("✕");
  });

  it("does not render dismiss button when dismissable is false", () => {
    render(<Badge dismissable={false}>Not Dismissable</Badge>);
    const dismissButton = screen.queryByLabelText("Dismiss badge");
    expect(dismissButton).not.toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
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

  it("calls onDismiss when Enter key is pressed on dismiss button", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Badge dismissable onDismiss={onDismiss}>
        Dismissable Badge
      </Badge>,
    );
    const dismissButton = screen.getByLabelText("Dismiss badge");
    dismissButton.focus();
    await user.keyboard("{Enter}");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("calls onDismiss when Space key is pressed on dismiss button", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Badge dismissable onDismiss={onDismiss}>
        Dismissable Badge
      </Badge>,
    );
    const dismissButton = screen.getByLabelText("Dismiss badge");
    dismissButton.focus();
    await user.keyboard(" ");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("stops event propagation when dismiss button is clicked", async () => {
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

  it("renders all variant types", () => {
    const variants = ["default", "success", "error", "warning", "info"] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByRole("button", { name: variant })).toBeTruthy();
      unmount();
    });
  });

  it("renders all size types", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Badge size={size}>{size}</Badge>);
      expect(screen.getByRole("button", { name: size })).toBeTruthy();
      unmount();
    });
  });

  it("supports custom className via HTML attributes", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByRole("button");
    expect(badge.className).toContain("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Badge ref={ref} variant="success">
        Ref Badge
      </Badge>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("is accessible with keyboard navigation", () => {
    render(<Badge dismissable>Accessible Badge</Badge>);
    const badge = screen.getByRole("button", { name: /accessible badge/i });
    const dismissButton = screen.getByLabelText("Dismiss badge");

    expect(badge).toHaveAttribute("type", "button");
    expect(dismissButton).toHaveAttribute("role", "button");
    expect(dismissButton).toHaveAttribute("tabIndex", "0");
  });

  it("has focus styles for accessibility", () => {
    render(<Badge>Focusable Badge</Badge>);
    const badge = screen.getByRole("button");
    expect(badge.className).toContain("focus-visible:ring-2");
  });

  it("combines icon and dismissable functionality", async () => {
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

  it("applies multiple variant options together", () => {
    render(
      <Badge variant="success" outline size="lg" rounded>
        Multi-variant
      </Badge>,
    );
    const badge = screen.getByRole("button");
    expect(badge.className).toContain("outline");
    expect(badge.className).toContain("lg");
    expect(badge.className).toContain("rounded");
  });
});
