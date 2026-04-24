import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Tooltip } from "./Tooltip";
import { Button } from "@shared/ui/Button";

describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Basic Rendering", () => {
    it("renders children", () => {
      render(
        <Tooltip message="Tooltip text">
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("button", { name: "Trigger" })).toBeInTheDocument();
    });

    it("does not render the tooltip panel initially", () => {
      render(
        <Tooltip message="Tooltip text">
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("forwards ref correctly to trigger element", () => {
      render(
        <Tooltip message="Test">
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders with complex children (React components)", () => {
      render(
        <Tooltip message="Button tooltip">
          <Button>Save</Button>
        </Tooltip>,
      );
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });
  });

  describe("Hover & Delay Behavior", () => {
    it("shows tooltip panel after hover delay", () => {
      render(
        <Tooltip message="Tooltip text" delay={300}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip text");
    });

    it("hides tooltip when mouse leaves", () => {
      render(
        <Tooltip message="Tooltip text" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      fireEvent.mouseLeave(wrapper);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("respects custom delay value", () => {
      render(
        <Tooltip message="Tooltip" delay={1000}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("uses default delay of 300ms", () => {
      render(
        <Tooltip message="Tooltip">
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(299);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("keeps tooltip open while hovering panel", () => {
      render(
        <Tooltip message="Tooltip text" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      // Enter the tooltip panel FIRST (before leaving wrapper)
      fireEvent.mouseEnter(tooltip);
      // Now leave the wrapper - tooltip should still be open
      fireEvent.mouseLeave(wrapper);
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      // Now leave the tooltip - it should close
      fireEvent.mouseLeave(tooltip);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("closes tooltip when leaving both trigger and panel", () => {
      render(
        <Tooltip message="Tooltip text" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      fireEvent.mouseEnter(tooltip);
      fireEvent.mouseLeave(tooltip);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  describe("Focus & Keyboard", () => {
    it("shows tooltip immediately on focus (no delay)", () => {
      render(
        <Tooltip message="Focus tooltip" delay={500}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.focus(wrapper);
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("hides tooltip on blur when focus leaves the wrapper", () => {
      render(
        <Tooltip message="Focus tooltip" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.focus(wrapper);
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      fireEvent.blur(wrapper, { relatedTarget: null });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("keeps tooltip open when focus moves inside wrapper", () => {
      render(
        <Tooltip message="Tooltip" delay={0}>
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button", { name: "Button 1" }).parentElement!
        .parentElement!;
      fireEvent.focus(wrapper);
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      // Simulating focus moving to another element inside wrapper
      fireEvent.blur(wrapper, { relatedTarget: screen.getByRole("button", { name: "Button 2" }) });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("hides tooltip when Escape is pressed", () => {
      render(
        <Tooltip message="Tooltip text" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("does not hide tooltip on other key presses", () => {
      render(
        <Tooltip message="Tooltip" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      fireEvent.keyDown(document, { key: "Enter" });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("does not show tooltip when disabled", () => {
      render(
        <Tooltip message="Should not show" disabled delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("does not show tooltip on focus when disabled", () => {
      render(
        <Tooltip message="Should not show" disabled>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.focus(wrapper);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("does not set aria-describedby when disabled", () => {
      render(
        <Tooltip message="Description" disabled>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("Accessibility", () => {
    it("sets aria-describedby on the trigger when tooltip is open", () => {
      render(
        <Tooltip message="Description" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const trigger = screen.getByRole("button");
      const wrapper = trigger.parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      const tooltipPanel = screen.getByRole("tooltip");
      expect(trigger).toHaveAttribute("aria-describedby", tooltipPanel.id);
    });

    it("removes aria-describedby from trigger when tooltip closes", () => {
      render(
        <Tooltip message="Description" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const trigger = screen.getByRole("button");
      const wrapper = trigger.parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      fireEvent.mouseLeave(wrapper);
      expect(trigger).not.toHaveAttribute("aria-describedby");
    });

    it("tooltip has role='tooltip'", () => {
      render(
        <Tooltip message="Tooltip" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("tooltip has unique id", () => {
      render(
        <Tooltip message="Tooltip" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip.id).toBeTruthy();
      expect(tooltip.id.length).toBeGreaterThan(0);
    });
  });

  describe("Color Variants", () => {
    it("renders default color variant", () => {
      render(
        <Tooltip message="Default" color="default" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("renders dark color variant", () => {
      render(
        <Tooltip message="Dark" color="dark" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("renders primary color variant", () => {
      render(
        <Tooltip message="Primary" color="primary" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("renders success color variant", () => {
      render(
        <Tooltip message="Success" color="success" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("renders warning color variant", () => {
      render(
        <Tooltip message="Warning" color="warning" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("renders error color variant", () => {
      render(
        <Tooltip message="Error" color="error" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("renders info color variant", () => {
      render(
        <Tooltip message="Info" color="info" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders small size variant", () => {
      render(
        <Tooltip message="Small" size="sm" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("renders medium size variant (default)", () => {
      render(
        <Tooltip message="Medium" size="md" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("renders large size variant", () => {
      render(
        <Tooltip message="Large" size="lg" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Positioning", () => {
    it("renders tooltip at bottom position (default)", () => {
      render(
        <Tooltip message="Bottom" side="bottom" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveStyle({ position: "fixed" });
    });

    it("renders tooltip at top position", () => {
      render(
        <Tooltip message="Top" side="top" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveStyle({ position: "fixed" });
    });

    it("renders tooltip at left position", () => {
      render(
        <Tooltip message="Left" side="left" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveStyle({ position: "fixed" });
    });

    it("renders tooltip at right position", () => {
      render(
        <Tooltip message="Right" side="right" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveStyle({ position: "fixed" });
    });
  });

  describe("Alignment", () => {
    it("renders tooltip with start alignment", () => {
      render(
        <Tooltip message="Start" align="start" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
    });

    it("renders tooltip with center alignment (default)", () => {
      render(
        <Tooltip message="Center" align="center" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
    });

    it("renders tooltip with end alignment", () => {
      render(
        <Tooltip message="End" align="end" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
    });
  });

  describe("Bordered Variant", () => {
    it("renders with border when bordered is true", () => {
      render(
        <Tooltip message="Bordered" bordered delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("renders without border when bordered is false (default)", () => {
      render(
        <Tooltip message="Not bordered" bordered={false} delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Message Content", () => {
    it("renders string message", () => {
      render(
        <Tooltip message="String message" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toHaveTextContent("String message");
    });

    it("renders ReactNode message content", () => {
      render(
        <Tooltip
          message={
            <span data-testid="rich-content">
              Rich <strong>content</strong>
            </span>
          }
          delay={0}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByTestId("rich-content")).toBeInTheDocument();
      expect(screen.getByRole("tooltip")).toHaveTextContent("Rich content");
    });

    it("renders element content", () => {
      render(
        <Tooltip message={<div data-testid="element-msg">Element content</div>} delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByTestId("element-msg")).toBeInTheDocument();
    });

    it("renders long message text", () => {
      const longMessage = "This is a very long tooltip message that might wrap to multiple lines";
      render(
        <Tooltip message={longMessage} delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toHaveTextContent(longMessage);
    });
  });

  describe("Class Names", () => {
    it("applies triggerClassName to trigger element", () => {
      render(
        <Tooltip message="Tooltip" triggerClassName="custom-trigger" delay={0}>
          <button className="original">Trigger</button>
        </Tooltip>,
      );
      const trigger = screen.getByRole("button");
      expect(trigger).toHaveClass("custom-trigger");
    });

    it("applies messageClassName to tooltip message", () => {
      render(
        <Tooltip message="Tooltip" messageClassName="custom-message" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toHaveClass("custom-message");
    });

    it("applies wrapperClassName to wrapper element", () => {
      render(
        <Tooltip message="Tooltip" wrapperClassName="custom-wrapper" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const trigger = screen.getByRole("button");
      const wrapper = trigger.parentElement;
      expect(wrapper).toHaveClass("custom-wrapper");
    });
  });

  describe("Props & Attributes", () => {
    it("renders with all props at once", () => {
      render(
        <Tooltip
          message="Complete tooltip"
          color="primary"
          size="lg"
          side="top"
          align="start"
          bordered
          delay={500}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(screen.getByRole("tooltip")).toHaveTextContent("Complete tooltip");
    });

    it("handles zero delay", () => {
      render(
        <Tooltip message="Instant" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("applies wrapper class name correctly", () => {
      const { container } = render(
        <Tooltip message="Tooltip" wrapperClassName="custom-wrapper-class">
          <button>Trigger</button>
        </Tooltip>,
      );
      const inlineBlocks = container.querySelectorAll(".inline-block");
      expect(inlineBlocks.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid hover/unhover", () => {
      render(
        <Tooltip message="Tooltip" delay={300}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(100);
      });
      fireEvent.mouseLeave(wrapper);
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("clears pending timeout on unmount", () => {
      const { unmount } = render(
        <Tooltip message="Tooltip" delay={300}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      unmount();
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("handles prop updates", () => {
      const { rerender } = render(
        <Tooltip message="Original" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.getByRole("tooltip")).toHaveTextContent("Original");

      rerender(
        <Tooltip message="Updated" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toHaveTextContent("Updated");
    });

    it("handles side prop changes", () => {
      const { rerender } = render(
        <Tooltip message="Tooltip" side="bottom" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();

      rerender(
        <Tooltip message="Tooltip" side="top" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("handles empty message", () => {
      render(
        <Tooltip message="" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Snapshot Tests", () => {
    it("snapshot: default tooltip", () => {
      render(
        <Tooltip message="Default tooltip">
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("snapshot: styled tooltip with all features", () => {
      const { container } = render(
        <Tooltip
          message="Featured tooltip"
          color="primary"
          size="lg"
          side="top"
          align="center"
          bordered
          delay={0}
        >
          <Button>Hover me</Button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(container).toMatchSnapshot();
    });

    it("snapshot: dark tooltip", () => {
      const { container } = render(
        <Tooltip message="Dark theme" color="dark" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(0);
      });
      expect(container).toMatchSnapshot();
    });
  });
});
