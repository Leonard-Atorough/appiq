import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  describe("Rendering", () => {
    it("renders a checkbox input", () => {
      render(<Checkbox />);
      expect(screen.getByRole("checkbox")).toBeTruthy();
    });

    it("renders without label as a bare control", () => {
      const { container } = render(<Checkbox />);
      const wrapper = container.firstChild;
      expect(wrapper?.nodeName).toBe("SPAN");
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });
  });

  describe("Label & Description", () => {
    it("renders with a label", () => {
      render(<Checkbox label="Remember me" />);
      expect(screen.getByLabelText("Remember me")).toBeTruthy();
      expect(screen.getByText("Remember me")).toBeTruthy();
    });

    it("renders with a description and aria-describedby", () => {
      render(<Checkbox label="Notifications" description="Receive email updates" />);
      expect(screen.getByText("Receive email updates")).toBeTruthy();
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-describedby");
    });
  });

  describe("States", () => {
    it("reflects checked state", () => {
      render(<Checkbox label="Option" checked readOnly />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("sets indeterminate state", () => {
      render(<Checkbox indeterminate />);
      expect((screen.getByRole("checkbox") as HTMLInputElement).indeterminate).toBe(true);
    });

    it("applies error state and marks aria-invalid", () => {
      render(<Checkbox state="error" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("renders error message when provided", () => {
      render(
        <Checkbox label="Accept terms" state="error" errorMessage="You must accept the terms" />,
      );
      expect(screen.getByRole("alert")).toHaveTextContent("You must accept the terms");
      expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Interactions", () => {
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

    it("label click focuses and toggles the checkbox", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Toggle me" />);
      await user.click(screen.getByText("Toggle me"));
      expect(screen.getByRole("checkbox")).toBeChecked();
    });
  });
});
