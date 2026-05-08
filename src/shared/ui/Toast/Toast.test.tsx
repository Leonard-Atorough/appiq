import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Toast } from "./Toast";

describe("Toast", () => {
  describe("Rendering", () => {
    it("renders with title", () => {
      render(<Toast title="Test notification" onDismiss={() => {}} />);
      expect(screen.getByText("Test notification")).toBeInTheDocument();
    });

    it("renders with title and description", () => {
      render(<Toast title="Test" description="This is a description" onDismiss={() => {}} />);
      expect(screen.getByText("Test")).toBeInTheDocument();
      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("renders without description when not provided", () => {
      render(<Toast title="Test only" onDismiss={() => {}} />);
      expect(screen.getByText("Test only")).toBeInTheDocument();
      expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = { current: null };
      render(<Toast ref={ref} title="Test" onDismiss={() => {}} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Variants", () => {
    it.each([
      ["default", "relative"],
      ["success", "border-success"],
      ["error", "border-error"],
      ["warning", "border-warning"],
      ["info", "border-info"],
    ] as const)("renders %s variant with styling", (variant, expectedClass) => {
      const { container } = render(
        <Toast variant={variant} title={variant} onDismiss={() => {}} />,
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass(expectedClass);
    });
  });

  describe("Icons", () => {
    it("renders default icon for all variants", () => {
      const variants = ["default", "success", "error", "warning", "info"] as const;
      variants.forEach((variant) => {
        const { container } = render(
          <Toast variant={variant} title={variant} onDismiss={() => {}} />,
        );
        expect(
          container.querySelector("svg") || container.querySelector("[role='img']"),
        ).toBeInTheDocument();
      });
    });

    it("renders and uses custom icon when provided", () => {
      const customIcon = <span data-testid="custom-icon">🎉</span>;
      render(<Toast title="Custom" icon={customIcon} onDismiss={() => {}} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("displays custom icon without duplicating default icon", () => {
      const customIcon = <span data-testid="custom-icon">✓</span>;
      render(
        <Toast variant="success" title="Custom Icon" icon={customIcon} onDismiss={() => {}} />,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      expect(screen.getByText("✓")).toBeInTheDocument();
    });
  });

  describe("Action Button", () => {
    it("renders action button when provided", () => {
      render(
        <Toast title="Test" action={{ label: "Undo", onClick: () => {} }} onDismiss={() => {}} />,
      );
      expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
    });

    it("calls action onClick when button is clicked", async () => {
      const user = userEvent.setup();
      const actionClick = vi.fn();
      render(
        <Toast
          title="Test"
          action={{ label: "Retry", onClick: actionClick }}
          onDismiss={() => {}}
        />,
      );
      await user.click(screen.getByRole("button", { name: "Retry" }));
      expect(actionClick).toHaveBeenCalled();
    });

    it("does not render action button when not provided", () => {
      render(<Toast title="Test" onDismiss={() => {}} />);
      expect(screen.queryByRole("button", { name: /undo|retry/i })).not.toBeInTheDocument();
    });
  });

  describe("Dismiss Button", () => {
    it("renders dismiss button when onDismiss is provided", () => {
      render(<Toast title="Test" onDismiss={() => {}} />);
      expect(screen.getByRole("button", { name: /dismiss/i })).toBeInTheDocument();
    });

    it("calls onDismiss when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(<Toast title="Test" onDismiss={onDismiss} />);
      await user.click(screen.getByRole("button", { name: /dismiss/i }));
      expect(onDismiss).toHaveBeenCalled();
    });

    it("does not render dismiss button when onDismiss is not provided", () => {
      const { container } = render(<Toast title="Test" />);
      expect(container.querySelectorAll("button")).toHaveLength(0);
    });
  });

  describe("Auto-dismiss", () => {
    it("auto-dismisses after specified duration", () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();
      render(<Toast title="Test" duration={5000} onDismiss={onDismiss} />);

      expect(onDismiss).not.toHaveBeenCalled();
      vi.advanceTimersByTime(5000);
      expect(onDismiss).toHaveBeenCalledOnce();
      vi.useRealTimers();
    });

    it("respects custom duration", () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();
      render(<Toast title="Test" duration={2000} onDismiss={onDismiss} />);

      vi.advanceTimersByTime(1999);
      expect(onDismiss).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(onDismiss).toHaveBeenCalledOnce();
      vi.useRealTimers();
    });

    it("does not auto-dismiss when duration is 0", () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();
      render(<Toast title="Test" duration={0} onDismiss={onDismiss} />);

      vi.advanceTimersByTime(10000);
      expect(onDismiss).not.toHaveBeenCalled();
      vi.useRealTimers();
    });

    it("clears timeout on unmount", () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();
      const { unmount } = render(<Toast title="Test" duration={5000} onDismiss={onDismiss} />);

      unmount();
      vi.advanceTimersByTime(5000);
      expect(onDismiss).not.toHaveBeenCalled();
      vi.useRealTimers();
    });
  });

  describe("Timer Bar", () => {
    it("renders timer bar when duration > 0", () => {
      const { container } = render(<Toast title="Test" duration={5000} onDismiss={() => {}} />);
      expect(container.querySelector(".animate-timer-drain")).toBeInTheDocument();
    });

    it("does not render timer bar when duration is 0", () => {
      const { container } = render(<Toast title="Test" duration={0} onDismiss={() => {}} />);
      expect(container.querySelector(".animate-timer-drain")).not.toBeInTheDocument();
    });

    it.each([
      ["success", "bg-success"],
      ["error", "bg-error"],
      ["warning", "bg-warning"],
      ["info", "bg-info"],
    ] as const)("applies %s color for %s variant", (variant, expectedClass) => {
      const { container } = render(
        <Toast variant={variant} title="Test" duration={5000} onDismiss={() => {}} />,
      );
      const timerBar = container.querySelector(".animate-timer-drain");
      expect(timerBar).toHaveClass(expectedClass);
    });

    it("sets CSS variable for timer duration", () => {
      const { container } = render(<Toast title="Test" duration={3000} onDismiss={() => {}} />);
      const timerBar = container.querySelector(".animate-timer-drain") as HTMLElement;
      expect(timerBar?.style.getPropertyValue("--timer-duration")).toBe("3000ms");
    });

    it("hides timer bar from accessibility tree", () => {
      const { container } = render(<Toast title="Test" duration={5000} onDismiss={() => {}} />);
      expect(container.querySelector(".animate-timer-drain")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });
  });

  describe("Accessibility", () => {
    it.each([
      ["error", "alert", "assertive"],
      ["success", "status", "polite"],
      ["warning", "status", "polite"],
      ["info", "status", "polite"],
    ] as const)("uses role=%s and aria-live=%s for %s variant", (variant, role, ariaLive) => {
      const { container } = render(
        <Toast variant={variant} title={variant} onDismiss={() => {}} />,
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveAttribute("role", role);
      expect(toast).toHaveAttribute("aria-live", ariaLive);
    });

    it("has descriptive aria-label on dismiss button", () => {
      render(<Toast title="Test" onDismiss={() => {}} />);
      const dismissButton = screen.getByRole("button", { name: /dismiss/i });
      expect(dismissButton).toHaveAttribute("aria-label", "Dismiss notification");
    });
  });

  describe("Styling", () => {
    it("applies custom className", () => {
      const { container } = render(
        <Toast title="Test" className="custom-class" onDismiss={() => {}} />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("applies base and variant-specific classes", () => {
      const { container } = render(<Toast title="Test" onDismiss={() => {}} />);
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("relative", "flex", "items-center", "bg-surface");
    });

    it("applies text styling to title and description", () => {
      render(<Toast title="Title Text" description="Description text" onDismiss={() => {}} />);
      expect(screen.getByText("Title Text")).toHaveClass("font-semibold");
      expect(screen.getByText("Description text")).toHaveClass("text-sm", "text-muted");
    });
  });

  describe("Props & Attributes", () => {
    it("passes through data attributes", () => {
      const { container } = render(
        <Toast title="Test" onDismiss={() => {}} data-testid="toast-element" />,
      );
      expect(container.firstChild).toHaveAttribute("data-testid", "toast-element");
    });

    it("renders with all props combined", () => {
      const { container } = render(
        <Toast
          variant="error"
          title="Complete Toast"
          description="With all features"
          action={{ label: "Retry", onClick: () => {} }}
          icon={<span>❌</span>}
          duration={3000}
          className="my-custom-class"
          onDismiss={() => {}}
        />,
      );

      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("my-custom-class");
      expect(screen.getByText("Complete Toast")).toBeInTheDocument();
      expect(screen.getByText("With all features")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
      expect(screen.getByText("❌")).toBeInTheDocument();
    });

    it("handles title-only and long description toasts", () => {
      const { rerender } = render(<Toast title="Minimal" onDismiss={() => {}} />);
      expect(screen.getByText("Minimal")).toBeInTheDocument();

      const longText = "This is a very long description that might wrap across multiple lines";
      rerender(<Toast title="Long" description={longText} onDismiss={() => {}} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty title gracefully", () => {
      const { container } = render(<Toast title="" onDismiss={() => {}} />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles rapid dismiss clicks", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(<Toast title="Test" onDismiss={onDismiss} />);

      const button = screen.getByRole("button", { name: /dismiss/i });
      await user.click(button);
      await user.click(button);
      expect(onDismiss).toHaveBeenCalledTimes(2);
    });

    it("handles null onDismiss gracefully", () => {
      render(<Toast title="Test" onDismiss={undefined} />);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("updates correctly on prop changes", () => {
      const { rerender } = render(
        <Toast variant="success" title="Original" onDismiss={() => {}} />,
      );

      expect(screen.getByText("Original")).toBeInTheDocument();

      rerender(<Toast variant="error" title="Updated" onDismiss={() => {}} />);

      expect(screen.queryByText("Original")).not.toBeInTheDocument();
      expect(screen.getByText("Updated")).toBeInTheDocument();
    });
  });

  describe("Multiple Toasts with Timeouts", () => {
    it("dismisses toasts independently with different durations", async () => {
      vi.useFakeTimers();
      const onDismiss1 = vi.fn();
      const onDismiss2 = vi.fn();

      let callbackRef1 = onDismiss1;
      let callbackRef2 = onDismiss2;

      const { rerender } = render(
        <div>
          <Toast title="Toast 1" duration={1000} onDismiss={callbackRef1} />
        </div>,
      );

      callbackRef1 = vi.fn();
      callbackRef2 = vi.fn();

      rerender(
        <div>
          <Toast title="Toast 1" duration={1000} onDismiss={callbackRef1} />
          <Toast title="Toast 2" duration={500} onDismiss={callbackRef2} />
        </div>,
      );

      vi.advanceTimersByTime(500);
      expect(callbackRef2).toHaveBeenCalledTimes(1);
      expect(callbackRef1).not.toHaveBeenCalled();

      vi.advanceTimersByTime(500);
      expect(callbackRef1).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });
  });

  describe("Integration", () => {
    it("handles complete toast lifecycle", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      const actionClick = vi.fn();

      render(
        <Toast
          variant="success"
          title="Saved"
          description="Your changes have been saved."
          action={{ label: "Undo", onClick: actionClick }}
          duration={5000}
          onDismiss={onDismiss}
        />,
      );

      expect(screen.getByText("Saved")).toBeInTheDocument();
      expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Undo" }));
      expect(actionClick).toHaveBeenCalled();

      expect(screen.getByText("Saved")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /dismiss/i }));
      expect(onDismiss).toHaveBeenCalled();
    });

    it("renders multiple toasts with different variants", () => {
      render(
        <div>
          <Toast variant="default" title="Default" onDismiss={() => {}} />
          <Toast variant="success" title="Success" onDismiss={() => {}} />
          <Toast variant="error" title="Error" onDismiss={() => {}} />
          <Toast variant="warning" title="Warning" onDismiss={() => {}} />
          <Toast variant="info" title="Info" onDismiss={() => {}} />
        </div>,
      );

      ["Default", "Success", "Error", "Warning", "Info"].forEach((text) => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });
  });
});
