import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Tag } from "./Tag";

describe("Tag", () => {
  describe("Rendering", () => {
    it("renders text content via label prop", () => {
      render(<Tag label="Test Badge" />);
      expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });

    it.each([
      ["button", undefined],
      ["span", () => {}],
    ] as const)(
      "renders as %s when onClick=%j",
      (element, onClick) => {
        const ref = React.createRef<HTMLElement>();
        render(
          <Tag ref={ref} onClick={onClick} onDismiss={() => {}} label="Test" />,
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
        render(<Tag color={variant} label={variant} />);
        expect(screen.getByText(variant)).toBeInTheDocument();
      },
    );

    it.each(["sm", "md", "lg"] as const)("renders with %s size", (size) => {
      render(<Tag size={size} label={size} />);
      expect(screen.getByText(size)).toBeInTheDocument();
    });

    it("applies outline styling", () => {
      const { container } = render(
        <Tag color="success" outlined label="Outlined" />,
      );
      expect(container.firstChild).toHaveClass("bg-transparent", "border");
    });
  });

  describe("Rounded", () => {
    it.each([
      [true, "rounded-full"],
      [false, "rounded-md"],
    ])("applies %s rounded as %s", (rounded, expectedClass) => {
      const { container } = render(<Tag rounded={rounded} label="Test" />);
      expect(container.firstChild).toHaveClass(expectedClass);
    });

    it("applies rounded-md by default", () => {
      const { container } = render(<Tag label="Pill" />);
      expect(container.firstChild).toHaveClass("rounded-md");
    });
  });

  describe("StartAdornment", () => {
    it("renders startAdornment alongside label", () => {
      const icon = <span data-testid="icon">●</span>;
      render(<Tag startAdornment={icon} label="Label" />);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Label")).toBeInTheDocument();
    });
  });

  describe("Dismissable Behavior", () => {
    it("renders dismiss button when onDismiss is provided", () => {
      render(
        <Tag onDismiss={() => {}} label="Dismissable" />,
      );
      expect(screen.getByLabelText("Dismiss badge")).toBeInTheDocument();
    });

    it("does not render dismiss button by default", () => {
      render(<Tag label="Not dismissable" />);
      expect(screen.queryByLabelText("Dismiss badge")).not.toBeInTheDocument();
    });

    it("renders as span when onDismiss is provided (avoids nested buttons)", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Tag ref={ref} onDismiss={() => {}} label="Dismissable" />,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("calls onDismiss when dismiss button clicked", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(
        <Tag onDismiss={onDismiss} label="Dismissable" />,
      );
      await user.click(screen.getByLabelText("Dismiss badge"));
      expect(onDismiss).toHaveBeenCalledOnce();
    });

    it("prevents parent onClick from firing when dismiss is clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const onDismiss = vi.fn();
      render(
        <Tag onDismiss={onDismiss} onClick={onClick} label="Dismissable" />,
      );
      await user.click(screen.getByLabelText("Dismiss badge"));
      expect(onDismiss).toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
    });

    it("responds to keyboard on dismiss button", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(
        <Tag onDismiss={onDismiss} label="Keyboard Test" />,
      );
      const dismissButton = screen.getByLabelText("Dismiss badge");
      dismissButton.focus();
      await user.keyboard("{Enter}");
      expect(onDismiss).toHaveBeenCalled();
    });

    it("renders custom deleteIcon when provided", () => {
      const customIcon = <span data-testid="custom-delete">×</span>;
      render(
        <Tag onDismiss={() => {}} deleteIcon={customIcon} label="Custom" />,
      );
      expect(screen.getByTestId("custom-delete")).toBeInTheDocument();
    });
  });

  describe("Click Handling", () => {
    it("calls onClick when badge clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Tag onClick={onClick} label="Clickable" />);
      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe("Composition", () => {
    it("renders startAdornment and dismiss together", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      const icon = <span data-testid="icon">●</span>;

      render(
        <Tag startAdornment={icon} onDismiss={onDismiss} label="Combined" />,
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
      await user.click(screen.getByLabelText("Dismiss badge"));
      expect(onDismiss).toHaveBeenCalled();
    });

    it("combines multiple props correctly", () => {
      const { container } = render(
        <Tag color="success" outlined size="lg" rounded startAdornment={<span />} label="Multi-variant" />,
      );
      expect(container.firstChild).toHaveClass("bg-transparent", "border");
    });
  });

  describe("Accessibility & Styling", () => {
    it("has focus-visible ring for keyboard navigation", () => {
      render(<Tag onClick={() => {}} label="Focusable" />);
      expect(screen.getByRole("button")).toHaveClass("focus-visible:ring-2");
    });

    it("has transition classes for smooth animations", () => {
      const { container } = render(<Tag label="Transitioned" />);
      expect(container.firstChild).toHaveClass("transition-all", "duration-normal");
    });

    it("has proper layout classes", () => {
      const { container } = render(<Tag label="Layout" />);
      expect(container.firstChild).toHaveClass("inline-flex", "items-center");
    });
  });

  describe("Props", () => {
    it("applies custom className", () => {
      const { container } = render(<Tag className="custom" label="Custom" />);
      expect(container.firstChild).toHaveClass("custom");
    });

    it("forwards ref to span element", () => {
      const ref = React.createRef<HTMLElement>();
      render(<Tag ref={ref} label="Ref forwarded" />);
      expect(ref.current?.textContent).toContain("Ref forwarded");
    });

    it("forwards ref to button when onClick provided", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Tag ref={ref} onClick={() => {}} label="Button ref" />,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
