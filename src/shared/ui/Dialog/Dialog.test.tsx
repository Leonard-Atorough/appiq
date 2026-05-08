import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  describe("Rendering", () => {
    it("renders title, description, and content when open", () => {
      render(
        <Dialog open={true} onOpenChange={() => {}} title="My Dialog" description="a description">
          <div>content</div>
        </Dialog>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("My Dialog")).toBeInTheDocument();
      expect(screen.getByText("a description")).toBeInTheDocument();
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
  });

  describe("Closing", () => {
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
        <Dialog open={true} onOpenChange={onOpenChange} title="My Dialog">
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
        <Dialog open={true} onOpenChange={onOpenChange} title="My Dialog">
          <div>content</div>
        </Dialog>,
      );
      await user.click(screen.getByTestId("dialog-overlay"));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Modal", () => {
    it("shows overlay when modal is true (default)", () => {
      render(
        <Dialog open={true} onOpenChange={() => {}} title="My Dialog">
          <div>content</div>
        </Dialog>,
      );
      expect(screen.getByTestId("dialog-overlay")).toBeInTheDocument();
    });

    it("does not show overlay when modal is false", () => {
      render(
        <Dialog open={true} onOpenChange={() => {}} modal={false} title="My Dialog">
          <div>content</div>
        </Dialog>,
      );

      expect(screen.queryByTestId("dialog-overlay")).not.toBeInTheDocument();
    });
  });

  describe("Focus Management", () => {
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
  });

  describe("Button Row", () => {
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

    it("shows close button when showClose is true with buttonRow", () => {
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
  });

  describe("Accessibility", () => {
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
        <Dialog open={true} onOpenChange={() => {}} aria-label="Custom Label">
          <div>content</div>
        </Dialog>,
      );
      expect(screen.getByRole("dialog", { name: /custom label/i })).toBeInTheDocument();
    });
  });
});
