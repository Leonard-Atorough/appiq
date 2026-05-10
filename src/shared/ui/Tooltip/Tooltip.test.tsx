import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Tooltip } from "./Tooltip";
import { Button } from "@shared/ui/Button";

// Helper to render and open tooltip on hover
const renderAndOpen = (element: React.ReactElement, delayMs = 0) => {
  render(element);
  const wrapper = screen.getByRole("button").parentElement!;
  fireEvent.mouseEnter(wrapper);
  act(() => {
    vi.advanceTimersByTime(delayMs);
  });
  return wrapper;
};

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
        <Tooltip label="Tooltip text">
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("button", { name: "Trigger" })).toBeInTheDocument();
    });

    it("does not render tooltip panel initially", () => {
      render(
        <Tooltip label="Tooltip text">
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("renders with simple and complex children", () => {
      const { rerender } = render(
        <Tooltip label="Simple">
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("button", { name: "Trigger" })).toBeInTheDocument();

      rerender(
        <Tooltip label="Complex">
          <Button>Save</Button>
        </Tooltip>,
      );
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });
  });

  describe("Hover & Delay", () => {
    it("shows tooltip after hover delay", () => {
      render(
        <Tooltip label="Tooltip text" delay={300}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip text");
    });

    it("hides tooltip on mouse leave", () => {
      renderAndOpen(
        <Tooltip label="Tooltip text" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseLeave(wrapper);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("respects delay=300ms", () => {
      render(
        <Tooltip label="Tooltip" delay={300}>
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

    it("respects delay=1000ms", () => {
      render(
        <Tooltip label="Tooltip" delay={1000}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      act(() => {
        vi.advanceTimersByTime(999);
      });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("keeps tooltip open when hovering panel", () => {
      renderAndOpen(
        <Tooltip label="Tooltip text" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      const tooltip = screen.getByRole("tooltip");
      fireEvent.mouseEnter(tooltip);
      fireEvent.mouseLeave(wrapper);
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      fireEvent.mouseLeave(tooltip);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("handles rapid hover/unhover", () => {
      render(
        <Tooltip label="Tooltip" delay={300}>
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
  });

  describe("Focus & Keyboard", () => {
    it("shows tooltip immediately on focus (no delay)", () => {
      render(
        <Tooltip label="Focus tooltip" delay={500}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.focus(wrapper);
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("hides tooltip on blur when focus leaves wrapper", () => {
      render(
        <Tooltip label="Focus tooltip" delay={0}>
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
        <Tooltip label="Tooltip" delay={0}>
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        </Tooltip>,
      );
      const btn1 = screen.getByRole("button", { name: "Button 1" });
      const btn2 = screen.getByRole("button", { name: "Button 2" });
      const wrapper = btn1.parentElement!.parentElement!;
      fireEvent.focus(wrapper);
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      fireEvent.blur(wrapper, { relatedTarget: btn2 });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("hides tooltip on Escape key", () => {
      renderAndOpen(
        <Tooltip label="Tooltip text" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("does not hide tooltip on other keys", () => {
      renderAndOpen(
        <Tooltip label="Tooltip" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      fireEvent.keyDown(document, { key: "Enter" });
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("does not show tooltip when disabled on hover", () => {
      render(
        <Tooltip label="Should not show" disabled delay={0}>
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

    it("does not show tooltip when disabled on focus", () => {
      render(
        <Tooltip label="Should not show" disabled>
          <button>Trigger</button>
        </Tooltip>,
      );
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.focus(wrapper);
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });

    it("does not set aria-describedby when disabled", () => {
      render(
        <Tooltip label="Description" disabled>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("Accessibility", () => {
    it("sets and removes aria-describedby with tooltip visibility", () => {
      render(
        <Tooltip label="Description" delay={0}>
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
      fireEvent.mouseLeave(wrapper);
      expect(trigger).not.toHaveAttribute("aria-describedby");
    });

    it("tooltip has role and unique id", () => {
      renderAndOpen(
        <Tooltip label="Tooltip" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip.id).toBeTruthy();
      expect(tooltip.id.length).toBeGreaterThan(0);
    });
  });

  describe("Colors", () => {
    it.each(["default", "dark", "primary", "success", "warning", "error", "info"] as const)(
      "renders %s color variant",
      (color) => {
        renderAndOpen(
          <Tooltip label={color} color={color} delay={0}>
            <button>Trigger</button>
          </Tooltip>,
        );
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      },
    );
  });

  describe("Sizes", () => {
    it.each(["sm", "md", "lg"] as const)("renders %s size variant", (size) => {
      renderAndOpen(
        <Tooltip label={size} size={size} delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Positioning", () => {
    it.each(["top", "bottom", "left", "right"] as const)(
      "renders tooltip at %s position",
      (side) => {
        renderAndOpen(
          <Tooltip label={side} side={side} delay={0}>
            <button>Trigger</button>
          </Tooltip>,
        );
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveStyle({ position: "fixed" });
      },
    );
  });

  describe("Alignment", () => {
    it.each(["start", "center", "end"] as const)("renders tooltip with %s alignment", (align) => {
      renderAndOpen(
        <Tooltip label={align} align={align} delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Bordered", () => {
    it.each([true, false])("renders with bordered=%s", (bordered) => {
      renderAndOpen(
        <Tooltip label="Bordered" bordered={bordered} delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
  });

  describe("Message Content", () => {
    it("renders string message", () => {
      renderAndOpen(
        <Tooltip label="String message" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toHaveTextContent("String message");
    });

    it("renders ReactNode message with rich content", () => {
      renderAndOpen(
        <Tooltip
          label={
            <span data-testid="rich-content">
              Rich <strong>content</strong>
            </span>
          }
          delay={0}
        >
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByTestId("rich-content")).toBeInTheDocument();
      expect(screen.getByRole("tooltip")).toHaveTextContent("Rich content");
    });

    it("renders long message text", () => {
      const longMessage = "This is a very long tooltip message that might wrap to multiple lines";
      renderAndOpen(
        <Tooltip label={longMessage} delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toHaveTextContent(longMessage);
    });
  });

  describe("Class Names", () => {
    it("applies triggerClassName to trigger element", () => {
      render(
        <Tooltip label="Tooltip" triggerClassName="custom-trigger" delay={0}>
          <button className="original">Trigger</button>
        </Tooltip>,
      );
      const trigger = screen.getByRole("button");
      expect(trigger).toHaveClass("custom-trigger");
    });

    it("applies messageClassName to tooltip message", () => {
      renderAndOpen(
        <Tooltip label="Tooltip" messageClassName="custom-message" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toHaveClass("custom-message");
    });

    it("applies wrapperClassName to wrapper element", () => {
      render(
        <Tooltip label="Tooltip" wrapperClassName="custom-wrapper" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      const trigger = screen.getByRole("button");
      const wrapper = trigger.parentElement;
      expect(wrapper).toHaveClass("custom-wrapper");
    });
  });

  describe("Props & Updates", () => {
    it("renders with multiple props combined", () => {
      render(
        <Tooltip
          label="Complete tooltip"
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

    it("handles prop updates including message and side", () => {
      const { rerender } = render(
        <Tooltip label="Original" side="bottom" delay={0}>
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
        <Tooltip label="Updated" side="top" delay={0}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole("tooltip")).toHaveTextContent("Updated");
    });
  });

  describe("Lifecycle", () => {
    it("clears pending timeout on unmount", () => {
      const { unmount } = render(
        <Tooltip label="Tooltip" delay={300}>
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
  });
});
