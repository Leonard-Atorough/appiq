import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Popover } from "./Popover";

const defaultProps = {
  trigger: (props: object) => <button {...props}>Open</button>,
  children: <p>Popover content</p>,
};

describe("Popover", () => {
  describe("Rendering & Basic State", () => {
    it("renders the trigger", () => {
      render(<Popover {...defaultProps} />);
      expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
    });

    it("does not render the panel by default", () => {
      render(<Popover {...defaultProps} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders the panel after trigger click", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} />);
      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    it("renders open when defaultOpen=true", () => {
      render(<Popover {...defaultProps} defaultOpen />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("closes the panel on second trigger click", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} />);
      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      await user.click(screen.getByRole("button"));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Controlled Mode", () => {
    it.each([
      [true, true],
      [false, false],
    ] as const)("respects controlled open=%s", (openValue, shouldBeVisible) => {
      render(<Popover {...defaultProps} open={openValue} onOpenChange={vi.fn()} />);
      if (shouldBeVisible) {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      } else {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      }
    });

    it("calls onOpenChange when trigger is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<Popover {...defaultProps} open={false} onOpenChange={onOpenChange} />);
      await user.click(screen.getByRole("button"));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("updates controlled popover when open prop changes", () => {
      const { rerender } = render(
        <Popover {...defaultProps} open={false} onOpenChange={vi.fn()} />,
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      rerender(<Popover {...defaultProps} open={true} onOpenChange={vi.fn()} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it.each([
      ["sm", "p-sm", "min-w-[10rem]"],
      ["md", "p-md", "min-w-[14rem]"],
      ["lg", "p-lg", "min-w-[20rem]"],
    ] as const)("applies size variant %s to panel", async (size, paddingClass, widthClass) => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} size={size} />);
      await user.click(screen.getByRole("button"));
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass(paddingClass, widthClass);
    });
  });

  describe("Positioning", () => {
    it.each([
      ["bottom", "start", "top-full", "left-0"],
      ["top", "start", "bottom-full", "left-0"],
      ["right", "center", "left-full", "top-1/2", "-translate-y-1/2"],
      ["left", "end", "right-full", "bottom-0"],
      ["bottom", "center", "left-1/2", "-translate-x-1/2"],
    ] as const)("applies side=%s align=%s positioning", async (side, align, ...expectedClasses) => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} side={side} align={align} />);
      await user.click(screen.getByRole("button"));
      const panel = screen.getByRole("dialog");
      expectedClasses.forEach((cls) => expect(panel).toHaveClass(cls));
    });
  });

  describe("Accessibility", () => {
    it.each([
      [false, "false"],
      [true, "true"],
    ] as const)("sets aria-expanded=%s when %s", async (isOpen, expectedValue) => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} />);
      if (isOpen) {
        await user.click(screen.getByRole("button"));
      }
      expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", expectedValue);
    });

    it("sets aria-controls on trigger pointing to panel id when open", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} />);
      await user.click(screen.getByRole("button"));
      const trigger = screen.getByRole("button");
      const panel = screen.getByRole("dialog");
      expect(trigger).toHaveAttribute("aria-controls", panel.id);
    });

    it("does not set aria-controls when closed", () => {
      render(<Popover {...defaultProps} />);
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-controls");
    });

    it.each([
      [false, "true"],
      [true, "dialog"],
    ] as const)("sets aria-haspopup=%s when modal=%s", (modal, expectedValue) => {
      render(<Popover {...defaultProps} modal={modal} />);
      expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", expectedValue);
    });
  });

  describe("Escape Key", () => {
    it("closes the panel on Escape key", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} />);
      await user.click(screen.getByRole("button"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("does not close on Escape when closeOnEscape=false", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} closeOnEscape={false} />);
      await user.click(screen.getByRole("button"));
      await user.keyboard("{Escape}");
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Outside Click", () => {
    it("closes on outside click", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Popover {...defaultProps} />
          <button>Outside</button>
        </div>,
      );
      await user.click(screen.getByRole("button", { name: /open/i }));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      await user.pointer({
        target: screen.getByRole("button", { name: /outside/i }),
        keys: "[MouseLeft]",
      });
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    });

    it("does not close on outside click when closeOnOutsideClick=false", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Popover {...defaultProps} closeOnOutsideClick={false} />
          <button>Outside</button>
        </div>,
      );
      await user.click(screen.getByRole("button", { name: /open/i }));
      fireEvent.pointerDown(screen.getByRole("button", { name: /outside/i }));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Modal Mode", () => {
    it("renders an overlay in modal mode", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} modal />);
      await user.click(screen.getByRole("button"));
      const overlay = document.querySelector('[aria-hidden="true"]');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass("bg-black/50");
    });

    it.each([
      [true, "true"],
      [false, undefined],
    ] as const)("sets aria-modal=%s when modal=%s", async (modal, expectedValue) => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} modal={modal} />);
      await user.click(screen.getByRole("button"));
      const panel = screen.getByRole("dialog");
      if (expectedValue) {
        expect(panel).toHaveAttribute("aria-modal", expectedValue);
      } else {
        expect(panel).not.toHaveAttribute("aria-modal");
      }
    });

    it("locks scroll in modal mode when open", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} modal />);
      await user.click(screen.getByRole("button"));
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores scroll when modal popover closes", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} modal />);
      await user.click(screen.getByRole("button"));
      await user.keyboard("{Escape}");
      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Interaction Modes", () => {
    it("opens on mouse enter and closes on mouse leave in hover mode", () => {
      render(<Popover {...defaultProps} openOn="hover" />);
      const wrapper = screen.getByRole("button").parentElement!;
      fireEvent.mouseEnter(wrapper);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      fireEvent.mouseLeave(wrapper);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens on trigger focus in focus mode", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} openOn="focus" />);
      const button = screen.getByRole("button");
      await user.click(button);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Focus Management", () => {
    it("returns focus to trigger after popover closes", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} />);
      const trigger = screen.getByRole("button");

      await user.click(trigger);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      expect(trigger).toHaveFocus();
    });
  });

  describe("CSS & Layout", () => {
    it("applies base popover classes to panel", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} />);
      await user.click(screen.getByRole("button"));
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass(
        "z-50",
        "bg-surface",
        "border",
        "border-base",
        "rounded-lg",
        "shadow-md",
        "transition-all",
        "duration-normal",
        "ease-out",
      );
    });

    it("applies triggerClassName to the trigger button", () => {
      render(<Popover {...defaultProps} triggerClassName="custom-trigger" />);
      expect(screen.getByRole("button")).toHaveClass("custom-trigger");
    });

    it("applies contentClassName to the panel", async () => {
      const user = userEvent.setup();
      render(<Popover {...defaultProps} contentClassName="custom-content" />);
      await user.click(screen.getByRole("button"));
      const panel = screen.getByRole("dialog");
      expect(panel).toHaveClass("custom-content");
    });
  });
});
