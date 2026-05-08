import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
  describe("Rendering", () => {
    it("renders text content", () => {
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

    it("supports complex children with JSX", () => {
      render(
        <Label>
          Username <span className="text-error">*</span>
        </Label>,
      );
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  describe("Required Indicator", () => {
    it("displays asterisk when required is true", () => {
      const { container } = render(<Label required>Required Field</Label>);
      const label = container.querySelector("label");
      expect(label).toHaveClass("after:content-['*']");
    });

    it("does not display asterisk when required is false or undefined", () => {
      const { container } = render(<Label>Optional Field</Label>);
      const label = container.querySelector("label");
      expect(label).not.toHaveClass("after:content-['*']");
    });

    it("applies required styling when required=true", () => {
      const { container } = render(<Label required>Required</Label>);
      const label = container.querySelector("label");
      expect(label).toHaveClass("after:ml-xs", "after:text-error");
    });
  });

  describe("Styling", () => {
    it("applies default classes", () => {
      const { container } = render(<Label>Test Label</Label>);
      const label = container.querySelector("label");
      expect(label).toHaveClass("font-medium", "text-base");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Label className="custom-class">Test Label</Label>,
      );
      const label = container.querySelector("label");
      expect(label).toHaveClass("custom-class");
    });

    it("combines default classes with custom className", () => {
      const { container } = render(
        <Label className="custom-class">Test Label</Label>,
      );
      const label = container.querySelector("label");
      expect(label).toHaveClass("font-medium", "text-base", "custom-class");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to the label element", () => {
      const ref = React.createRef<HTMLLabelElement>();
      render(<Label ref={ref}>Test Label</Label>);
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    });
  });

  describe("HTML Attributes", () => {
    it("passes through native label attributes", () => {
      const { container } = render(
        <Label htmlFor="test-input" data-testid="label">
          Test
        </Label>,
      );
      const label = container.querySelector('[data-testid="label"]');
      expect(label).toHaveAttribute("for", "test-input");
    });

    it("supports multiple text nodes as children", () => {
      const { container } = render(
        <Label>
          First Part <strong>Bold</strong> Last Part
        </Label>,
      );
      const label = container.querySelector("label");
      expect(label).toHaveTextContent("First Part");
      expect(label).toHaveTextContent("Bold");
      expect(label).toHaveTextContent("Last Part");
    });

    it("renders with only spaces as children", () => {
      const { container } = render(<Label>{" "}</Label>);
      const label = container.querySelector("label");
      expect(label).toBeInTheDocument();
    });
  });
});
