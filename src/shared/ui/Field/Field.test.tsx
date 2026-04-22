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

  it("renders a ReactNode as error", () => {
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
});
