import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("renders title and description and closes on button click", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Dialog open={true} onOpenChange={onOpenChange} title="My Dialog" description="a description">
        <div>content</div>
      </Dialog>,
    );

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("My Dialog")).toBeTruthy();
    expect(screen.getByText("a description")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders children content", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}} title="My Dialog" description="a description">
        <div>content</div>
      </Dialog>,
    );

    expect(screen.getByText("content")).toBeTruthy();
  });

  it("does not render when open is false", () => {
    render(
      <Dialog open={false} onOpenChange={() => {}} title="My Dialog" description="a description">
        <div>content</div>
      </Dialog>,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("focuses the element passed to focusRef when opened", async () => {
    const focusRef = { current: null };

    render(
      <Dialog
        open={true}
        onOpenChange={() => {}}
        title="My Dialog"
        description="a description"
        focusRef={focusRef}
      >
        <button ref={focusRef}>Focusable Button</button>
      </Dialog>,
    );
    const button = screen.getByRole("button", { name: /focusable button/i });
    expect(document.activeElement).toBe(button);
  });

  it("renders buttonRow content", () => {
    render(
      <Dialog
        open={true}
        onOpenChange={() => {}}
        title="My Dialog"
        description="a description"
        buttonRow={<button>Action</button>}
      >
        <div>content</div>
      </Dialog>,
    );
    expect(screen.getByRole("button", { name: /action/i })).toBeTruthy();
  });

  it("closes when clicking outside the dialog if modal is true", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Dialog open={true} onOpenChange={onOpenChange} title="My Dialog" description="a description">
        <div>content</div>
      </Dialog>,
    );
    await user.click(screen.getByTestId("dialog-overlay"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
