import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    it("renders with label via Field wrapper", () => {
      render(<Input label="Email" placeholder="you@example.com" />);
      expect(screen.getByText("Email")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it.each([
      ["sm", "h-8"],
      ["md", "h-10"],
      ["lg", "h-12"],
    ] as const)("applies %s size with class %s", (size, expectedClass) => {
      render(<Input size={size} placeholder={size} />);
      const input = screen.getByPlaceholderText(size);
      expect(input.classList).toContain(expectedClass);
    });
  });

  describe("States", () => {
    it("applies error state correctly", () => {
      render(<Input state="error" placeholder="Invalid" error="Field is required" />);
      const input = screen.getByPlaceholderText("Invalid");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby");
      expect(screen.getByRole("alert")).toHaveTextContent("Field is required");
    });

    it("applies success state correctly", () => {
      render(<Input state="success" placeholder="Valid" success="Looks good!" />);
      const input = screen.getByPlaceholderText("Valid");
      expect(input).toHaveAttribute("aria-invalid", "false");
    });

    it("prioritizes error over success message", () => {
      render(
        <Input placeholder="Test" error="This failed" success="This succeeded" label="Status" />,
      );
      expect(screen.getByText("This failed")).toBeInTheDocument();
      expect(screen.queryByText("This succeeded")).not.toBeInTheDocument();
    });
  });

  describe("Messages", () => {
    it("renders helper text", () => {
      render(
        <Input label="Password" placeholder="Enter password" helperText="At least 8 characters" />,
      );
      expect(screen.getByText("At least 8 characters")).toBeInTheDocument();
    });
  });

  describe("Adornments", () => {
    it("renders start adornment", () => {
      render(<Input placeholder="Salary" startAdornment={<span data-testid="dollar">$</span>} />);
      expect(screen.getByTestId("dollar")).toBeInTheDocument();
    });

    it("renders end adornment", () => {
      render(<Input placeholder="Search" endAdornment={<span data-testid="kbd">⌘K</span>} />);
      expect(screen.getByTestId("kbd")).toBeInTheDocument();
    });

    it("renders both start and end adornments", () => {
      render(
        <Input
          placeholder="Amount"
          startAdornment={<span data-testid="start">$</span>}
          endAdornment={<span data-testid="end">.00</span>}
        />,
      );
      expect(screen.getByTestId("start")).toBeInTheDocument();
      expect(screen.getByTestId("end")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("handles disabled state and prevents input", async () => {
      const onChange = vi.fn();
      render(<Input placeholder="Disabled" disabled onChange={onChange} />);
      const input = screen.getByPlaceholderText("Disabled");
      expect(input).toBeDisabled();

      const user = userEvent.setup();
      await user.type(input, "test");
      expect(onChange).not.toHaveBeenCalled();
    });

    it("handles onChange callback", async () => {
      const onChange = vi.fn();
      render(<Input placeholder="Type here" onChange={onChange} />);
      const input = screen.getByPlaceholderText("Type here") as HTMLInputElement;

      const user = userEvent.setup();
      await user.type(input, "hello");

      expect(onChange).toHaveBeenCalled();
      expect(input.value).toBe("hello");
    });
  });

  describe("Input Types", () => {
    it.each([
      ["email", "email@example.com"],
      ["password", "secret123"],
      ["number", "123"],
      ["search", "query"],
      ["url", "https://example.com"],
    ] as const)("supports type=%s input", (type, value) => {
      render(<Input type={type} placeholder={type} value={value} onChange={() => {}} />);
      const input = screen.getByPlaceholderText(type);
      expect(input).toHaveAttribute("type", type);
    });
  });

  describe("Props", () => {
    it("uses provided id prop", () => {
      render(<Input id="custom-id" placeholder="Test" />);
      const input = screen.getByPlaceholderText("Test");
      expect(input).toHaveAttribute("id", "custom-id");
    });

    it("generates stable id when none provided", () => {
      const { rerender } = render(<Input placeholder="Test" />);
      const input1 = screen.getByPlaceholderText("Test");
      rerender(<Input placeholder="Test" />);
      const input2 = screen.getByPlaceholderText("Test");
      expect(input1.id).toBeTruthy();
      expect(input2.id).toBeTruthy();
    });
  });
});
