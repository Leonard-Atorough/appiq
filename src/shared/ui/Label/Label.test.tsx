import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
  it("renders with text content", () => {
    render(<Label>Username</Label>);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders as a label element", () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText("Test Label").tagName).toBe("LABEL");
  });

  it("associates with form control using htmlFor", () => {
    render(
      <>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" type="email" />
      </>,
    );
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("displays asterisk when required is true", () => {
    const { container } = render(<Label required>Required Field</Label>);
    const label = container.querySelector("label");
    expect(label?.className).toContain("after:content-['*']");
  });

  it("does not display asterisk when required is false or undefined", () => {
    const { container } = render(<Label>Optional Field</Label>);
    const label = container.querySelector("label");
    expect(label?.className).not.toContain("after:content-['*']");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Label className="custom-class">Test Label</Label>,
    );
    const label = container.querySelector("label");
    expect(label?.className).toContain("custom-class");
  });

  it("combines default classes with custom className", () => {
    const { container } = render(
      <Label className="custom-class">Test Label</Label>,
    );
    const label = container.querySelector("label");
    expect(label?.className).toContain("font-medium");
    expect(label?.className).toContain("text-base");
    expect(label?.className).toContain("custom-class");
  });

  it("forwards ref to the label element", () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Test Label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it("supports complex children", () => {
    render(
      <Label>
        Username <span className="text-error">*</span>
      </Label>,
    );
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("passes through native label attributes", () => {
    const { container } = render(
      <Label htmlFor="test-input" data-testid="label">
        Test
      </Label>,
    );
    const label = container.querySelector('[data-testid="label"]');
    expect(label).toHaveAttribute("for", "test-input");
  });
});
