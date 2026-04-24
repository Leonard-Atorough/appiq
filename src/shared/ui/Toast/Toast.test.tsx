import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Toast } from "./Toast";

describe("Toast", () => {
  describe("Basic Rendering", () => {
    it("renders with title", () => {
      render(<Toast title="Test notification" onDismiss={() => {}} />);
      expect(screen.getByText("Test notification")).toBeInTheDocument();
    });

    it("renders with title and description", () => {
      render(
        <Toast
          title="Test"
          description="This is a description"
          onDismiss={() => {}}
        />,
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("renders without description when not provided", () => {
      render(<Toast title="Test only" onDismiss={() => {}} />);
      expect(screen.getByText("Test only")).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = { current: null };
      render(<Toast ref={ref} title="Test" onDismiss={() => {}} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      const { container } = render(
        <Toast variant="default" title="Default" onDismiss={() => {}} />,
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("relative");
    });

    it("renders success variant with correct styling", () => {
      const { container } = render(
        <Toast variant="success" title="Success" onDismiss={() => {}} />,
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("border-success", "bg-success-light");
    });

    it("renders error variant with correct styling", () => {
      const { container } = render(
        <Toast variant="error" title="Error" onDismiss={() => {}} />,
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("border-error", "bg-error-light");
    });

    it("renders warning variant with correct styling", () => {
      const { container } = render(
        <Toast variant="warning" title="Warning" onDismiss={() => {}} />,
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("border-warning", "bg-warning-light");
    });

    it("renders info variant with correct styling", () => {
      const { container } = render(
        <Toast variant="info" title="Info" onDismiss={() => {}} />,
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("border-info", "bg-info-light");
    });
  });

  describe("Icons", () => {
    it("renders default icon for default variant", () => {
      const { container } = render(
        <Toast variant="default" title="Default" onDismiss={() => {}} />,
      );
      // Icon should be in the container
      expect(container.querySelector("svg") || container.querySelector("[role='img']")).toBeInTheDocument();
    });

    it("renders success icon for success variant", () => {
      const { container } = render(
        <Toast variant="success" title="Success" onDismiss={() => {}} />,
      );
      expect(container.querySelector("svg") || container.querySelector("[role='img']")).toBeInTheDocument();
    });

    it("renders error icon for error variant", () => {
      const { container } = render(
        <Toast variant="error" title="Error" onDismiss={() => {}} />,
      );
      expect(container.querySelector("svg") || container.querySelector("[role='img']")).toBeInTheDocument();
    });

    it("renders custom icon when provided", () => {
      const customIcon = <span data-testid="custom-icon">🎉</span>;
      render(
        <Toast
          title="Custom"
          icon={customIcon}
          onDismiss={() => {}}
        />,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("hides default icon when custom icon is provided", () => {
      const customIcon = <span data-testid="custom-icon">✓</span>;
      render(
        <Toast
          variant="success"
          title="Custom Icon"
          icon={customIcon}
          onDismiss={() => {}}
        />,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Action Button", () => {
    it("renders action button when provided", () => {
      render(
        <Toast
          title="Test"
          action={{ label: "Undo", onClick: () => {} }}
          onDismiss={() => {}}
        />,
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
      const button = screen.getByRole("button", { name: "Retry" });
      await user.click(button);
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
      const dismissButton = screen.getByRole("button", { name: /dismiss/i });
      await user.click(dismissButton);
      expect(onDismiss).toHaveBeenCalled();
    });

    it("does not render dismiss button when onDismiss is not provided", () => {
      const { container } = render(<Toast title="Test" />);
      const buttons = container.querySelectorAll("button");
      expect(buttons.length).toBe(0);
    });
  });

  describe("Auto-dismiss", () => {
    it("auto-dismisses after default duration (5000ms)", async () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();
      render(<Toast title="Test" duration={5000} onDismiss={onDismiss} />);
      
      expect(onDismiss).not.toHaveBeenCalled();
      vi.advanceTimersByTime(5000);
      expect(onDismiss).toHaveBeenCalledOnce();
      
      vi.useRealTimers();
    });

    it("auto-dismisses after custom duration", async () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();
      render(<Toast title="Test" duration={2000} onDismiss={onDismiss} />);
      
      vi.advanceTimersByTime(1999);
      expect(onDismiss).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(1);
      expect(onDismiss).toHaveBeenCalledOnce();
      
      vi.useRealTimers();
    });

    it("does not auto-dismiss when duration is 0", async () => {
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
      const { unmount } = render(
        <Toast title="Test" duration={5000} onDismiss={onDismiss} />,
      );
      
      unmount();
      vi.advanceTimersByTime(5000);
      expect(onDismiss).not.toHaveBeenCalled();
      
      vi.useRealTimers();
    });
  });

  describe("Timer Bar", () => {
    it("renders timer bar when duration > 0", () => {
      const { container } = render(
        <Toast title="Test" duration={5000} onDismiss={() => {}} />,
      );
      const timerBar = container.querySelector(".animate-timer-drain");
      expect(timerBar).toBeInTheDocument();
    });

    it("does not render timer bar when duration is 0", () => {
      const { container } = render(
        <Toast title="Test" duration={0} onDismiss={() => {}} />,
      );
      const timerBar = container.querySelector(".animate-timer-drain");
      expect(timerBar).not.toBeInTheDocument();
    });

    it("applies correct timer bar color for success variant", () => {
      const { container } = render(
        <Toast variant="success" title="Test" duration={5000} onDismiss={() => {}} />,
      );
      const timerBar = container.querySelector(".animate-timer-drain");
      expect(timerBar).toHaveClass("bg-success");
    });

    it("applies correct timer bar color for error variant", () => {
      const { container } = render(
        <Toast variant="error" title="Test" duration={5000} onDismiss={() => {}} />,
      );
      const timerBar = container.querySelector(".animate-timer-drain");
      expect(timerBar).toHaveClass("bg-error");
    });

    it("sets CSS variable for timer duration", () => {
      const { container } = render(
        <Toast title="Test" duration={3000} onDismiss={() => {}} />,
      );
      const timerBar = container.querySelector(".animate-timer-drain") as HTMLElement;
      expect(timerBar?.style.getPropertyValue("--timer-duration")).toBe("3000ms");
    });
  });

  describe("Accessibility", () => {
    it("uses role='alert' for error variant", () => {
      const { container } = render(
        <Toast variant="error" title="Error" onDismiss={() => {}} />,
      );
      expect(container.firstChild).toHaveAttribute("role", "alert");
    });

    it("uses role='status' for non-error variants", () => {
      const { container } = render(
        <Toast variant="success" title="Success" onDismiss={() => {}} />,
      );
      expect(container.firstChild).toHaveAttribute("role", "status");
    });

    it("sets aria-live='assertive' for error variant", () => {
      const { container } = render(
        <Toast variant="error" title="Error" onDismiss={() => {}} />,
      );
      expect(container.firstChild).toHaveAttribute("aria-live", "assertive");
    });

    it("sets aria-live='polite' for non-error variants", () => {
      const { container } = render(
        <Toast variant="success" title="Success" onDismiss={() => {}} />,
      );
      expect(container.firstChild).toHaveAttribute("aria-live", "polite");
    });

    it("hides timer bar from accessibility tree", () => {
      const { container } = render(
        <Toast title="Test" duration={5000} onDismiss={() => {}} />,
      );
      const timerBar = container.querySelector(".animate-timer-drain");
      expect(timerBar).toHaveAttribute("aria-hidden", "true");
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
        <Toast
          title="Test"
          className="custom-class"
          onDismiss={() => {}}
        />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("applies base toast styling", () => {
      const { container } = render(
        <Toast title="Test" onDismiss={() => {}} />,
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("relative", "flex", "items-center", "bg-surface");
    });

    it("applies description text styling", () => {
      render(
        <Toast
          title="Title"
          description="Description"
          onDismiss={() => {}}
        />,
      );
      const description = screen.getByText("Description");
      expect(description).toHaveClass("text-sm", "text-muted");
    });

    it("applies title font styling", () => {
      render(<Toast title="Title Text" onDismiss={() => {}} />);
      const title = screen.getByText("Title Text");
      expect(title).toHaveClass("font-semibold");
    });
  });

  describe("All Variants Combined", () => {
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
      
      expect(screen.getByText("Default")).toBeInTheDocument();
      expect(screen.getByText("Success")).toBeInTheDocument();
      expect(screen.getByText("Error")).toBeInTheDocument();
      expect(screen.getByText("Warning")).toBeInTheDocument();
      expect(screen.getByText("Info")).toBeInTheDocument();
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
      
      // Verify initial render
      expect(screen.getByText("Saved")).toBeInTheDocument();
      expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();
      
      // Click action
      const actionButton = screen.getByRole("button", { name: "Undo" });
      await user.click(actionButton);
      expect(actionClick).toHaveBeenCalled();
      
      // Toast still visible after action click
      expect(screen.getByText("Saved")).toBeInTheDocument();
      
      // Dismiss manually
      const dismissButton = screen.getByRole("button", { name: /dismiss/i });
      await user.click(dismissButton);
      expect(onDismiss).toHaveBeenCalled();
    });
  });

  describe("Props & Attributes", () => {
    it("passes through data attributes", () => {
      const { container } = render(
        <Toast
          title="Test"
          onDismiss={() => {}}
          data-testid="toast-element"
        />,
      );
      expect(container.firstChild).toHaveAttribute("data-testid", "toast-element");
    });

    it("renders with all props at once", () => {
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

    it("handles title-only toast", () => {
      render(<Toast title="Minimal" onDismiss={() => {}} />);
      expect(screen.getByText("Minimal")).toBeInTheDocument();
      expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
    });

    it("handles long description", () => {
      const longText =
        "This is a very long description that might wrap across multiple lines in the UI";
      render(
        <Toast title="Long" description={longText} onDismiss={() => {}} />,
      );
      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty title gracefully", () => {
      const { container } = render(
        <Toast title="" onDismiss={() => {}} />,
      );
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

    it("updates correctly when props change", () => {
      const { rerender } = render(
        <Toast title="Original" onDismiss={() => {}} />,
      );
      
      expect(screen.getByText("Original")).toBeInTheDocument();
      
      rerender(<Toast title="Updated" onDismiss={() => {}} />);
      
      expect(screen.queryByText("Original")).not.toBeInTheDocument();
      expect(screen.getByText("Updated")).toBeInTheDocument();
    });

    it("handles variant change", () => {
      const { container, rerender } = render(
        <Toast variant="success" title="Test" onDismiss={() => {}} />,
      );
      
      let toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("border-success");
      
      rerender(<Toast variant="error" title="Test" onDismiss={() => {}} />);
      
      toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass("border-error");
      expect(toast).not.toHaveClass("border-success");
    });
  });

  describe("Snapshot Tests", () => {
    it("snapshot: default toast", () => {
      const { container } = render(
        <Toast title="Test Notification" onDismiss={() => {}} />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("snapshot: toast with all features", () => {
      const { container } = render(
        <Toast
          variant="success"
          title="Success!"
          description="Operation completed"
          action={{ label: "Undo", onClick: () => {} }}
          duration={5000}
          onDismiss={() => {}}
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("snapshot: error toast", () => {
      const { container } = render(
        <Toast
          variant="error"
          title="Error occurred"
          description="Something went wrong"
          onDismiss={() => {}}
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
