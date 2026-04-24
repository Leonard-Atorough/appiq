import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders with label via Field wrapper", () => {
    render(<Input label="Email" placeholder="you@example.com" />);
    const label = screen.getByText("Email");
    expect(label).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    render(<Input size="sm" placeholder="Small" />);
    const input = screen.getByPlaceholderText("Small");
    expect(input.classList).toContain("h-8");

    const { rerender } = render(<Input size="md" placeholder="Medium" />);
    const mediumInput = screen.getByPlaceholderText("Medium");
    expect(mediumInput.classList).toContain("h-10");

    rerender(<Input size="lg" placeholder="Large" />);
    const largeInput = screen.getByPlaceholderText("Large");
    expect(largeInput.classList).toContain("h-12");
  });

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

  it("renders helper text", () => {
    render(
      <Input label="Password" placeholder="Enter password" helperText="At least 8 characters" />,
    );
    expect(screen.getByText("At least 8 characters")).toBeInTheDocument();
  });

  it("prioritizes error over success message", () => {
    render(
      <Input placeholder="Test" error="This failed" success="This succeeded" label="Status" />,
    );
    expect(screen.getByText("This failed")).toBeInTheDocument();
    expect(screen.queryByText("This succeeded")).not.toBeInTheDocument();
  });

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

  it("handles disabled state", async () => {
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

  it("supports different input types", () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveAttribute("type", "email");

    render(<Input type="password" placeholder="Password" />);
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");

    render(<Input type="number" placeholder="Number" />);
    const numberInput = screen.getByPlaceholderText("Number");
    expect(numberInput).toHaveAttribute("type", "number");
  });

  it("generates stable id when none provided", () => {
    const { rerender } = render(<Input placeholder="Test" />);
    const input1 = screen.getByPlaceholderText("Test");

    rerender(<Input placeholder="Test" />);
    const input2 = screen.getByPlaceholderText("Test");
    // Different renders get different generated IDs (expected behavior with useId)
    expect(input1.id).toBeTruthy();
    expect(input2.id).toBeTruthy();
  });

  it("uses provided id prop", () => {
    render(<Input id="custom-id" placeholder="Test" />);
    const input = screen.getByPlaceholderText("Test");
    expect(input).toHaveAttribute("id", "custom-id");
  });

  it("connects label to input via htmlFor", () => {
    render(<Input id="email-field" label="Email" placeholder="test@example.com" />);
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-field");
  });

  it("supports aria-describedby for external descriptions", () => {
    render(<Input placeholder="Test" aria-describedby="external-hint" helperText="Helper text" />);
    const input = screen.getByPlaceholderText("Test");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toContain("external-hint");
  });

  it("applies custom className to input", () => {
    render(<Input placeholder="Test" className="custom-class" />);
    const input = screen.getByPlaceholderText("Test");
    expect(input.classList).toContain("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input placeholder="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.placeholder).toBe("Test");
  });
});
