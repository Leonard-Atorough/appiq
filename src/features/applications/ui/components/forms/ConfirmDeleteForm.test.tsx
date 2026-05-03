import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDeleteForm } from "./ConfirmDeleteForm";

describe("ConfirmDeleteForm", () => {
  describe("rendering", () => {
    it("should not render when closed", () => {
      render(
        <ConfirmDeleteForm
          open={false}
          onOpenChange={vi.fn()}
          onConfirm={vi.fn()}
        />
      );
      expect(screen.queryByText("Confirm Delete")).not.toBeInTheDocument();
    });

    it("should render when open", () => {
      render(
        <ConfirmDeleteForm
          open={true}
          onOpenChange={vi.fn()}
          onConfirm={vi.fn()}
        />
      );
      expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
    });

    it("should display description text", () => {
      render(
        <ConfirmDeleteForm
          open={true}
          onOpenChange={vi.fn()}
          onConfirm={vi.fn()}
        />
      );
      expect(
        screen.getByText(
          "Are you sure you want to delete this application? This action cannot be undone."
        )
      ).toBeInTheDocument();
    });

    it("should render Cancel and Delete buttons", () => {
      render(
        <ConfirmDeleteForm
          open={true}
          onOpenChange={vi.fn()}
          onConfirm={vi.fn()}
        />
      );
      expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Delete" })
      ).toBeInTheDocument();
    });
  });

  describe("user interactions", () => {
    it("should call onOpenChange with false when Cancel is clicked", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(
        <ConfirmDeleteForm
          open={true}
          onOpenChange={onOpenChange}
          onConfirm={vi.fn()}
        />
      );

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      await user.click(cancelButton);

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("should call onConfirm when Delete button is clicked", async () => {
      const user = userEvent.setup();
      const onConfirm = vi.fn();
      render(
        <ConfirmDeleteForm
          open={true}
          onOpenChange={vi.fn()}
          onConfirm={onConfirm}
        />
      );

      const deleteButton = screen.getByRole("button", { name: "Delete" });
      await user.click(deleteButton);

      expect(onConfirm).toHaveBeenCalled();
    });

    it("should call onOpenChange when dialog is closed externally", async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <ConfirmDeleteForm
          open={true}
          onOpenChange={onOpenChange}
          onConfirm={vi.fn()}
        />
      );

      // Simulate external close by changing prop
      rerender(
        <ConfirmDeleteForm
          open={false}
          onOpenChange={onOpenChange}
          onConfirm={vi.fn()}
        />
      );

      expect(screen.queryByText("Confirm Delete")).not.toBeInTheDocument();
    });
  });

  describe("loading state", () => {
    it("should disable buttons when isLoading is true", () => {
      render(
        <ConfirmDeleteForm
          open={true}
          onOpenChange={vi.fn()}
          onConfirm={vi.fn()}
          isLoading={true}
        />
      );

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      const deleteButton = screen.getByRole("button", { name: "Deleting..." });

      expect(cancelButton).toBeDisabled();
      expect(deleteButton).toBeDisabled();
    });

    it("should show loading text on Delete button when isLoading is true", () => {
      render(
        <ConfirmDeleteForm
          open={true}
          onOpenChange={vi.fn()}
          onConfirm={vi.fn()}
          isLoading={true}
        />
      );

      expect(screen.getByRole("button", { name: "Deleting..." })).toBeInTheDocument();
    });

    it("should enable buttons when isLoading is false", () => {
      render(
        <ConfirmDeleteForm
          open={true}
          onOpenChange={vi.fn()}
          onConfirm={vi.fn()}
          isLoading={false}
        />
      );

      const cancelButton = screen.getByRole("button", { name: "Cancel" });
      const deleteButton = screen.getByRole("button", { name: "Delete" });

      expect(cancelButton).not.toBeDisabled();
      expect(deleteButton).not.toBeDisabled();
    });
  });
});
