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
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(
        <Select data-testid="select">
          {defaultOptions}
        </Select>
      );
      expect(screen.getByTestId("select")).toBeInTheDocument();
    });

    it("renders as HTMLSelectElement", () => {
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
  });

  describe("Sizes", () => {
    it.each([
      ["sm", ["h-8", "px-sm", "text-xs"]],
      ["md", ["h-10", "px-md", "text-sm"]],
      ["lg", ["h-12", "px-lg", "text-md"]],
    ] as const)("applies size=%s with correct classes", (size, classes) => {
      render(
        <Select size={size} data-testid="select">
          {defaultOptions}
        </Select>
      );
      const select = screen.getByTestId("select");
      classes.forEach((cls) => expect(select).toHaveClass(cls));
    });
  });

  describe("States", () => {
    it("applies state=default variant", () => {
      render(
        <Select state="default" data-testid="select">
          {defaultOptions}
        </Select>
      );
      const select = screen.getByTestId("select");
      expect(select).toHaveClass("focus-visible:ring-primary");
    });

    it.each([
      ["error", "border-error", "focus-visible:ring-error"],
      ["success", "border-success", "focus-visible:ring-success"],
    ] as const)("applies state=%s variant", (state, borderClass, ringClass) => {
      render(
        <Select state={state} data-testid="select">
          {defaultOptions}
        </Select>
      );
      const select = screen.getByTestId("select");
      expect(select).toHaveClass(borderClass, ringClass);
    });

    it("applies state=error when error prop is provided", () => {
      render(
        <Select error="This field is required" data-testid="select">
          {defaultOptions}
        </Select>
      );
      const select = screen.getByTestId("select");
      expect(select).toHaveAttribute("aria-invalid", "true");
      expect(select).toHaveClass("border-error");
    });

    it("applies state=success when success prop is provided", () => {
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
  });

  describe("Base Styling", () => {
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
  });

  describe("Field Integration", () => {
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
      expect(container.querySelectorAll("[role='group']")).toHaveLength(0);
    });
  });

  describe("Adornments", () => {
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

    it.each([
      ["start", "pl-lg"],
      ["end", "pr-lg"],
    ] as const)("applies padding %s with %s class", (adornmentType, paddingClass) => {
      const adornmentProp = adornmentType === "start" ? "startAdornment" : "endAdornment";
      render(
        <Select
          {...{ [adornmentProp]: <span>◆</span> }}
          data-testid="select"
        >
          {defaultOptions}
        </Select>
      );
      const select = screen.getByTestId("select");
      expect(select).toHaveClass(paddingClass);
    });

    it("applies padding with both adornments", () => {
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
  });

  describe("Props & Refs", () => {
    it("forwards ref to select element", () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(
        <Select ref={ref}>
          {defaultOptions}
        </Select>
      );
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });

    it("uses provided id prop", () => {
      render(
        <Select id="custom-id" data-testid="select">
          {defaultOptions}
        </Select>
      );
      expect(screen.getByTestId("select")).toHaveAttribute("id", "custom-id");
    });

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

      expect(id1).toBe(id2);
      expect(id1).toBeTruthy();
    });

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
      expect(select).toHaveClass("h-12", "px-lg", "text-md", "custom-class");
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
  });

  describe("Accessibility", () => {
    it("wires aria-describedby with helper message", () => {
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
  });

  describe("Interactions", () => {
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
  });
});
