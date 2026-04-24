import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
  it("renders children", () => {
    render(
      <Field id="test">
        <input id="test" />
      </Field>,
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label with htmlFor linking to id", () => {
    render(
      <Field id="name" label="Full Name">
        <input id="name" />
      </Field>,
    );
    expect(screen.getByText("Full Name").closest("label")).toHaveAttribute("for", "name");
  });

  it("renders a ReactNode as label", () => {
    render(
      <Field id="name" label={<span data-testid="custom-label">Custom</span>}>
        <input id="name" />
      </Field>,
    );
    expect(screen.getByTestId("custom-label")).toBeInTheDocument();
  });

  it("does not render label element when label prop is absent", () => {
    render(
      <Field id="email">
        <input id="email" />
      </Field>,
    );
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });

  it("renders helperText with correct id", () => {
    render(
      <Field id="email" helperText="Enter your email address">
        <input id="email" />
      </Field>,
    );
    const helper = screen.getByText("Enter your email address");
    expect(helper).toHaveAttribute("id", "email-helper");
    expect(helper).not.toHaveAttribute("role", "alert");
  });

  it("renders helperText as ReactNode", () => {
    render(
      <Field id="email" helperText={<em>Custom helper</em>}>
        <input id="email" />
      </Field>,
    );
    const helper = screen.getByText("Custom helper").parentElement;
    expect(helper).toHaveAttribute("id", "email-helper");
  });

  it("renders success with correct id and no role=alert", () => {
    render(
      <Field id="email" success="Looks good!">
        <input id="email" />
      </Field>,
    );
    const success = screen.getByText("Looks good!");
    expect(success).toHaveAttribute("id", "email-success");
    expect(success).not.toHaveAttribute("role", "alert");
  });

  it("renders success as ReactNode", () => {
    render(
      <Field id="email" success={<strong>Available</strong>}>
        <input id="email" />
      </Field>,
    );
    const success = screen.getByText("Available").parentElement;
    expect(success).toHaveAttribute("id", "email-success");
  });

  it("renders error with role=alert and correct id", () => {
    render(
      <Field id="email" error="This field is required">
        <input id="email" />
      </Field>,
    );
    const error = screen.getByRole("alert");
    expect(error).toHaveAttribute("id", "email-error");
    expect(error).toHaveTextContent("This field is required");
  });

  it("renders error as ReactNode", () => {
    render(
      <Field id="email" error={<strong>Required</strong>}>
        <input id="email" />
      </Field>,
    );
    expect(screen.getByRole("alert")).toContainElement(screen.getByText("Required"));
  });

  it("hides success when error is also present", () => {
    render(
      <Field id="email" success="Looks good!" error="Required">
        <input id="email" />
      </Field>,
    );
    expect(screen.queryByText("Looks good!")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("shows helperText alongside error", () => {
    render(
      <Field id="email" helperText="Enter your email" error="Required">
        <input id="email" />
      </Field>,
    );
    expect(screen.getByText("Enter your email")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("passes required to the label", () => {
    const { container } = render(
      <Field id="name" label="Name" required>
        <input id="name" />
      </Field>,
    );
    const label = container.querySelector("label");
    expect(label?.className).toContain("after:content-['*']");
  });

  it("renders required with error and helper all visible", () => {
    render(
      <Field id="bio" label="Bio" required helperText="Minimum 20 characters" error="Too short">
        <textarea id="bio" />
      </Field>,
    );
    const label = screen.getByText("Bio").closest("label");
    expect(label?.className).toContain("after:content-['*']");
    expect(screen.getByText("Minimum 20 characters")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("applies custom className to wrapper", () => {
    const { container } = render(
      <Field id="name" label="Name" className="custom-wrapper-class">
        <input id="name" />
      </Field>,
    );
    expect(container.firstChild).toHaveClass("custom-wrapper-class");
    expect(container.firstChild).toHaveClass("flex");
    expect(container.firstChild).toHaveClass("flex-col");
  });

  it("has correct styling classes for messages", () => {
    const { rerender } = render(
      <Field id="email" helperText="Helper">
        <input id="email" />
      </Field>,
    );
    let message = screen.getByText("Helper");
    expect(message).toHaveClass("text-sm");
    expect(message).toHaveClass("text-muted");

    rerender(
      <Field id="email" success="Success">
        <input id="email" />
      </Field>,
    );
    message = screen.getByText("Success");
    expect(message).toHaveClass("text-sm");
    expect(message).toHaveClass("text-success-text");

    rerender(
      <Field id="email" error="Error">
        <input id="email" />
      </Field>,
    );
    message = screen.getByRole("alert");
    expect(message).toHaveClass("text-sm");
    expect(message).toHaveClass("text-error-text");
    expect(message).toHaveClass("font-medium");
  });

  it("renders snapshot with all message types", () => {
    const { container } = render(
      <Field
        id="email"
        label="Email"
        required
        helperText="We'll never share it"
        success="Valid email"
        error="Invalid format"
      >
        <input id="email" type="email" />
      </Field>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders snapshot with custom className", () => {
    const { container } = render(
      <Field id="name" label="Name" className="mb-lg" helperText="Your full name">
        <input id="name" />
      </Field>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
