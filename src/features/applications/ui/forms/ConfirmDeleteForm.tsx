import { Button, Dialog } from "@/shared/ui";

interface ConfirmDeleteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

/**
 * ConfirmDeleteForm
 *
 * Reusable confirmation dialog for delete operations.
 * Displays a warning and requires user confirmation before proceeding.
 */
export function ConfirmDeleteForm({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: ConfirmDeleteFormProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Delete"
      description="Are you sure you want to delete this application? This action cannot be undone."
      buttonRow={
        <div className="flex gap-sm">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      }
    />
  );
}
