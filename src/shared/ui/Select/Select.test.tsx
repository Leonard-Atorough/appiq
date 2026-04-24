import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { Select } from "./Select";

const defaultOptions = (
  <>
    <option value="">Select an option</option>
    <option value="opt1">Option 1</option>
    <option value="opt2">Option 2</option>
    <option value="opt3">Option 3</option>
  </>
);

describe("Select", () => {
  // --- Rendering ---

  it("renders with default props", () => {
    render(
      <Select data-testid="select">
        {defaultOptions}
      </Select>
    );
    expect(screen.getByTestId("select")).toBeInTheDocument();
  });

  it("renders select element as HTMLSelectElement", () => {
    const { container } = render(
      <Select data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = container.querySelector("select");
    expect(select).toBeInstanceOf(HTMLSelectElement);
  });

  it("renders all option children", () => {
    render(
      <Select>
        <option value="">Select</option>
        <option value="a">Apple</option>
        <option value="b">Banana</option>
      </Select>
    );
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
  });

  // --- Size Variants ---

  it("applies size variant sm", () => {
    render(
      <Select size="sm" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("h-8", "px-sm", "text-xs");
  });

  it("applies size variant md", () => {
    render(
      <Select size="md" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("h-10", "px-md", "text-sm");
  });

  it("applies size variant lg", () => {
    render(
      <Select size="lg" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("h-12", "px-lg", "text-base");
  });

  // --- State Variants ---

  it("applies state=default variant", () => {
    render(
      <Select state="default" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("focus-visible:ring-primary");
  });

  it("applies state=error variant and aria-invalid when error prop is set", () => {
    render(
      <Select error="This is an error" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("border-error", "focus-visible:ring-error");
    expect(select).toHaveAttribute("aria-invalid", "true");
  });

  it("applies state=success variant", () => {
    render(
      <Select state="success" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("border-success", "focus-visible:ring-success");
  });

  it("sets state=error when error prop is provided", () => {
    render(
      <Select error="This field is required" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveClass("border-error");
  });

  it("sets state=success when success prop is provided without error", () => {
    render(
      <Select success="Saved!" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("border-success");
  });

  it("prioritizes error state over success state", () => {
    render(
      <Select error="Error" success="Success" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("border-error");
    expect(select).not.toHaveClass("border-success");
  });

  // --- Base Styling ---

  it("applies base select classes", () => {
    render(
      <Select data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("appearance-none", "rounded-md");
    expect(select).toHaveClass("border", "border-base", "bg-surface");
    expect(select).toHaveClass("shadow-sm", "focus-visible:shadow-md");
    expect(select).toHaveClass("transition-shadow", "duration-200", "ease-out");
    expect(select).toHaveClass("focus-visible:ring-2", "focus-visible:ring-offset-1");
  });

  // --- Disabled State ---

  it("applies disabled styling", () => {
    render(
      <Select disabled data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toBeDisabled();
    expect(select).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-50");
  });

  // --- Field Integration ---

  it("renders with label via Field wrapper", () => {
    render(
      <Select label="Status" data-testid="select">
        {defaultOptions}
      </Select>
    );
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  it("renders helper text via Field wrapper", () => {
    render(
      <Select label="Status" helperText="Choose your status" data-testid="select">
        {defaultOptions}
      </Select>
    );
    expect(screen.getByText("Choose your status")).toBeInTheDocument();
  });

  it("renders error message via Field wrapper", () => {
    render(
      <Select label="Status" error="This field is required" data-testid="select">
        {defaultOptions}
      </Select>
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("renders success message via Field wrapper", () => {
    render(
      <Select label="Status" success="Saved!" data-testid="select">
        {defaultOptions}
      </Select>
    );
    expect(screen.getByText("Saved!")).toBeInTheDocument();
  });

  it("does not render Field wrapper when no label/error/helper/success", () => {
    const { container } = render(
      <Select data-testid="select">
        {defaultOptions}
      </Select>
    );
    // Should only have select, no Field wrapper
    expect(container.querySelectorAll("[role='group']")).toHaveLength(0);
  });

  // --- Adornments ---

  it("renders start adornment", () => {
    render(
      <Select startAdornment={<span data-testid="start">★</span>} data-testid="select">
        {defaultOptions}
      </Select>
    );
    expect(screen.getByTestId("start")).toBeInTheDocument();
  });

  it("renders end adornment", () => {
    render(
      <Select endAdornment={<span data-testid="end">▼</span>} data-testid="select">
        {defaultOptions}
      </Select>
    );
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("renders both start and end adornments", () => {
    render(
      <Select
        startAdornment={<span data-testid="start">S</span>}
        endAdornment={<span data-testid="end">E</span>}
        data-testid="select"
      >
        {defaultOptions}
      </Select>
    );
    expect(screen.getByTestId("start")).toBeInTheDocument();
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("applies correct padding with start adornment", () => {
    render(
      <Select startAdornment={<span>★</span>} data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("pl-lg");
  });

  it("applies correct padding with end adornment", () => {
    render(
      <Select endAdornment={<span>▼</span>} data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("pr-lg");
  });

  it("applies correct padding with both adornments", () => {
    render(
      <Select
        startAdornment={<span>S</span>}
        endAdornment={<span>E</span>}
        data-testid="select"
      >
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("pl-lg", "pr-lg");
  });

  it("positions adornments with correct classes", () => {
    render(
      <Select
        startAdornment={<span data-testid="start">S</span>}
        endAdornment={<span data-testid="end">E</span>}
        data-testid="select"
      >
        {defaultOptions}
      </Select>
    );
    const startAdornment = screen.getByTestId("start").parentElement;
    const endAdornment = screen.getByTestId("end").parentElement;
    
    expect(startAdornment).toHaveClass("absolute", "left-sm", "pointer-events-none");
    expect(endAdornment).toHaveClass("absolute", "right-sm", "pointer-events-none");
  });

  // --- ID Generation & aria-describedby ---

  it("generates stable id when not provided", () => {
    const { rerender } = render(
      <Select label="Test" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select1 = screen.getByTestId("select");
    const id1 = select1.id;
    
    rerender(
      <Select label="Test" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select2 = screen.getByTestId("select");
    const id2 = select2.id;
    
    // Same component should keep same id across re-renders
    expect(id1).toBe(id2);
    expect(id1).toBeTruthy();
  });

  it("uses provided id prop", () => {
    render(
      <Select id="custom-id" data-testid="select">
        {defaultOptions}
      </Select>
    );
    expect(screen.getByTestId("select")).toHaveAttribute("id", "custom-id");
  });

  it("wires aria-describedby with helper text", () => {
    render(
      <Select label="Status" helperText="Help text" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    const describedBy = select.getAttribute("aria-describedby");
    expect(describedBy).toMatch(/-helper/);
  });

  it("wires aria-describedby with error message", () => {
    render(
      <Select label="Status" error="Error text" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    const describedBy = select.getAttribute("aria-describedby");
    expect(describedBy).toMatch(/-error/);
  });

  it("wires aria-describedby with success message", () => {
    render(
      <Select label="Status" success="Success text" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    const describedBy = select.getAttribute("aria-describedby");
    expect(describedBy).toMatch(/-success/);
  });

  it("combines multiple aria-describedby references", () => {
    render(
      <Select
        label="Status"
        helperText="Help"
        success="Success"
        data-testid="select"
      >
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    const describedBy = select.getAttribute("aria-describedby");
    expect(describedBy).toMatch(/-helper/);
    expect(describedBy).toMatch(/-success/);
  });

  // --- Ref Forwarding ---

  it("forwards ref to select element", () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(
      <Select ref={ref}>
        {defaultOptions}
      </Select>
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  // --- Custom Props & className ---

  it("applies custom className", () => {
    render(
      <Select className="custom-class" data-testid="select">
        {defaultOptions}
      </Select>
    );
    expect(screen.getByTestId("select")).toHaveClass("custom-class");
  });

  it("merges custom className with variant classes", () => {
    render(
      <Select size="lg" className="custom-class" data-testid="select">
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveClass("h-12", "px-lg", "text-base", "custom-class");
  });

  it("passes through HTML attributes", () => {
    render(
      <Select
        data-testid="select"
        aria-label="Custom aria label"
        title="Tooltip"
      >
        {defaultOptions}
      </Select>
    );
    const select = screen.getByTestId("select");
    expect(select).toHaveAttribute("aria-label", "Custom aria label");
    expect(select).toHaveAttribute("title", "Tooltip");
  });

  it("handles onChange callback", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Select onChange={handleChange} data-testid="select">
        <option value="">Select</option>
        <option value="a">Apple</option>
      </Select>
    );
    
    const select = screen.getByTestId("select");
    await user.selectOptions(select, "a");
    expect(handleChange).toHaveBeenCalled();
  });

  // --- Snapshots ---

  it("matches snapshot with default props", () => {
    const { container } = render(
      <Select>
        {defaultOptions}
      </Select>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with label and helper text", () => {
    const { container } = render(
      <Select label="Status" helperText="Choose your status">
        {defaultOptions}
      </Select>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with error state", () => {
    const { container } = render(
      <Select label="Status" error="This field is required">
        {defaultOptions}
      </Select>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot with adornments", () => {
    const { container } = render(
      <Select
        label="Status"
        startAdornment={<span>★</span>}
        endAdornment={<span>▼</span>}
      >
        {defaultOptions}
      </Select>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
