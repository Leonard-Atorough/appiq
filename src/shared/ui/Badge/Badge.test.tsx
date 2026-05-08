import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  describe("Rendering", () => {
    it("renders text content", () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it.each([
      ["span", undefined, undefined],
      ["button", () => {}, undefined],
      ["span", undefined, true],
    ] as const)(
      "renders as %s when onClick=%j, dismissable=%j",
      (element, onClick, dismissable) => {
        const ref = React.createRef<HTMLElement>();
        render(
          <Badge ref={ref} onClick={onClick} dismissable={dismissable} onDismiss={() => {}}>
            Test
          </Badge>,
        );

        const TagName = element === "span" ? HTMLSpanElement : HTMLButtonElement;
        expect(ref.current).toBeInstanceOf(TagName);

        if (element === "button") {
          expect(ref.current).toHaveAttribute("type", "button");
        }
      },
    );
  });

  describe("Variants & Sizes", () => {
    it.each(["default", "success", "error", "warning", "info"] as const)(
      "renders with %s variant",
      (variant) => {
        render(<Badge variant={variant}>{variant}</Badge>);
        expect(screen.getByText(variant)).toBeInTheDocument();
      },
    );

    it.each(["sm", "md", "lg"] as const)("renders with %s size", (size) => {
      render(<Badge size={size}>{size}</Badge>);
      expect(screen.getByText(size)).toBeInTheDocument();
    });

    it("applies outline styling", () => {
      const { container } = render(
        <Badge variant="success" outline>
          Outlined
        </Badge>,
      );
      expect(container.firstChild).toHaveClass("bg-transparent", "border");
    });
  });

  describe("Rounded", () => {
    it.each([
      [true, "rounded-full"],
      [false, "rounded-md"],
    ])("applies %s rounded as %s", (rounded, expectedClass) => {
      const { container } = render(<Badge rounded={rounded}>Test</Badge>);
      expect(container.firstChild).toHaveClass(expectedClass);
    });

    it("applies rounded-md by default", () => {
      const { container } = render(<Badge>Pill</Badge>);
      expect(container.firstChild).toHaveClass("rounded-md");
    });
  });

  describe("Icon", () => {
    it("renders icon alongside text", () => {
      const icon = <span data-testid="icon">●</span>;
      render(<Badge icon={icon}>Label</Badge>);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Label")).toBeInTheDocument();
    });
  });

  describe("Dismissable Behavior", () => {
    it("renders dismiss button when dismissable=true", () => {
      render(
        <Badge dismissable onDismiss={() => {}}>
          Dismissable
        </Badge>,
      );
      expect(screen.getByLabelText("Dismiss badge")).toBeInTheDocument();
    });

    it("does not render dismiss button by default", () => {
      render(<Badge>Not dismissable</Badge>);
      expect(screen.queryByLabelText("Dismiss badge")).not.toBeInTheDocument();
    });

    it("renders as span when dismissable (avoids nested buttons)", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Badge ref={ref} dismissable onDismiss={() => {}}>
          Dismissable
        </Badge>,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("calls onDismiss when dismiss button clicked", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(
        <Badge dismissable onDismiss={onDismiss}>
          Dismissable
        </Badge>,
      );
      await user.click(screen.getByLabelText("Dismiss badge"));
      expect(onDismiss).toHaveBeenCalledOnce();
    });

    it("prevents parent onClick from firing when dismiss is clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const onDismiss = vi.fn();
      render(
        <Badge dismissable onDismiss={onDismiss} onClick={onClick}>
          Dismissable
        </Badge>,
      );
      await user.click(screen.getByLabelText("Dismiss badge"));
      expect(onDismiss).toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    });

    it("responds to keyboard on dismiss button", async () => {
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
  });

  describe("Click Handling", () => {
    it("calls onClick when badge clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Badge onClick={onClick}>Clickable</Badge>);
      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe("Composition", () => {
    it("renders icon and dismiss together", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      const icon = <span data-testid="icon">●</span>;

      render(
        <Badge icon={icon} dismissable onDismiss={onDismiss}>
          Combined
        </Badge>,
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
      await user.click(screen.getByLabelText("Dismiss badge"));
      expect(onDismiss).toHaveBeenCalled();
    });

    it("combines multiple props correctly", () => {
      const { container } = render(
        <Badge variant="success" outline size="lg" rounded icon={<span />}>
          Multi-variant
        </Badge>,
      );
      expect(container.firstChild).toHaveClass("bg-transparent", "border");
    });
  });

  describe("Accessibility & Styling", () => {
    it("has focus-visible ring for keyboard navigation", () => {
      render(<Badge onClick={() => {}}>Focusable</Badge>);
      expect(screen.getByRole("button")).toHaveClass("focus-visible:ring-2");
    });

    it("has transition classes for smooth animations", () => {
      const { container } = render(<Badge>Transitioned</Badge>);
      expect(container.firstChild).toHaveClass("transition-all", "duration-200");
    });

    it("has proper layout classes", () => {
      const { container } = render(<Badge>Layout</Badge>);
      expect(container.firstChild).toHaveClass("inline-flex", "items-center");
    });
  });

  describe("Props", () => {
    it("applies custom className", () => {
      const { container } = render(<Badge className="custom">Custom</Badge>);
      expect(container.firstChild).toHaveClass("custom");
    });

    it("forwards ref to span element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Badge ref={ref}>Ref forwarded</Badge>);
      expect(ref.current?.textContent).toContain("Ref forwarded");
    });

    it("forwards ref to button when onClick provided", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Badge ref={ref} onClick={() => {}}>
          Button ref
        </Badge>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
