import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Textarea aria-label="Test textarea" />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders with label via Field", () => {
      render(<Textarea label="Cover letter" />);
      expect(screen.getByText("Cover letter")).toBeInTheDocument();
    });

    it("has placeholder attribute", () => {
      render(<Textarea placeholder="Enter text here" aria-label="Test" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Enter text here");
    });

    it("forwards ref correctly", () => {
      const ref = { current: null };
      render(<Textarea ref={ref} aria-label="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  describe("States", () => {
    it("handles disabled state", () => {
      render(<Textarea disabled aria-label="Test textarea" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();
    });

    it.each([
      ["error", "border-error"],
      ["success", "border-success"],
    ] as const)("applies %s state with class %s", (state, expectedClass) => {
      render(<Textarea state={state} aria-label={state} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass(expectedClass);
    });

    it("sets aria-invalid when error prop is set", () => {
      render(<Textarea error="Invalid input" aria-label="Error" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });

    it("shows error message via Field", () => {
      render(<Textarea error="This field is required" />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("shows helper text via Field", () => {
      render(<Textarea helperText="Enter at least 10 characters" />);
      expect(screen.getByText("Enter at least 10 characters")).toBeInTheDocument();
    });

    it("shows success message via Field", () => {
      render(<Textarea success="Looks good!" />);
      expect(screen.getByText("Looks good!")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it.each([
      ["primary", ["bg-base", "text-primary"]],
      ["secondary", ["bg-secondary", "text-secondary-foreground"]],
      ["outline", ["bg-transparent", "border-base"]],
      ["ghost", ["bg-transparent", "border-none"]],
    ] as const)("applies %s variant with classes", (variant, classes) => {
      render(<Textarea variant={variant} aria-label={variant} />);
      const textarea = screen.getByRole("textbox");
      classes.forEach((cls) => expect(textarea).toHaveClass(cls));
    });
  });

  describe("Sizes", () => {
    it.each([
      ["sm", ["text-sm", "px-sm", "py-xs"]],
      ["md", ["text-base", "px-md", "py-sm"]],
      ["lg", ["text-lg", "px-lg", "py-md"]],
    ] as const)("applies %s size with classes", (size, classes) => {
      render(<Textarea size={size} aria-label={size} />);
      const textarea = screen.getByRole("textbox");
      classes.forEach((cls) => expect(textarea).toHaveClass(cls));
    });
  });

  describe("Character Count", () => {
    it("shows character count when enabled", () => {
      render(
        <Textarea showCharacterCount defaultValue="hello" aria-label="Test textarea" />,
      );
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("shows character count with max length", () => {
      render(
        <Textarea
          showCharacterCount
          maxLength={10}
          defaultValue="hello"
          aria-label="Test textarea"
        />,
      );
      expect(screen.getByText("5 / 10")).toBeInTheDocument();
    });

    it("updates character count on input", async () => {
      const user = userEvent.setup();
      render(<Textarea showCharacterCount maxLength={20} aria-label="Test textarea" />);
      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "hello world");
      expect(screen.getByText("11 / 20")).toBeInTheDocument();
    });

    it("has aria-live on character count", () => {
      render(
        <Textarea showCharacterCount defaultValue="test" aria-label="Test textarea" />,
      );
      const count = screen.getByText("4");
      expect(count).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("Adornments", () => {
    it("renders start adornment", () => {
      render(
        <Textarea
          startAdornment={<span data-testid="start">📝</span>}
          aria-label="With start"
        />,
      );
      expect(screen.getByTestId("start")).toBeInTheDocument();
    });

    it("renders end adornment", () => {
      render(
        <Textarea
          endAdornment={<span data-testid="end">✓</span>}
          aria-label="With end"
        />,
      );
      expect(screen.getByTestId("end")).toBeInTheDocument();
    });

    it("applies padding when adornments are present", () => {
      render(
        <Textarea
          startAdornment={<span>→</span>}
          endAdornment={<span>←</span>}
          aria-label="With both"
        />,
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("pl-lg", "pr-lg");
    });
  });

  describe("AutoGrow", () => {
    it("grows textarea as content is added", async () => {
      const user = userEvent.setup();
      render(<Textarea autoGrow minRows={2} aria-label="AutoGrow" />);
      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "a\nb\nc\nd\ne\nf");
      expect(textarea.style.height).not.toBe("");
    });

    it("respects minRows when autoGrow is enabled", () => {
      render(<Textarea autoGrow minRows={4} aria-label="AutoGrow" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "4");
    });
  });

  describe("Resize", () => {
    it.each([
      ["vertical", "resize-vertical"],
      ["both", "resize-both"],
      ["none", "resize-none"],
    ] as const)("applies %s resize with class %s", (resize, expectedClass) => {
      render(
        <Textarea resize={resize} aria-label={resize} />,
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass(expectedClass);
    });

    it("applies vertical resize class by default", () => {
      render(<Textarea aria-label="Test" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("resize-vertical");
    });
  });

  describe("Full Width", () => {
    it("applies full width class when full prop is true", () => {
      render(<Textarea full aria-label="Full" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("w-full");
    });
  });

  describe("Control", () => {
    it("works in controlled mode", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Textarea value="initial" onChange={onChange} aria-label="Controlled" />,
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveDisplayValue("initial");
      await user.type(textarea, "more");
      expect(onChange).toHaveBeenCalled();
    });

    it("updates display value when controlled prop changes", () => {
      const { rerender } = render(
        <Textarea value="first" aria-label="Controlled" />,
      );
      let textarea = screen.getByRole("textbox");
      expect(textarea).toHaveDisplayValue("first");
      rerender(<Textarea value="second" aria-label="Controlled" />);
      textarea = screen.getByRole("textbox");
      expect(textarea).toHaveDisplayValue("second");
    });

    it("works in uncontrolled mode with defaultValue", async () => {
      const user = userEvent.setup();
      render(<Textarea defaultValue="initial" aria-label="Uncontrolled" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveDisplayValue("initial");
      await user.type(textarea, " updated");
      expect(textarea).toHaveDisplayValue("initial updated");
    });
  });

  describe("Accessibility", () => {
    it.each(["helperText", "error", "success"] as const)(
      "sets aria-describedby for %s",
      (prop) => {
        const propsMap = {
          helperText: { helperText: "Help text here" },
          error: { error: "Error message" },
          success: { success: "Success message" },
        };
        render(
          <Textarea {...propsMap[prop]} aria-label="Test" />,
        );
        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveAttribute("aria-describedby");
      },
    );
  });
});
