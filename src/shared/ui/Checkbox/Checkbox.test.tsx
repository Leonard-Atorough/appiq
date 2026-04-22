import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeTruthy();
  });

  it("renders with a label", () => {
    render(<Checkbox label="Remember me" />);
    expect(screen.getByLabelText("Remember me")).toBeTruthy();
    expect(screen.getByText("Remember me")).toBeTruthy();
  });

  it("renders with a description", () => {
    render(<Checkbox label="Notifications" description="Receive email updates" />);
    expect(screen.getByText("Receive email updates")).toBeTruthy();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-describedby");
  });

  it("renders an error message string", () => {
    render(
      <Checkbox label="Accept terms" state="error" errorMessage="You must accept the terms" />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("You must accept the terms");
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("marks aria-invalid when state=error", () => {
    render(<Checkbox state="error" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("calls onChange when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Option" onChange={onChange} />);
    await user.click(screen.getByLabelText("Option"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Option" disabled onChange={onChange} />);
    await user.click(screen.getByLabelText("Option"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("reflects checked state", () => {
    render(<Checkbox label="Option" checked readOnly />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("sets indeterminate imperatively", () => {
    render(<Checkbox indeterminate />);
    expect((screen.getByRole("checkbox") as HTMLInputElement).indeterminate).toBe(true);
  });

  it("label click focuses and toggles the checkbox", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Toggle me" />);
    await user.click(screen.getByText("Toggle me"));
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("renders without label as a bare input", () => {
    const { container } = render(<Checkbox />);
    expect(container.firstChild?.nodeName).toBe("INPUT");
  });

  it("forwards ref to the input element", () => {
    const ref = { current: null } as unknown as React.RefObject<HTMLInputElement>;
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Checkbox label="Accept terms" description="Read the terms carefully" />,
    );
    expect(container).toMatchSnapshot();
  });
});
