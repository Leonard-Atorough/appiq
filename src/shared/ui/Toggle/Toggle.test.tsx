import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  describe("Rendering", () => {
    it("renders a checkbox input", () => {
      render(<Toggle />);
      expect(screen.getByRole("checkbox")).toBeTruthy();
    });

    it("renders without label as a bare control", () => {
      const { container } = render(<Toggle />);
      const wrapper = container.firstChild;
      expect(wrapper?.nodeName).toBe("SPAN");
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });
  });

  describe("Label & Description", () => {
    it("renders with a label", () => {
      render(<Toggle label="Remember me" />);
      expect(screen.getByLabelText("Remember me")).toBeTruthy();
      expect(screen.getByText("Remember me")).toBeTruthy();
    });

    it("renders with a description and aria-describedby", () => {
      render(<Toggle label="Notifications" description="Receive email updates" />);
      expect(screen.getByText("Receive email updates")).toBeTruthy();
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-describedby");
    });
  });

  describe("States", () => {
    it("reflects checked state", () => {
      render(<Toggle label="Option" checked readOnly />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("sets indeterminate state", () => {
      render(<Toggle indeterminate />);
      expect((screen.getByRole("checkbox") as HTMLInputElement).indeterminate).toBe(true);
    });

    it("applies error state and marks aria-invalid", () => {
      render(<Toggle state="error" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("renders error message when provided", () => {
      render(
        <Toggle label="Accept terms" state="error" errorMessage="You must accept the terms" />,
      );
      expect(screen.getByRole("alert")).toHaveTextContent("You must accept the terms");
      expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Interactions", () => {
    it("calls onChange when clicked", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Toggle label="Option" onChange={onChange} />);
      await user.click(screen.getByLabelText("Option"));
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("does not call onChange when disabled", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Toggle label="Option" disabled onChange={onChange} />);
      await user.click(screen.getByLabelText("Option"));
      expect(onChange).not.toHaveBeenCalled();
    });

    it("label click focuses and toggles the toggle", async () => {
      const user = userEvent.setup();
      render(<Toggle label="Toggle me" />);
      await user.click(screen.getByText("Toggle me"));
      expect(screen.getByRole("checkbox")).toBeChecked();
    });
  });

  describe("Switch Mode", () => {
    it("renders as switch when type='switch'", () => {
      const { container } = render(<Toggle type="switch" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeTruthy();
      // Switch has track + thumb, checkbox has just box
      const switches = container.querySelectorAll("span[aria-hidden='true']");
      expect(switches.length).toBeGreaterThan(0);
    });

    it("renders switch with label", () => {
      render(<Toggle type="switch" label="Enable notifications" />);
      expect(screen.getByText("Enable notifications")).toBeTruthy();
      expect(screen.getByRole("checkbox")).toBeTruthy();
    });

    it("switch mode ignores indeterminate prop", () => {
      render(<Toggle type="switch" indeterminate />);
      expect((screen.getByRole("checkbox") as HTMLInputElement).indeterminate).toBe(false);
    });

    it("switch reflects checked state", () => {
      render(<Toggle type="switch" label="Option" checked readOnly />);
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("switch calls onChange when clicked", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Toggle type="switch" label="Toggle" onChange={onChange} />);
      await user.click(screen.getByLabelText("Toggle"));
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("switch applies error state", () => {
      render(<Toggle type="switch" state="error" />);
      expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
    });
  });
});
