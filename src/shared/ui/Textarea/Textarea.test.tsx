import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders with default props", () => {
    render(<Textarea aria-label="Test textarea" />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("applies variant and size classes", () => {
    render(<Textarea variant="primary" size="lg" aria-label="Test textarea" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toMatch(/text-lg/);
    expect(textarea.className).toMatch(/bg-\(--color-bg\)/);
  });

  it("shows character count", async () => {
    render(<Textarea showCharacterCount maxLength={10} aria-label="Test textarea" />);
    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "hello");
    expect(screen.getByText("5 / 10")).toBeTruthy();
  });

  it("handles disabled state", async () => {
    render(<Textarea disabled aria-label="Test textarea" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });
});
