import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("renders title and description", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}} title="My Dialog" description="a description">
        <div>content</div>
      </Dialog>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("My Dialog")).toBeInTheDocument();
    expect(screen.getByText("a description")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}} title="My Dialog" description="a description">
        <div>content</div>
      </Dialog>,
    );

    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <Dialog open={false} onOpenChange={() => {}} title="My Dialog" description="a description">
        <div>content</div>
      </Dialog>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on close button click", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Dialog open={true} onOpenChange={onOpenChange} title="My Dialog" description="a description">
        <div>content</div>
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes when Escape key is pressed", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Dialog open={true} onOpenChange={onOpenChange} title="My Dialog" description="a description">
        <div>content</div>
      </Dialog>,
    );

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
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

  it("does not show overlay when modal is false", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}} modal={false} title="My Dialog">
        <div>content</div>
      </Dialog>,
    );

    expect(screen.queryByTestId("dialog-overlay")).not.toBeInTheDocument();
  });

  it("focuses the element passed to focusRef when opened", () => {
    const focusRef = { current: null as HTMLButtonElement | null };

    render(
      <Dialog
        open={true}
        onOpenChange={() => {}}
        title="My Dialog"
        focusRef={focusRef as React.RefObject<HTMLElement>}
      >
        <button ref={focusRef}>Focusable Button</button>
      </Dialog>,
    );
    const button = screen.getByRole("button", { name: /focusable button/i });
    expect(document.activeElement).toBe(button);
  });

  it("focuses close button when no focusRef provided", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}} title="My Dialog">
        <div>content</div>
      </Dialog>,
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(document.activeElement).toBe(closeButton);
  });

  it("renders buttonRow content", () => {
    render(
      <Dialog
        open={true}
        onOpenChange={() => {}}
        title="My Dialog"
        buttonRow={<button>Action</button>}
      >
        <div>content</div>
      </Dialog>,
    );
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
  });

  it("hides close button when buttonRow is provided and showClose is not set", () => {
    render(
      <Dialog
        open={true}
        onOpenChange={() => {}}
        title="My Dialog"
        buttonRow={<button>Action</button>}
      >
        <div>content</div>
      </Dialog>,
    );
    expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();
  });

  it("shows close button when showClose is true", () => {
    render(
      <Dialog
        open={true}
        onOpenChange={() => {}}
        title="My Dialog"
        showClose={true}
        buttonRow={<button>Action</button>}
      >
        <div>content</div>
      </Dialog>,
    );
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("renders title in accessible name", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}} title="My Dialog">
        <div>content</div>
      </Dialog>,
    );
    expect(screen.getByRole("dialog", { name: /my dialog/i })).toBeInTheDocument();
  });

  it("uses aria-label when no title is provided", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <div>content</div>
      </Dialog>,
    );
    expect(screen.getByRole("dialog", { name: /dialog/i })).toBeInTheDocument();
  });

  it("renders description with aria-describedby", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}} title="My Dialog" description="Help text">
        <div>content</div>
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-describedby");
  });

  it("sets aria-modal to true when modal is true", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}} title="My Dialog" modal={true}>
        <div>content</div>
      </Dialog>,
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });
});
