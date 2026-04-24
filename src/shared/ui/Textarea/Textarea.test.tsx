import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
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

  it("handles disabled state", () => {
    render(<Textarea disabled aria-label="Test textarea" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Textarea ref={ref} aria-label="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  describe("Variants", () => {
    it("applies primary variant classes", () => {
      render(<Textarea variant="primary" aria-label="Primary" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("bg-base", "text-base");
    });

    it("applies secondary variant classes", () => {
      render(<Textarea variant="secondary" aria-label="Secondary" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("bg-secondary", "text-secondary-foreground");
    });

    it("applies outline variant classes", () => {
      render(<Textarea variant="outline" aria-label="Outline" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("bg-transparent", "border-base");
    });

    it("applies ghost variant classes", () => {
      render(<Textarea variant="ghost" aria-label="Ghost" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("bg-transparent", "border-none");
    });
  });

  describe("Sizes", () => {
    it("applies small size classes", () => {
      render(<Textarea size="sm" aria-label="Small" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("text-sm", "px-sm", "py-xs");
    });

    it("applies medium size classes", () => {
      render(<Textarea size="md" aria-label="Medium" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("text-base", "px-md", "py-sm");
    });

    it("applies large size classes", () => {
      render(<Textarea size="lg" aria-label="Large" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("text-lg", "px-lg", "py-md");
    });
  });

  describe("Character Count", () => {
    it("shows character count when enabled", () => {
      render(
        <Textarea
          showCharacterCount
          defaultValue="hello"
          aria-label="Test textarea"
        />,
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
        <Textarea
          showCharacterCount
          defaultValue="test"
          aria-label="Test textarea"
        />,
      );
      const count = screen.getByText("4");
      expect(count).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("States", () => {
    it("applies error state classes", () => {
      render(<Textarea state="error" aria-label="Error" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-error");
    });

    it("applies success state classes", () => {
      render(<Textarea state="success" aria-label="Success" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-success");
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
      render(
        <Textarea autoGrow minRows={2} aria-label="AutoGrow" />,
      );
      const textarea = screen.getByRole("textbox");
      
      await user.type(textarea, "a\nb\nc\nd\ne\nf");
      // Height should increase with content
      expect(textarea.style.height).not.toBe("");
    });

    it("respects minRows when autoGrow is enabled", () => {
      render(
        <Textarea autoGrow minRows={4} aria-label="AutoGrow" />,
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "4");
    });
  });

  describe("Resize", () => {
    it("applies vertical resize class by default", () => {
      render(<Textarea aria-label="Test" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("resize-vertical");
    });

    it("applies custom resize class", () => {
      render(<Textarea resize="both" aria-label="Test" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("resize-both");
    });

    it("applies resize-none when specified", () => {
      render(<Textarea resize="none" aria-label="Test" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("resize-none");
    });
  });

  describe("Full Width", () => {
    it("applies full width class when full prop is true", () => {
      render(<Textarea full aria-label="Full" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("w-full");
    });
  });

  describe("Controlled Mode", () => {
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
  });

  describe("Uncontrolled Mode", () => {
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
    it("sets aria-describedby for helper text", () => {
      render(
        <Textarea
          helperText="Help text here"
          aria-label="Test"
        />,
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-describedby");
    });

    it("sets aria-describedby for error message", () => {
      render(<Textarea error="Error message" aria-label="Test" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-describedby");
    });

    it("sets aria-describedby for success message", () => {
      render(<Textarea success="Success message" aria-label="Test" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-describedby");
    });

    it("has focus-visible ring styling", () => {
      render(<Textarea aria-label="Test" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("focus-visible:ring-2");
    });
  });

  describe("Snapshot Tests", () => {
    it("matches snapshot for default textarea", () => {
      const { container } = render(
        <Textarea label="Test" placeholder="Enter text" aria-label="Test" />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for error state", () => {
      const { container } = render(
        <Textarea label="Test" error="Invalid" aria-label="Test" />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot with all features", () => {
      const { container } = render(
        <Textarea
          label="Cover letter"
          placeholder="Write here..."
          autoGrow
          minRows={3}
          showCharacterCount
          maxLength={500}
          helperText="3-5 paragraphs"
          aria-label="Test"
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
